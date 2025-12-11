import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

export const metadata = {
    title: 'Clearpost - Thailand Import Specialist',
    description: 'Audit-first logistics. We fix your paperwork before shipping.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
