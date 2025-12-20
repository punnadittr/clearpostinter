"use client";

import { useState } from "react";
import DailyVideo from "../../../components/DailyVideo";
import { Gavel, ShieldAlert, Video, Plus, Link as LinkIcon, Copy } from "lucide-react";

export default function LawyerMeetPage() {
    const [activeCall, setActiveCall] = useState(false);
    const [dailyUrl, setDailyUrl] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
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
            // Construct the customer-facing link with the room parameter
            const customerUrl = `${window.location.origin}/video-verification?room=${encodeURIComponent(data.url)}`;
            setGeneratedLink(customerUrl);
        } catch (err) {
            console.error(err);
            setError("Could not create session. Check API Key.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        alert("Client link copied to clipboard!");
    };

    const handleJoin = (e) => {
        e.preventDefault();
        if (dailyUrl.trim()) {
            setActiveCall(true);
        }
    };

    if (activeCall) {
        return (
            <div className="fixed inset-0 z-[100] bg-gray-900 flex flex-col overscroll-none overflow-hidden">
                <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-lg z-10">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-600 p-2 rounded-lg">
                            <Gavel className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900 leading-tight">Video Verification Portal</h1>
                            <p className="text-xs text-gray-500">Secure Channel Active: {dailyUrl ? new URL(dailyUrl).pathname.split('/').pop() : '...'}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setActiveCall(false)}
                        className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        End Session
                    </button>
                </div>

                <div className="flex-1 relative bg-black">
                    <DailyVideo
                        roomUrl={dailyUrl}
                        onLeave={() => setActiveCall(false)}
                    />

                    {/* Overlay hint for the lawyer */}
                    <div className="absolute bottom-6 left-6 z-20 bg-black/80 text-white p-4 rounded-xl max-w-sm backdrop-blur-md border border-white/10 shadow-2xl pointer-events-none">
                        <div className="flex items-start gap-3">
                            <ShieldAlert className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-bold text-yellow-500 mb-1">Admin Controls</p>
                                <p className="text-xs text-gray-300">
                                    You are joining via the Daily.co secure frame. If you have "Knocking" enabled, admit the customer from inside the video interface.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                <div className="bg-red-600 p-8 text-center">
                    <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <Gavel className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Legal Team Portal</h1>
                    <p className="text-red-100/90 text-sm italic">Daily.co Secure Channel Ready</p>
                </div>

                <div className="p-8">
                    {!generatedLink ? (
                        <div className="space-y-6">
                            <button
                                onClick={handleCreateSession}
                                disabled={loading}
                                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-xl shadow-red-600/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <span className="animate-pulse">Creating Secure Room...</span>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5" />
                                        Create New Client Session
                                    </>
                                )}
                            </button>

                            {error && (
                                <p className="text-sm text-red-500 text-center bg-red-50 p-2 rounded-lg border border-red-100">
                                    {error}
                                </p>
                            )}

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or use existing room</span>
                                </div>
                            </div>

                            <form onSubmit={handleJoin} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                                        Manual Room URL
                                    </label>
                                    <input
                                        type="text"
                                        value={dailyUrl}
                                        onChange={(e) => setDailyUrl(e.target.value)}
                                        placeholder="https://clearpost.daily.co/..."
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all placeholder:text-gray-300 bg-gray-50 text-sm"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!dailyUrl}
                                    className="w-full py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
                                >
                                    <Video className="w-4 h-4" />
                                    Join Manually
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-center">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <ShieldAlert className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="font-bold text-green-800">Secure Room Created</h3>
                                <p className="text-xs text-green-600">The room will expire in 1 hour.</p>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                                    Send this link to client
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        readOnly
                                        value={generatedLink}
                                        className="flex-1 bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg px-3 py-2 outline-none select-all"
                                    />
                                    <button
                                        onClick={copyToClipboard}
                                        className="bg-gray-900 text-white p-2 rounded-lg hover:bg-black transition-colors"
                                        title="Copy Link"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => setActiveCall(true)}
                                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-xl shadow-red-600/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <Video className="w-5 h-5" />
                                Enter Room Now
                            </button>

                            <button
                                onClick={() => {
                                    setGeneratedLink("");
                                    setDailyUrl("");
                                }}
                                className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                Start Over
                            </button>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-400 font-medium tracking-wider uppercase">
                            Restricted Access • Clearpost Internal
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
