import React from 'react';
import { Check, ShieldCheck, FileText, Download } from 'lucide-react';

export default function TransparencyIllustration() {
    return (
        <div className="w-full h-[600px] bg-transparent relative flex items-center justify-center perspective-[2000px]">



            {/* Main Container - 3D Tilt Effect */}
            <div className="relative group transform transition-all duration-700 hover:rotate-y-6 hover:rotate-x-6 preserve-3d">

                {/* The Receipt / Document Card */}
                <div className="bg-white w-[380px] rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative z-20">
                    {/* Header */}
                    <div className="bg-slate-900 p-6 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <FileText size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wider">Document Type</p>
                                <p className="font-bold">Official Tax Receipt</p>
                            </div>
                        </div>
                        <div className="bg-white/10 p-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors">
                            <Download size={18} />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-8 space-y-6">

                        {/* Line Items */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                <div>
                                    <p className="font-bold text-slate-800">Import Duty</p>
                                    <p className="text-xs text-slate-400">HS Code: 9403.50.00</p>
                                </div>
                                <p className="font-mono font-medium text-slate-600">฿ 2,450.00</p>
                            </div>

                            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                <div>
                                    <p className="font-bold text-slate-800">VAT (7%)</p>
                                    <p className="text-xs text-slate-400">Calculated on CIF + Duty</p>
                                </div>
                                <p className="font-mono font-medium text-slate-600">฿ 4,180.00</p>
                            </div>


                            {/* The "No Hidden Fees" Highlight */}
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex items-center gap-2">
                                    <div className="bg-green-500 rounded-full p-1">
                                        <Check size={12} className="text-white" strokeWidth={3} />
                                    </div>
                                    <p className="font-bold text-green-700 text-sm">Hidden Fees</p>
                                </div>
                                <p className="font-mono font-bold text-green-700">฿ 0.00</p>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="pt-2 flex justify-between items-end">
                            <p className="text-slate-500 text-sm">Total Paid to Customs</p>
                            <p className="text-3xl font-bold text-slate-900">฿ 6,630.<span className="text-lg text-slate-400">00</span></p>
                        </div>
                    </div>

                    {/* Verification Footer */}
                    <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                        <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
                            <ShieldCheck size={14} className="text-blue-500" />
                            Verified by Clearpost Internal Audit
                        </p>
                    </div>
                </div>



            </div>
        </div>
    );
}
