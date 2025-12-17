import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, FileText, Database } from 'lucide-react';

export const metadata = {
    title: 'Privacy Policy | Clearpost Logistics',
    description: 'How Clearpost collects, uses, and protects your personal and shipping data.',
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-600">
            {/* Header */}
            <header className="bg-slate-900 text-white py-12">
                <div className="max-w-4xl mx-auto px-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
                        <ArrowLeft size={20} /> Back to Home
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-600/20 p-3 rounded-xl border border-blue-500/30">
                            <ShieldCheck size={32} className="text-blue-400" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold">Privacy Policy</h1>
                    </div>
                    <p className="text-lg text-slate-400 max-w-2xl">
                        Your trust is our business. We protect your shipping documents and personal data with strict confidentiality.
                    </p>
                    <p className="mt-4 text-sm text-slate-500">Last Updated: December 15, 2025</p>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6 py-16">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 space-y-12">

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <Database size={24} className="text-blue-600" />
                            1. Information We Collect
                        </h2>
                        <p className="mb-4">
                            When you use our services, specifically the "Booking Wizard" or "Quick Quote" forms, we collect the following information:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
                            <li><strong>Personal Identifiers:</strong> Name, Email Address, Phone Number, Line ID.</li>
                            <li><strong>Shipping Data:</strong> Tracking Numbers, Commercial Invoices, Packing Lists, Airway Bills.</li>
                            <li><strong>Company Details:</strong> Company Name, Tax ID (if applicable for business clearance).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <FileText size={24} className="text-blue-600" />
                            2. How We Use Your Data
                        </h2>
                        <p className="mb-4">
                            We use this data strictly for the purpose of Customs Brokerage and Logistics services:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
                            <li><strong>Customs Audits:</strong> Checking your documents against Thai Customs harmonized codes.</li>
                            <li><strong>Communication:</strong> Contacting you regarding the status of your shipment or required permits.</li>
                            <li><strong>Legal Compliance:</strong> Submitting necessary declarations to the Thai Customs Department on your behalf.</li>
                        </ul>
                        <div className="mt-4 bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
                            We do <strong>not</strong> sell, trade, or rent your personal data to third parties for marketing purposes.
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                            <Lock size={24} className="text-blue-600" />
                            3. Data Security
                        </h2>
                        <p className="mb-4">
                            We implement security measures to maintain the safety of your personal information. Your files uploaded via our forms are transmitted via secure encryption (SSL) and stored in secure cloud environments with restricted access.
                        </p>
                        <p>
                            While we strive to use commercially acceptable means to protect your Personal Data, remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Third-Party Disclosure</h2>
                        <p className="mb-4">
                            We may share necessary data with the following entities solely for the purpose of clearing your goods:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-blue-500">
                            <li><strong>Thai Customs Department:</strong> For declaration entry.</li>
                            <li><strong>Other Government Agencies:</strong> (e.g., FDA, TISI, NBTC) only if your goods require specific import permits.</li>
                            <li><strong>Delivery Partners:</strong> Local trucking or courier services to deliver the cleared goods to your door.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Contact Us</h2>
                        <p className="mb-4">
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <p className="font-bold text-slate-900">Clearpost Co., Ltd.</p>
                            <p>Email: contact@clearpost.co.th</p>
                            <p>Address: 1222/310 Liab Klong Rangsit Road, Prachathipat, Thanyaburi, Pathum Thani 12130 Thailand</p>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}
