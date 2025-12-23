"use client";

import AppointmentScheduler from "../../components/booking/AppointmentScheduler";

import { ShieldCheck } from "lucide-react";

export default function SchedulePage() {
    return (
        <main className="min-h-screen bg-slate-50 py-8 px-4 font-sans">
            <div className="container mx-auto max-w-3xl">
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase mb-4 tracking-wide">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Official Customs Process
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                        Identity Verification
                    </h1>
                    <p className="text-slate-600 max-w-lg mx-auto leading-relaxed">
                        Complete your import clearance securely by scheduling a brief video call.
                    </p>
                </div>

                <AppointmentScheduler />
            </div>
            <style jsx global>{`
                footer {
                    display: none !important;
                }
            `}</style>
        </main>
    );
}
