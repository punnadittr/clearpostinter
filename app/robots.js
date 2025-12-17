export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clearpostinter.netlify.app';
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
