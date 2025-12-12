import Link from 'next/link';
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

    // 2. Map Data
    return res.items.map((item) => {
      const { title, content } = item.fields;
      
      // Extract excerpt from Rich Text
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
        category: 'Blog', 
        date: new Date(item.sys.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        readTime: '3 min read',
        slug: item.sys.id, // Using sys.id as the slug
        imageUrl: 'https://placehold.co/600x400/2563eb/ffffff?text=Clearpost+Blog'
      };
    });

  } catch (error) {
    console.error("❌ Error fetching from Contentful:", error);
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
  title: "Resources & Blog | Clearpost",
  description: "Collection of articles, tips, and news about international shipping.",
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
    <div className="min-h-screen bg-gray-50 font-sans text-slate-600">
      
      {/* --- Updated Navbar to Match Landing Page --- */}
      <nav className="bg-white border-b border-gray-100 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            {/* Branding */}
            <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                    <img src="/logo-icon.png" alt="CP" className="w-6 h-6 object-contain" />
                </div>
                <span className="font-bold text-2xl text-slate-900 tracking-tight">Clearpost<span className="text-blue-500">.</span></span>
            </Link>

            {/* Back Link */}
            <Link href="/" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1">
                &larr; Back to Home
            </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Knowledge Hub</h1>
          <p className="text-slate-500 text-lg">Latest updates from Clearpost International</p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wide">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link href={`/resources/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="pt-4 border-t border-slate-50 mt-auto">
                    <Link href={`/resources/${post.slug}`} className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
                        Read Article &rarr;
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