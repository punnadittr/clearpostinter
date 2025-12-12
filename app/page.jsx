'use client'; // Hot reload trigger

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Added for navigation
import {
    ShieldCheck,
    FileSearch,
    Truck,
    MessageCircle,
    Menu,
    X,
    CheckCircle,
    AlertTriangle,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    LifeBuoy,
    Globe,
    Package,
    Siren,
    Gavel,
    Unlock,
    ChefHat,
    Smartphone,
    User,
    HelpCircle,
    Star,
    ChevronDown,
    FileText,
    Ship,
    ScrollText,
    Settings,
    Utensils
} from 'lucide-react';
import BookingWizard from '../components/BookingWizard';

const ClearpostLanding = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [showBookingWizard, setShowBookingWizard] = useState(false);
    const [contactType, setContactType] = useState('general');

    const startBooking = () => {
        setShowBookingWizard(true);
        setIsMenuOpen(false);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const scrollToSection = (id) => {
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const openEmergencyContact = () => {
        setContactType('emergency');
        setShowContactModal(true);
    };

    const ContactModal = () => (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md transition-opacity ${showContactModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in-up border-t-4 border-blue-600 overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                {contactType === 'emergency' && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-1 rounded-b-lg text-xs font-bold uppercase tracking-wide shadow-red-500/50 shadow-lg z-10 flex items-center gap-2">
                        <Siren size={12} className="animate-pulse" /> Priority Rescue
                    </div>
                )}

                <button
                    onClick={() => setShowContactModal(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10"
                >
                    <X size={24} />
                </button>

                <h3 className="text-2xl font-bold text-slate-800 mb-2 relative z-10">
                    {contactType === 'emergency' ? 'Rescue Request' : 'Free Pre-Audit'}
                </h3>
                <p className="text-slate-600 mb-8 relative z-10">
                    {contactType === 'emergency'
                        ? "Send us your Tracking Number or Notice of Seizure. We will investigate the status immediately."
                        : "Send us your invoice draft. We check HS Codes and valuation risks before you ship."}
                </p>

                <div className="space-y-4 relative z-10">
                    <a href="#" className="flex items-center gap-4 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-all border border-green-100 group shadow-sm hover:shadow-md">
                        <div className="bg-green-500 text-white p-3 rounded-full shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                            <MessageCircle size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-800">WhatsApp Chat</p>
                            <p className="text-xs font-medium text-green-600 uppercase tracking-wide">Fastest Response</p>
                        </div>
                        <ArrowRight className="ml-auto text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                    </a>

                    <a href="#" className="flex items-center gap-4 p-4 bg-white hover:bg-slate-50 rounded-xl transition-all border border-slate-200 group shadow-sm hover:shadow-md">
                        <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-800">Email Inquiry</p>
                            <p className="text-xs text-slate-500">contact@clearpost-th.com</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );

    return (
        <div className="font-sans text-slate-600 bg-white min-h-screen selection:bg-blue-100 selection:text-blue-900">
            {/* Navigation - Dark Glass Style */}
            <nav className="fixed w-full bg-slate-900/90 backdrop-blur-md shadow-lg z-40 border-b border-white/10 supports-[backdrop-filter]:bg-slate-900/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                                <img src="/logo-icon.png" alt="CP" className="w-6 h-6 object-contain" />
                            </div>
                            <span className="font-bold text-2xl text-white tracking-tight">Clearpost<span className="text-blue-500">.</span></span>
                        </div>

                        {/* Desktop Menu - Modified for Dark BG */}
                        <div className="hidden md:flex space-x-1 items-center bg-white/5 p-1.5 rounded-full border border-white/10">
                            <button onClick={() => scrollToSection('problems')} className="px-5 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium text-sm">Problems</button>
                            <button onClick={() => scrollToSection('rescue')} className="px-5 py-2 rounded-full text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-medium text-sm flex items-center gap-2"><LifeBuoy size={16} /> Rescue Service</button>
                            <button onClick={() => scrollToSection('services')} className="px-5 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium text-sm">All Services</button>
                            {/* NEW: Resources Link */}
                            <Link href="/resources" className="px-5 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium text-sm">
                                Blog & Resources
                            </Link>
                        </div>

                        <div className="hidden md:block">
                            <button
                                onClick={startBooking}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5"
                            >
                                Get a Quote
                            </button>
                        </div>

                        {/* Mobile Menu Button - White Icon */}
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="p-2 text-slate-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown - Dark Theme */}
                {isMenuOpen && (
                    <div className="md:hidden bg-slate-900 border-t border-slate-800 absolute w-full shadow-2xl animate-in slide-in-from-top-5">
                        <div className="px-4 pt-4 pb-8 space-y-2">
                            <button onClick={() => scrollToSection('problems')} className="block w-full text-left px-4 py-4 text-slate-300 hover:bg-white/5 hover:text-white font-bold rounded-xl">Why Us</button>
                            <button onClick={() => scrollToSection('rescue')} className="block w-full text-left px-4 py-4 text-red-400 bg-red-900/20 hover:bg-red-900/30 font-bold rounded-xl flex items-center gap-2"><LifeBuoy size={20} /> Rescue Service</button>
                            <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-4 text-slate-300 hover:bg-white/5 hover:text-white font-bold rounded-xl">Services</button>
                            {/* NEW: Mobile Resources Link */}
                            <Link href="/resources" className="block w-full text-left px-4 py-4 text-slate-300 hover:bg-white/5 hover:text-white font-bold rounded-xl">
                                Blog & Resources
                            </Link>
                            <button
                                onClick={() => {
                                    startBooking();
                                }}
                                className="block w-full text-center mt-6 bg-blue-600 text-white px-4 py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20"
                            >
                                Start Consultation
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden min-h-[90vh] flex items-center">
                {/* Abstract 3D Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80"
                        alt="Global Logistics Network Thailand Import"
                        className="w-full h-full object-cover opacity-30 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-blue-900/20"></div>
                    {/* Animated Gradients */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-700"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-blue-100 text-sm font-medium mb-8 hover:bg-white/20 transition-colors cursor-default">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></span>
                            Authorized Customs Broker
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-8">
                            Don't let <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-white">Customs</span>
                            <br /> kill your vibe.
                        </h1>

                        <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-lg font-light">
                            We provide <strong>audit-first logistics</strong>. We fix your paperwork <em>before</em> shipping, so you never have to deal with "surprise" fees or held cargo.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={startBooking}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 flex items-center justify-center gap-2 group"
                            >
                                Free Document Check <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={openEmergencyContact}
                                className="px-8 py-4 rounded-2xl font-bold text-lg bg-red-500/10 hover:bg-red-500/20 text-red-200 transition-all backdrop-blur-md border border-red-500/30 flex items-center justify-center gap-2 hover:border-red-500/60 hover:text-white group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-red-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <LifeBuoy size={20} className="text-red-400 group-hover:text-white group-hover:animate-spin-slow relative z-10" />
                                <span className="relative z-10">Goods Already Stuck?</span>
                            </button>
                        </div>

                        <div className="mt-12 flex items-center gap-6 text-sm text-slate-400">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
                                        {['EU', 'US', 'CN'][i - 1]}
                                    </div>
                                ))}
                            </div>
                            <p>Trusted by importers from 20+ countries</p>
                        </div>
                    </div>

                    {/* Floating Glass Card - Abstract Representation of "Safe Cargo" */}
                    <div className="hidden lg:block relative perspective-1000">
                        {/* Floating Elements */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl rotate-12 blur-sm opacity-60 animate-float"></div>
                        <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full blur-sm opacity-60 animate-float-delayed"></div>

                        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl transform rotate-y-12 hover:rotate-0 transition-transform duration-500">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">Status: Cleared</h3>
                                    <p className="text-blue-200 text-sm">Tracking: TH-8829-XJ</p>
                                </div>
                                <div className="bg-green-500/20 p-3 rounded-full border border-green-400/30">
                                    <CheckCircle className="text-green-400 w-8 h-8" />
                                </div>
                            </div>

                            {/* Simulated Process Bar */}
                            <div className="space-y-6">
                                {[
                                    { label: "Document Audit", status: "complete" },
                                    { label: "HS Code Verification", status: "complete" },
                                    { label: "Duty Payment", status: "complete" },
                                    { label: "Final Release", status: "active" }
                                ].map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-4 group">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step.status === 'complete' ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/10 border-white/20 text-white/50'}`}>
                                            {step.status === 'complete' ? <CheckCircle size={14} /> : <div className="w-2 h-2 bg-current rounded-full"></div>}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-medium ${step.status === 'active' ? 'text-white' : 'text-slate-400'}`}>{step.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold">CP</div>
                                <div className="text-xs text-slate-300">
                                    <p>Verified by <span className="text-white font-bold">Clearpost Agent</span></p>
                                    <p>10:42 AM • Suvarnabhumi Free Zone</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW: Rescue Section (Dark Red Theme) */}
            <section id="rescue" className="py-20 bg-slate-950 border-y border-slate-900 relative overflow-hidden">
                {/* Background Patterns */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-slate-900"></div>
                <div className="absolute -right-20 top-20 w-96 h-96 bg-red-900/20 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <div className="inline-flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider mb-4 border border-red-900/50 px-3 py-1 rounded bg-red-950/30">
                                <Siren size={16} className="animate-pulse" /> Emergency Service
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Cargo Stuck at Customs? <br />
                                <span className="text-red-500">We Rescue It.</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                Other brokers might walk away when things get complicated. We don't.
                                We specialize in resolving disputes, negotiating fines, and clearing shipments that are "held hostage" by paperwork errors.
                            </p>

                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { icon: Gavel, title: "Fine Negotiation", desc: "We talk to officers to minimize penalties and explain discrepancies." },
                                    { icon: Unlock, title: "Permit Clearance", desc: "Missing FDA/TISI? We help you navigate the retrospective permit process." },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                                        <div className="bg-red-950/50 p-3 rounded-lg text-red-500 h-fit">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">{item.title}</h4>
                                            <p className="text-slate-500 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={openEmergencyContact}
                                className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-red-900/40 hover:-translate-y-1 transition-transform w-full md:w-auto"
                            >
                                Request Immediate Rescue
                            </button>
                        </div>

                        <div className="md:w-1/2 relative">
                            {/* Illustration of Locked Container */}
                            <div className="bg-slate-900 rounded-3xl p-2 border border-slate-800 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800/50">
                                    <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-800">
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase">Current Status</p>
                                            <p className="text-red-500 font-mono text-xl font-bold tracking-widest flex items-center gap-2"><AlertTriangle size={20} /> HELD BY CUSTOMS</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 uppercase">Storage Fees</p>
                                            <p className="text-white font-mono text-xl font-bold">฿ 4,500 / Day</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-slate-400 text-sm">Clearpost Action Plan:</p>
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <div className="w-6 h-6 rounded bg-blue-900/50 flex items-center justify-center text-blue-400 text-xs font-bold">1</div>
                                            <p>On-site physical inspection</p>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <div className="w-6 h-6 rounded bg-blue-900/50 flex items-center justify-center text-blue-400 text-xs font-bold">2</div>
                                            <p>Re-assess tariff code with senior officer</p>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <div className="w-6 h-6 rounded bg-blue-900/50 flex items-center justify-center text-blue-400 text-xs font-bold">3</div>
                                            <p>Amend entry & Release cargo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Pain Points Section */}
            <section id="problems" className="py-24 px-4 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Importers Fear Thai Customs</h2>
                        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light">
                            The system isn't just strict; it's unpredictable. Here is what you are up against without a partner.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: AlertTriangle,
                                color: "red",
                                title: "The Valuation Trap",
                                desc: "Officers may ignore your invoice value and 'estimate' a higher price using their own database, forcing you to pay double taxes."
                            },
                            {
                                icon: Package,
                                color: "orange",
                                title: "Seized Goods",
                                desc: "Missing a minor permit (like FDA or TISI) results in immediate seizure. Once seized, it's nearly impossible to get back."
                            },
                            {
                                icon: MessageCircle,
                                color: "blue",
                                title: "Silent Treatment",
                                desc: "When things go wrong, nobody speaks English. You are left in the dark while storage fees pile up daily."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 group">
                                <div className={`w-16 h-16 bg-${item.color}-50 text-${item.color}-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                    <item.icon size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 px-4 bg-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* Left Content */}
                        <div className="order-2 lg:order-1">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                                We are the <span className="text-blue-600">Antidote</span> to Logistics Chaos.
                            </h2>
                            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                                We don't just "submit papers". We engineer a compliant path for your goods. Our job starts way before the ship leaves the port.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { title: "Pre-Flight Audit", desc: "We review commercial invoices line-by-line to match Thai Harmonized Codes." },
                                    { title: "HS Code Consultation", desc: "Expert advice on classification to ensure lowest legal duty rates." },
                                    { title: "Transparent Billing", desc: "You see the official Customs receipt. No markup on taxes. No hidden 'tea money'." },
                                ].map((service, idx) => (
                                    <div key={idx} className="flex gap-6 group cursor-default">
                                        <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                            <CheckCircle className="text-blue-600 group-hover:text-white transition-colors" size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h4>
                                            <p className="text-slate-500">{service.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Image - "Nano/Pro" Style Abstract */}
                        <div className="order-1 lg:order-2 relative">
                            <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 opacity-5"></div>
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 group">
                                <img
                                    src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1000&q=80"
                                    alt="Secure Customs Clearance Process Thailand"
                                    className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Overlay Badge */}
                                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-600 text-white p-3 rounded-xl">
                                            <ShieldCheck size={28} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Guarantee</p>
                                            <p className="text-xl font-bold text-slate-900">100% Tax Transparency</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW: What We Clear (Grid) */}
            <section className="py-24 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Specialized Expertise</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-6">What We Clear</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                            We don't just guess. We have specialized teams for high-risk categories that require extra permits (Red Line).
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Package, title: "General Cargo", desc: "Furniture, Clothes, Machine Parts" },
                            { icon: ChefHat, title: "Food & FDA", desc: "Supplements, Snacks, Drinks (FDA Required)" },
                            { icon: Smartphone, title: "Electronics / TISI", desc: "Appliances, Servers, Radio Equipment" },
                            { icon: User, title: "Personal Effects", desc: "Relocating to Thailand? Move duty-free." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all group">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-500 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW: Regulatory Shield (Restricted Goods) */}
            <section className="py-24 px-4 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-900/50 border border-blue-800 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                                <ShieldCheck size={14} /> Official Permits
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                We Handle the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Red Tape</span> for You.
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                Special items require special licenses. Importers often get stuck because they don't know they need a permit from a specific ministry until the goods arrive.
                            </p>

                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="bg-blue-900/30 p-3 rounded-lg text-blue-400 h-fit border border-blue-800/50">
                                        <ScrollText size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Buddha Images & Antiques</h4>
                                        <p className="text-slate-500 text-sm mt-1">Requires approval from the **Fine Arts Department**. We process the paperwork to ensure respectful and legal entry.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="bg-blue-900/30 p-3 rounded-lg text-blue-400 h-fit border border-blue-800/50">
                                        <Settings size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Motorcycle & Auto Parts</h4>
                                        <p className="text-slate-500 text-sm mt-1">Tires, helmets, and pipes often require **TISI Standards**. We check the industrial code compliance before you ship.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="bg-blue-900/30 p-3 rounded-lg text-blue-400 h-fit border border-blue-800/50">
                                        <Utensils size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Food & Supplements</h4>
                                        <p className="text-slate-500 text-sm mt-1">Strictly controlled by **FDA**. We help register products and get the import license (LPI) ready.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="relative">
                            <div className="relative bg-slate-800 rounded-3xl p-2 border border-slate-700 shadow-2xl">
                                <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
                                    <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-800">
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase">Document Status</p>
                                            <p className="text-green-500 font-mono text-xl font-bold tracking-widest flex items-center gap-2"><CheckCircle size={20} /> APPROVED</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 uppercase">License Type</p>
                                            <p className="text-white font-mono text-xl font-bold">Or. 16 (Fine Arts)</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-sm text-slate-400">
                                            <span>Application Submitted</span>
                                            <span className="text-slate-600">May 12</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm text-slate-400">
                                            <span>Officer Review</span>
                                            <span className="text-slate-600">May 13</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm text-white font-bold bg-green-500/10 p-2 rounded px-3 border border-green-500/20">
                                            <span>Permit Issued</span>
                                            <span className="text-green-500">May 14</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative badge */}
                            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl shadow-blue-900/50">
                                <p className="text-3xl font-bold">100%</p>
                                <p className="text-xs font-bold uppercase tracking-wider opacity-80">Legal Compliance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* NEW: How It Works (Process) */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">How It Works</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                            Simple, digital, and stress-free.
                        </p>
                    </div>

                    <div className="relative grid md:grid-cols-3 gap-12">
                        {/* Connector Line */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-100 z-0"></div>

                        {[
                            { icon: FileText, title: "1. Send Docs", desc: "Upload your Invoice & Packing List draft for our pre-audit." },
                            { icon: ShieldCheck, title: "2. We Clear", desc: "We pay duties, handle customs formalities, and release cargo." },
                            { icon: Truck, title: "3. Delivery", desc: "We truck the goods from port/airport directly to your door." }
                        ].map((step, idx) => (
                            <div key={idx} className="relative z-10 text-center">
                                <div className="w-24 h-24 bg-white border-4 border-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                                    <step.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                                <p className="text-slate-500 leading-relaxed px-4">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NEW: FAQ Section */}
            <section className="py-24 px-4 bg-slate-50">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "Do I need an import license?", a: "For personal effects, no. For commercial goods, you need to register as an importer (Paperless code) with Thai Customs. We can help you set this up in 1 day." },
                            { q: "How are duties calculated?", a: "Duties are based on the CIF value (Cost + Insurance + Freight) and the HS Code of your goods. VAT is always 7% on top of the Duty + CIF value." },
                            { q: "Can you clear food or cosmetics?", a: "Yes, but these require FDA permits *before* shipment. Do not ship without talking to us first, or your goods will be seized." },
                            { q: "What if my goods are already stuck?", a: "Use our 'Rescue Service'. We will inspect the situation, negotiate with officers, and find a legal solution to release your cargo." }
                        ].map((faq, idx) => (
                            <details key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm group">
                                <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-slate-900 hover:text-blue-600 transition-colors">
                                    <span>{faq.q}</span>
                                    <ChevronDown className="group-open:rotate-180 transition-transform text-slate-400" />
                                </summary>
                                <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Band */}
            <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to ship smarter?</h2>
                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                        Stop guessing. Start shipping with a partner who speaks both English and "Thai Customs" fluently.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={startBooking}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:-translate-y-1 transition-transform"
                        >
                            Start Free Consultation
                        </button>
                        <button
                            onClick={openEmergencyContact}
                            className="bg-transparent border-2 border-slate-700 text-white hover:bg-slate-800 px-10 py-5 rounded-2xl font-bold text-lg transition-all"
                        >
                            I Have a Stuck Shipment
                        </button>
                    </div>
                </div>
            </section>

           

            {/* Modal */}
            {showContactModal && <ContactModal />}
            {showBookingWizard && <BookingWizard onClose={() => setShowBookingWizard(false)} />}

            {/* Floating WhatsApp Button (Mobile) */}
            <a href="#" className="md:hidden fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl z-40 hover:scale-110 transition-transform shadow-green-900/20">
                <MessageCircle size={28} />
            </a>
        </div>
    );
};

export default ClearpostLanding;