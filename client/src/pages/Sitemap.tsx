import React from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { ChevronRight } from "lucide-react";

const Sitemap: React.FC = () => {
  // Links structure by category
  const linkCategories = [
    {
      title: "Main Pages",
      links: [
        { url: "/", label: "Home" },
        { url: "/how-it-works", label: "How It Works" },
        { url: "/science", label: "The Science" },
        { url: "/counselling", label: "Counselling" },
        { url: "/auth", label: "Login / Register" },
        { url: "/about", label: "About Us" },
        { url: "/contact", label: "Contact Us" },
      ]
    },
    {
      title: "Quiz & Assessments",
      links: [
        { url: "/quiz", label: "Compatibility Quiz" },
        { url: "/personality-types", label: "Personality Types" },
        { url: "/relationship-patterns", label: "Relationship Patterns" },
      ]
    },
    {
      title: "User Dashboard",
      links: [
        { url: "/dashboard", label: "Dashboard" },
        { url: "/dashboard/profile", label: "My Profile" },
        { url: "/dashboard/reports", label: "My Reports" },
        { url: "/dashboard/sessions", label: "Counseling Sessions" },
        { url: "/dashboard/settings", label: "Account Settings" },
      ]
    },
    {
      title: "Blog Categories",
      links: [
        { url: "/blog", label: "All Articles" },
        { url: "/blog/category/compatibility", label: "Compatibility" },
        { url: "/blog/category/relationships", label: "Relationships" },
        { url: "/blog/category/psychology", label: "Psychology" },
        { url: "/blog/category/dating-tips", label: "Dating Tips" },
      ]
    },
    {
      title: "Legal & Policies",
      links: [
        { url: "/privacy", label: "Privacy Policy" },
        { url: "/terms", label: "Terms of Service" },
        { url: "/cookies", label: "Cookie Policy" },
        { url: "/refund-policy", label: "Refund Policy" },
      ]
    },
    {
      title: "Support",
      links: [
        { url: "/help", label: "Help Center" },
        { url: "/faq", label: "Frequently Asked Questions" },
        { url: "/contact", label: "Contact Support" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <Helmet>
        <title>Sitemap | WhoToDate</title>
        <meta name="description" content="Explore all pages and sections of WhoToDate - Your platform for relationship intelligence and compatibility insights." />
      </Helmet>
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="font-medium text-gray-700">Sitemap</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-10 border border-gray-100">
          <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-8 text-gray-800">
            Sitemap
          </h1>
          
          <p className="text-gray-600 mb-10">
            Welcome to the WhoToDate sitemap. Use this page to navigate to any section of our website. If you can't find what you're looking for, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
            {linkCategories.map((category, index) => (
              <div key={index} className="space-y-3">
                <h2 className="font-heading font-semibold text-lg text-gray-800 border-b border-gray-200 pb-2">
                  {category.title}
                </h2>
                <ul className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="text-gray-600 hover:text-primary transition-colors">
                      <Link href={link.url} className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-16 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              Can't find what you're looking for? <Link href="/contact" className="text-primary hover:underline">Contact our support team</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;