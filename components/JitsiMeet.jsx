"use client";

import { useEffect, useRef, useState } from "react";

export default function JitsiMeet({ roomName, displayName, onLeave }) {
    const jitsiContainerRef = useRef(null);
    const [jitsiApi, setJitsiApi] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load Jitsi external API script
        const script = document.createElement("script");
        script.src = "https://meet.jit.si/external_api.js";
        script.async = true;
        script.onload = () => {
            setLoading(false);
            initializeJitsi();
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup
            if (jitsiApi) {
                jitsiApi.dispose();
            }
            document.body.removeChild(script);
        };
    }, []);

    const initializeJitsi = () => {
        if (!window.JitsiMeetExternalAPI) return;

        const domain = "meet.jit.si";
        const options = {
            roomName: roomName,
            width: "100%",
            height: "100%",
            parentNode: jitsiContainerRef.current,
            configOverwrite: {
                startWithAudioMuted: false,
                startWithVideoMuted: false,
                prejoinPageEnabled: false,
            },
            interfaceConfigOverwrite: {
                TOOLBAR_BUTTONS: [
                    "microphone",
                    "camera",
                    "closedcaptions",
                    "desktop",
                    "fullscreen",
                    "fodeviceselection",
                    "hangup",
                    "profile",
                    "chat",
                    "recording",
                    "livestreaming",
                    "etherpad",
                    "sharedvideo",
                    "settings",
                    "raisehand",
                    "videoquality",
                    "filmstrip",
                    "invite",
                    "feedback",
                    "stats",
                    "shortcuts",
                    "tileview",
                ],
            },
            userInfo: {
                displayName: displayName,
            },
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);
        setJitsiApi(api);

        api.addEventListeners({
            videoConferenceLeft: () => {
                if (onLeave) onLeave();
            },
            readyToClose: () => {
                if (onLeave) onLeave();
            },
        });
    };

    return (
        <div className="w-full h-full min-h-[500px] relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                    Loading Secure Channel...
                </div>
            )}
            <div ref={jitsiContainerRef} className="w-full h-full" />
        </div>
    );
}
