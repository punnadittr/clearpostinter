'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { AlertOctagon, RefreshCcw } from 'lucide-react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full text-center">

                <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                    <AlertOctagon size={40} />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong!</h2>
                <p className="text-slate-500 mb-8">
                    We encountered an unexpected error. Our team has been notified.
                </p>

                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                    <RefreshCcw size={18} />
                    Try again
                </button>
            </div>
        </div>
    )
}
