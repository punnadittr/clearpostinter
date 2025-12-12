import Link from 'next/link';
import Image from 'next/image';
import { createClient } from 'contentful';
import { notFound } from 'next/navigation';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

/**
 * Fetch a single post by ID (since we don't have a slug field)
 */
async function getPostById(id) {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (spaceId && accessToken) {
    try {
      const client = createClient({ space: spaceId, accessToken: accessToken });
      
      // Fetch directly by ID because your schema has no 'slug' field to query against
      const item = await client.getEntry(id);

      const { title, content } = item.fields;
      
      // Render Rich Text
      let contentHtml = "";
      if (content && content.nodeType === 'document') {
           // If you have installed @contentful/rich-text-html-renderer
           contentHtml = documentToHtmlString(content);
      } else {
           contentHtml = "<p>Content is not in expected Rich Text format.</p>";
      }

      return {
        id: item.sys.id,
        title,
        content: contentHtml,
        category: 'Blog',
        date: new Date(item.sys.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        imageUrl: 'https://placehold.co/800x600/e2e8f0/64748b?text=Clear+Post+Blog'
      };
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }
  
  // Fallback for mocks
  return null;
}

export default async function ResourceDetailPage({ params }) {
  // We treat 'params.slug' as the ID
  const post = await getPostById(params.slug);

  if (!post) {
    // If not found in Contentful, check if it's a mock ID
    if(params.slug === 'mock-1' || params.slug === 'mock-2') {
         // Return simple mock view for testing
         return <div className="p-10 text-center">This is a mock post. Connect Contentful for real data.</div>
    }
    notFound();
  }

  return (
    <div className="min-h-screen bg-white font-sans">
       <nav className="bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link href="/" className="font-bold text-xl text-blue-900 flex items-center gap-2">
                <Image src="/logo-icon.png" alt="Logo" width={32} height={32} />
                Clear Post Inter
            </Link>
            <Link href="/resources" className="text-sm font-medium text-gray-600 hover:text-blue-600 flex items-center gap-1">
                &larr; Back to Resources
            </Link>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center text-gray-500 text-sm gap-4">
             <span>{post.date}</span>
          </div>
        </header>

        <div className="relative w-full h-64 md:h-96 mb-12 rounded-2xl overflow-hidden shadow-lg">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div 
          className="prose prose-lg prose-blue mx-auto text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}