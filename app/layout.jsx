import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Footer from '../components/Footer';

const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-jakarta',
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clearpost.co.th';

export const metadata = {
    metadataBase: new URL(baseUrl),
    title: 'Clearpost | Thailand Customs Broker & Import Specialist',
    description: 'Avoid fines and seized goods. Clearpost provides audit-first logistics for restricted imports: Food (FDA), Medical, Buddha Images, and TISI parts.',
    keywords: ['Thailand Customs Broker', 'Shipping to Bangkok', 'Import License Thailand', 'Clearance Agent Suvarnabhumi', 'FDA Registration Thailand', 'TISI Certification', 'Shipping Buddha Image'],
    openGraph: {
        title: 'Clearpost | Thailand Customs Broker & Import Specialist',
        description: 'Avoid fines and seized goods. Clearpost provides audit-first logistics for restricted imports.',
        url: baseUrl,
        siteName: 'Clearpost Co., Ltd.',
        images: [
            {
                url: '/opengraph-image.png',
                width: 1200,
                height: 630,
                alt: 'Clearpost Co., Ltd. - Official Customs Broker',
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
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clearpost.co.th';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CustomsBroker',
        'name': 'Clearpost Co., Ltd.',
        'image': `${baseUrl}/opengraph-image.png`,
        '@id': baseUrl,
        'url': baseUrl,
        'telephone': '+66800000000',
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': '1222/310 Liab Klong Rangsit Road, Prachathipat',
            'addressLocality': 'Thanyaburi, Pathum Thani',
            'postalCode': '12130',
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
