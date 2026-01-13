'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
    Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger
} from '@/components/ui/sheet'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import {
    Menu, ChevronDown, Code2, Scale, Calculator,
    Phone, Building
} from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'

const navigation = [
    { name: 'Home', href: '/' },
    {
        name: 'Services',
        href: '/services',
        dropdown: [
            { name: 'Web Development', href: '/services/web-development', icon: Code2 },
            { name: 'Legal Services', href: '/services/legal', icon: Scale },
            { name: 'Financial Services', href: '/services/financial', icon: Calculator },
            { name: 'Business Registration', href: '/services/business', icon: Building },
            { name: 'Digital Marketing', href: '/services/digital-marketing', icon: Phone },
        ]
    },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
]

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // helper to check if current route is active
    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + '/')
    }

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
                ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg shadow-lg'
                : 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm'
                } border-b border-gray-200/50 dark:border-gray-800/50`}
        >
            <div className="container flex h-20 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="relative w-32 h-12 group-hover:scale-105 transition-transform duration-300">
                        <Image
                            src="/logo/ajpr-logo.png"
                            alt="AJPR World Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {navigation.map((item) => (
                        <div
                            key={item.name}
                            className="relative group"
                            onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                href={item.href}
                                className={`flex items-center font-medium py-2 transition-colors ${isActive(item.href)
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                                    }`}
                            >
                                {item.name}
                                {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                            </Link>

                            {item.dropdown && activeDropdown === item.name && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 py-2 animate-fade-down">
                                    {item.dropdown.map((subItem) => {
                                        const IconComponent = subItem.icon
                                        return (
                                            <Link
                                                key={subItem.name}
                                                href={subItem.href}
                                                className={`flex items-center px-4 py-3 transition-colors ${isActive(subItem.href)
                                                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20'
                                                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20'
                                                    }`}
                                            >
                                                <IconComponent className="w-5 h-5 mr-3 text-blue-600" />
                                                <div className="font-medium">{subItem.name}</div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="flex items-center space-x-4">
                        <ModeToggle />
                        <Button
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                            asChild
                        >
                            <Link href="/contact">Get Quote</Link>
                        </Button>
                    </div>
                </nav>

                {/* Mobile Navigation */}
                <div className="lg:hidden flex items-center space-x-2">
                    <ModeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80 p-6 overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle className="flex items-center space-x-2">
                                    <Image
                                        src="/logo/ajpr-logo.png"
                                        alt="AJPR World"
                                        width={120}
                                        height={40}
                                        className="object-contain"
                                    />
                                </SheetTitle>
                            </SheetHeader>

                            {/* Mobile Nav with Accordion */}
                            <div className="flex flex-col mt-8 space-y-4">
                                {navigation.map((item) =>
                                    item.dropdown ? (
                                        <Accordion type="single" collapsible key={item.name} className="w-full">
                                            <AccordionItem value={item.name}>
                                                <AccordionTrigger
                                                    className={`text-lg font-medium ${isActive(item.href)
                                                        ? 'text-blue-600 dark:text-blue-400'
                                                        : 'hover:text-blue-600'
                                                        }`}
                                                >
                                                    {item.name}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div className="ml-2 space-y-2">
                                                        {item.dropdown.map((subItem) => {
                                                            const IconComponent = subItem.icon
                                                            return (
                                                                <Link
                                                                    key={subItem.name}
                                                                    href={subItem.href}
                                                                    className={`flex items-center py-2 transition-colors ${isActive(subItem.href)
                                                                        ? 'text-blue-600 dark:text-blue-400 font-medium'
                                                                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
                                                                        }`}
                                                                >
                                                                    <IconComponent className="w-4 h-4 mr-2 text-blue-500" />
                                                                    {subItem.name}
                                                                </Link>
                                                            )
                                                        })}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`text-lg font-medium transition-colors ${isActive(item.href)
                                                ? 'text-blue-600 dark:text-blue-400'
                                                : 'hover:text-blue-600'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                )}

                                {/* CTA Button */}
                                <Button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all" asChild>
                                    <Link href="/contact">Get Quote</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
