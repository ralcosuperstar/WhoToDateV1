import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { Helmet } from 'react-helmet';
import { BlogPost as BlogPostType } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  
  // Fetch blog post by slug
  const { data: post, isLoading, error } = useQuery<BlogPostType>({
    queryKey: [`/api/blog/${slug}`],
    enabled: !!slug
  });
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // SEO tags
  const pageTitle = post ? `${post.title} - MyDate Blog` : "Loading...";
  const pageDescription = post ? post.excerpt : "Loading article...";
  
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {post && (
          <>
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.excerpt} />
            <meta property="og:type" content="article" />
            <meta property="og:image" content={post.imageUrl} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.title} />
            <meta name="twitter:description" content={post.excerpt} />
            <meta name="twitter:image" content={post.imageUrl} />
            <link rel="canonical" href={`https://mydate.com/blog/${post.slug}`} />
          </>
        )}
      </Helmet>
      
      <div className="min-h-screen bg-neutral-light pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-neutral-dark/10 rounded-lg animate-pulse"></div>
              <div className="h-6 w-1/2 bg-neutral-dark/10 rounded-lg animate-pulse"></div>
              <div className="h-[300px] w-full bg-neutral-dark/10 rounded-lg animate-pulse mt-6"></div>
              <div className="space-y-2 mt-6">
                <div className="h-4 w-full bg-neutral-dark/10 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-neutral-dark/10 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-neutral-dark/10 rounded animate-pulse"></div>
              </div>
            </div>
          ) : error ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <h1 className="font-heading font-bold text-2xl mb-4">Article Not Found</h1>
                <p className="mb-6">We couldn't find the blog post you're looking for.</p>
                <Button asChild>
                  <Link href="/blog">Back to Blog</Link>
                </Button>
              </CardContent>
            </Card>
          ) : post ? (
            <article>
              <header className="mb-8">
                <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
                  {post.category}
                </span>
                <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">{post.title}</h1>
                <p className="text-lg text-neutral-dark/80 mb-4">{post.excerpt}</p>
                <div className="text-sm text-neutral-dark/60">
                  Published on {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </header>
              
              <div className="rounded-xl overflow-hidden mb-8">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
                <div className="prose prose-indigo max-w-none">
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Button variant="outline" asChild>
                  <Link href="/blog">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-4 h-4 mr-2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Blog
                  </Link>
                </Button>
                
                <div className="flex space-x-3">
                  <Button variant="ghost" size="icon" aria-label="Share on Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </Button>
                  
                  <Button variant="ghost" size="icon" aria-label="Share on Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </Button>
                  
                  <Button variant="ghost" size="icon" aria-label="Share via Email">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </Button>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default BlogPost;
