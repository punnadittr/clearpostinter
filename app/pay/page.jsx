'use client';

import Link from 'next/link';
import { ShieldCheck, ArrowLeft, CreditCard, Lock, Loader } from 'lucide-react';
import { useState } from 'react';

export default function PaymentPage() {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const res = await fetch('/.netlify/functions/create-beam-transaction', {
                method: 'POST',
                body: JSON.stringify({ amount: 350 }),
            });
            const data = await res.json();

            if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
            } else {
                alert('Payment initialization failed. Please try again.');
            }
        } catch (error) {
            console.error('Payment Error:', error);
            alert('Could not connect to payment gateway.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-600">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                {/* Header */}
                <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-10"></div>
                    <Link href="/" className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div className="w-16 h-16 bg-blue-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                        <ShieldCheck className="text-blue-400" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-1">Secure Payment</h1>
                    <p className="text-slate-400 text-sm">Clearpost Consultation Deposit</p>
                </div>

                {/* Content */}
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8 pb-8 border-b border-slate-100">
                        <div>
                            <h2 className="font-bold text-slate-900 text-lg">Consultation Fee</h2>
                            <p className="text-sm text-slate-500">Initial assessment & strategy</p>
                        </div>
                        <div className="text-right">
                            <span className="block text-2xl font-bold text-slate-900">350</span>
                            <span className="text-xs text-slate-400">THB</span>
                        </div>
                    </div>

                    {/* Beam Placeholder */}
                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full bg-[#0050ff] hover:bg-[#0040cc] disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 mb-6"
                    >
                        {loading ? <Loader className="animate-spin" /> : <CreditCard size={20} />}
                        {loading ? 'Processing...' : 'Pay with Beam Checkout'}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-8">
                        <Lock size={12} />
                        <span>Secured by Beam Payments (Bank of Thailand Licensed)</span>
                    </div>

                    {/* Policy */}
                    <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-500 leading-relaxed border border-slate-100">
                        <h3 className="font-bold text-slate-700 mb-2 uppercase tracking-wider text-[10px]">Refund Policy</h3>
                        <ul className="space-y-2 list-disc pl-4">
                            <li>
                                <strong>Non-refundable</strong> if you cancel the service request after payment.
                            </li>
                            <li>
                                <strong>Fully refundable</strong> if Clearpost cannot provide a customs clearance solution for your specific case.
                            </li>
                            <li>
                                This deposit (350 THB) will be deducted from your final service fee upon successful clearance.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
