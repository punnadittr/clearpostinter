import { createClient } from 'contentful';

async function getBlogPosts() {
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

    if (!spaceId || !accessToken) {
        return [];
    }

    try {
        const client = createClient({
            space: spaceId,
            accessToken: accessToken,
        });

        const res = await client.getEntries({
            content_type: 'blog',
        });

        return res.items.map((item) => ({
            url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://clearpostinter.netlify.app'}/resources/${item.sys.id}`,
            lastModified: new Date(item.sys.updatedAt),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));
    } catch (error) {
        console.warn("Sitemap: Could not fetch posts", error);
        return [];
    }
}

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clearpostinter.netlify.app';
    const blogPosts = await getBlogPosts();

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/resources`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...blogPosts,
    ]
}
