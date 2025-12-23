export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thailandcustomsclearance.com';
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
