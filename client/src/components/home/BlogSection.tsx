import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="bg-neutral-light rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
          {post.category}
        </span>
        <h3 className="font-heading font-semibold text-lg mt-3 mb-2">{post.title}</h3>
        <p className="text-neutral-dark/80 text-sm mb-4">{post.excerpt}</p>
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
      </div>
    </div>
  );
};

const BlogSection = () => {
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({ 
    queryKey: ['/api/blog'],
    staleTime: 300000, // 5 minutes cache
  });

  return (
    <section className="py-16 bg-white px-4" id="blog">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl mb-4">
            Relationship Insights Blog
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-dark/80">
            Expert advice and research-backed articles on relationships, compatibility, and dating in India.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-light rounded-xl animate-pulse">
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
          <div className="text-center p-8 bg-neutral-light rounded-xl">
            <p className="text-red-500">Failed to load blog posts. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {posts?.slice(0, 3).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/blog" 
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                View All Articles
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-5 h-5 ml-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
