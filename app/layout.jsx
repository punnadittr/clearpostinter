import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Footer from '../components/Footer';

const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-jakarta',
})

export const metadata = {
    metadataBase: new URL('https://clearpost-th.com'),
    title: 'Clearpost | Thailand Customs Broker & Import Specialist',
    description: 'Avoid fines and seized goods. Clearpost provides audit-first logistics for restricted imports: Food (FDA), Medical, Buddha Images, and TISI parts.',
    keywords: ['Thailand Customs Broker', 'Shipping to Bangkok', 'Import License Thailand', 'Clearance Agent Suvarnabhumi', 'FDA Registration Thailand', 'TISI Certification', 'Shipping Buddha Image'],
    openGraph: {
        title: 'Clearpost | Thailand Customs Broker & Import Specialist',
        description: 'Avoid fines and seized goods. Clearpost provides audit-first logistics for restricted imports.',
        url: 'https://clearpost-th.com',
        siteName: 'Clearpost Logistics',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({ children }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CustomsBroker',
        'name': 'Clearpost Logistics',
        'image': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
        '@id': 'https://clearpost-th.com',
        'url': 'https://clearpost-th.com',
        'telephone': '+66800000000',
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': '123 Logistics Park, Klong Luang',
            'addressLocality': 'Pathum Thani',
            'postalCode': '12120',
            'addressCountry': 'TH'
        },
        'priceRange': '$$',
        'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday'
            ],
            'opens': '09:00',
            'closes': '18:00'
        }
    };

    return (
        <html lang="en">
            <body className={jakarta.className}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {children}
                <Footer />
            </body>
        </html>
    )
}
