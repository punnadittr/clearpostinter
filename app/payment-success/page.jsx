import Link from 'next/link';

export default function PaymentDisabledPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden p-8 text-center animate-fade-in-up">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Payments Disabled</h1>
                <p className="text-slate-600 mb-8">This site currently does not process online payments. Please contact us to arrange payment or invoicing.</p>
                <Link href="/" className="block w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    Return to Home
                </Link>
            </div>
        </div>
    );
}
