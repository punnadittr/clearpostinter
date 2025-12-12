import Link from 'next/link';
import Image from 'next/image';
import { createClient } from 'contentful';

/**
 * Fetch data from Contentful Headless CMS
 */
async function getPostsFromCMS() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId || !accessToken) {
    console.warn("⚠️ Contentful credentials missing. Falling back to mock data.");
    return getMockData();
  }

  const client = createClient({
    space: spaceId,
    accessToken: accessToken,
  });

  try {
    // 1. Fetch Entries using the CORRECT Content Type ID: 'blog'
    const res = await client.getEntries({
      content_type: 'blog', 
      order: '-sys.createdAt'
    });

    // 2. Map Data (Strictly based on your provided Schema)
    return res.items.map((item) => {
      const { title, content } = item.fields;
      
      // Extract a simple excerpt from Rich Text (Content)
      // We grab the first paragraph's value if available
      let excerpt = "Click to read more...";
      if (content?.content) {
        const firstParagraph = content.content.find(node => node.nodeType === 'paragraph');
        if (firstParagraph?.content?.[0]?.value) {
            excerpt = firstParagraph.content[0].value.substring(0, 100) + "...";
        }
      }

      return {
        id: item.sys.id,
        title: title || 'Untitled Post',
        excerpt: excerpt,
        // Schema doesn't have category, defaulting to 'Blog'
        category: 'Blog', 
        // Schema doesn't have a date field, using system creation time
        date: new Date(item.sys.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        readTime: '3 min read', // Placeholder
        // Schema has NO slug, so we MUST use sys.id for the link
        slug: item.sys.id, 
        // Schema has NO image, using a default placeholder
        imageUrl: 'https://placehold.co/600x400/2563eb/ffffff?text=Clear+Post+Blog'
      };
    });

  } catch (error) {
    console.error("❌ Error fetching from Contentful:", error);
    if (error.details) {
      console.error("Details:", JSON.stringify(error.details, null, 2));
    }
    return getMockData();
  }
}

/**
 * Fallback Mock Data
 */
function getMockData() {
  return [
    {
      id: 1,
      title: "5 Tips for Safe International Shipping Packing",
      excerpt: "Shipping internationally comes with risks of damage. Learn how to pack securely...",
      category: "Tips & Tricks",
      date: "12 Dec 2025",
      readTime: "5 min read",
      slug: "mock-1",
      imageUrl: "https://placehold.co/600x400/2563eb/ffffff?text=Packing+Tips"
    },
    {
      id: 2,
      title: "Import Tax Update 2025",
      excerpt: "Latest changes in European and US import tax regulations...",
      category: "Regulations",
      date: "10 Dec 2025",
      readTime: "8 min read",
      slug: "mock-2",
      imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Tax+Update"
    }
  ];
}

export const metadata = {
  title: "Resources & Blog | Clear Post International",
};

export default async function ResourcesPage() {
  const posts = await getPostsFromCMS();
  
  if (!posts || posts.length === 0) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">No articles found.</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <nav className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link href="/" className="font-bold text-xl text-blue-900 flex items-center gap-2">
                <Image src="/logo-icon.png" alt="Logo" width={32} height={32} />
                Clear Post Inter
            </Link>
            <Link href="/" className="text-sm text-gray-600 hover:text-blue-600">
                &larr; Back to Home
            </Link>
        </div>
      </nav>

      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Knowledge Hub</h1>
          <p className="text-gray-600">Latest updates from Clear Post International</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover"/>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/resources/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="pt-4 border-t border-gray-50 mt-auto">
                    <Link href={`/resources/${post.slug}`} className="text-blue-600 font-medium hover:underline">
                        Read More
                    </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}