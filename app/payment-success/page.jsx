import Link from 'next/link';
import { CheckCircle, Home } from 'lucide-react';

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden p-8 text-center animate-fade-in-up">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={48} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Payment Successful!</h1>
                <p className="text-slate-600 mb-8">
                    Thank you. Your deposit of <strong>1,000 THB</strong> has been received. Our customs specialist will review your case and contact you within 24 hours.
                </p>
                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl text-sm text-slate-500 border border-slate-100">
                        <p className="font-bold mb-1">Transaction ID</p>
                        <p className="font-mono text-xs">TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    </div>

                    <Link href="/" className="block w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                        <Home size={20} />
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
