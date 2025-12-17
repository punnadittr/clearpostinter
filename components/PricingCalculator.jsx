'use client';

import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Package, ArrowRight, Truck, Info, Mail } from 'lucide-react';

const PricingCalculator = ({ onStartBooking }) => {
    const services = [
        {
            id: 'postal-basic',
            title: 'Postal Import (Basic)',
            price: '800',
            currency: '฿',
            description: 'For simple postal shipments held at Laksi or local post office.',
            features: [
                'Value under ฿40,000',
                'No special permits required',
                'Released at Laksi / Local Post Office',
                'Personal effects clearing'
            ],
            icon: Mail,
            colors: {
                border: 'border-blue-500',
                bgSoft: 'bg-blue-50/30',
                ring: 'ring-blue-100',
                iconBg: 'bg-blue-500',
                textMain: 'text-blue-600',
                textDark: 'text-slate-900', // active title
                divider: 'from-blue-400 to-blue-600',
                bgIconSoft: 'bg-blue-50',
                textIcon: 'text-blue-600',
                buttonGradient: 'from-blue-500 to-blue-600',
                shadow: 'shadow-blue-500/30 hover:shadow-blue-500/50'
            }
        },
        {
            id: 'postal-standard',
            title: 'Postal Import (Complex)',
            price: '1,500',
            currency: '฿',
            description: 'For high-value postal shipments or those requiring permits.',
            features: [
                'Value over ฿40,000',
                'Restricted goods (FDA, TISI, etc.)',
                'Formal Customs Entry submission',
                'Duty calculation support'
            ],
            icon: Package,
            colors: {
                border: 'border-indigo-500',
                bgSoft: 'bg-indigo-50/30',
                ring: 'ring-indigo-100',
                iconBg: 'bg-indigo-500',
                textMain: 'text-indigo-600',
                textDark: 'text-slate-900',
                divider: 'from-indigo-400 to-indigo-600',
                bgIconSoft: 'bg-indigo-50',
                textIcon: 'text-indigo-600',
                buttonGradient: 'from-indigo-500 to-indigo-600',
                shadow: 'shadow-indigo-500/30 hover:shadow-indigo-500/50'
            }
        },
        {
            id: 'courier-cargo',
            title: 'Courier & Air Cargo',
            price: '4,500',
            currency: '฿',
            description: 'For shipments arriving via FedEx, DHL, UPS, or Air Freight.',
            features: [
                'FedEx, DHL, UPS, TNT',
                'Suvarnabhumi Airport (BKK)',
                'Professional Customs Specialist',
                'Full paperless clearance'
            ],
            icon: Truck,
            colors: {
                border: 'border-purple-500',
                bgSoft: 'bg-purple-50/30',
                ring: 'ring-purple-100',
                iconBg: 'bg-purple-500',
                textMain: 'text-purple-600',
                textDark: 'text-slate-900',
                divider: 'from-purple-400 to-purple-600',
                bgIconSoft: 'bg-purple-50',
                textIcon: 'text-purple-600',
                buttonGradient: 'from-purple-500 to-purple-600',
                shadow: 'shadow-purple-500/30 hover:shadow-purple-500/50'
            }
        }
    ];

    const [selectedId, setSelectedId] = useState(services[0].id);
    const selectedService = services.find(s => s.id === selectedId);

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Left Side: Selection */}
                <div className="lg:w-1/2 space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm">1</span>
                        Select your shipment type
                    </h3>

                    <div className="grid gap-4">
                        {services.map((service) => (
                            <button
                                key={service.id}
                                type="button"
                                onClick={() => setSelectedId(service.id)}
                                className={`relative text-left p-4 md:p-6 rounded-2xl border-2 group outline-none ${selectedId === service.id
                                    ? `${service.colors.border} ${service.colors.bgSoft} shadow-xl z-10`
                                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                            >
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${selectedId === service.id
                                        ? `${service.colors.iconBg} text-white`
                                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                                        }`}>
                                        <service.icon size={20} className="md:w-6 md:h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`font-semibold text-base md:text-lg truncate ${selectedId === service.id ? service.colors.textDark : 'text-slate-700'
                                            }`}>
                                            {service.title}
                                        </h4>
                                        <p className="text-slate-500 text-xs md:text-sm mt-0.5 md:mt-1 line-clamp-2 md:line-clamp-none leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedId === service.id
                                        ? `${service.colors.border} ${service.colors.iconBg}`
                                        : 'border-slate-300'
                                        }`}>
                                        {selectedId === service.id && <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full" />}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side: Pricing Card */}
                <div className="lg:w-1/2">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 text-sm">2</span>
                        Estimated Fee
                    </h3>

                    <div className="sticky top-24">
                        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 relative">
                            {/* Decorative Top Bar */}
                            <div className={`h-2 w-full bg-gradient-to-r ${selectedService.colors.divider}`} />

                            <div className="p-8 md:p-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <p className="text-slate-500 font-medium mb-1">Service Fee</p>
                                        <div className="flex flex-wrap items-baseline gap-x-1">
                                            {selectedService.subPrice && (
                                                <span className="text-lg text-slate-400 font-medium mr-1">{selectedService.subPrice}</span>
                                            )}
                                            <span className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${selectedService.colors.textMain} tracking-tight`}>
                                                {selectedService.currency}{selectedService.price}
                                            </span>
                                            <span className="text-sm md:text-base text-slate-400 font-medium">/ shipment</span>
                                        </div>
                                    </div>
                                    <div className={`p-3 rounded-full flex-shrink-0 ${selectedService.colors.bgIconSoft} ${selectedService.colors.textIcon}`}>
                                        <selectedService.icon size={32} />
                                    </div>
                                </div>

                                <div className="space-y-4 mb-10">
                                    {selectedService.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="flex-shrink-0">
                                                <CheckCircle size={20} className="text-green-500" />
                                            </div>
                                            <span className="text-slate-600 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100 flex gap-3">
                                    <AlertCircle size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-slate-500">
                                        <p className="font-semibold text-slate-700 mb-1">Note</p>
                                        Service fees only. Third-party costs (taxes, storage, delivery) are billed separately at actual cost.
                                    </div>
                                </div>

                                <button
                                    onClick={onStartBooking}
                                    className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 bg-gradient-to-r ${selectedService.colors.buttonGradient} ${selectedService.colors.shadow}`}
                                >
                                    Get Started Now <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingCalculator;
