import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/providers/CartProvider'
import { useState } from 'react'
import { ShoppingCart, Trash2, ShoppingBag } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { submitOrderRequest, createRazorpayOrder } from '@/app/actions'

export default function CartDrawer() {
  const { cart, removeFromCart, cartTotal, isCartOpen, setIsCartOpen, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isGuestOpen, setIsGuestOpen] = useState(false)
  const [guestDetails, setGuestDetails] = useState({ name: '', email: '', phone: '' })

  // Unify payment handling for both Guest and Logged-in users
  const processPaymentAndSubmit = async (userDetails: { name: string, email: string, phone?: string }, isGuest: boolean) => {
      setLoading(true)
      try {
          // 1. Create Razorpay Order
          const order = await createRazorpayOrder(cartTotal)
          if (!order) throw new Error('Order creation failed')

          const options = {
              key: "rzp_test_SDB1saOMoT7FUJ",
              amount: order.amount,
              currency: order.currency,
              name: "AJPR World",
              description: "Service Payment",
              order_id: order.id,
              handler: async function (response: any) {
                  // 2. On Success, Submit Order Request to Backend
                  try {
                      const res = await submitOrderRequest({
                          name: userDetails.name,
                          email: userDetails.email,
                          phone: userDetails.phone || "",
                          cart: cart,
                          total: cartTotal,
                          paymentStatus: 'paid',
                          paymentId: response.razorpay_payment_id,
                          isGuest: isGuest
                      })

                      if (res.success) {
                          alert(`Payment Successful! Request ID: ${response.razorpay_payment_id}`)
                          clearCart()
                          setIsCartOpen(false)
                          if (isGuest) setIsGuestOpen(false)
                      } else {
                          alert("Payment successful but failed to save order. Please contact support.")
                      }
                  } catch (saveError) {
                      console.error("Save Error:", saveError)
                      alert("Payment successful but error saving order.")
                  }
              },
              prefill: {
                  name: userDetails.name,
                  email: userDetails.email,
                  contact: userDetails.phone || ""
              },
              theme: {
                  color: "#2563EB"
              }
          }

          const rzp1 = new (window as any).Razorpay(options)
          rzp1.on('payment.failed', function (response: any) {
              alert(`Payment Failed: ${response.error.description}`)
          })
          rzp1.open()

      } catch (error) {
          console.error('Payment Error:', error)
          alert("Payment initiation failed. Please try again.")
      } finally {
          setLoading(false)
      }
  }

  const handleCheckout = async () => {
    if (!user) {
      setIsGuestOpen(true)
      return
    }
    await processPaymentAndSubmit({ name: user.name, email: user.email }, false)
  }

  const handleGuestSubmit = async () => {
      if (!guestDetails.name || !guestDetails.email) {
          alert("Please fill in required details")
          return
      }
      // Trigger payment flow instead of direct submit
      await processPaymentAndSubmit(guestDetails, true)
  }

  return (
    <>
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 gap-0 bg-white">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold font-serif text-slate-900">
            Your Cart <span className="text-sm font-normal text-slate-500 font-sans">({cart.length} items)</span>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center px-10">
              <div className="w-24 h-24 mb-6 opacity-80">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="w-full h-full text-slate-800"
                >
                   <path d="M16 10a4 4 0 0 1-8 0" />
                   <path d="M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-2">Your cart is empty</h3>
              <p className="text-slate-500 mb-8">Let&apos;s find something for you</p>
              <Button 
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-[#0F4C5C] hover:bg-[#0a3540] text-white py-6 text-lg"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-24 h-32 bg-slate-100 rounded-md flex items-center justify-center shrink-0 overflow-hidden">
                      {/* Placeholder for item image, using a generic colored block or icon if no image */}
                      <div className="text-slate-300">
                        <ShoppingBag className="w-8 h-8 opacity-20" />
                      </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                        <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-slate-900 line-clamp-2">{item.name}</h4>
                            <span className="font-medium text-slate-900">₹{item.price.toLocaleString()}</span>
                        </div>
                        {item.details && <p className="text-xs text-slate-500 mt-1">{item.details}</p>}
                        {item.type === 'addon' && <p className="text-xs text-slate-400 mt-1">Quantity: {item.quantity}</p>}
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {item.type === 'addon' && (
                        <div className="flex items-center border rounded-md h-8">
                             <button className="px-2 text-slate-400 hover:text-slate-600 disabled:opacity-50" disabled>-</button>
                             <span className="px-2 text-sm font-medium text-slate-900">{item.quantity}</span>
                             <button className="px-2 text-slate-400 hover:text-slate-600 disabled:opacity-50" disabled>+</button>
                        </div>
                        )}
                        <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-slate-500 underline hover:text-red-600 transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="p-6 border-t bg-white">
          <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-slate-900">Subtotal</span>
                <span className="text-lg font-bold text-slate-900">₹{cartTotal.toLocaleString()}</span>
              </div>
              <p className="text-xs text-slate-500">Taxes and shipping calculated at checkout.</p>
          </div>
          
          <Button 
            className="w-full bg-[#0F4C5C] hover:bg-[#0a3540] text-white py-6 text-base mb-3" 
            onClick={handleCheckout} 
            disabled={cart.length === 0 || loading}
          >
            {loading ? 'Processing...' : (user ? 'Proceed to Checkout' : 'Proceed to Checkout')}
          </Button>
          
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-full text-center text-sm text-[#0F4C5C] hover:underline"
          >
            View Full Cart
          </button>
        </div>
      </SheetContent>
    </Sheet>

    <Dialog open={isGuestOpen} onOpenChange={setIsGuestOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Your Request</DialogTitle>
            <DialogDescription>
              Enter your details so we can create your account and process your order.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={guestDetails.name}
                onChange={(e) => setGuestDetails({...guestDetails, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={guestDetails.email}
                onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})}
                className="col-span-3"
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={guestDetails.phone}
                onChange={(e) => setGuestDetails({...guestDetails, phone: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleGuestSubmit} disabled={loading} className="w-full bg-[#0F4C5C] hover:bg-[#0a3540] text-white">
                {loading ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </>
  )
}
