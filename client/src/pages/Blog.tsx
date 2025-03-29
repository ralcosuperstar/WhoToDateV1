import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from 'react-helmet';
import { BlogPost } from "@shared/schema";

const Blog = () => {
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog']
  });

  return (
    <>
      <Helmet>
        <title>Relationship Insights Blog - MyDate</title>
        <meta name="description" content="Expert advice and research-backed articles on relationships, compatibility, and dating in India." />
        <meta property="og:title" content="Relationship Insights Blog - MyDate" />
        <meta property="og:description" content="Expert advice and research-backed articles on relationships, compatibility, and dating in India." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen bg-neutral-light pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">Relationship Insights Blog</h1>
            <p className="max-w-2xl mx-auto text-neutral-dark/80">
              Expert advice and research-backed articles on relationships, compatibility, and dating in India.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm animate-pulse h-96">
                  <div className="w-full h-48 bg-neutral-dark/10"></div>
                  <div className="p-6">
                    <div className="h-4 w-20 bg-neutral-dark/10 rounded-full"></div>
                    <div className="h-6 w-full bg-neutral-dark/10 rounded mt-3 mb-2"></div>
                    <div className="h-4 w-full bg-neutral-dark/10 rounded mb-4"></div>
                    <div className="h-4 w-24 bg-neutral-dark/10 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <p className="text-red-500">Failed to load blog posts. Please try again later.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {posts?.map((post) => {
                // Assign emoji based on category
                let categoryEmoji = "📝"; // default
                if (post.category === "Relationship Psychology") categoryEmoji = "💭";
                if (post.category === "Cultural Insights") categoryEmoji = "🇮🇳";
                if (post.category === "Compatibility Guide") categoryEmoji = "🧩";
                if (post.category === "Relationship Skills") categoryEmoji = "❤️";
                if (post.category === "Modern Dating") categoryEmoji = "📱";
                if (post.category === "Relationship Science") categoryEmoji = "🔬";
                
                return (
                  <div key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">{categoryEmoji}</span>
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      
                      <h2 className="font-heading font-semibold text-xl mb-2">{post.title}</h2>
                      <p className="text-neutral-dark/80 text-sm mb-4">{post.excerpt}</p>
                      
                      <div className="flex justify-between items-center">
                        <Link 
                          href={`/blog/${post.slug}`} 
                          className="text-primary font-medium hover:underline inline-flex items-center"
                        >
                          Read Article
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="w-4 h-4 ml-1"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </Link>
                        <span className="text-xs text-neutral-dark/60">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link href="/" className="text-primary hover:underline inline-flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-4 h-4 mr-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
