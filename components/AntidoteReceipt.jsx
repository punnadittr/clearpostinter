import React from 'react';
import { Check, ShieldCheck, FileText, Download } from 'lucide-react';

export default function AntidoteReceipt() {
    return (
        <div className="w-full h-auto py-10 md:h-[600px] md:py-0 bg-transparent relative flex items-center justify-center perspective-[2000px]">

            {/* Main Container - 3D Tilt Effect */}
            <div className="relative group transform transition-all duration-700 hover:rotate-y-6 hover:rotate-x-6 preserve-3d">

                {/* Decorative Elements behind */}
                <div className="absolute top-10 -right-10 w-20 h-20 bg-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-10 -left-10 w-32 h-32 bg-purple-500 rounded-full blur-xl opacity-20 animate-pulse delay-700"></div>

                {/* The Receipt / Document Card */}
                <div className="bg-slate-900 w-full md:max-w-[380px] rounded-3xl shadow-2xl shadow-blue-900/40 overflow-hidden relative z-20">
                    {/* Header */}
                    <div className="bg-slate-900 p-6 flex items-center justify-between text-white border-b border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
                                <FileText size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Document Type</p>
                                <p className="font-bold text-lg">Official Tax Receipt</p>
                            </div>
                        </div>
                        <div className="bg-white/5 p-2 rounded-full cursor-pointer hover:bg-white/10 transition-colors border border-white/10">
                            <Download size={18} className="text-slate-300" />
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-8 space-y-6 bg-white relative">
                        {/* Receipt Texture (Subtle) */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-slate-200/50 to-transparent"></div>

                        {/* Line Items */}
                        <div className="space-y-5">
                            <div className="flex justify-between items-start pb-4 border-b border-slate-100 border-dashed">
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">Import Duty</p>
                                    <p className="text-[11px] text-slate-400 font-medium">HS Code: 9403.50.00</p>
                                </div>
                                <p className="font-mono font-semibold text-slate-700">฿ 2,450.00</p>
                            </div>

                            <div className="flex justify-between items-start pb-4 border-b border-slate-100 border-dashed">
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">VAT (7%)</p>
                                    <p className="text-[11px] text-slate-400 font-medium">Calculated on CIF + Duty</p>
                                </div>
                                <p className="font-mono font-semibold text-slate-700">฿ 4,180.00</p>
                            </div>

                            {/* The "No Hidden Fees" Highlight */}
                            <div className="flex justify-between items-center p-3.5 bg-green-50 rounded-xl border border-green-100/80">
                                <div className="flex items-center gap-2.5">
                                    <div className="bg-green-500 rounded-full p-1 shadow-sm">
                                        <Check size={10} className="text-white" strokeWidth={4} />
                                    </div>
                                    <p className="font-bold text-green-700 text-xs tracking-wide">Hidden Fees</p>
                                </div>
                                <p className="font-mono font-bold text-green-600">฿ 0.00</p>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="pt-2 flex flex-row flex-wrap justify-between items-end gap-2">
                            <p className="text-slate-500 text-xs font-medium mb-1.5">Total Paid to Customs</p>
                            <p className="text-3xl font-bold text-slate-900 tracking-tight">฿ 6,630.<span className="text-lg text-slate-400 font-medium">00</span></p>
                        </div>
                    </div>

                    {/* Verification Footer */}
                    <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                        <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5 font-medium uppercase tracking-wide">
                            <ShieldCheck size={14} className="text-blue-500" />
                            Verified by Clearpost Internal Audit
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
