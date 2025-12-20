"use client";

import { useState } from "react";
import DailyVideo from "../../../components/DailyVideo";
import { Gavel, ShieldAlert, Video } from "lucide-react";

export default function LawyerMeetPage() {
    const [activeCall, setActiveCall] = useState(false);
    const [dailyUrl, setDailyUrl] = useState("https://clearpost.daily.co/lhgk1o3U8JOUjLQWfpc9"); // Default user room URL

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
                            <p className="text-xs text-gray-500">Secure Channel Active</p>
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
                    <form onSubmit={handleJoin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Daily Room URL
                            </label>
                            <div className="relative">
                                <Video className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={dailyUrl}
                                    onChange={(e) => setDailyUrl(e.target.value)}
                                    placeholder="https://your-domain.daily.co/room"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-gray-400 bg-gray-50/50"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold shadow-xl shadow-gray-900/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <Video className="w-5 h-5" />
                            Enter Secure Room
                        </button>
                    </form>

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
