'use client'; // Hot reload trigger

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Added for navigation
import Image from 'next/image'; // Optimized images
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
    Plane,
    Upload,
    FileText,
    Ship,
    ScrollText,
    Settings,
    Utensils,
    Maximize2,
    Pill,
    Sparkles,
    Cpu,
    Armchair,

} from 'lucide-react';
import BookingWizard from '../components/BookingWizard';
import AntidoteReceipt from '../components/AntidoteReceipt';
import TransparencyIllustration from '../components/TransparencyIllustration';
import Footer from '../components/Footer';
import PricingCalculator from '../components/PricingCalculator';

const ClearpostLanding = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showBookingWizard, setShowBookingWizard] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

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
                        <div className="hidden lg:flex space-x-1 items-center bg-white/5 p-1.5 rounded-full border border-white/10">
                            <button onClick={() => scrollToSection('problems')} className="px-5 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium text-sm">Problems</button>
                            <button onClick={() => scrollToSection('services')} className="px-5 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium text-sm">Services</button>
                            <button onClick={() => scrollToSection('pricing')} className="px-5 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium text-sm">Pricing</button>
                            {/* NEW: Resources Link */}
                            <Link href="/resources" className="px-5 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium text-sm">
                                Blog & Resources
                            </Link>
                        </div>

                        <div className="hidden lg:block">
                            <button
                                onClick={startBooking}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5"
                            >
                                Get a Quote
                            </button>
                        </div>

                        {/* Mobile Menu Button - White Icon */}
                        <div className="lg:hidden">
                            <button onClick={toggleMenu} className="p-2 text-slate-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors">
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown - Dark Theme */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-slate-900 border-t border-slate-800 absolute w-full shadow-2xl animate-in slide-in-from-top-5">
                        <div className="px-4 pt-4 pb-8 space-y-2">
                            <button onClick={() => scrollToSection('problems')} className="block w-full text-left px-4 py-4 text-slate-300 hover:bg-white/5 hover:text-white font-bold rounded-xl">Problems</button>
                            <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-4 text-slate-300 hover:bg-white/5 hover:text-white font-bold rounded-xl">Services</button>
                            <button onClick={() => scrollToSection('pricing')} className="block w-full text-left px-4 py-4 text-slate-300 hover:bg-white/5 hover:text-white font-bold rounded-xl">Pricing</button>
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
            <section className="pt-32 pb-20 bg-slate-900 text-white relative overflow-hidden min-h-[90vh] flex items-center w-full">
                {/* Abstract 3D Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80"
                        alt="Global Logistics Network Thailand Import"
                        className="w-full h-full object-cover opacity-30 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/50 to-slate-900"></div>
                    {/* Animated Gradients */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-700"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
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
                            <strong>Stuck at Thai Customs? Let us help.</strong> We specialize in releasing held shipments. We handle the negotiations and paperwork to get your goods released fast.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={startBooking}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 flex items-center justify-center gap-2 group"
                            >
                                Free Document Check <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => scrollToSection('services')}
                                className="px-8 py-4 rounded-2xl font-bold text-lg bg-white/10 hover:bg-white/20 text-blue-100 transition-all backdrop-blur-md border border-white/10 flex items-center justify-center gap-2 hover:border-white/30 hover:text-white group"
                            >
                                <span className="relative z-10">Explore Services</span>
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

            {/* NEW: Forms Identification Section */}
            <section className="py-24 bg-slate-950 border-y border-slate-900 relative">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium mb-6">
                            <FileSearch size={16} className="text-blue-400" />
                            <span>Document Identification</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Received one of these?
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Don't panic. These are standard notification slips (Green Form / White Form).
                            They simply mean your goods are held until duties are paid or permits are shown.
                        </p>
                    </div>

                    {/* Mobile: Horizontal Scroll (Carousel) | Desktop: Grid */}
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 lg:grid lg:grid-cols-3 lg:gap-8 max-w-7xl mx-auto lg:overflow-visible no-scrollbar">
                        {/* White Form */}
                        <div className="space-y-6 group min-w-[75vw] md:min-w-[45vw] lg:min-w-0 snap-center">
                            <div
                                onClick={() => setSelectedImage("/images/forms/customs-form-white.jpg")}
                                className="rounded-2xl shadow-2xl shadow-black/50 border border-slate-700 bg-slate-800 transition-transform duration-300 lg:group-hover:-translate-y-2 transform-gpu [backface-visibility:hidden] [transform:translateZ(0)] cursor-pointer relative"
                            >
                                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden [mask-image:radial-gradient(white,black)]">
                                    <div className="absolute top-4 right-4 bg-slate-900 border border-slate-600 text-white px-3 py-1 rounded-lg text-xs font-bold z-10 shadow-lg">
                                        Retained Receipt
                                    </div>
                                    <Image
                                        src="/images/forms/customs-form-white.jpg"
                                        alt="Thai Customs White Form - Passenger Detention"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover opacity-90 lg:group-hover:opacity-100 transition-opacity"
                                    />
                                    {/* Zoom Hint Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 lg:group-hover:opacity-100 transition-opacity bg-black/20">
                                        <div className="bg-black/60 text-white p-3 rounded-full backdrop-blur-sm">
                                            <Maximize2 size={24} />
                                        </div>
                                    </div>
                                    {/* Mobile Hint (Always visible but subtle) */}
                                    <div className="lg:hidden absolute bottom-3 right-3 bg-black/60 text-white p-2 rounded-full backdrop-blur-sm">
                                        <Maximize2 size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Green Form */}
                        <div className="space-y-6 group min-w-[75vw] md:min-w-[45vw] lg:min-w-0 snap-center">
                            <div
                                onClick={() => setSelectedImage("/images/forms/customs-form-green.jpg")}
                                className="rounded-2xl shadow-2xl shadow-black/50 border border-slate-700 bg-slate-800 transition-transform duration-300 lg:group-hover:-translate-y-2 transform-gpu [backface-visibility:hidden] [transform:translateZ(0)] cursor-pointer relative"
                            >
                                <div className="aspect-[3/4] relative flex flex-col rounded-2xl overflow-hidden [mask-image:radial-gradient(white,black)]">
                                    <div className="absolute top-4 right-4 bg-slate-900 border border-slate-600 text-white px-3 py-1 rounded-lg text-xs font-bold z-10 shadow-lg">
                                        Assessment Receipt
                                    </div>
                                    <div className="relative h-1/2 w-full border-b border-black/20">
                                        <Image
                                            src="/images/forms/customs-form-green.jpg"
                                            alt="Thai Customs Green Form - Front"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover opacity-90 lg:group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                    <div className="relative h-1/2 w-full">
                                        <Image
                                            src="/images/forms/customs-form-green-back.jpg"
                                            alt="Thai Customs Green Form - Back Instructions"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover opacity-90 lg:group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                    {/* Zoom Hint Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 lg:group-hover:opacity-100 transition-opacity bg-black/20">
                                        <div className="bg-black/60 text-white p-3 rounded-full backdrop-blur-sm">
                                            <Maximize2 size={24} />
                                        </div>
                                    </div>
                                    {/* Mobile Hint */}
                                    <div className="lg:hidden absolute bottom-3 right-3 bg-black/60 text-white p-2 rounded-full backdrop-blur-sm">
                                        <Maximize2 size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Postal Form */}
                        <div className="space-y-6 group min-w-[75vw] md:min-w-[45vw] lg:min-w-0 snap-center">
                            <div
                                onClick={() => setSelectedImage("/images/forms/customs-form-postal.jpg")}
                                className="rounded-2xl shadow-2xl shadow-black/50 border border-slate-700 bg-slate-800 transition-transform duration-300 lg:group-hover:-translate-y-2 transform-gpu [backface-visibility:hidden] [transform:translateZ(0)] cursor-pointer relative"
                            >
                                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden [mask-image:radial-gradient(white,black)]">
                                    <div className="absolute top-4 right-4 bg-slate-900 border border-slate-600 text-white px-3 py-1 rounded-lg text-xs font-bold z-10 shadow-lg">
                                        Postal Notification
                                    </div>
                                    <Image
                                        src="/images/forms/customs-form-postal.jpg"
                                        alt="Thai Customs Postal Notification Form"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover opacity-90 lg:group-hover:opacity-100 transition-opacity"
                                    />
                                    {/* Zoom Hint Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 lg:group-hover:opacity-100 transition-opacity bg-black/20">
                                        <div className="bg-black/60 text-white p-3 rounded-full backdrop-blur-sm">
                                            <Maximize2 size={24} />
                                        </div>
                                    </div>
                                    {/* Mobile Hint */}
                                    <div className="lg:hidden absolute bottom-3 right-3 bg-black/60 text-white p-2 rounded-full backdrop-blur-sm">
                                        <Maximize2 size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Consolidated "We Handle This" Banner */}
                    <div className="max-w-3xl mx-auto mt-8 mb-10">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
                            <div className="bg-green-500 text-white p-3 rounded-full shrink-0">
                                <CheckCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">We handle all of these.</h3>
                                <p className="text-slate-300 text-sm">Whether it's a white slip, green slip, or postal notification — we can clear it for you.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={startBooking}
                            className="inline-flex items-center gap-2 bg-slate-800 lg:hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold border border-slate-600 transition-all lg:hover:border-slate-500 group"
                        >
                            Upload Your Form <Upload size={20} className="lg:group-hover:-translate-y-1 transition-transform" />
                        </button>
                        <p className="mt-4 text-slate-500 text-sm">
                            Simply take a photo and upload it. We'll tell you what to do next.
                        </p>
                    </div>
                </div>
            </section >
            {/* Pain Points Section - Light Theme with Dramatic Feeling */}
            <section id="problems" className="py-24 px-4 relative overflow-hidden bg-slate-50">
                {/* Background Texture & Gradients - REMOVED for cleanliness */}
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                    {/* Clean slate background only */}
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-600 text-sm font-bold uppercase tracking-widest animate-pulse">
                            Warning: High Risk
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                            Why Importers <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">Fear</span> Thai Customs
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
                            The system isn't just strict; it's unpredictable. <br className="hidden md:block" />
                            Here is what you are up against without a partner.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Siren,
                                color: "red",
                                title: "The Valuation Trap",
                                desc: "Officers may ignore your invoice value and 'estimate' a higher price using their own database, forcing you to pay double taxes."
                            },
                            {
                                icon: Gavel,
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
                            <div key={idx} className="group relative p-1 rounded-3xl bg-gradient-to-b from-white to-slate-100 border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-500 lg:hover:-translate-y-2">
                                <div className="absolute inset-0 bg-white rounded-[22px] opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative h-full p-6 md:p-10 rounded-[22px] overflow-hidden">
                                    {/* Inner Color Accent */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20 transition-opacity duration-500 lg:group-hover:opacity-40 ${item.color === 'red' ? 'bg-red-500' :
                                        item.color === 'orange' ? 'bg-orange-500' :
                                            'bg-blue-500'
                                        }`}></div>

                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 lg:group-hover:scale-110 lg:group-hover:rotate-3 ${item.color === 'red' ? 'bg-red-50 text-red-600 border border-red-100' :
                                        item.color === 'orange' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                            'bg-blue-50 text-blue-600 border border-blue-100'
                                        }`}>
                                        <item.icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section - Dark Theme for Balance */}
            < section id="services" className="py-24 px-4 bg-slate-900 border-y border-slate-800 overflow-hidden relative" >
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* Left Content */}
                        <div className="order-2 lg:order-1">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                                We are the <span className="text-blue-500">Antidote</span> to Logistics Chaos.
                            </h2>
                            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                                We don't just "submit papers". We engineer a compliant path for your goods. Our job starts way before the ship leaves the port.
                            </p>

                            <div className="space-y-8">
                                {[
                                    { title: "Pre-Flight Audit", desc: "We review commercial invoices line-by-line to match Thai Harmonized Codes." },
                                    { title: "HS Code Consultation", desc: "Expert advice on classification to ensure lowest legal duty rates." },
                                    { title: "Transparent Billing", desc: "You see the official Customs receipt. No markup on taxes. No hidden 'tea money'." },
                                ].map((service, idx) => (
                                    <div key={idx} className="flex gap-6 group cursor-default">
                                        <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center border border-blue-500 shadow-lg shadow-blue-900/20">
                                            <CheckCircle className="text-white" size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2">{service.title}</h4>
                                            <p className="text-slate-400">{service.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Image - "Nano/Pro" Style Abstract */}
                        <div className="order-1 lg:order-2 relative">
                            <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 opacity-5"></div>
                            <div className="relative group">
                                <AntidoteReceipt />
                            </div>
                        </div>
                    </div>
                </div>
            </section >




            {/* NEW: Pricing Section */}
            <section id="pricing" className="py-24 px-4 bg-slate-50 border-b border-slate-200 relative overflow-hidden">


                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                            Usage Fees
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            Transparent pricing. No hidden "tea money".
                        </p>
                    </div>

                    <PricingCalculator onStartBooking={startBooking} />
                </div>
            </section>

            {/* Services Section */}


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
                            {
                                icon: Pill,
                                title: "Supplements / FDA",
                                desc: "Vitamins, Protein Powders, Medical Foods. We handle the FDA registration.",
                                gradient: "from-teal-400 to-emerald-500",
                                shadow: "shadow-teal-500/30"
                            },
                            {
                                icon: Sparkles,
                                title: "Cosmetics / FDA",
                                desc: "Skincare, Makeup, Perfumes. Full compliance with Thai FDA regulations.",
                                gradient: "from-rose-400 to-pink-500",
                                shadow: "shadow-pink-500/30"
                            },
                            {
                                icon: Cpu,
                                title: "Electronics / TISI",
                                desc: "Appliances, Servers, Radio Equipment. TISI & NBTC permit handling.",
                                gradient: "from-blue-400 to-indigo-500",
                                shadow: "shadow-indigo-500/30"
                            },
                            {
                                icon: Armchair,
                                title: "Personal Effects",
                                desc: "Relocating to Thailand? Move your household goods duty-free (if eligible).",
                                gradient: "from-amber-400 to-orange-500",
                                shadow: "shadow-orange-500/30"
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white rounded-[2rem] border border-slate-100 shadow-lg lg:hover:shadow-xl transition-all group overflow-hidden flex flex-col h-full relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50"></div>

                                {/* Icon Header */}
                                <div className="p-8 pb-0">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg ${item.shadow} lg:group-hover:scale-110 transition-transform duration-500`}>
                                        <item.icon size={32} strokeWidth={1.5} />
                                    </div>
                                </div>

                                <div className="p-8 pt-6 flex-1 flex flex-col relative">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 lg:group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative items-stretch">
                        {[
                            { icon: FileText, step: "01", title: "Submit Documents", desc: "Upload your Invoice & Packing List draft via our secure portal for a free pre-audit check." },
                            { icon: ShieldCheck, step: "02", title: "Customs Clearance", desc: "We handle duty calculations, paperless submissions, and official customs formalities." },
                            { icon: Truck, step: "03", title: "Door Delivery", desc: "Once released, we truck your goods directly from the port or airport to your doorstep." }
                        ].map((step, idx) => (
                            <div key={idx} className="relative group">
                                <div className="h-full bg-slate-50 rounded-[2rem] p-8 border border-slate-100 transition-all duration-300 lg:hover:bg-white lg:hover:shadow-xl lg:hover:-translate-y-1 lg:hover:border-blue-100">
                                    {/* Watermark Number */}
                                    <div className="absolute top-6 right-8 text-6xl font-black text-slate-200/50 select-none lg:group-hover:text-blue-50 transition-colors">
                                        {step.step}
                                    </div>

                                    {/* Icon */}
                                    <div className="relative w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-8 lg:group-hover:scale-110 lg:group-hover:bg-blue-600 lg:group-hover:text-white transition-all duration-300">
                                        <step.icon size={28} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{step.title}</h3>
                                    <p className="text-slate-500 leading-relaxed text-sm relative z-10">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Mobile Connector Line */}
                                {idx !== 2 && (
                                    <div className="md:hidden absolute left-1/2 bottom-[-32px] w-0.5 h-8 bg-slate-200 -translate-x-1/2"></div>
                                )}
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
                            { q: "What if my goods are already stuck?", a: "Use our 'Rescue Service'. We will inspect the situation, negotiate with officers, and find a legal solution to release your cargo." },
                            { q: "I ordered from Amazon/Alibaba. Do I still pay tax?", a: "Yes. If the total value (Goods + Shipping) exceeds 1,500 THB, you must pay Import Duty (0-30%) and VAT (7%). Couriers (DHL, FedEx) will not release the package until this is paid." },
                            { q: "Can I import E-cigarettes or Sex Toys?", a: "Absolutely not. These items are strictly prohibited under Thai Law. They will be confiscated, and you may face fines or prosecution. We cannot clear these items." },
                            { q: "My supplier paid for shipping. Why am I being charged?", a: "Your supplier likely paid for 'Freight' only (CIF terms). They did not pay Thai Import Duty & VAT. Unless your invoice clearly states 'DDP' (Delivered Duty Paid), the tax liability is 100% yours." },
                            { q: "Can I bring my Drone?", a: "Drones are controlled by the NBTC. You must register it. If you arrive without a permit, Customs has the right to detain it at the airport until you complete the NBTC registration." },
                            { q: "How long does the process take?", a: "Green Line (Standard): 24 hours. Red Line (Inspections): 2-4 days. Permit Processing (FDA/TISI): 1-3 weeks depending on the product complexity." }
                        ].map((faq, idx) => (
                            <details key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm group">
                                <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-bold text-slate-900 lg:hover:text-blue-600 transition-colors">
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
                            onClick={startBooking}
                            className="bg-transparent border-2 border-slate-700 text-white hover:bg-slate-800 px-10 py-5 rounded-2xl font-bold text-lg transition-all"
                        >
                            I Have a Stuck Shipment
                        </button>
                    </div>
                </div>
            </section>




            {/* Modal */}
            {showBookingWizard && <BookingWizard onClose={() => setShowBookingWizard(false)} />}

            {/* Floating WhatsApp Button (Mobile) */}
            <a href="#" className="md:hidden fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl z-40 hover:scale-110 transition-transform shadow-green-900/20">
                <MessageCircle size={28} />
            </a>
            {/* Image Modal / Lightbox */}
            {
                selectedImage && (
                    <div
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors z-50"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>
                        <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
                            <Image
                                src={selectedImage}
                                alt="Full screen view"
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default ClearpostLanding;