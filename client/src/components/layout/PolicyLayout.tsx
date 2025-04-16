import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface PolicyLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  lastUpdated: string;
}

const PolicyLayout: React.FC<PolicyLayoutProps> = ({ 
  children, 
  title, 
  description,
  lastUpdated 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <Helmet>
        <title>{title} | WhoToDate</title>
        <meta name="description" content={description} />
      </Helmet>
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="font-medium text-gray-700">{title}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-10 border border-gray-100">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-4 text-gray-800">
            {title}
          </h1>
          
          <p className="text-sm text-gray-500 mb-8">
            Last Updated: {lastUpdated}
          </p>
          
          <div className="prose prose-pink max-w-none prose-headings:font-heading prose-headings:font-semibold prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            {children}
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              If you have any questions about these {title.toLowerCase()}, please contact us at{" "}
              <a href="mailto:hello@whotodate.com" className="text-primary hover:underline">
                hello@whotodate.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;