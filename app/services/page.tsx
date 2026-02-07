'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    Code2, Scale, Calculator, Users, Briefcase, FileText, Shield,
    ArrowRight, CheckCircle, Zap, Globe, Smartphone, Palette
} from 'lucide-react'
import React from 'react'

const serviceData = [
    {
        icon: Code2,
        title: 'Custom Web Development',
        description: 'Build modern, responsive web apps with Next.js, React, and TypeScript.',
        features: ['Next.js 14', 'TypeScript', 'SEO Optimization', 'PWA'],
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        price: 'Custom Quote',
        delivery: '2-4 weeks',
    },
    {
        icon: Zap,
        title: 'Cloud Solutions',
        description: 'Scalable cloud infrastructure, deployment automation, and server management.',
        features: ['AWS / Azure / GCP', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Serverless Arch'],
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        price: 'Custom Quote',
        delivery: 'Project Based',
    },
    {
        icon: Globe,
        title: 'Digital Marketing',
        description: 'Data-driven strategies to grow your online presence and reach your target audience.',
        features: ['SEO & SEM', 'Social Media Marketing', 'Content Strategy', 'Analytics & Reporting'],
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        price: 'Custom Quote',
        delivery: 'Monthly Retainer',
    }
]

export default function ServicesPage() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) setIsVisible(true)
        }, { threshold: 0.1 })
        if (sectionRef.current) obs.observe(sectionRef.current)
        return () => obs.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className={`text-center mb-16 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-4xl font-bold">Our Services</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Comprehensive solutions across technology, legal, finance, HR, and compliance.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceData.map((s, i) => (
                        <Card key={i} className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2 dark:bg-slate-900 ${isVisible ? 'opacity-100 animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.1}s` }}>
                            <CardHeader className="p-6 flex items-center">
                                <div className={`p-4 rounded-full ${s.bg} dark:bg-blue-900/30 ${s.color} dark:text-blue-400 mr-4`}>
                                    {React.createElement(s.icon, { className: 'h-6 w-6' })}
                                </div>
                                <CardTitle className="text-xl font-semibold">{s.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 p-6 space-y-4">
                                <p className="text-slate-600 dark:text-slate-300">{s.description}</p>
                                <ul className="space-y-2">
                                    {s.features.map((f, i2) => (
                                        <li key={i2} className="flex items-center text-slate-700 dark:text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />{f}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-slate-500">
                                        <span className="font-semibold">{s.price}</span> | {s.delivery}
                                    </div>
                                    <Button size="sm" asChild>
                                        <Link href="/contact">
                                            <ArrowRight className="h-4 w-4 mr-1" /> Get Quote
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
