import Link from 'next/link';

export default function PayDisabledPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-600">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Payments Are Disabled</h1>
        <p className="mb-6 text-slate-600">Online payments are currently disabled on this site. Please contact us to arrange invoicing or alternative payment methods.</p>
        <Link href="/" className="inline-block px-6 py-3 bg-slate-900 text-white rounded-xl font-bold">Return Home</Link>
      </div>
    </div>
  );
}
