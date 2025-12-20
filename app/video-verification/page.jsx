"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Video, FileCheck, ShieldCheck } from "lucide-react";
import Link from 'next/link';
import DailyVideo from "../../components/DailyVideo";

export default function VideoVerificationPage() {
    const [step, setStep] = useState("intro"); // intro, call, completed
    const [roomName, setRoomName] = useState("");
    const [userName, setUserName] = useState("");

    const generateRoom = () => {
        // Generate a reasonably unique room name
        const uniqueId = Math.random().toString(36).substring(7);
        const date = new Date().toISOString().split("T")[0];
        const room = `Clearpost-Verification-${date}-${uniqueId}`;
        setRoomName(room);
        setStep("call");
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(roomName);
        alert("Room ID copied! Send this to the lawyer.");
    };

    return (
        <main className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Passport Verification
                    </h1>
                    <p className="text-gray-600">
                        Secure video link with our legal compliance team
                    </p>
                </div>

                {step === "intro" && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-100">
                        <div className="flex justify-center mb-8">
                            <div className="bg-red-50 p-4 rounded-full">
                                <ShieldCheck className="w-16 h-16 text-red-600" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            How it works
                        </h2>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-2 rounded-lg">
                                    <Video className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">1. Start Video Call</h3>
                                    <p className="text-gray-600 text-sm">
                                        Connect directly with a licensed lawyer using our secure video channel.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-green-50 p-2 rounded-lg">
                                    <FileCheck className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">2. Verify Documents</h3>
                                    <p className="text-gray-600 text-sm">
                                        Show your original passport. The lawyer will verify it against your submitted copies.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-purple-50 p-2 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">3. Receive Certification</h3>
                                    <p className="text-gray-600 text-sm">
                                        Once verified, the lawyer issues the certified true copy instantly.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Name (as needed for the call)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Somchai Jai-dee"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>

                            <button
                                onClick={generateRoom}
                                disabled={!userName.trim()}
                                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
                            >
                                Connect with Lawyer
                            </button>
                        </div>
                    </div>
                )}

                {step === "call" && (
                    <div className="space-y-6">
                        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Connecting to Secure Channel...</h3>
                             <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-lg flex gap-3">
                                 <Video className="w-5 h-5 flex-shrink-0" />
                                 <p>You are entering the verification lobby. Please wait for the lawyer to admit you.</p>
                             </div>
                        </div>

                        <div className="h-[500px] md:h-[600px] relative">
                            <DailyVideo
                                roomUrl="https://clearpost.daily.co/lhgk1o3U8JOUjLQWfpc9" 
                                onLeave={() => setStep("completed")}
                            />
                        </div>
                    </div>
                )}

                {step === "completed" && (
                    <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-auto text-center border border-gray-100">
                        <div className="flex justify-center mb-6">
                            <div className="bg-green-100 p-6 rounded-full">
                                <CheckCircle className="w-20 h-20 text-green-600" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Verification Session Ended
                        </h2>
                        <p className="text-gray-600 text-lg mb-8">
                            Thank you. If the lawyer successfully verified your documents, you will receive the certified copies via email shortly.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Start New Call
                            </button>
                            <Link
                                href="/"
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Return Home
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </main >
    );
}
