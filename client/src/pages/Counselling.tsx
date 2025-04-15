import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { 
  Heart, 
  Brain, 
  ChevronRight, 
  Star, 
  Clock, 
  Calendar, 
  MessageCircle, 
  Headphones, 
  Stethoscope, 
  Globe, 
  Tags,
  BadgeCheck,
  Filter,
  ChevronDown,
  Search,
  Info,
  HelpCircle,
  Plus,
  Minus,
  CircleCheck,
  Users,
  MapPin,
  Video,
  Phone,
  ExternalLink,
  ChevronDown as ChevronDownIcon
} from "lucide-react";

// Import Aanchal's image
import aanchalImage from '../assets/Aanchal.jpg';

// Interface for Counselor data
interface Counselor {
  id: number;
  name: string;
  type: "Psychologist" | "Doctor Listener";
  qualification: string;
  duration: string;
  languages: string[];
  price: number;
  specializations: string[];
  availability: string;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  dob?: string;
  experience?: number;
  location?: string;
  modes?: string[];
  whatsappNumber?: string;
  shortBio?: string;
  fullBio?: string;
  featured?: boolean;
}

// Function to calculate age based on DOB
const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Sample data for counselors
const counselors: Counselor[] = [
  {
    id: 1,
    name: "Aanchal Malani",
    type: "Psychologist",
    qualification: "MA in Counseling Psychology",
    duration: "45-60 mins",
    languages: ["English", "Hindi", "Marathi"],
    price: 1000,
    specializations: ["Relationship Issues", "Emotional Well-being", "Personal Growth"],
    availability: "Available Today",
    rating: 4.9,
    reviewCount: 87,
    imageUrl: aanchalImage,
    dob: "2001-09-21", // Format: YYYY-MM-DD
    experience: 1,
    location: "Amravati, Maharashtra",
    modes: ["Google Meet", "Audio Call"],
    whatsappNumber: "+918482901234",
    shortBio: "Certified counseling psychologist specializing in relationships and emotional well-being. Also a trained hypnotherapist and graphologist.",
    fullBio: "I am a counseling psychologist and psychotherapist with certification in hypnotherapy and graphology. My approach focuses on helping individuals navigate current life challenges, heal emotional wounds, and work toward personal growth goals. I create a warm, compassionate environment where clients feel safe to explore their concerns, using evidence-based therapeutic techniques tailored to each person's unique needs.",
    featured: true
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    type: "Psychologist",
    qualification: "MA Psychology, Certified Therapist",
    duration: "45-60 mins",
    languages: ["English", "Hindi"],
    price: 1200,
    specializations: ["Anxiety", "Depression", "Relationship Issues"],
    availability: "Available Today",
    rating: 4.8,
    reviewCount: 124,
    imageUrl: "https://randomuser.me/api/portraits/women/64.jpg"
  },
  {
    id: 3,
    name: "Dr. Amit Patel",
    type: "Doctor Listener",
    qualification: "MBBS, Mental Health Specialist",
    duration: "15-20 mins",
    languages: ["English", "Gujarati", "Hindi"],
    price: 400,
    specializations: ["Stress Management", "Family Issues", "Work-Life Balance"],
    availability: "Available Tomorrow",
    rating: 4.5,
    reviewCount: 98,
    imageUrl: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    id: 4,
    name: "Meera Desai",
    type: "Psychologist",
    qualification: "M.Phil Clinical Psychology",
    duration: "50-60 mins",
    languages: ["English", "Marathi", "Hindi"],
    price: 1500,
    specializations: ["Breakups", "Self-Esteem", "Personal Growth"],
    availability: "Next Available: Thu, 5 PM",
    rating: 4.9,
    reviewCount: 156,
    imageUrl: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 5,
    name: "Dr. Rohan Kapoor",
    type: "Doctor Listener",
    qualification: "BAMS, Counselling Certificate",
    duration: "20-30 mins",
    languages: ["English", "Hindi", "Punjabi"],
    price: 350,
    specializations: ["Overthinking", "Confidence", "Life Decisions"],
    availability: "Available Today",
    rating: 4.7,
    reviewCount: 87,
    imageUrl: "https://randomuser.me/api/portraits/men/36.jpg"
  },
  {
    id: 6,
    name: "Nisha Joshi",
    type: "Psychologist",
    qualification: "MSc Psychology, RCI Licensed",
    duration: "50-90 mins",
    languages: ["English", "Hindi"],
    price: 1800,
    specializations: ["Dating Anxiety", "Compatibility Issues", "Heartbreak"],
    availability: "Next Available: Fri, 2 PM",
    rating: 4.9,
    reviewCount: 142,
    imageUrl: "https://randomuser.me/api/portraits/women/22.jpg"
  },
  {
    id: 7,
    name: "Dr. Vikram Singh",
    type: "Doctor Listener",
    qualification: "MD Psychiatry",
    duration: "15-20 mins",
    languages: ["English", "Hindi", "Bengali"],
    price: 500,
    specializations: ["Depression", "Anxiety", "Stress Management"],
    availability: "Available Today",
    rating: 4.6,
    reviewCount: 104,
    imageUrl: "https://randomuser.me/api/portraits/men/75.jpg"
  },
];

// CounsellingHero Component
const CounsellingHero = () => {
  return (
    <section className="pt-16 md:pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <div className="inline-block mb-4 py-1.5 px-4 bg-blue-50 rounded-full shadow-sm">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">💬</span> Expert Guidance & Support
              </span>
            </div>
            
            <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl mb-6 text-gray-800 leading-tight">
              Talk to Someone Who <span style={{ color: '#e83a8e' }}>Gets It</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Feeling overwhelmed, confused about relationships, or just need to vent? Choose from verified counselors or listeners who are here to help – completely judgment-free.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
                <BadgeCheck className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Verified professionals</span>
              </div>
              
              <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
                <Calendar className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Same-day sessions</span>
              </div>
              
              <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
                <MessageCircle className="h-4 w-4 text-amber-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Judgment-free zone</span>
              </div>
            </div>
            
            <a href="#counselors" 
               className="inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-xl shadow-md border border-blue-200 hover:opacity-90 transition-all duration-300 bg-blue-600"
            >
              Explore Counselors
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 transform hover:-translate-y-1 transition-transform">
                <div className="bg-blue-100 p-3 inline-flex rounded-full mb-3">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Psychologists</h3>
                <p className="text-gray-600 text-sm">In-depth sessions with certified therapists for lasting solutions</p>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 transform hover:-translate-y-1 transition-transform">
                <div className="bg-purple-100 p-3 inline-flex rounded-full mb-3">
                  <Headphones className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Doctor Listeners</h3>
                <p className="text-gray-600 text-sm">Quick, affordable check-ins with medical professionals</p>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 transform hover:-translate-y-1 transition-transform">
                <div className="bg-pink-100 p-3 inline-flex rounded-full mb-3">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Relationship Experts</h3>
                <p className="text-gray-600 text-sm">Specialized advice for dating and relationship challenges</p>
              </div>
              
              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 transform hover:-translate-y-1 transition-transform">
                <div className="bg-green-100 p-3 inline-flex rounded-full mb-3">
                  <CircleCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">100% Confidential</h3>
                <p className="text-gray-600 text-sm">Private, secure conversations with no recording</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// CounsellingTabs Component
const CounsellingTabs = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  return (
    <div className="flex justify-center mb-10 max-w-xl mx-auto">
      <div className="bg-gray-100 p-2 rounded-xl flex w-full">
        <button
          className={`flex-1 py-3 px-4 rounded-lg flex justify-center items-center gap-2 ${
            activeTab === "all" ? "bg-white shadow-md font-medium text-gray-800" : "text-gray-600 hover:bg-gray-200"
          } transition-all`}
          onClick={() => setActiveTab("all")}
        >
          <span>All Support Options</span>
        </button>
        
        <button
          className={`flex-1 py-3 px-4 rounded-lg flex justify-center items-center gap-2 ${
            activeTab === "psychologist" ? "bg-white shadow-md font-medium text-gray-800" : "text-gray-600 hover:bg-gray-200"
          } transition-all`}
          onClick={() => setActiveTab("psychologist")}
        >
          <Brain className="h-4 w-4" />
          <span>Psychologists</span>
        </button>
        
        <button
          className={`flex-1 py-3 px-4 rounded-lg flex justify-center items-center gap-2 ${
            activeTab === "doctor" ? "bg-white shadow-md font-medium text-gray-800" : "text-gray-600 hover:bg-gray-200"
          } transition-all`}
          onClick={() => setActiveTab("doctor")}
        >
          <Stethoscope className="h-4 w-4" />
          <span>Doctor Listeners</span>
        </button>
      </div>
    </div>
  );
};

// FilterPanel Component
const FilterPanel = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search counselors..."
              className="pl-10 w-full md:w-64 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 flex-1 justify-end">
          <div className="relative">
            <select className="appearance-none py-2 pl-4 pr-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Language</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="marathi">Marathi</option>
              <option value="gujarati">Gujarati</option>
            </select>
            <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          
          <div className="relative">
            <select className="appearance-none py-2 pl-4 pr-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Topic</option>
              <option value="anxiety">Anxiety</option>
              <option value="depression">Depression</option>
              <option value="relationships">Relationship Issues</option>
              <option value="confidence">Confidence</option>
            </select>
            <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          
          <div className="relative">
            <select className="appearance-none py-2 pl-4 pr-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Price Range</option>
              <option value="low">₹300-₹500</option>
              <option value="medium">₹500-₹1200</option>
              <option value="high">₹1200+</option>
            </select>
            <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          
          <div className="relative">
            <select className="appearance-none py-2 pl-4 pr-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="popular">Most Popular</option>
              <option value="price_low">Lowest Price</option>
              <option value="rating">Highest Rating</option>
              <option value="availability">Available Soonest</option>
            </select>
            <ChevronDown className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Featured Counselor Card Component
const FeaturedCounselorCard = ({ counselor }: { counselor: Counselor }) => {
  const [showFullBio, setShowFullBio] = useState(false);
  const age = counselor.dob ? calculateAge(counselor.dob) : null;
  
  // Generate WhatsApp booking link with custom message
  const generateWhatsAppLink = (number: string) => {
    const message = encodeURIComponent("Hello, I'm reaching out from WhoToDate.com for counselling. I'd like to schedule a session.");
    return `https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${message}`;
  };
  
  return (
    <div className="col-span-1 md:col-span-2 bg-white rounded-xl overflow-hidden shadow-lg border border-blue-200 transition-all">
      <div className="h-2 w-full bg-blue-500"></div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row">
          {/* Left column - basic info */}
          <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
            <div className="relative mb-4">
              <img 
                src={counselor.imageUrl} 
                alt={counselor.name} 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Featured
              </div>
            </div>
            
            <h2 className="font-bold text-2xl text-gray-800 mb-1">{counselor.name}</h2>
            
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <Brain className="h-4 w-4 mr-1.5 text-blue-500" />
              <span>{counselor.type}</span>
            </div>
            
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400 mr-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">{counselor.rating}</span>
              <span className="text-xs text-gray-500 ml-1">({counselor.reviewCount} reviews)</span>
            </div>
            
            {age && (
              <div className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Age:</span> {age} years
              </div>
            )}
            
            {counselor.experience && (
              <div className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Experience:</span> {counselor.experience} {counselor.experience === 1 ? 'year' : 'years'}
              </div>
            )}
            
            {counselor.location && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1.5 text-gray-500" />
                {counselor.location}
              </div>
            )}
            
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Qualification:</span> {counselor.qualification}
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Clock className="h-4 w-4 mr-1.5 text-gray-500" />
              {counselor.duration}
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Globe className="h-4 w-4 mr-1.5 text-gray-500" />
              {counselor.languages.join(", ")}
            </div>
            
            {counselor.modes && (
              <div className="flex items-start text-sm text-gray-600 mb-3">
                <div className="flex mt-0.5 mr-1.5">
                  {counselor.modes.includes("Google Meet") && <Video className="h-4 w-4 text-gray-500" />}
                  {counselor.modes.includes("Audio Call") && <Phone className="h-4 w-4 text-gray-500 ml-1" />}
                </div>
                <span>Available via: {counselor.modes.join(", ")}</span>
              </div>
            )}
          </div>
          
          {/* Right column - detailed info */}
          <div className="md:w-2/3">
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-gray-800 mb-2">About {counselor.name.split(" ")[0]}</h3>
              <p className="text-gray-600 text-sm">
                {showFullBio ? counselor.fullBio : counselor.shortBio}
              </p>
              {counselor.fullBio && (
                <button 
                  className="text-blue-600 text-sm font-medium mt-2 flex items-center"
                  onClick={() => setShowFullBio(!showFullBio)}
                >
                  {showFullBio ? "Show less" : "Read More about Aanchal"}
                  <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform ${showFullBio ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>
            
            <div className="mb-4">
              <h3 className="font-bold text-gray-800 mb-2">Specializes in</h3>
              <div className="flex flex-wrap gap-2">
                {counselor.specializations.map((spec, index) => (
                  <span key={index} className="inline-block px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Session Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="text-xl font-bold text-gray-800">₹{counselor.price}/hour</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Availability</div>
                  <div className={`font-medium ${
                    counselor.availability.includes("Available") 
                      ? "text-green-600" 
                      : "text-gray-700"
                  }`}>
                    {counselor.availability}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Booking options */}
            <div className="flex flex-col sm:flex-row gap-3">
              {counselor.whatsappNumber ? (
                <a 
                  href={generateWhatsAppLink(counselor.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white text-center py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Book on WhatsApp
                </a>
              ) : (
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors">
                  Book Session
                </button>
              )}
              
              <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-center py-3 px-4 rounded-lg font-medium transition-colors">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Standard Counselor Card Component
const CounselorCard = ({ counselor }: { counselor: Counselor }) => {
  // Skip if this is a featured counselor (will be rendered with FeaturedCounselorCard)
  if (counselor.featured) {
    return null;
  }
  
  // Generate WhatsApp booking link with custom message
  const generateWhatsAppLink = (number: string) => {
    const message = encodeURIComponent("Hello, I'm reaching out from WhoToDate.com for counselling. I'd like to schedule a session.");
    return `https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${message}`;
  };
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 transition-all hover:shadow-lg">
      <div className={`h-2 w-full ${counselor.type === "Psychologist" ? "bg-blue-500" : "bg-purple-500"}`}></div>
      
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          {counselor.imageUrl ? (
            <img 
              src={counselor.imageUrl} 
              alt={counselor.name} 
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-xl flex-shrink-0">
              {counselor.name.split(" ").map(n => n[0]).join("")}
            </div>
          )}
          
          <div>
            <h3 className="font-bold text-xl text-gray-800">{counselor.name}</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              {counselor.type === "Psychologist" ? (
                <Brain className="h-4 w-4 mr-1.5 text-blue-500" />
              ) : (
                <Stethoscope className="h-4 w-4 mr-1.5 text-purple-500" />
              )}
              <span>{counselor.type}</span>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Qualification:</span> {counselor.qualification}
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1.5 text-gray-500" />
            {counselor.duration}
          </div>
          
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-1">
              <Star className="h-4 w-4 fill-current" />
            </div>
            <span className="text-sm font-medium text-gray-700">{counselor.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({counselor.reviewCount})</span>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex items-center text-sm text-gray-600 mb-1.5">
            <Globe className="h-4 w-4 mr-1.5 text-gray-500" />
            {counselor.languages.join(", ")}
          </div>
          
          <div className="flex items-start text-sm text-gray-600">
            <Tags className="h-4 w-4 mr-1.5 text-gray-500 mt-0.5" />
            <div>
              <span className="font-medium">Specializes in: </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {counselor.specializations.map((spec, index) => (
                  <span key={index} className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                    counselor.type === "Psychologist" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                  }`}>
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div>
            <div className={`text-sm ${
              counselor.availability.includes("Available") 
                ? "text-green-600" 
                : "text-gray-600"
            }`}>
              {counselor.availability}
            </div>
            <div className="text-lg font-bold text-gray-800">₹{counselor.price}</div>
          </div>
          
          {counselor.whatsappNumber ? (
            <a 
              href={generateWhatsAppLink(counselor.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-white font-medium bg-green-600 hover:bg-green-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Book on WhatsApp
            </a>
          ) : (
            <button className={`px-4 py-2 rounded-lg text-white font-medium ${
              counselor.type === "Psychologist" ? "bg-blue-600 hover:bg-blue-700" : "bg-purple-600 hover:bg-purple-700"
            } transition-colors`}>
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// FAQ Component
const FAQ = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex w-full justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-gray-800">{question}</h3>
        {isOpen ? (
          <Minus className="h-5 w-5 text-gray-600" />
        ) : (
          <Plus className="h-5 w-5 text-gray-600" />
        )}
      </button>
      
      {isOpen && (
        <div className="mt-2 text-gray-600 text-sm">{answer}</div>
      )}
    </div>
  );
};

// CounsellingFAQs Component
const CounsellingFAQs = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 py-1.5 px-4 bg-purple-50 rounded-full">
            <span className="text-gray-700 font-medium text-sm flex items-center">
              <span className="mr-2">❓</span> Common Questions
            </span>
          </div>
          
          <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4 text-gray-800">
            Frequently Asked Questions
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our counseling services
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border border-gray-200">
          <FAQ 
            question="What's the difference between a psychologist and a doctor listener?" 
            answer="Psychologists offer in-depth counseling sessions (45-90 minutes) and can provide comprehensive therapy for ongoing issues. Doctor Listeners are medical professionals who offer shorter consultations (15-30 minutes) ideal for quick advice, venting, or initial guidance. Both are qualified professionals, but have different session lengths and approaches."
          />
          
          <FAQ 
            question="Can I talk anonymously?" 
            answer="Yes! While we need basic information to set up your session, you can use a nickname during registration. Your conversations with counselors are 100% confidential and never recorded. If you prefer even more privacy, you can keep your video off during sessions."
          />
          
          <FAQ 
            question="What happens during a 15-minute call?" 
            answer="A 15-minute Doctor Listener session is perfect for quick support. You'll briefly explain your situation, and the listener will offer immediate guidance, validation, and suggestions. While not a full therapy session, it's ideal for when you need someone professional to talk to right away."
          />
          
          <FAQ 
            question="Is this a therapy session?" 
            answer="Psychologist sessions are therapeutic in nature and can be part of ongoing therapy. Doctor Listener sessions are consultative rather than therapy. It's important to note that while both are beneficial, online sessions may complement but not always replace traditional in-person therapy for severe conditions."
          />
          
          <FAQ 
            question="Can I switch if I feel uncomfortable?" 
            answer="Absolutely! Your comfort is our priority. If you don't connect with your counselor, you can end the session and book with someone else. We also offer a satisfaction guarantee for first-time users."
          />
          
          <FAQ 
            question="Do I need to take the compatibility quiz before booking?" 
            answer="Taking our compatibility quiz is recommended but not required. The quiz helps you understand your personality and relationship patterns, which can make your counseling sessions more productive. Your counselor can also access your quiz results (with your permission) to provide more personalized guidance."
          />
        </div>
      </div>
    </section>
  );
};

// FinalCTA Component
const FinalCTA = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="bg-white rounded-xl p-8 shadow-md border border-blue-100">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4 text-gray-800">
            Sometimes, all you need is a good listener
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether it's relationship confusion, emotional burnout, or just needing to talk – we've got someone for you. Book a session today and take the first step toward feeling better.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Brain className="h-5 w-5 mr-2" />
              View Psychologists
            </button>
            
            <button className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 transition-colors flex items-center justify-center">
              <Headphones className="h-5 w-5 mr-2" />
              View Doctor Listeners
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center text-sm text-gray-600">
            <Info className="h-4 w-4 mr-2 text-blue-500" />
            <span>Still feeling unsure? Take our <Link href="/quiz" className="text-blue-600 font-medium hover:underline">compatibility quiz</Link> first to learn more about yourself</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Counselling Component
const Counselling = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter counselors based on active tab
  const filteredCounselors = counselors.filter(counselor => {
    if (activeTab === "all") return true;
    if (activeTab === "psychologist") return counselor.type === "Psychologist";
    if (activeTab === "doctor") return counselor.type === "Doctor Listener";
    return true;
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Talk to a Counselor | WhoToDate</title>
        <meta name="description" content="Feeling overwhelmed or need relationship advice? Connect with verified counselors and doctor listeners who understand your challenges. Book a session today." />
      </Helmet>
      
      <CounsellingHero />
      
      <section className="py-16 px-4" id="counselors">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <div className="inline-block mb-4 py-1.5 px-4 bg-pink-50 rounded-full">
              <span className="text-gray-700 font-medium text-sm flex items-center">
                <span className="mr-2">👥</span> Our Professionals
              </span>
            </div>
            
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl mb-4 text-gray-800">
              Find Your Perfect Support Match
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our network of qualified psychologists and doctor listeners, each specialized in different areas of emotional wellbeing and relationships.
            </p>
          </div>
          
          <CounsellingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <FilterPanel />
          
          {/* Featured Counselor (Aanchal) */}
          {filteredCounselors.some(c => c.featured) && filteredCounselors.filter(c => c.featured).map(counselor => (
            <FeaturedCounselorCard key={counselor.id} counselor={counselor} />
          ))}
          
          {/* Regular Counselor Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 mt-8">
            {filteredCounselors.map((counselor) => (
              <CounselorCard key={counselor.id} counselor={counselor} />
            ))}
          </div>
          
          {filteredCounselors.length === 0 && (
            <div className="text-center py-10">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No counselors found</h3>
              <p className="text-gray-600">Try adjusting your filters or check back later for new counselors</p>
            </div>
          )}
          
          <div className="text-center">
            <button className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors">
              Load More Counselors
            </button>
          </div>
        </div>
      </section>
      
      <CounsellingFAQs />
      <FinalCTA />
    </div>
  );
};

export default Counselling;