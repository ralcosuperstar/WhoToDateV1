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
  const blogPosts = [
    {
      id: 1,
      title: "5 Signs You've Found Your Perfect Match",
      excerpt: "Discover the key indicators that you've found a truly compatible partner for a lasting relationship.",
      category: "Relationship Tips",
      emoji: "❤️",
      date: "Apr 12, 2025"
    },
    {
      id: 2,
      title: "Understanding Attachment Styles in Modern Dating",
      excerpt: "Learn how your attachment style influences your relationship patterns and dating choices.",
      category: "Relationship Psychology",
      emoji: "💭",
      date: "Mar 28, 2025"
    },
    {
      id: 3,
      title: "Navigating Family Expectations in Modern Indian Relationships",
      excerpt: "Balancing personal choice with family values in the modern dating landscape.",
      category: "Cultural Insights",
      emoji: "🇮🇳",
      date: "Mar 15, 2025"
    }
  ];

  return (
    <section className="py-16 px-4 bg-neutral-light">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <div className="inline-block mb-3 py-1.5 px-4 bg-teal-500/10 rounded-full">
              <span className="text-teal-600 font-medium text-sm flex items-center">
                <span className="emoji mr-2">📝</span> Relationship Insights
              </span>
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-2">From Our Blog</h2>
            <p className="text-lg text-neutral-dark/80 max-w-2xl">
              Expert advice and research-backed articles on relationships
            </p>
          </div>

          <a href="/blog" className="mt-6 md:mt-0 inline-flex items-center px-5 py-2.5 bg-white rounded-lg shadow-sm border border-neutral-dark/10 text-primary font-medium hover:bg-neutral-50 transition">
            View All Articles
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 overflow-hidden bg-gradient-to-r from-pink-50 to-purple-50 flex items-center justify-center">
                <span className="text-6xl transition-transform duration-300 hover:scale-110">
                  {post.emoji}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-xs text-neutral-dark/60 ml-auto">
                    {post.date}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-xl mb-2 line-clamp-2">
                  <a href={`/blog/${post.id}`} className="hover:text-primary transition">
                    {post.title}
                  </a>
                </h3>

                <p className="text-neutral-dark/80 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <a href={`/blog/${post.id}`} className="inline-flex items-center text-primary font-medium hover:underline">
                  Read Article
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;