'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  Users, Award, Calendar,
  Lightbulb, Heart, Star,
  ArrowRight, CheckCircle,
  CreditCard, Info, Shield, XCircle
} from 'lucide-react'

const pricingPackages = [
  {
    name: 'BASIC PACKAGE',
    price: '₹11,000',
    description: 'Static / Frontend Website',
    features: [
      '4-page Static Website',
      'Modern Frontend Design',
      'Mobile-responsive layout',
      'WhatsApp button integration',
      'Standard Contact form',
      'Basic SEO setup',
      '1 free correction'
    ],
    timeline: '12-15 working days'
  },
  {
    name: 'STANDARD PACKAGE',
    price: '₹15,000',
    description: 'Full Stack (No Admin)',
    features: [
      'Dynamic Website Solution',
      'Database Integration',
      'API Development',
      'Faster delivery',
      'Priority support',
      'No Admin Panel included',
      '3 free corrections'
    ],
    timeline: '12-15 working days'
  },
  {
    name: 'PREMIUM PACKAGE',
    price: '₹25,000',
    description: 'Full Stack + Admin Panel',
    features: [
      'Complete Full Stack Solution',
      'Custom Admin Dashboard',
      'Content Management System (CMS)',
      'Advanced Database Management',
      'User Authentication (if needed)',
      'Monthly maintenance (1 month)',
      'Priority WhatsApp support'
    ],
    timeline: '12-15 working days'
  }
]

const companyValues = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We embrace cutting-edge technologies and creative solutions to solve complex business challenges.',
    gradient: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Heart,
    title: 'Client Success',
    description: 'Your success is our success. We prioritize understanding and exceeding client expectations in every project.',
    gradient: 'from-pink-400 to-red-500'
  },
  {
    icon: Award,
    title: 'Excellence Driven',
    description: 'We maintain the highest standards in service delivery, code quality, and professional expertise.',
    gradient: 'from-purple-400 to-indigo-500'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'We believe in the power of diverse perspectives and collaborative problem-solving approaches.',
    gradient: 'from-blue-400 to-cyan-500'
  }
]



export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-orange-600 rounded-full blur-3xl animate-float animation-delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <Badge className="mb-8 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:text-blue-600 px-6 py-3 text-lg">
              <Users className="w-5 h-5 mr-2" />
              About AJPR World
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              <span className="block text-slate-900 dark:text-white mb-4">Meet the Visionaries</span>
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Behind Your Success
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              We're a passionate team of innovators, creators, and problem-solvers dedicated to
              transforming your digital vision into reality with cutting-edge technology and expert services.
            </p>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section ref={sectionRef} className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            {[
              { icon: Calendar, value: '3+', label: 'Years of Excellence', color: 'text-blue-600', description: 'Serving clients since 2025' },
              { icon: Users, value: '4', label: 'Expert Team Members', color: 'text-green-600', description: 'Dedicated professionals' },
              { icon: Award, value: '50+', label: 'Projects Delivered', color: 'text-purple-600', description: 'Across all service categories' },
              { icon: Star, value: '100%', label: 'Client Satisfaction', color: 'text-yellow-600', description: 'Perfect retention rate' }
            ].map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="text-center p-8 hover-lift group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-lg hover:shadow-xl">
                  <CardContent className="space-y-4 p-0">
                    <div className="mx-auto w-fit p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className={`h-10 w-10 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        {stat.value}
                      </div>
                      <div className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {stat.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing & Scope Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className={`text-center space-y-6 mb-20 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold">Scope of Work & Pricing</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Transparent pricing and comprehensive service packages tailored to your business needs.
            </p>
          </div>

          {/* Common Scope */}
          <div className={`mb-20 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-200' : 'opacity-0'}`}>
            <Card className="border-l-4 border-l-blue-500 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Scope of Work (Common for All Packages)</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-blue-600">Website Pages</h4>
                    <ul className="space-y-3">
                      {['Home', 'About Us', 'Services', 'Contact Us'].map((item, i) => (
                        <li key={i} className="flex items-center text-slate-700 dark:text-slate-300">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-4 text-blue-600">Core Features</h4>
                    <ul className="space-y-3">
                      {[
                        'Mobile & tablet responsive design',
                        'Clean corporate UI (HR-focused)',
                        'WhatsApp Call / Chat button',
                        'Contact form with email notification',
                        'SEO-friendly page structure'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center text-slate-700 dark:text-slate-300">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Packages */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {pricingPackages.map((pkg, index) => (
              <Card key={index} className={`relative flex flex-col hover-lift border-t-4 ${index === 1 ? 'border-t-purple-500 shadow-2xl scale-105 z-10' : 'border-t-blue-500 shadow-lg'} transition-all duration-500 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${400 + index * 100}ms` }}>
                {index === 1 && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {pkg.price}
                    </div>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {pkg.description}
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Timeline:</div>
                    <div className="text-blue-600 dark:text-blue-400">{pkg.timeline}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Terms & Exclusions */}
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-600' : 'opacity-0'}`}>
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-0">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                  Payment Terms
                </h4>
                <ul className="space-y-2">
                  {[
                    '50% advance before project start',
                    '50% after final approval'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-red-50 dark:bg-red-900/20 border-0">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center">
                  <Info className="w-5 h-5 mr-2 text-red-600" />
                  Exclusions
                </h4>
                <ul className="space-y-2">
                  {[
                    'Domain & hosting charges',
                    'Paid plugins or third-party tools',
                    'Content writing',
                    'Backend systems / admin panel'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 text-sm">
                      <XCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900/20 border-0">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Post-Delivery Support
                </h4>
                <div className="flex items-start text-slate-700 dark:text-slate-300 text-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  7 days free bug-fix support after delivery
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Company Values */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className={`text-center space-y-6 mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up animation-delay-800' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold">Our Core Values</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              These fundamental principles guide every decision we make and define our company culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className={`group hover-lift p-8 text-center bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${1 + (index * 0.1)}s` }}>
                  <CardContent className="p-0 space-y-4">
                    <div className={`mx-auto w-fit p-4 rounded-2xl bg-gradient-to-r ${value.gradient} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="h-10 w-10" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{value.title}</h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>




      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join Our Success Story?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Whether you're looking for cutting-edge technology solutions, expert legal guidance,
              or comprehensive business support, our team is ready to help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" variant="secondary" className="hover-lift px-12 py-4 text-lg" asChild>
                <Link href="/contact">
                  <Users className="mr-2 h-6 w-6" />
                  Work With Our Team
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-black hover:bg-white hover:text-blue-600 hover-lift px-12 py-4 text-lg" asChild>
                <Link href="/services">
                  <ArrowRight className="mr-2 h-6 w-6" />
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
