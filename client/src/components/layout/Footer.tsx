import { Link } from "wouter";
import { Heart, Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  
  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      // In a production app, you would call an API to subscribe user
      console.log("Subscribing email:", email);
      setSubscribed(true);
      setEmail("");
      
      // Reset the subscribed state after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };
  return (
    <footer className="bg-gradient-to-b from-[#292352] to-[#1a1a2e] text-white pt-16 pb-8 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30"></div>
      <div className="absolute top-40 right-10 w-40 h-40 rounded-full primary-glow opacity-10"></div>
      <div className="absolute bottom-60 left-10 w-60 h-60 rounded-full secondary-glow opacity-5"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Newsletter & Header Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-3 mb-5 group">
              <div className="h-12 w-12 rounded-full bg-primary/30 flex items-center justify-center shadow-soft transition-all">
                <span className="text-white font-heading font-bold text-2xl">W</span>
              </div>
              <span className="text-white font-heading font-bold text-2xl group-hover:text-primary/90 transition-colors">WhoToDate</span>
            </div>
            
            <p className="text-white/90 text-lg mb-6 max-w-md leading-relaxed">
              Discover your compatibility DNA and find meaningful connections based on personality, values, and emotional intelligence.
            </p>
            
            <div className="flex flex-wrap gap-3 md:gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-all group">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" 
                  className="text-white/80 group-hover:text-primary transition-colors">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-all group">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" 
                  className="text-white/80 group-hover:text-primary transition-colors">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-all group">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" 
                  className="text-white/80 group-hover:text-primary transition-colors">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-all group">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" 
                  className="text-white/80 group-hover:text-primary transition-colors">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <h3 className="font-heading font-semibold text-xl mb-4">Stay Updated</h3>
            <p className="text-white mb-5">Subscribe to our newsletter for relationship tips and compatibility insights.</p>
            
            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 flex-grow"
                required
              />
              <button 
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white font-medium rounded-lg px-6 py-2.5 transition-colors whitespace-nowrap"
              >
                {subscribed ? "Thank you! ✓" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
        
        {/* Links Grid Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-12">
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5 flex items-center">
              <div className="w-1.5 h-6 bg-primary rounded-full mr-2.5"></div>
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/#how-it-works" className="text-white hover:text-primary transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1.5 text-primary" />
                  <span>How It Works</span>
                </Link>
              </li>
              <li>
                <Link href="/#compatibility-science" className="text-white hover:text-primary transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1.5 text-primary" />
                  <span>The Science</span>
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-white hover:text-primary transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1.5 text-primary" />
                  <span>Testimonials</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white hover:text-primary transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1.5 text-primary" />
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-white hover:text-primary transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1.5 text-primary" />
                  <span>Help & Support</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-5 flex items-center">
              <div className="w-1.5 h-6 bg-primary rounded-full mr-2.5"></div>
              Resources
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/blog/understanding-compatibility-profile" className="text-white hover:text-primary transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1.5 text-primary" />
                  <span>Compatibility Guide</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white hover:text-primary transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1.5 text-primary" />
                  <span>Relationship Tips</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/understanding-attachment-styles" className="text-white hover:text-primary transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1.5 text-primary" />
                  <span>Understanding Attachment</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white hover:text-primary transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1.5 text-primary" />
                  <span>Personality Types</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white hover:text-primary transition-colors flex items-center">
                  <ChevronRight className="w-4 h-4 mr-1.5 text-primary" />
                  <span>Emotional Intelligence</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-heading font-semibold text-lg mb-5 flex items-center">
              <div className="w-1.5 h-6 bg-primary rounded-full mr-2.5"></div>
              Latest Articles
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/blog/the-science-of-attachment" className="group">
                  <p className="text-white group-hover:text-primary transition-colors text-sm font-medium mb-1">The Science of Attachment Styles</p>
                  <p className="text-white/80 text-xs">April 2, 2025</p>
                </Link>
              </li>
              <li>
                <Link href="/blog/emotional-intelligence" className="group">
                  <p className="text-white group-hover:text-primary transition-colors text-sm font-medium mb-1">Why Emotional Intelligence Matters in Relationships</p>
                  <p className="text-white/80 text-xs">March 28, 2025</p>
                </Link>
              </li>
              <li>
                <Link href="/blog/personality-compatibility" className="group">
                  <p className="text-white group-hover:text-primary transition-colors text-sm font-medium mb-1">Personality Compatibility: Myths vs. Reality</p>
                  <p className="text-white/80 text-xs">March 15, 2025</p>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-heading font-semibold text-lg mb-5 flex items-center">
              <div className="w-1.5 h-6 bg-primary rounded-full mr-2.5"></div>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-white font-medium mb-0.5">Email</p>
                  <a href="mailto:support@whotodate.com" className="text-white/80 hover:text-primary transition-colors">support@whotodate.com</a>
                </div>
              </li>
              <li className="flex">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-white font-medium mb-0.5">Phone</p>
                  <a href="tel:+919876543210" className="text-white/80 hover:text-primary transition-colors">+91 98765 43210</a>
                </div>
              </li>
              <li className="flex">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-white font-medium mb-0.5">Address</p>
                  <p className="text-white/80">123 Tech Park, Bengaluru<br/>Karnataka, India - 560001</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
              <Heart className="w-4 h-4 text-primary" />
            </div>
            <p className="text-white/80 text-sm">
              &copy; {new Date().getFullYear()} WhoToDate. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/privacy" className="text-white/80 hover:text-primary text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/80 hover:text-primary text-sm transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-white/80 hover:text-primary text-sm transition-colors">Cookie Policy</Link>
            <Link href="/sitemap" className="text-white/80 hover:text-primary text-sm transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
