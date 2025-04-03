import { Link } from "wouter";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-neutral-950 text-white pt-16 pb-8 px-4">
      <div className="container mx-auto">
        {/* Newsletter Section */}
        <div className="max-w-3xl mx-auto mb-16 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/10 shadow-xl">
          <div className="text-center mb-6">
            <h3 className="font-heading font-bold text-2xl mb-2">Get Relationship Insights</h3>
            <p className="text-white/80 max-w-xl mx-auto">
              Join our newsletter for exclusive tips, compatibility insights, and relationship advice.
            </p>
          </div>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 flex-grow focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent placeholder:text-white/40"
              required
            />
            <button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div className="md:pr-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-heading font-bold text-2xl">WhoToDate</span>
            </div>
            
            <p className="text-white/80 mb-6 leading-relaxed">
              Discover your compatibility DNA and find meaningful connections based on personality, values, and emotional intelligence.
            </p>
            
            <div className="flex space-x-5">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="bg-white/10 hover:bg-primary/20 transition-colors w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="bg-white/10 hover:bg-primary/20 transition-colors w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter"
                className="bg-white/10 hover:bg-primary/20 transition-colors w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="bg-white/10 hover:bg-primary/20 transition-colors w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-xl mb-5 text-white relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-primary before:rounded-full">
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/#how-it-works" className="text-white/70 hover:text-primary transition-colors inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#compatibility-science" className="text-white/70 hover:text-primary transition-colors inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  The Science
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="text-white/70 hover:text-primary transition-colors inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-primary transition-colors inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-white/70 hover:text-primary transition-colors inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-xl mb-5 text-white relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-primary before:rounded-full">
              Resources
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/blog/understanding-compatibility-profile" className="text-white/70 hover:text-primary transition-colors inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  Compatibility Guide
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-primary transition-colors inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  Relationship Tips
                </Link>
              </li>
              <li>
                <Link href="/blog/understanding-attachment-styles" className="text-white/70 hover:text-primary transition-colors inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  Understanding Attachment
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-primary transition-colors inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  Personality Types
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-primary transition-colors inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  Emotional Intelligence
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-xl mb-5 text-white relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-1 before:bg-primary before:rounded-full">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-white/10 p-2.5 rounded-lg mr-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white mb-0.5">Email Us</p>
                  <a href="mailto:support@whotodate.com" className="text-white/70 hover:text-primary transition-colors">
                    support@whotodate.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-white/10 p-2.5 rounded-lg mr-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white mb-0.5">Call Us</p>
                  <a href="tel:+919876543210" className="text-white/70 hover:text-primary transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-white/10 p-2.5 rounded-lg mr-3 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white mb-0.5">Visit Us</p>
                  <span className="text-white/70">
                    123 Tech Park, Bengaluru<br/>Karnataka, India - 560001
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Download App Section */}
        <div className="px-6 py-8 rounded-2xl bg-white/5 border border-white/10 mb-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -ml-20 -mb-20 opacity-40"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div>
              <h3 className="text-2xl font-bold font-heading mb-2">Download Our App</h3>
              <p className="text-white/70 max-w-md mb-4">Get real-time compatibility insights and relationship advice on your mobile device.</p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#" 
                  className="bg-black hover:bg-black/90 text-white px-4 py-2.5 rounded-lg flex items-center gap-3 transition-transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837c-.537.767-.978 1.297-1.316 1.592-.525.482-1.089.73-1.692.744-.432 0-.954-.123-1.562-.373-.61-.249-1.17-.371-1.683-.371-.537 0-1.113.122-1.73.371-.616.25-1.114.381-1.495.393-.577.019-1.153-.242-1.725-.784-.368-.32-.83-.878-1.387-1.672-.594-.84-1.086-1.82-1.473-2.94-.419-1.206-.63-2.376-.63-3.51 0-1.299.306-2.416.919-3.349a4.864 4.864 0 0 1 1.73-1.751 4.644 4.644 0 0 1 2.34-.662c.46 0 1.063.142 1.81.422s1.227.422 1.436.422c.158 0 .689-.167 1.593-.498.853-.307 1.573-.434 2.163-.384 1.6.129 2.801.759 3.6 1.895-1.43.867-2.137 2.08-2.123 3.637.012 1.213.453 2.222 1.317 3.023a4.33 4.33 0 0 0 1.315.863c-.106.307-.218.6-.336.882zM15.998 2.38c0 .95-.348 1.838-1.039 2.659-.836.976-1.846 1.541-2.941 1.452a2.955 2.955 0 0 1-.021-.36c0-.913.396-1.889 1.103-2.688.352-.404.8-.741 1.343-1.009.542-.264 1.054-.41 1.536-.435.013.128.019.255.019.381z"/>
                  </svg>
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg font-semibold leading-tight">App Store</div>
                  </div>
                </a>
                <a 
                  href="#" 
                  className="bg-black hover:bg-black/90 text-white px-4 py-2.5 rounded-lg flex items-center gap-3 transition-transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M22.018 13.298c-.233-.621-.546-1.17-.938-1.636.3-.505.525-1.05.676-1.62.156-.6.225-1.215.21-1.836-.06-2.016-.993-3.795-2.647-5.023-.28-.195-.575-.365-.88-.51-.315-.155-.646-.29-.985-.402-.735-.279-1.508-.418-2.292-.418-1.139 0-2.242.25-3.269.723-.554.261-1.076.575-1.559.945-.483.374-.915.795-1.289 1.26-.885 1.085-1.414 2.349-1.465 3.75-.06 1.723.51 3.336 1.602 4.651-.344.299-.645.637-.898 1.01-.705 1.034-1.064 2.254-1.046 3.539.03 2.016 1.02 3.839 2.8 5.154.266.195.55.365.84.51.314.155.644.289.97.402.735.279 1.53.418 2.347.418 1.156 0 2.231-.25 3.21-.72.554-.256 1.063-.566 1.529-.944.466-.373.88-.795 1.244-1.26.9-1.08 1.425-2.34 1.5-3.6.045-.72-.07-1.461-.33-2.189-.255-.735-.645-1.394-1.155-1.965l-.001-.002c.345-.3.63-.645.87-1.021zm-10.053 3.922c1.079 0 1.948-.879 1.948-1.951 0-1.073-.87-1.948-1.948-1.948-1.074 0-1.948.875-1.948 1.948 0 1.072.874 1.951 1.948 1.951zm2.691 1.738c-.495-.205-1.031-.31-1.591-.31-.554 0-1.08.1-1.576.3-.525.218-.985.523-1.365.91-.38.386-.689.84-.915 1.35-.218.494-.329 1.02-.329 1.574 0 1.074.87 1.949 1.948 1.949s1.948-.875 1.948-1.949c0-.466.15-.91.435-1.289.285-.375.675-.63 1.109-.75.06-.015.12-.03.18-.45.435.225.81.531 1.094.93.285.396.436.84.436 1.305 0 1.074.87 1.949 1.948 1.949 1.074 0 1.948-.875 1.948-1.949 0-.555-.105-1.08-.314-1.574-.225-.51-.525-.96-.9-1.35-.375-.391-.854-.691-1.379-.91h.001zm-2.691-8.451c-1.497 0-2.926.585-3.999 1.646-1.058 1.056-1.646 2.463-1.646 3.954 0 .914.22 1.808.637 2.613.436.839 1.042 1.551 1.785 2.115.75.554 1.603.929 2.496 1.125.361.075.734.111 1.107.111.434 0 .87-.045 1.304-.135 1.035-.225 1.963-.684 2.733-1.373.795-.706 1.394-1.574 1.755-2.551.165-.45.255-.929.255-1.411 0-.48-.082-.944-.246-1.394-.149-.418-.356-.804-.617-1.156.265-.345.48-.735.631-1.141.15-.404.226-.824.227-1.243 0-.885-.224-1.73-.66-2.49-.42-.721-.99-1.35-1.693-1.857.705-.841 1.095-1.918 1.095-3.032 0-1.244-.455-2.384-1.26-3.177-.84-.826-1.933-1.261-3.104-1.229-1.186.03-2.249.495-3.009 1.305-.75.795-1.155 1.89-1.14 3.077.015 1.185.465 2.28 1.26 3.062-.869.435-1.618 1.08-2.175 1.875-.556.795-.854 1.726-.854 2.67 0 1.245.45 2.4 1.185 3.33-.45.404-.824.886-1.104 1.425-.3.57-.465 1.2-.465 1.866 0 1.064.315 2.07.9 2.926.569.854 1.365 1.542 2.295 1.983-.48.45-.855.974-1.11 1.561-.239.555-.36 1.154-.36 1.768 0 1.185.435 2.25 1.215 3.061.795.809 1.859 1.26 3 1.26 1.17 0 2.234-.436 3.029-1.229.795-.795 1.235-1.906 1.229-3.107-.015-1.274-.526-2.504-1.425-3.363.87-.45 1.604-1.112 2.145-1.933.524-.802.795-1.737.794-2.679-.076-1.892-1.259-3.525-3.032-4.185zm.12 6.124c-.601.091-1.214.136-1.83.136-.991 0-1.944-.149-2.834-.449-.87-.285-1.634-.674-2.264-1.155-.646-.479-1.169-1.049-1.559-1.694-.386-.645-.615-1.334-.675-2.055-.09-1.064.181-2.189.78-3.225.6-1.035 1.484-1.884 2.549-2.459.345-.195.705-.36 1.077-.495.375-.135.75-.24 1.125-.313.345-.076.699-.136 1.064-.166.3-.024.594-.045.885-.045 1.83 0 3.435.555 4.574 1.591 1.14 1.035 1.785 2.44 1.84 4.005.03.802-.135 1.561-.465 2.295-.315.721-.78 1.351-1.364 1.875l-.001-.001z"/>
                  </svg>
                  <div>
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg font-semibold leading-tight">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="https://placehold.co/240x480/23132F/E5E7EB?text=App+Screenshot" 
                alt="WhoToDate App"
                className="rounded-xl border-4 border-white/10 shadow-xl h-56"
              />
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <p className="text-white/60 text-sm">
                &copy; {new Date().getFullYear()} WhoToDate. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
                <Link href="/sitemap" className="text-white/60 hover:text-white text-sm transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>
            
            <div className="md:ml-6 text-center md:text-right">
              <div className="text-white/60 text-xs mb-1">Made with ❤️ in India</div>
              <div className="text-white/40 text-xs">
                <span className="inline-flex items-center">
                  <img src="https://flagcdn.com/16x12/in.png" alt="Indian Flag" className="mr-1 h-3" />
                  Proudly Indian
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
