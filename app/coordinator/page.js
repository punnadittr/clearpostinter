"use client";

import { useState } from "react";
import { Gavel, ShieldAlert, Plus, Copy, MessageCircle, Link as LinkIcon } from "lucide-react";

export default function CoordinatorPage() {
    const [dailyUrl, setDailyUrl] = useState("");

    // Links for different roles
    const [customerLink, setCustomerLink] = useState("");
    const [lawyerLink, setLawyerLink] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreateSession = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch('/api/daily/room', { method: 'POST' });
            if (!res.ok) throw new Error("Failed to create room");
            const data = await res.json();

            setDailyUrl(data.url);

            // 1. Customer Link (Video Verification Page)
            const cLink = `${window.location.origin}/video-verification?room=${encodeURIComponent(data.url)}`;
            setCustomerLink(cLink);

            // 2. Lawyer Link (Lawyer Meet Page)
            const lLink = `${window.location.origin}/lawyer/meet?room=${encodeURIComponent(data.url)}`;
            setLawyerLink(lLink);

        } catch (err) {
            console.error(err);
            setError("Could not create session. Check API Key.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        alert(`${label} copied to clipboard!`);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                <div className="bg-blue-600 p-8 text-center">
                    <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <LinkIcon className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Coordinator Dashboard</h1>
                    <p className="text-blue-100/90 text-sm italic">Session Dispatch & Link Management</p>
                </div>

                <div className="p-8">
                    {!customerLink ? (
                        <div className="space-y-6">
                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center mb-6">
                                <p className="text-sm text-blue-800">
                                    Create a secure Daily.co room and generate unique invite links for both the client and the lawyer.
                                </p>
                            </div>

                            <button
                                onClick={handleCreateSession}
                                disabled={loading}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xl shadow-blue-600/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <span className="animate-pulse">Creating Secure Room...</span>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5" />
                                        Create New Session
                                    </>
                                )}
                            </button>

                            {error && (
                                <p className="text-sm text-red-500 text-center bg-red-50 p-2 rounded-lg border border-red-100">
                                    {error}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-center">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <ShieldAlert className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="font-bold text-green-800">Session Active</h3>
                                <p className="text-xs text-green-600">Secure room created. Distribute links below.</p>
                            </div>

                            {/* Section 1: Customer Link */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wider">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    1. Link for Customer
                                </label>
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                                    <div className="text-xs break-all text-gray-500 font-mono mb-2">{customerLink}</div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => copyToClipboard(customerLink, "Customer Link")}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            <Copy className="w-4 h-4" />
                                            Copy Link
                                        </button>
                                        <a
                                            href={`https://wa.me/?text=${encodeURIComponent("Join Verification: " + customerLink)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg text-sm font-medium transition-colors"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Lawyer Link */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase tracking-wider">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    2. Link for Lawyer/Admin
                                </label>
                                <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                                    <div className="text-xs break-all text-red-800 font-mono mb-2">{lawyerLink}</div>
                                    <button
                                        onClick={() => copyToClipboard(lawyerLink, "Lawyer Link")}
                                        className="w-full flex items-center justify-center gap-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <Copy className="w-4 h-4" />
                                        Copy Admin Link
                                    </button>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <button
                                onClick={() => {
                                    setCustomerLink("");
                                    setLawyerLink("");
                                    setDailyUrl("");
                                }}
                                className="w-full py-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                Start New Session
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
