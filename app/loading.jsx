import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-white/80 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center">
            <div className="text-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                </div>
                <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading Clearpost...</p>
            </div>
        </div>
    );
}
