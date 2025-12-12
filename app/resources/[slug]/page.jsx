import Link from 'next/link';
import { createClient } from 'contentful';
import { notFound } from 'next/navigation';

/**
 * Fetch a single post by ID
 */
async function getPostById(id) {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (spaceId && accessToken) {
    try {
      const client = createClient({ space: spaceId, accessToken: accessToken });
      const item = await client.getEntry(id);
      const { title, content } = item.fields;
      
      let contentHtml = "";
      // Simple fallback for Rich Text
      if (content && content.nodeType === 'document') {
           contentHtml = content.content.map(node => {
             if(node.nodeType === 'paragraph') {
               return `<p>${node.content.map(c => c.value).join('')}</p>`;
             }
             if(node.nodeType.startsWith('heading-')) {
               const level = node.nodeType.split('-')[1];
               return `<h${level}>${node.content.map(c => c.value).join('')}</h${level}>`;
             }
             return '';
           }).join('');
      } else {
           contentHtml = "<p>Content is not in expected Rich Text format.</p>";
      }

      return {
        id: item.sys.id,
        title,
        content: contentHtml,
        category: 'Blog',
        date: new Date(item.sys.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        imageUrl: 'https://placehold.co/800x600/e2e8f0/64748b?text=Clearpost+Blog'
      };
    } catch (error) {
      console.warn(`⚠️ Contentful Entry not found for ID: ${id}.`);
      return null;
    }
  }
  return null;
}

export default async function ResourceDetailPage({ params }) {
  let post = await getPostById(params.slug);

  // Fallback for Mocks
  if (!post) {
    if (params.slug === 'mock-1') {
      post = {
        title: "5 Tips for Safe International Shipping Packing",
        content: "<p>This is a MOCK post content. Connect to Contentful to see real data.</p>",
        category: "Tips & Tricks",
        date: "12 Dec 2025",
        imageUrl: "https://placehold.co/600x400/2563eb/ffffff?text=Packing+Tips"
      };
    } else if (params.slug === 'mock-2') {
      post = {
        title: "Import Tax Update 2025",
        content: "<p>This is a MOCK post content. Connect to Contentful to see real data.</p>",
        category: "Regulations",
        date: "10 Dec 2025",
        imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Tax+Update"
      };
    } else {
      notFound();
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-600">
       
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

            <Link href="/resources" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1">
                &larr; Back to Resources
            </Link>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10 text-center">
          <div className="flex justify-center mb-4">
             <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wide">
                {post.category}
             </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center text-slate-400 text-sm gap-4 font-medium">
             <span>{post.date}</span>
          </div>
        </header>

        <div className="relative w-full h-64 md:h-96 mb-12 rounded-2xl overflow-hidden shadow-lg">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div 
          className="prose prose-lg prose-blue mx-auto text-slate-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

    
    </div>
  );
}