"use client";

import { useState, useEffect } from "react";
import JitsiMeet from "../../components/JitsiMeet";
import { CheckCircle, Video, FileCheck, ShieldCheck } from "lucide-react";
import Link from 'next/link';

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
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Verification In Progress</h3>
                                    <p className="text-sm text-gray-600">
                                        Please share this Room ID with the lawyer to connect.
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 bg-gray-50 p-2 pl-4 rounded-lg border border-gray-200 w-full md:w-auto">
                                    <code className="text-lg font-mono font-bold text-red-600 select-all tracking-wide">
                                        {roomName}
                                    </code>
                                    <button
                                        onClick={handleCopyLink}
                                        className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                                    >
                                        Copy ID
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-md inline-block">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Waiting for connection...
                            </div>
                        </div>

                        <div className="h-[600px] relative">
                            <JitsiMeet
                                roomName={roomName}
                                displayName={userName}
                                onLeave={() => setStep("completed")}
                            />
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                            <span className="font-semibold">Note:</span> If you see a message saying <strong>"Waiting for moderator"</strong>, please wait. The session will start automatically when the Lawyer joins and authenticates.
                        </div>
                        <p className="text-center text-xs text-gray-400">
                            End the call using the red button in the video interface to finish.
                        </p>
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
