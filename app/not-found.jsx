import Link from 'next/link'
import { AlertTriangle, Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-700 shadow-2xl max-w-lg w-full text-center relative overflow-hidden">

                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>

                <div className="relative z-10">
                    <div className="bg-slate-900/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-700">
                        <AlertTriangle className="text-yellow-500 w-12 h-12" />
                    </div>

                    <h2 className="text-5xl font-bold text-white mb-4">404</h2>
                    <p className="text-xl text-slate-300 mb-8">Oops! This shipment seems to be missing.</p>
                    <p className="text-slate-400 mb-10 leading-relaxed">
                        The page you are looking for has been moved, deleted, or possibly held by customs (just kidding).
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1"
                    >
                        <Home size={20} />
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
