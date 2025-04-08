import { useState } from "react";
import { Helmet } from 'react-helmet';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StarIcon, ShieldCheckIcon, CalendarIcon, ClockIcon, HeartIcon, Award } from "lucide-react";
import BrainIcon from "@/components/icons/BrainIcon";
import { motion } from "framer-motion";

// Dummy data for counselors
const counselors = [
  {
    id: 1,
    name: "Aanchal Malani",
    credentials: "MA Clinical Psychology",
    age: 37,
    location: "Pune, Maharashtra",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=350&h=350&q=80",
    rating: 4.9,
    reviews: 127,
    price: 1000,
    duration: 45,
    specialties: ["Relationship Issues", "Breakup Recovery", "Self-Esteem", "Anxiety"],
    successRate: "94%",
    verified: true,
    featured: true,
    bio: "With over 12 years of experience, I specialize in helping individuals navigate difficult relationship transitions. My approach integrates cognitive-behavioral techniques with mindfulness practices to help you rebuild confidence and emotional stability.",
    testimonials: [
      {
        text: "Aanchal helped me rebuild my self-confidence after a devastating breakup. Her compassionate approach made all the difference.",
        author: "Priya K.",
        rating: 5
      },
      {
        text: "The coping strategies I learned from Aanchal completely transformed how I handle relationship challenges. Highly recommended!",
        author: "Rajiv S.",
        rating: 5
      }
    ]
  },
  {
    id: 2,
    name: "Dr. Nisha Sharma",
    credentials: "PhD Psychology, Relationship Specialist",
    age: 42,
    location: "Mumbai, Maharashtra",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=350&h=350&q=80",
    rating: 4.7,
    reviews: 98,
    price: 1500,
    duration: 60,
    specialties: ["Toxic Relationships", "Emotional Intelligence", "Attachment Styles"],
    successRate: "91%",
    verified: false,
    featured: false,
    bio: "I help individuals understand their attachment patterns and emotional needs to build healthier, more fulfilling relationships. My evidence-based approach combines cognitive therapies with emotional coaching.",
    testimonials: [
      {
        text: "Dr. Sharma's insights into my attachment style were truly eye-opening. I'm now in a healthy relationship for the first time in my life.",
        author: "Aditya M.",
        rating: 5
      }
    ]
  },
  {
    id: 3,
    name: "Priyanka Desai",
    credentials: "M.Phil Clinical Psychology",
    age: 35,
    location: "Bangalore, Karnataka",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=350&h=350&q=80",
    rating: 4.8,
    reviews: 112,
    price: 1200,
    duration: 50,
    specialties: ["Post-Breakup Depression", "Relationship Trauma", "Dating Confidence"],
    successRate: "89%",
    verified: false,
    featured: false,
    bio: "I specialize in helping people recover from relationship trauma and build healthy dating patterns. My therapeutic approach is warm, direct, and focused on practical solutions for emotional healing.",
    testimonials: [
      {
        text: "After my divorce, I couldn't imagine dating again. Priyanka helped me rebuild my confidence and set healthy boundaries.",
        author: "Meera T.",
        rating: 4
      }
    ]
  },
  {
    id: 4,
    name: "Dr. Kavita Reddy",
    credentials: "PhD, Certified Relationship Coach",
    age: 39,
    location: "Delhi, NCR",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=350&h=350&q=80",
    rating: 4.6,
    reviews: 87,
    price: 1300,
    duration: 45,
    specialties: ["Couples Therapy", "Communication Skills", "Intimacy Issues"],
    successRate: "88%",
    verified: false,
    featured: false,
    bio: "My approach combines traditional therapy with modern coaching techniques to help individuals build meaningful connections. I specialize in communication breakdowns and rebuilding emotional intimacy.",
    testimonials: [
      {
        text: "Dr. Reddy helped my partner and I develop communication skills that saved our relationship. We're now stronger than ever.",
        author: "Vikram & Neha",
        rating: 5
      }
    ]
  },
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating) 
              ? 'text-yellow-500 fill-yellow-500' 
              : i < rating 
                ? 'text-yellow-500 fill-yellow-500 opacity-50' 
                : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating}</span>
    </div>
  );
};

const CounsellorCard = ({ counselor }: { counselor: typeof counselors[0] }) => {
  return (
    <Card className={`overflow-hidden ${counselor.featured ? 'border-primary border-2' : ''}`}>
      {counselor.featured && (
        <div className="bg-primary text-white text-center py-1 text-xs font-semibold">
          FEATURED COUNSELLOR
        </div>
      )}
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={counselor.image} 
            alt={counselor.name} 
            className="w-full h-48 object-cover object-center"
          />
          {counselor.verified && (
            <div className="absolute top-2 right-2 bg-white rounded-full p-1">
              <ShieldCheckIcon className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{counselor.name}</h3>
              <p className="text-sm text-gray-600">{counselor.credentials}</p>
              <p className="text-sm text-gray-600">{counselor.age} • {counselor.location}</p>
            </div>
            <div className="text-right">
              <StarRating rating={counselor.rating} />
              <p className="text-xs text-gray-500">{counselor.reviews} reviews</p>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex flex-wrap gap-1 mb-2">
              {counselor.specialties.map((specialty, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
            <p className="text-sm line-clamp-3 text-gray-700 mt-2">
              {counselor.bio}
            </p>
          </div>
          
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center text-sm text-gray-600">
              <Award className="h-4 w-4 mr-1 text-amber-500" />
              <span>{counselor.successRate} success</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span>{counselor.duration} min</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-3 p-4 pt-0 border-t border-gray-100 mt-4">
        <div className="text-lg font-semibold">
          ₹{counselor.price}<span className="text-sm font-normal text-gray-500">/session</span>
        </div>
        <Button className="w-full sm:w-auto">Book Now</Button>
      </CardFooter>
    </Card>
  );
};

// Testimonial component
const Testimonial = ({ testimonial }: { testimonial: { text: string, author: string, rating: number } }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <StarRating rating={testimonial.rating} />
      <p className="mt-2 text-gray-700 italic">"{testimonial.text}"</p>
      <p className="mt-2 text-sm font-medium">— {testimonial.author}</p>
    </div>
  );
};

// Featured counselor section
const FeaturedCounsellor = () => {
  const featured = counselors.find(c => c.featured);
  
  if (!featured) return null;
  
  return (
    <div className="grid md:grid-cols-5 gap-6 bg-primary/5 p-6 rounded-xl">
      <div className="md:col-span-2">
        <div className="relative max-w-[250px] mx-auto md:max-w-none">
          <img 
            src={featured.image} 
            alt={featured.name} 
            className="w-full rounded-lg aspect-[3/4] object-cover"
          />
          {featured.verified && (
            <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md">
              <ShieldCheckIcon className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>
      </div>
      <div className="md:col-span-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <Badge className="mb-2 bg-primary hover:bg-primary">Featured Expert</Badge>
            <h2 className="text-2xl font-bold">{featured.name}</h2>
            <p className="text-gray-600">{featured.credentials}</p>
            <p className="text-gray-600">{featured.age} • {featured.location}</p>
          </div>
          <div className="sm:text-right">
            <StarRating rating={featured.rating} />
            <p className="text-xs text-gray-500">{featured.reviews} verified reviews</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="bg-white p-3 rounded-lg text-center shadow-sm">
            <Award className="h-5 w-5 mx-auto mb-1 text-amber-500" />
            <p className="text-lg font-bold">{featured.successRate}</p>
            <p className="text-xs text-gray-600">Success Rate</p>
          </div>
          <div className="bg-white p-3 rounded-lg text-center shadow-sm">
            <CalendarIcon className="h-5 w-5 mx-auto mb-1 text-blue-500" />
            <p className="text-lg font-bold">12+ yrs</p>
            <p className="text-xs text-gray-600">Experience</p>
          </div>
          <div className="bg-white p-3 rounded-lg text-center shadow-sm">
            <HeartIcon className="h-5 w-5 mx-auto mb-1 text-red-500" />
            <p className="text-lg font-bold">500+</p>
            <p className="text-xs text-gray-600">Lives Improved</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">
          {featured.bio}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {featured.specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary" className="text-sm">
              {specialty}
            </Badge>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
          <div>
            <p className="text-2xl font-bold">₹{featured.price}<span className="text-sm font-normal text-gray-500">/session ({featured.duration} min)</span></p>
          </div>
          <Button size="lg" className="w-full sm:w-auto">Book a Session</Button>
        </div>
      </div>
    </div>
  );
};

// Main page component
const Counselling = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  // Filter counselors based on selected specialty
  const filteredCounselors = filter 
    ? counselors.filter(c => c.specialties.includes(filter))
    : counselors;
  
  // Get unique specialties from all counselors
  const specialties = Array.from(
    new Set(counselors.flatMap(c => c.specialties))
  );
  
  return (
    <>
      <Helmet>
        <title>Professional Counselling - WhoToDate</title>
        <meta name="description" content="Connect with professional counsellors specialized in relationship issues, breakup recovery, and personal growth." />
      </Helmet>
      
      <div className="min-h-screen bg-neutral-light pt-28 md:pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Professional Support For Your Relationship Journey</h1>
            <p className="text-lg text-gray-700">
              Connect with top-rated counsellors who can help you navigate relationship challenges, recover from breakups, and build a healthier emotional life.
            </p>
          </div>
          
          {/* Why Counselling Section */}
          <div className="bg-white rounded-xl p-6 mb-12 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">How Professional Counselling Can Help</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <HeartIcon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Heal From Breakups</h3>
                <p className="text-gray-600">
                  Process emotions, gain closure, and rebuild your life after a difficult relationship ending.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BrainIcon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Understand Patterns</h3>
                <p className="text-gray-600">
                  Identify recurring relationship patterns and develop healthier attachment styles.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Build Confidence</h3>
                <p className="text-gray-600">
                  Overcome insecurities and develop the emotional foundation for healthier future relationships.
                </p>
              </div>
            </div>
          </div>
          
          {/* Featured Counsellor */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Expert</h2>
            <FeaturedCounsellor />
          </section>
          
          {/* All Counsellors Section */}
          <section>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">Our Counselling Experts</h2>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={filter === null ? "default" : "outline"} 
                  onClick={() => setFilter(null)}
                  size="sm"
                >
                  All
                </Button>
                {specialties.slice(0, 3).map(specialty => (
                  <Button 
                    key={specialty}
                    variant={filter === specialty ? "default" : "outline"}
                    onClick={() => setFilter(specialty === filter ? null : specialty)}
                    size="sm"
                  >
                    {specialty}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCounselors.map(counselor => (
                <motion.div 
                  key={counselor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CounsellorCard counselor={counselor} />
                </motion.div>
              ))}
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">What Our Clients Say</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {counselors
                .flatMap(c => c.testimonials.map(t => ({ ...t, counselor: c.name })))
                .slice(0, 3)
                .map((testimonial, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <Testimonial testimonial={testimonial} />
                  </motion.div>
                ))
              }
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 mb-6">
                <TabsTrigger value="about">About Counselling</TabsTrigger>
                <TabsTrigger value="process">What to Expect</TabsTrigger>
                <TabsTrigger value="pricing">Pricing & Sessions</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-3">How can counselling help with relationship issues?</h3>
                <p className="text-gray-700 mb-4">
                  Professional counselling offers a safe space to explore relationship patterns, emotional needs, and communication challenges. Our experts help you understand attachment styles, process past experiences, and develop healthier relationship skills for the future.
                </p>
                
                <h3 className="font-bold text-lg mb-3">Is counselling right for me?</h3>
                <p className="text-gray-700">
                  Counselling can benefit anyone navigating relationship complexities, recovering from breakups, dealing with dating anxiety, or working on emotional growth. If you feel stuck, hurt, or confused about relationships, professional guidance can provide clarity and support.
                </p>
              </TabsContent>
              <TabsContent value="process" className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-3">What happens in a counselling session?</h3>
                <p className="text-gray-700 mb-4">
                  Your first session typically involves discussing your concerns and goals. Your counsellor will ask questions to understand your situation better. Together, you'll develop a plan for future sessions focused on specific techniques and strategies tailored to your needs.
                </p>
                
                <h3 className="font-bold text-lg mb-3">How many sessions will I need?</h3>
                <p className="text-gray-700">
                  The number of sessions varies based on individual needs. Some clients benefit from 6-8 sessions for specific issues, while others prefer ongoing support. Your counsellor will discuss recommendations based on your goals and progress.
                </p>
              </TabsContent>
              <TabsContent value="pricing" className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-3">How much does counselling cost?</h3>
                <p className="text-gray-700 mb-4">
                  Session fees range from ₹1,000 to ₹1,500 for a 45-60 minute session, depending on the counsellor's experience and specialization. We offer package discounts for clients booking multiple sessions.
                </p>
                
                <h3 className="font-bold text-lg mb-3">Do you offer online sessions?</h3>
                <p className="text-gray-700">
                  Yes, all our counsellors provide secure video counselling sessions. Online sessions offer the same quality of care as in-person meetings, with the added convenience of connecting from anywhere.
                </p>
              </TabsContent>
            </Tabs>
          </section>
          
          {/* CTA Section */}
          <section className="mt-16 bg-primary/10 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to Take the First Step?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Connecting with a counsellor is a courageous step toward healing and growth. Our experts are ready to support you on your journey to healthier relationships and emotional wellbeing.
            </p>
            <Button size="lg" className="w-full sm:w-auto px-6">Find Your Counsellor</Button>
          </section>
        </div>
      </div>
    </>
  );
};

export default Counselling;