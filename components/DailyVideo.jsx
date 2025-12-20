"use client";

import { useEffect, useRef, useState } from "react";

export default function DailyVideo({ roomUrl, userName, token, onLeave }) {
    const callWrapperRef = useRef(null);
    const callInstanceRef = useRef(null); // Track instance without re-renders
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!roomUrl) return;

        let mounted = true;

        const startCall = async () => {
            // Double check to prevent strict mode duplicates
            if (callInstanceRef.current) return;

            try {
                console.log("Daily Trace: Importing @daily-co/daily-js...");
                const daily = await import("@daily-co/daily-js");

                if (!mounted) {
                    console.log("Daily Trace: Component unmounted during import, skipping...");
                    return;
                }

                const DailyIframe = daily.default;
                console.log("Daily Trace: Library imported.");

                if (!callWrapperRef.current) return;

                // Clear any existing children to ensure a fresh start
                while (callWrapperRef.current.firstChild) {
                    callWrapperRef.current.removeChild(callWrapperRef.current.firstChild);
                }

                const newCallObject = DailyIframe.createFrame(callWrapperRef.current, {
                    iframeStyle: {
                        width: "100%",
                        height: "100%",
                        border: "0",
                        borderRadius: "12px",
                    },
                    showLeaveButton: true,
                    showFullscreenButton: true,
                });

                callInstanceRef.current = newCallObject;

                newCallObject.on("loaded", () => {
                    console.log("Daily Trace: Frame loaded and interactive");
                    if (mounted) setLoading(false);
                });
                newCallObject.on("joined-meeting", () => {
                    console.log("Daily Trace: Successfully joined meeting");
                    try {
                        newCallObject.setActiveSpeakerMode(false); // Force Grid View
                    } catch (err) {
                        console.warn("Could not set active speaker mode:", err);
                    }
                    if (mounted) setLoading(false);
                });
                newCallObject.on("left-meeting", () => {
                    console.log("Daily Trace: Left meeting");
                    if (mounted) destroyCall();
                    if (onLeave) onLeave();
                });
                newCallObject.on("error", (e) => {
                    console.error("Daily Trace Error:", e);
                    if (mounted) setError(e.errorMsg || "A video connection error occurred. Please try refreshing.");
                });

                console.log("Daily Trace: Joining room:", roomUrl);

                // Join with url and optional userName
                const joinOptions = {
                    url: roomUrl,
                    userName: userName || "Guest User",
                };

                if (token) {
                    joinOptions.token = token;
                }

                await newCallObject.join(joinOptions);
                console.log("Daily Trace: Join command sent");

            } catch (e) {
                console.error("Failed to create Daily call:", e);
                if (mounted) setError("Failed to initialize video call. " + (e.message || e));
            }
        };

        const destroyCall = () => {
            if (callInstanceRef.current) {
                try {
                    console.log("Daily Trace: Destroying instance");
                    callInstanceRef.current.destroy();
                } catch (err) {
                    console.warn("Error destroying Daily object:", err);
                }
                callInstanceRef.current = null;
            }

            // Final cleanup of the DOM node
            if (callWrapperRef.current) {
                while (callWrapperRef.current.firstChild) {
                    callWrapperRef.current.removeChild(callWrapperRef.current.firstChild);
                }
            }
        };

        startCall();

        return () => {
            mounted = false;
            destroyCall();
        };
    }, [roomUrl, userName]);

    return (
        <div className="w-full h-full relative bg-gray-900 overflow-hidden shadow-2xl border border-gray-800">
            {error && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900 text-white p-6 text-center">
                    <div>
                        <p className="text-red-500 font-bold mb-2">Connection Error</p>
                        <p className="text-sm text-gray-400">{error}</p>
                    </div>
                </div>
            )}
            {loading && !error && (
                <div className="absolute inset-0 z-40 flex items-center justify-center bg-gray-900 text-white">
                    <div className="animate-pulse">Loading Secure Channel...</div>
                </div>
            )}
            <div ref={callWrapperRef} className="w-full h-full" />
        </div>
    );
}
