import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Check, Heart, Star } from "lucide-react";
import { Link } from "wouter";

// Dating Guide Page Component
const HowToDatePage = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const sectionRefs = {
    introduction: useRef<HTMLDivElement>(null),
    chapter1: useRef<HTMLDivElement>(null),
    chapter2: useRef<HTMLDivElement>(null),
    chapter3: useRef<HTMLDivElement>(null),
    chapter4: useRef<HTMLDivElement>(null),
    chapter5: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  // For mobile dropdown navigation
  const [showMobileNav, setShowMobileNav] = useState(false);
  
  // Detect scroll position to update active section accordingly
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better UX
      
      // Get all section positions
      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(key);
          }
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>The Complete Dating Guide | WhoToDate</title>
        <meta 
          name="description" 
          content="A comprehensive guide to modern dating, relationship building, and compatibility based on personality types."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#e83a8e]/20 to-[#e83a8e]/5 py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center mb-4 bg-white px-4 py-1.5 rounded-full">
            <BookOpen className="h-4 w-4 text-[#e83a8e] mr-2" />
            <span className="text-sm font-medium">Dating Guide eBook</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#e83a8e] to-[#d02e7d]">
            The Complete Guide to Modern Dating
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-700">
            Learn how to navigate modern relationships, understand compatibility, and build meaningful connections.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <div className="inline-flex items-center gap-1 bg-[#e83a8e]/10 px-3 py-1 rounded-full">
              <Check className="h-4 w-4 text-[#e83a8e]" />
              <span className="text-sm">Science-based approach</span>
            </div>
            <div className="inline-flex items-center gap-1 bg-[#e83a8e]/10 px-3 py-1 rounded-full">
              <Check className="h-4 w-4 text-[#e83a8e]" />
              <span className="text-sm">Expert insights</span>
            </div>
            <div className="inline-flex items-center gap-1 bg-[#e83a8e]/10 px-3 py-1 rounded-full">
              <Check className="h-4 w-4 text-[#e83a8e]" />
              <span className="text-sm">Practical examples</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Dashboard Link */}
        <div className="mb-8">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          {/* Content Area */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            {/* Introduction */}
            <div ref={sectionRefs.introduction} className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-[#e83a8e]">
                <BookOpen className="mr-2 h-5 w-5" />
                Introduction: Understanding Modern Dating
              </h2>
              <div className="prose max-w-none">
                <p>
                  Dating has evolved dramatically over the past decade. With the rise of dating apps, social media, and changing social norms,
                  finding and building meaningful relationships requires a new set of skills and understanding.
                </p>
                <p>
                  This comprehensive guide will walk you through the modern dating landscape, helping you understand compatibility, 
                  navigate first dates, build emotional connections, and establish healthy relationship patterns.
                </p>
                <blockquote className="border-l-4 border-[#e83a8e] pl-4 italic">
                  "The right relationship doesn't just happen by chance; it's built on self-awareness, 
                  understanding compatibility, and healthy communication patterns."
                </blockquote>
                <p>
                  Whether you're new to dating, getting back into the dating world after a long relationship, or looking to improve 
                  your dating approach, this guide offers practical advice backed by relationship psychology and real-world experiences.
                </p>
              </div>
            </div>

            {/* Chapter 1 */}
            <div ref={sectionRefs.chapter1} className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[#e83a8e]">Chapter 1: Know Yourself First</h2>
              <div className="prose max-w-none">
                <p>
                  The journey to finding a compatible partner begins with knowing yourself. Understanding your own personality traits,
                  attachment style, values, and relationship patterns is crucial before seeking a compatible match.
                </p>
                <h3 className="font-semibold text-xl mb-2">Self-Assessment Questions</h3>
                <ul>
                  <li>What are your core values and non-negotiables in a relationship?</li>
                  <li>What is your attachment style? (Secure, Anxious, Avoidant, or Disorganized)</li>
                  <li>What relationship patterns have you noticed in your past experiences?</li>
                  <li>What are your long-term relationship goals and life plans?</li>
                  <li>How do you handle conflict, criticism, and emotional situations?</li>
                </ul>
                <p>
                  Taking the time to reflect on these questions will provide valuable insights into who you are as a partner
                  and what type of relationship will work best for you. Consider journaling your answers or discussing them
                  with a trusted friend for additional clarity.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Quick Tip</h4>
                  <p className="text-blue-700 text-sm">
                    Your WhoToDate compatibility profile is an excellent starting point for self-awareness.
                    Refer back to your results for insights about your communication style, emotional patterns,
                    and relationship tendencies.
                  </p>
                </div>
              </div>
            </div>

            {/* Chapter 2 */}
            <div ref={sectionRefs.chapter2} className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[#e83a8e]">Chapter 2: The Science of Compatibility</h2>
              <div className="prose max-w-none">
                <p>
                  Compatibility isn't just about having common interests or physical attraction. Scientific research 
                  has identified several key factors that contribute to relationship success and satisfaction.
                </p>
                <h3 className="font-semibold text-xl mb-2">Key Compatibility Factors</h3>
                <p>
                  <strong>Emotional Intelligence</strong>: The ability to recognize, understand, and manage emotions
                  in yourself and others is strongly correlated with relationship success. Partners with higher emotional
                  intelligence tend to navigate conflicts more effectively and build deeper connections.
                </p>
                <p>
                  <strong>Values Alignment</strong>: Research shows that couples with aligned core values (on topics like
                  family, ambition, lifestyle preferences, and financial attitudes) report higher relationship satisfaction.
                  This doesn't mean you need identical values, but compatible approaches to life's important aspects.
                </p>
                <p>
                  <strong>Communication Patterns</strong>: Dr. John Gottman's research identifies communication patterns
                  that predict relationship success with over 90% accuracy. Couples who maintain a 5:1 ratio of positive 
                  to negative interactions, avoid criticism, contempt, defensiveness, and stonewalling have healthier relationships.
                </p>
                <p>
                  <strong>Attachment Compatibility</strong>: Understanding your own and your potential partner's attachment style
                  helps predict relationship dynamics. While secure-secure pairings typically have the smoothest relationships,
                  any combination can work with awareness and healthy communication.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg my-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Important Note</h4>
                  <p className="text-yellow-700 text-sm">
                    Compatibility doesn't mean finding someone identical to you. Often, complementary traits
                    create stronger partnerships than mirror-image personalities. The key is understanding how
                    your differences can strengthen rather than strain your relationship.
                  </p>
                </div>
              </div>
            </div>

            {/* Chapter 3 */}
            <div ref={sectionRefs.chapter3} className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[#e83a8e]">Chapter 3: Effective Communication</h2>
              <div className="prose max-w-none">
                <p>
                  Communication is the foundation of healthy relationships. Learning to express yourself clearly
                  and listen effectively creates the basis for mutual understanding and connection.
                </p>
                <h3 className="font-semibold text-xl mb-2">Communication Techniques</h3>
                <p>
                  <strong>Active Listening</strong>: Rather than formulating your response while your partner speaks,
                  focus completely on understanding their perspective. Reflect back what you've heard to confirm understanding.
                </p>
                <p>
                  <strong>Using "I" Statements</strong>: Instead of "You always ignore me," try "I feel overlooked when my
                  messages aren't answered." This approach expresses your feelings without triggering defensiveness.
                </p>
                <p>
                  <strong>Nonviolent Communication (NVC)</strong>: The four-part NVC process helps express feelings and 
                  needs clearly:
                </p>
                <ol>
                  <li>Observation: State the concrete action you observed</li>
                  <li>Feeling: Express how you feel about it</li>
                  <li>Need: Identify the need behind that feeling</li>
                  <li>Request: Make a specific, actionable request</li>
                </ol>
                <div className="bg-green-50 p-4 rounded-lg my-4">
                  <h4 className="font-medium text-green-800 mb-2">Communication Exercise</h4>
                  <p className="text-green-700 text-sm">
                    Try practicing "speaker-listener" technique with a friend before using it in dating situations.
                    One person speaks for 2 minutes without interruption about a topic, then the listener summarizes
                    what they heard before responding. This builds the habit of fully listening before responding.
                  </p>
                </div>
              </div>
            </div>

            {/* Chapter 4 */}
            <div ref={sectionRefs.chapter4} className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[#e83a8e]">Chapter 4: Building Emotional Connection</h2>
              <div className="prose max-w-none">
                <p>
                  Physical attraction may initially draw people together, but emotional connection is what creates
                  lasting relationships. Building this connection involves vulnerability, empathy, and shared experiences.
                </p>
                <h3 className="font-semibold text-xl mb-2">Creating Deeper Connections</h3>
                <p>
                  <strong>Progressive Vulnerability</strong>: Gradually sharing more personal aspects of yourself
                  builds trust and intimacy. This doesn't mean oversharing too early, but thoughtfully revealing more
                  of your authentic self as the relationship develops.
                </p>
                <p>
                  <strong>Empathetic Responses</strong>: When someone shares something important, responding with
                  empathy rather than solving or dismissing their feelings creates an emotional bond. Phrases like
                  "That sounds difficult" or "I can understand why you'd feel that way" validate their experience.
                </p>
                <p>
                  <strong>Quality Time Concepts</strong>: Psychologist Dr. Gary Chapman identifies quality time as
                  one of the five love languages. This means giving someone your undivided attention and creating
                  meaningful shared experiences. Some effective approaches include:
                </p>
                <ul>
                  <li>Unplugged conversations (devices away)</li>
                  <li>Novel experiences that create lasting memories</li>
                  <li>Regular rituals that become meaningful to both people</li>
                  <li>Shared activities that allow for both connection and conversation</li>
                </ul>
                <div className="bg-purple-50 p-4 rounded-lg my-4">
                  <h4 className="font-medium text-purple-800 mb-2">Connection Builders</h4>
                  <p className="text-purple-700 text-sm">
                    Psychologist Arthur Aron's "36 Questions That Lead to Love" provide a structured way to build
                    emotional intimacy through progressively deeper conversation. These questions, which start with
                    "Given the choice of anyone in the world, whom would you want as a dinner guest?" and progress to
                    more personal topics, have been shown to accelerate emotional connection.
                  </p>
                </div>
              </div>
            </div>

            {/* Chapter 5 */}
            <div ref={sectionRefs.chapter5} className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-[#e83a8e]">Chapter 5: Navigating Relationship Challenges</h2>
              <div className="prose max-w-none">
                <p>
                  Every relationship faces challenges. How you navigate these difficulties often determines
                  whether the relationship will thrive or falter. This chapter explores common relationship
                  challenges and effective strategies for addressing them.
                </p>
                <h3 className="font-semibold text-xl mb-2">Common Challenges and Solutions</h3>
                <p>
                  <strong>Communication Breakdowns</strong>: When communication deteriorates, schedule a dedicated
                  time to talk when both parties are calm. Use structured communication techniques like taking turns
                  to speak for 2 minutes each without interruption, followed by reflective listening.
                </p>
                <p>
                  <strong>Mismatched Expectations</strong>: Regularly check in about relationship expectations.
                  Discuss topics like exclusivity, time together, pace of the relationship, and future plans clearly
                  rather than making assumptions.
                </p>
                <p>
                  <strong>External Pressures</strong>: Stress from work, family, or other aspects of life can strain
                  relationships. Create boundaries around relationship time and develop routines for supporting each
                  other during stressful periods.
                </p>
                <p>
                  <strong>Conflict Resolution</strong>: Healthy relationships don't avoid conflict but approach it
                  constructively. Follow these steps:
                </p>
                <ol>
                  <li>Address issues promptly before resentment builds</li>
                  <li>Focus on the specific behavior, not character criticism</li>
                  <li>Take responsibility for your part in the conflict</li>
                  <li>Generate solutions together rather than demanding specific outcomes</li>
                  <li>Give each other space to process when emotions run high</li>
                </ol>
                <div className="bg-red-50 p-4 rounded-lg my-4">
                  <h4 className="font-medium text-red-800 mb-2">Red Flags vs. Growth Opportunities</h4>
                  <p className="text-red-700 text-sm">
                    Learning to distinguish between red flags (warning signs of unhealthy relationships)
                    and normal relationship challenges is essential. Red flags include controlling behavior,
                    disrespect, dishonesty, and persistent boundary violations. Normal challenges include
                    communication misunderstandings, occasional conflicts, and navigating differences in
                    preferences or habits.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-8 mt-12">
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="bg-[#e83a8e]/10 hover:bg-[#e83a8e]/20 text-[#e83a8e]"
                >
                  <Star className="h-4 w-4 mr-1 fill-[#e83a8e]" />
                  Save to Favorites
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-4 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-[#e83a8e]" />
                    Guide Contents
                  </h3>
                  
                  {/* Desktop Navigation */}
                  <div className="hidden lg:block">
                    <nav className="space-y-2">
                      <Button 
                        onClick={() => scrollToSection("introduction")}
                        variant={activeSection === "introduction" ? "default" : "ghost"}
                        className={`w-full justify-start text-sm h-auto py-2 ${
                          activeSection === "introduction" ? "bg-[#e83a8e]" : ""
                        }`}
                      >
                        Introduction
                      </Button>
                      <Button 
                        onClick={() => scrollToSection("chapter1")}
                        variant={activeSection === "chapter1" ? "default" : "ghost"}
                        className={`w-full justify-start text-sm h-auto py-2 ${
                          activeSection === "chapter1" ? "bg-[#e83a8e]" : ""
                        }`}
                      >
                        Know Yourself First
                      </Button>
                      <Button 
                        onClick={() => scrollToSection("chapter2")}
                        variant={activeSection === "chapter2" ? "default" : "ghost"}
                        className={`w-full justify-start text-sm h-auto py-2 ${
                          activeSection === "chapter2" ? "bg-[#e83a8e]" : ""
                        }`}
                      >
                        Science of Compatibility
                      </Button>
                      <Button 
                        onClick={() => scrollToSection("chapter3")}
                        variant={activeSection === "chapter3" ? "default" : "ghost"}
                        className={`w-full justify-start text-sm h-auto py-2 ${
                          activeSection === "chapter3" ? "bg-[#e83a8e]" : ""
                        }`}
                      >
                        Effective Communication
                      </Button>
                      <Button 
                        onClick={() => scrollToSection("chapter4")}
                        variant={activeSection === "chapter4" ? "default" : "ghost"}
                        className={`w-full justify-start text-sm h-auto py-2 ${
                          activeSection === "chapter4" ? "bg-[#e83a8e]" : ""
                        }`}
                      >
                        Building Emotional Connection
                      </Button>
                      <Button 
                        onClick={() => scrollToSection("chapter5")}
                        variant={activeSection === "chapter5" ? "default" : "ghost"}
                        className={`w-full justify-start text-sm h-auto py-2 ${
                          activeSection === "chapter5" ? "bg-[#e83a8e]" : ""
                        }`}
                      >
                        Navigating Challenges
                      </Button>
                    </nav>
                  </div>
                  
                  {/* Mobile Navigation Dropdown */}
                  <div className="lg:hidden">
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => setShowMobileNav(!showMobileNav)}
                    >
                      {activeSection === "introduction" ? "Introduction" : 
                       activeSection === "chapter1" ? "Know Yourself First" :
                       activeSection === "chapter2" ? "Science of Compatibility" :
                       activeSection === "chapter3" ? "Effective Communication" :
                       activeSection === "chapter4" ? "Building Emotional Connection" :
                       "Navigating Challenges"}
                      <div className="ml-2">
                        <svg 
                          width="15" 
                          height="15" 
                          viewBox="0 0 15 15" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className={`transform ${showMobileNav ? "rotate-180" : ""} transition-transform`}
                        >
                          <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" />
                        </svg>
                      </div>
                    </Button>
                    
                    {showMobileNav && (
                      <div className="border border-gray-200 rounded-md mt-2 overflow-hidden shadow-sm">
                        <nav className="flex flex-col py-1">
                          <button 
                            onClick={() => {
                              scrollToSection("introduction");
                              setShowMobileNav(false);
                            }}
                            className={`text-left px-3 py-2 text-sm ${
                              activeSection === "introduction" ? "bg-[#e83a8e]/10 text-[#e83a8e]" : ""
                            }`}
                          >
                            Introduction
                          </button>
                          <button 
                            onClick={() => {
                              scrollToSection("chapter1");
                              setShowMobileNav(false);
                            }}
                            className={`text-left px-3 py-2 text-sm ${
                              activeSection === "chapter1" ? "bg-[#e83a8e]/10 text-[#e83a8e]" : ""
                            }`}
                          >
                            Know Yourself First
                          </button>
                          <button 
                            onClick={() => {
                              scrollToSection("chapter2");
                              setShowMobileNav(false);
                            }}
                            className={`text-left px-3 py-2 text-sm ${
                              activeSection === "chapter2" ? "bg-[#e83a8e]/10 text-[#e83a8e]" : ""
                            }`}
                          >
                            Science of Compatibility
                          </button>
                          <button 
                            onClick={() => {
                              scrollToSection("chapter3");
                              setShowMobileNav(false);
                            }}
                            className={`text-left px-3 py-2 text-sm ${
                              activeSection === "chapter3" ? "bg-[#e83a8e]/10 text-[#e83a8e]" : ""
                            }`}
                          >
                            Effective Communication
                          </button>
                          <button 
                            onClick={() => {
                              scrollToSection("chapter4");
                              setShowMobileNav(false);
                            }}
                            className={`text-left px-3 py-2 text-sm ${
                              activeSection === "chapter4" ? "bg-[#e83a8e]/10 text-[#e83a8e]" : ""
                            }`}
                          >
                            Building Emotional Connection
                          </button>
                          <button 
                            onClick={() => {
                              scrollToSection("chapter5");
                              setShowMobileNav(false);
                            }}
                            className={`text-left px-3 py-2 text-sm ${
                              activeSection === "chapter5" ? "bg-[#e83a8e]/10 text-[#e83a8e]" : ""
                            }`}
                          >
                            Navigating Challenges
                          </button>
                        </nav>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="bg-[#e83a8e]/5 p-4 rounded-lg">
                      <h4 className="font-medium text-[#e83a8e] mb-2 flex items-center">
                        <Heart className="h-4 w-4 mr-2" />
                        Exclusive Member Access
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Access our complete library of relationship guides, templates, and exercises.
                      </p>
                      <Button className="w-full bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
                        Explore Resources
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToDatePage;