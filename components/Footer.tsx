"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Mail, Phone, MapPin, Linkedin, Twitter, Instagram,
    Facebook, ArrowRight, Clock, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const services = [
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'Legal Services', href: '/services/legal' },
    { name: 'GST & Tax Returns', href: '/services/financial' },
    { name: 'Company Registration', href: '/services/business' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
];

const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about#team' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Privacy Policy', href: '/privacy' },
];

export default function Footer() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubscribe = async () => {
        if (!email) return;

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setMessage("✅ Subscribed successfully!");
                setEmail("");
            } else {
                const data = await res.json();
                setMessage("❌ " + (data.error || "Failed to subscribe"));
            }
        } catch (error) {
            console.error(error);
            setMessage("⚠️ Network error");
        }
    };

    return (
        <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-3xl animate-float animation-delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <Image
                                src="/logo/ajpr-logo-white.png"
                                alt="AJPR World Private Limited"
                                width={150}
                                height={50}
                                className="object-contain"
                            />
                        </div>
                        <p className="text-blue-100 leading-relaxed">
                            Your trusted partner for comprehensive business solutions. From cutting-edge technology
                            to legal expertise, we deliver excellence in every service.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center text-blue-200">
                                <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-blue-400" />
                                <span>Nainital, Uttarakand</span>
                            </div>
                            <div className="flex items-center text-blue-200">
                                <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-blue-400" />
                                <a href="mailto:ajprworld@gmail.com" className="hover:text-white transition-colors">
                                    ajprworld@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center text-blue-200">
                                <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-blue-400" />
                                <a href="tel:+919811139030" className="hover:text-white transition-colors">
                                    +91 82737 92119
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-xl">Our Services</h4>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <Link
                                        href={service.href}
                                        className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center group"
                                    >
                                        <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-xl">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center group"
                                    >
                                        <ArrowRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter & Social */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-xl">Stay Connected</h4>
                        <p className="text-blue-200">
                            Subscribe to our newsletter for the latest updates and insights.
                        </p>
                        <div className="space-y-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <Button
                                onClick={handleSubscribe}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            >
                                Subscribe
                            </Button>
                            {message && <p className="text-sm text-blue-200">{message}</p>}
                        </div>
                        <div className="flex space-x-4">
                            <Link href="https://www.facebook.com/profile.php?id=61579291805273" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="https://x.com/AjprWorld" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="https://www.linkedin.com/company/ajpr-world" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="https://www.instagram.com/ajprworld" className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-6 text-blue-200">
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            We're Online
                        </Badge>
                        <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm">Mon-Sat: 9AM-7PM</span>
                        </div>
                        <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            <span className="text-sm">Serving Globally</span>
                        </div>
                    </div>
                    <div className="text-blue-200 text-sm">
                        © 2025 AJPR World Private Limited. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
