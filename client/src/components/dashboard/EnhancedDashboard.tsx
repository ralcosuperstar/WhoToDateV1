import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useFixedSupabase } from "@/contexts/FixedSupabaseContext";
import supabaseService from "@/services/supabaseService";
import directSupabaseService from "@/services/directSupabaseService";
import { ensureDatabaseSchema } from "@/lib/databaseFix";
import aanchalImage from "@/assets/Aanchal.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

// Import icons
import { 
  ChevronDown, 
  User, 
  FileText, 
  Calendar,
  BarChart3,
  Heart,
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
  MessageCircle,
  ChevronRight,
  ArrowRight,
  Clock3,
  Check,
  AlertTriangle,
  BookOpen
} from "lucide-react";

// Define types for clarity
interface UserProfile {
  id: string;
  username: string | null;
  email: string;
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
}

interface QuizData {
  id: number;
  user_id: string;
  answers: any;
  completed: boolean;
  started_at: string | null;
  completed_at: string | null;
}

interface ReportData {
  id: number;
  user_id: string;
  quiz_id: number;
  report: any;
  compatibility_color: string;
  is_paid: boolean;
}

// New component for welcome banner
const WelcomeBanner = ({ name }: { name: string }) => (
  <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#e83a8e] to-[#e83a8e]/80 mb-6">
    <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-sm"></div>
    <div className="relative z-10 px-6 py-8 text-white">
      <h1 className="font-heading font-bold text-2xl sm:text-3xl mb-2">
        Welcome, {name}!
      </h1>
      <p className="text-white/90 max-w-lg">
        Your journey to better relationships starts here. Explore your profile, check your compatibility report, or connect with a relationship counselor.
      </p>
    </div>
  </div>
);

// Quick Actions component
const QuickActions = ({ hasCompletedQuiz, hasReport }: { hasCompletedQuiz: boolean, hasReport: boolean }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
    {!hasCompletedQuiz && (
      <Card className="border-2 border-[#e83a8e]/30 bg-[#e83a8e]/5 hover:bg-[#e83a8e]/10 transition-colors">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="bg-[#e83a8e]/10 w-10 h-10 rounded-full flex items-center justify-center mb-3 mt-2">
            <FileText className="w-5 h-5 text-[#e83a8e]" />
          </div>
          <h3 className="font-medium mb-1">Take Compatibility Quiz</h3>
          <p className="text-sm text-neutral-dark/70 mb-3">Discover your relationship profile in 5 minutes</p>
          <Button asChild className="mt-auto w-full bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
            <Link href="/quiz">Start Quiz</Link>
          </Button>
        </CardContent>
      </Card>
    )}

    {hasCompletedQuiz && hasReport && (
      <Card className="border-2 border-[#e83a8e]/30 bg-[#e83a8e]/5 hover:bg-[#e83a8e]/10 transition-colors">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="bg-[#e83a8e]/10 w-10 h-10 rounded-full flex items-center justify-center mb-3 mt-2">
            <BarChart3 className="w-5 h-5 text-[#e83a8e]" />
          </div>
          <h3 className="font-medium mb-1">View Full Report</h3>
          <p className="text-sm text-neutral-dark/70 mb-3">Explore your detailed compatibility insights</p>
          <Button asChild className="mt-auto w-full bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
            <Link href="/report">View Report</Link>
          </Button>
        </CardContent>
      </Card>
    )}

    <Card className="overflow-hidden group hover:shadow-md transition-all duration-300 border-[#e83a8e]/20">
      <div className="flex">
        <div className="w-[70%] p-4">
          <h3 className="font-medium text-[#e83a8e] mb-2">Need a Counselor?</h3>
          
          <ul className="space-y-2 mb-3 text-sm">
            <li className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Personal guidance from certified experts</span>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Confidential relationship advice</span>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Flexible scheduling options available</span>
            </li>
          </ul>
          
          <Button 
            asChild 
            size="sm"
            className="w-full bg-[#e83a8e] hover:bg-[#d02e7d] text-white text-sm"
          >
            <Link href="/counselling" className="flex items-center justify-center">
              Book a Session
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
        
        <div className="w-[30%] relative overflow-hidden">
          <img 
            src={aanchalImage} 
            alt="Aanchal Malani - Relationship Counselor" 
            className="w-full h-full object-cover object-center" 
            style={{ objectPosition: "center 25%" }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent p-2">
            <p className="text-white text-xs font-medium">Aanchal</p>
            <p className="text-white/80 text-[10px]">Certified Counselor</p>
          </div>
        </div>
      </div>
    </Card>

    <Card className="overflow-hidden group hover:shadow-md transition-all duration-300 border-amber-500/20 hover:border-amber-500/40">
      <div className="p-4 sm:p-5">
        <div className="flex items-center mb-2">
          <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-semibold text-lg text-amber-600 group-hover:text-amber-700 transition-colors">Relationship Blog</h3>
        </div>
        <p className="text-sm text-neutral-dark/80 mb-4">Expert advice, relationship tips, and insights from dating professionals</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-amber-50 text-amber-600 whitespace-nowrap group-hover:bg-amber-100 transition-colors">
            Dating Tips
          </Badge>
          <Badge variant="outline" className="bg-amber-50 text-amber-600 whitespace-nowrap group-hover:bg-amber-100 transition-colors">
            Relationship Advice
          </Badge>
        </div>
        
        <Button 
          asChild 
          variant="outline" 
          className="w-full border-amber-200 text-amber-700 hover:bg-amber-50 group-hover:border-amber-300 transition-colors"
        >
          <Link href="/blog" className="flex items-center justify-center">
            Browse Articles
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </Card>
    
    <Card className="overflow-hidden group hover:shadow-md transition-all duration-300 border-blue-500/20 hover:border-blue-500/40">
      <div className="p-4 sm:p-5">
        <div className="flex items-center mb-2">
          <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg text-blue-600 group-hover:text-blue-700 transition-colors">Dating Guide</h3>
        </div>
        <p className="text-sm text-neutral-dark/80 mb-4">Comprehensive eBook with everything you need to know about modern dating</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-600 whitespace-nowrap group-hover:bg-blue-100 transition-colors">
            5 Chapters
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-600 whitespace-nowrap group-hover:bg-blue-100 transition-colors">
            Practical Tips
          </Badge>
        </div>
        
        <Button 
          asChild 
          variant="outline" 
          className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 group-hover:border-blue-300 transition-colors"
        >
          <Link href="/howtodate" className="flex items-center justify-center">
            Read Guide
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </Card>
  </div>
);

// Enhanced Dating Guide component to replace Progress Card
const EnhancedDatingGuide = () => {
  const chapters = [
    { title: "Understanding Modern Dating", description: "Navigate the evolving landscape of relationships" },
    { title: "Building Authentic Connections", description: "Develop meaningful bonds beyond surface-level attraction" },
    { title: "Communication & Boundaries", description: "Master the art of healthy expression and respect" },
    { title: "Recognizing Red & Green Flags", description: "Identify signs of healthy and unhealthy dynamics" },
    { title: "Nurturing Long-Term Relationships", description: "Sustain love through challenges and growth" }
  ];
  
  return (
    <Card className="mb-6 overflow-hidden group hover:shadow-md transition-all duration-300 border-blue-500/20 hover:border-blue-500/40">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
        <div className="flex items-center">
          <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-xl text-blue-700">Complete Dating Approach Guide</h3>
            <p className="text-blue-600/80 text-sm">5 comprehensive chapters on modern relationship dynamics</p>
          </div>
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="space-y-3 mb-5">
          {chapters.map((chapter, index) => (
            <div key={index} className="flex items-center p-2 rounded-md hover:bg-blue-50 transition-colors group-hover:translate-x-1" style={{ transitionDelay: `${index * 50}ms` }}>
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-sm font-medium text-blue-700">{index + 1}</span>
              </div>
              <div>
                <p className="font-medium text-neutral-dark">{chapter.title}</p>
                <p className="text-xs text-neutral-dark/70">{chapter.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-600 whitespace-nowrap group-hover:bg-blue-100 transition-colors">
            Interactive Exercises
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-600 whitespace-nowrap group-hover:bg-blue-100 transition-colors">
            Real-life Examples
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-600 whitespace-nowrap group-hover:bg-blue-100 transition-colors">
            Expert Insights
          </Badge>
        </div>
        
        <Button 
          asChild 
          variant="outline" 
          className="w-full mt-2 border-blue-200 text-blue-700 hover:bg-blue-50 group-hover:border-blue-300 transition-colors"
        >
          <Link href="/howtodate" className="flex items-center justify-center">
            Read Complete Guide
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

// Profile summary component
const ProfileSummary = ({ profile }: { profile: UserProfile }) => (
  <Card className="group hover:shadow-md transition-all duration-300 border-[#e83a8e]/20 hover:border-[#e83a8e]/40">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg flex items-center">
        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-[#e83a8e]/10 group-hover:scale-110 transition-transform">
          <User className="w-5 h-5 text-[#e83a8e]" />
        </div>
        <span className="text-[#e83a8e] group-hover:text-[#d02e7d] transition-colors">Profile Summary</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        <Avatar className="w-16 h-16 border-2 border-[#e83a8e]/20 group-hover:border-[#e83a8e]/40 transition-colors">
          <AvatarFallback className="bg-[#e83a8e]/10 text-[#e83a8e] text-lg font-medium group-hover:bg-[#e83a8e]/20 transition-colors">
            {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : profile.email.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-medium mb-1 group-hover:text-[#e83a8e]/90 transition-colors">{profile.full_name || profile.username}</h3>
          <p className="text-sm text-neutral-dark/70 mb-2">{profile.email}</p>
          {profile.phone_number && (
            <p className="text-sm text-neutral-dark/70">{profile.phone_number}</p>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge variant="outline" className="bg-[#e83a8e]/5 text-[#e83a8e] group-hover:bg-[#e83a8e]/10 transition-colors">
          Profile Active
        </Badge>
        <Badge variant="outline" className="bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
          Email Verified
        </Badge>
      </div>
    </CardContent>
    <CardFooter className="flex justify-end pt-0">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-sm text-[#e83a8e] group-hover:bg-[#e83a8e]/5 transition-colors flex items-center"
      >
        Edit Profile
        <ArrowRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </Button>
    </CardFooter>
  </Card>
);

// Mobile navigation menu
const MobileNavMenu = ({ 
  activeTab,
  setActiveTab,
  handleLogout
}: {
  activeTab: string,
  setActiveTab: (tab: string) => void,
  handleLogout: () => void
}) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" className="md:hidden p-2 bg-white border-[#e83a8e]/20 hover:bg-[#e83a8e]/5">
        <Menu className="h-6 w-6 text-[#e83a8e]" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-[80%] sm:w-[350px] bg-white border-r shadow-lg">
      <div className="absolute right-4 top-4">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-dark/60 hover:text-[#e83a8e] hover:bg-[#e83a8e]/10 rounded-full">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <SheetHeader className="mb-6">
        <SheetTitle className="flex items-center text-[#e83a8e]">
          <Heart className="w-5 h-5 mr-2 fill-[#e83a8e]" />
          WhoToDate
        </SheetTitle>
        <SheetDescription>
          Discover your compatibility profile
        </SheetDescription>
      </SheetHeader>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <nav className="space-y-1 pr-4">
          <Button
            variant={activeTab === "overview" ? "secondary" : "ghost"}
            className="w-full justify-start h-auto py-2.5"
            onClick={() => setActiveTab("overview")}
          >
            <BarChart3 className="min-w-5 h-5 mr-2" />
            <span className="text-sm whitespace-normal text-left">Overview</span>
          </Button>
          <Button
            variant={activeTab === "profile" ? "secondary" : "ghost"}
            className="w-full justify-start h-auto py-2.5"
            onClick={() => setActiveTab("profile")}
          >
            <User className="min-w-5 h-5 mr-2" />
            <span className="text-sm whitespace-normal text-left">Profile</span>
          </Button>
          <Button
            variant={activeTab === "report" ? "secondary" : "ghost"}
            className="w-full justify-start h-auto py-2.5"
            onClick={() => setActiveTab("report")}
          >
            <FileText className="min-w-5 h-5 mr-2" />
            <span className="text-sm whitespace-normal text-left">Compatibility Report</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start h-auto py-2.5"
            asChild
          >
            <Link href="/counselling">
              <MessageCircle className="min-w-5 h-5 mr-2" />
              <span className="text-sm whitespace-normal text-left">Talk to a Counselor</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start h-auto py-2.5"
            asChild
          >
            <Link href="/blog">
              <Calendar className="min-w-5 h-5 mr-2" />
              <span className="text-sm whitespace-normal text-left">Relationship Blog</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start h-auto py-2.5"
            asChild
          >
            <Link href="/howtodate">
              <BookOpen className="min-w-5 h-5 mr-2" />
              <span className="text-sm whitespace-normal text-left">Dating Guide</span>
            </Link>
          </Button>
        </nav>
      </ScrollArea>
      <div className="absolute bottom-4 left-4 right-4">
        <Button 
          variant="destructive" 
          className="w-full justify-start h-auto py-2.5"
          onClick={handleLogout}
        >
          <LogOut className="min-w-5 h-5 mr-2" />
          <span className="text-sm whitespace-normal text-left">Log Out</span>
        </Button>
      </div>
    </SheetContent>
  </Sheet>
);

// Compatibility card summary component
const CompatibilitySummaryCard = ({ report }: { report: ReportData }) => {
  const color = report.compatibility_color || 'yellow';
  
  const title = !report.compatibility_color ? 'Your Compatibility Profile' :
                report.compatibility_color === 'green' ? 'Adaptable & Balanced' : 
                report.compatibility_color === 'yellow' ? 'Selective & Specific' : 
                'Particular & Defined';
  
  const traits = [
    { name: "Openness", value: 75 },
    { name: "Emotional Stability", value: 68 },
    { name: "Communication", value: 82 }
  ];
  
  const getColorClass = () => {
    switch(color) {
      case 'green': return 'bg-gradient-to-r from-emerald-500 to-teal-500';
      case 'red': return 'bg-gradient-to-r from-rose-500 to-pink-500';
      default: return 'bg-gradient-to-r from-amber-500 to-yellow-500';
    }
  };
  
  return (
    <Card className="overflow-hidden group hover:shadow-md transition-all duration-300 border-amber-500/20 hover:border-amber-500/40">
      <div className={`${getColorClass()} px-6 py-4 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors"></div>
        <div className="relative z-10">
          <h3 className="font-bold text-xl group-hover:scale-105 transform transition-transform origin-left">{title}</h3>
          <p className="text-white/90 text-sm">Your compatibility profile is ready</p>
        </div>
      </div>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {traits.map((trait, index) => (
            <div key={trait.name} className="space-y-1 group-hover:translate-x-1 transition-transform" style={{ transitionDelay: `${index * 50}ms` }}>
              <div className="flex justify-between text-sm">
                <span>{trait.name}</span>
                <span className="font-medium">{trait.value}%</span>
              </div>
              <div className="w-full bg-neutral-dark/10 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-[#e83a8e] h-2 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" 
                  style={{ 
                    width: `${trait.value}%`,
                    transitionDelay: `${index * 100 + 200}ms`,
                    transform: 'scaleX(1)' // Initial state, will be overridden by hover
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          asChild 
          className="w-full mt-6 bg-[#e83a8e] hover:bg-[#d02e7d] text-white group-hover:shadow-md transition-all duration-300"
        >
          <Link href="/results" className="flex items-center justify-center">
            View Full Report 
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

// Enhanced Dashboard component
// Profile Edit Form
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  phoneNumber: z.string().regex(/^(\+\d{1,3}[ -]?)?\d{10}$/, {
    message: "Please enter a valid phone number (e.g., +911234567890 or 1234567890)",
  }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

const ProfileEditForm = ({ profile }: { profile: UserProfile }) => {
  const { toast } = useToast();
  const { user } = useFixedSupabase();
  
  // Default values from existing profile
  const defaultValues: Partial<ProfileFormValues> = {
    firstName: profile?.first_name || "",
    lastName: profile?.last_name || "",
    phoneNumber: profile?.phone_number || "",
  };
  
  // Initialize form with default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  // Setup mutation for profile updates
  const updateProfileMutation = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      if (!user) throw new Error("Not authenticated");
      
      // Map form values to database fields
      const userData = {
        first_name: values.firstName,
        last_name: values.lastName,
        phone_number: values.phoneNumber,
        // Combine first and last name into full_name for backward compatibility
        full_name: `${values.firstName} ${values.lastName}`.trim()
      };
      
      // First try to fix the database schema if needed (add updated_at column)
      console.log("Attempting to fix database schema before updating profile...");
      try {
        const fixResult = await ensureDatabaseSchema();
        if (fixResult.success) {
          console.log("Successfully applied database schema fix:", fixResult.message);
        } else {
          console.log("Database schema fix was not needed or did not succeed:", fixResult.message);
        }
      } catch (fixError) {
        console.error("Failed to fix database schema, but continuing with update:", fixError);
      }
      
      // Proceed with the profile update
      const result = await directSupabaseService.user.updateUserProfile(user.id, userData);
      if (result.error) throw new Error(result.error.message);
      return result.user;
    },
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated.",
      });
      
      // Invalidate queries to refresh user data
      queryClient.invalidateQueries({ queryKey: ['/api/user'] });
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message || "An error occurred while updating your profile.",
        variant: "destructive",
      });
    }
  });
  
  // Handle form submission
  const onSubmit = (values: ProfileFormValues) => {
    updateProfileMutation.mutate(values);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+91XXXXXXXXXX" {...field} />
              </FormControl>
              <FormDescription>
                Enter your phone number with country code (e.g., +91XXXXXXXXXX)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-[#e83a8e] hover:bg-[#d02e7d] text-white"
          disabled={updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending ? (
            <>
              <span className="mr-2">Updating...</span>
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            </>
          ) : "Save Profile Information"}
        </Button>
      </form>
    </Form>
  );
};

const EnhancedDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  // Auth context - use fixed Supabase context
  const { user, signOut } = useFixedSupabase();
  
  // Local state for data
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<QuizData | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);
  
  // Loading states
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isQuizLoading, setIsQuizLoading] = useState(true);
  const [isReportLoading, setIsReportLoading] = useState(true);
  
  // Error states
  const [profileError, setProfileError] = useState<Error | null>(null);
  const [quizError, setQuizError] = useState<Error | null>(null);
  const [reportError, setReportError] = useState<Error | null>(null);
  
  // Add a timeout to prevent infinite loading
  useEffect(() => {
    // Check if we're still loading after 5 seconds
    const timeout = setTimeout(() => {
      if (isProfileLoading) {
        console.log('Dashboard: Profile loading timeout reached');
        setIsProfileLoading(false);
        
        // Set fallback data from auth user if available
        if (user) {
          setUserProfile({
            id: user.id,
            username: user.email?.split('@')[0] || 'user',
            email: user.email || '',
            full_name: user.user_metadata?.full_name || null,
            first_name: null,
            last_name: null,
            phone_number: user.phone || null
          });
        }
      }
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [isProfileLoading, user]);

  // Fetch user profile from database
  useEffect(() => {
    const fetchUserProfile = async () => {
      // If no user, or if profile is already loaded, exit early
      if (!user) {
        setIsProfileLoading(false);
        return;
      }
      
      try {
        setIsProfileLoading(true);
        console.log('Fetching user profile for:', user.id);
        const { user: profile, error } = await supabaseService.user.getUserById(user.id);
        
        if (error) {
          console.error('Error fetching user profile:', error);
          setProfileError(error instanceof Error ? error : new Error(String(error)));
          
          // Fallback to basic profile from auth
          setUserProfile({
            id: user.id,
            username: user.email?.split('@')[0] || 'user',
            email: user.email || '',
            full_name: user.user_metadata?.full_name || null,
            first_name: null,
            last_name: null,
            phone_number: user.phone || null
          });
        } else if (profile) {
          console.log('User profile loaded:', profile);
          // Safely convert the profile data to UserProfile type
          const safeProfile = {
            id: typeof profile.id === 'string' ? profile.id : user.id || '',
            username: typeof profile.username === 'string' ? profile.username : 
                      (typeof profile.email === 'string' ? profile.email.split('@')[0] : 
                      (typeof user.email === 'string' ? user.email.split('@')[0] : 'user')),
            email: typeof profile.email === 'string' ? profile.email : user.email || '',
            full_name: typeof profile.full_name === 'string' ? profile.full_name : 
                      (user.user_metadata && typeof user.user_metadata.full_name === 'string' ? 
                      user.user_metadata.full_name : null),
            first_name: typeof profile.first_name === 'string' ? profile.first_name : null,
            last_name: typeof profile.last_name === 'string' ? profile.last_name : null,
            phone_number: typeof profile.phone_number === 'string' ? profile.phone_number : 
                         (typeof user.phone === 'string' ? user.phone : null)
          };
          setUserProfile(safeProfile);
        }
      } catch (error) {
        console.error('Error in fetchUserProfile:', error);
        setProfileError(error instanceof Error ? error : new Error(String(error)));
        
        // Still set a fallback profile on error
        if (user) {
          setUserProfile({
            id: user.id,
            username: user.email?.split('@')[0] || 'user',
            email: user.email || '',
            full_name: user.user_metadata?.full_name || null,
            first_name: null,
            last_name: null,
            phone_number: user.phone || null
          });
        }
      } finally {
        setIsProfileLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [user]);
  
  // Fetch quiz answers
  useEffect(() => {
    const fetchQuizAnswers = async () => {
      if (!user) {
        setIsQuizLoading(false);
        return;
      }
      
      try {
        setIsQuizLoading(true);
        console.log('Fetching quiz answers for:', user.id);
        // Get Supabase client first
        const supabase = await supabaseService.auth.getClient();
        // Call the method correctly with supabase client and user ID
        const answers = await supabaseService.quiz.getQuizAnswers(supabase, user.id);
        
        console.log('Quiz answers loaded:', answers);
        if (answers) {
          // Convert the quiz answers to the expected format
          setQuizAnswers({
            id: answers.id || 0,
            user_id: answers.userId || user.id,
            answers: answers.answers || {},
            completed: answers.completed || false,
            started_at: answers.startedAt ? answers.startedAt.toString() : null,
            completed_at: answers.completedAt ? answers.completedAt.toString() : null
          });
        }
      } catch (error) {
        console.error('Error in fetchQuizAnswers:', error);
        setQuizError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsQuizLoading(false);
      }
    };
    
    fetchQuizAnswers();
  }, [user]);
  
  // Fetch report
  useEffect(() => {
    const fetchReport = async () => {
      if (!user) {
        setIsReportLoading(false);
        return;
      }
      
      try {
        setIsReportLoading(true);
        console.log('Fetching report for:', user.id);
        // Get Supabase client first
        const supabase = await supabaseService.auth.getClient();
        // Call the method correctly with supabase client and user ID
        const reportData = await supabaseService.report.getReport(supabase, user.id);
        
        console.log('Report loaded:', reportData);
        if (reportData) {
          // Safely convert report data to expected format
          setReport({
            id: reportData.id || 0,
            user_id: reportData.userId || user.id,
            quiz_id: reportData.quizId || 0,
            report: reportData.report || {},
            compatibility_color: reportData.compatibilityColor || 'yellow',
            is_paid: reportData.isPaid || true // Reports are now free
          });
        }
      } catch (error) {
        console.error('Error in fetchReport:', error);
        setReportError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsReportLoading(false);
      }
    };
    
    fetchReport();
  }, [user]);
  
  // Handle logout
  const handleLogout = async () => {
    try {
      console.log("Dashboard: Starting logout process");
      
      // Show toast first for immediate feedback
      toast({
        title: "Logging out...",
        description: "Please wait while we log you out",
      });
      
      // Clear any local storage/cookies
      localStorage.removeItem("supabase.auth.token");
      localStorage.removeItem("supabase.auth.expires_at");
      
      // Clear any session cookies
      document.cookie = "sb-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "sb-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Call the signOut method
      await signOut();
      
      console.log("Dashboard: Logout completed successfully");
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      
      // Use replace to force a clean page load without keeping history
      setTimeout(() => {
        window.location.replace("/");
      }, 300);
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
      
      // Even if there's an error, try to navigate home
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    }
  };
  
  // Show loading state
  if (isProfileLoading || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#e83a8e]/30 border-t-[#e83a8e] rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Show error state if user is not authenticated
  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="font-heading font-bold text-xl mb-4">User not found</h2>
        <p className="mb-6">Please log in to view your dashboard.</p>
        <Button asChild className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
          <Link href="/auth">Log In</Link>
        </Button>
      </div>
    );
  }
  
  // Derived state for UI decisions
  const hasCompletedQuiz = quizAnswers?.completed || false;
  const hasReport = report !== null;
  
  // Helper function to get display name
  const getDisplayName = () => {
    return userProfile.full_name || userProfile.username || userProfile.email.split('@')[0];
  };
  
  return (
    <div className="container mx-auto px-4 pt-4 pb-8 md:pt-6 md:pb-12">
      {/* Mobile navigation header */}
      <div className="flex justify-between items-center mb-8 md:hidden">
        <h1 className="font-heading font-bold text-xl flex items-center">
          <Heart className="w-5 h-5 mr-2 fill-[#e83a8e] text-[#e83a8e]" />
          <span className="text-[#e83a8e]">WhoToDate</span>
        </h1>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#e83a8e]/10 text-[#e83a8e]">
                    {userProfile.full_name ? userProfile.full_name.charAt(0).toUpperCase() : userProfile.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/results">My Report</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <MobileNavMenu 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleLogout={handleLogout}
          />
        </div>
      </div>
      
      {/* Desktop layout with sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar - Desktop only */}
        <div className="hidden md:block md:col-span-3 lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-24">
            <div className="mb-6">
              <h3 className="font-heading font-bold text-lg flex items-center text-[#e83a8e]">
                <Heart className="w-5 h-5 mr-2 fill-[#e83a8e]" />
                WhoToDate
              </h3>
            </div>
            
            <nav className="space-y-1 mb-6">
              <Button
                variant={activeTab === "overview" ? "secondary" : "ghost"}
                className="w-full justify-start h-auto py-2.5"
                onClick={() => setActiveTab("overview")}
              >
                <BarChart3 className="min-w-5 h-5 mr-2" />
                <span className="text-sm whitespace-normal text-left">Overview</span>
              </Button>
              <Button
                variant={activeTab === "profile" ? "secondary" : "ghost"}
                className="w-full justify-start h-auto py-2.5"
                onClick={() => setActiveTab("profile")}
              >
                <User className="min-w-5 h-5 mr-2" />
                <span className="text-sm whitespace-normal text-left">Profile</span>
              </Button>
              <Button
                variant={activeTab === "report" ? "secondary" : "ghost"}
                className="w-full justify-start h-auto py-2.5"
                onClick={() => setActiveTab("report")}
              >
                <FileText className="min-w-5 h-5 mr-2" />
                <span className="text-sm whitespace-normal text-left">Compatibility Report</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-auto py-2.5"
                asChild
              >
                <Link href="/counselling">
                  <MessageCircle className="min-w-5 h-5 mr-2" />
                  <span className="text-sm whitespace-normal text-left">Talk to a Counselor</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start h-auto py-2.5"
                asChild
              >
                <Link href="/blog">
                  <Calendar className="min-w-5 h-5 mr-2" />
                  <span className="text-sm whitespace-normal text-left">Relationship Tips</span>
                </Link>
              </Button>
            </nav>
            
            <div className="pt-4 border-t">
              <Button 
                variant="destructive" 
                className="w-full justify-start h-auto py-2.5"
                onClick={handleLogout}
              >
                <LogOut className="min-w-5 h-5 mr-2" />
                <span className="text-sm whitespace-normal text-left">Log Out</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="md:col-span-9 lg:col-span-10">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <WelcomeBanner name={getDisplayName()} />
              
              <QuickActions 
                hasCompletedQuiz={hasCompletedQuiz}
                hasReport={hasReport}
              />
              
              <div className="grid grid-cols-1 gap-6">
                <EnhancedDatingGuide />
                
                {/* Only show compatibility summary if report exists */}
                {hasReport && report && (
                  <CompatibilitySummaryCard report={report} />
                )}
              </div>
            </div>
          )}
          
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4">
                Your Profile
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProfileSummary profile={userProfile} />
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <User className="w-5 h-5 mr-2 text-[#e83a8e]" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal information that appears on your profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProfileEditForm profile={userProfile} />
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-[#e83a8e]" />
                    Assessment History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {hasCompletedQuiz ? (
                    <div className="border rounded-lg divide-y">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
                        <div>
                          <h4 className="font-medium">Compatibility Assessment</h4>
                          <p className="text-sm text-neutral-dark/70">
                            Completed on {quizAnswers?.completed_at ? new Date(quizAnswers.completed_at).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center">
                          <Badge className="bg-green-100 text-green-800 mr-3">Completed</Badge>
                          <Button asChild variant="ghost" size="sm" className="text-[#e83a8e]">
                            <Link href="/quiz">Review</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="mb-3 text-neutral-dark/70">
                        <Calendar className="w-10 h-10 mx-auto mb-2" />
                        <p>No assessments completed yet</p>
                      </div>
                      <Button asChild className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
                        <Link href="/quiz">Take Assessment</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Report Tab */}
          {activeTab === "report" && (
            <div className="space-y-6">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl mb-4">
                Compatibility Report
              </h2>
              
              {isReportLoading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="w-8 h-8 border-4 border-[#e83a8e]/30 border-t-[#e83a8e] rounded-full animate-spin"></div>
                </div>
              ) : reportError ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                      Error Loading Report
                    </CardTitle>
                    <CardDescription>
                      We couldn't load your compatibility report.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">This could be because:</p>
                    <ul className="list-disc pl-5 mb-6 space-y-1">
                      <li>You haven't completed the assessment</li>
                      <li>There was a temporary server issue</li>
                      <li>Your session needs to be refreshed</li>
                    </ul>
                    <Button asChild className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
                      <Link href="/quiz">Take Assessment</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : report ? (
                <div className="space-y-6">
                  {/* All reports are now free, so we always show the compatibility card and report button */}
                  <Card className="overflow-hidden">
                    <div className={`${
                      report.compatibility_color === 'green' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                      report.compatibility_color === 'red' ? 'bg-gradient-to-r from-rose-500 to-pink-500' :
                      'bg-gradient-to-r from-amber-500 to-yellow-500'
                    } px-6 py-8 text-white`}>
                      <h3 className="font-bold text-2xl mb-2">{
                        !report.compatibility_color ? 'Your Compatibility Profile' :
                        report.compatibility_color === 'green' ? 'Adaptable & Balanced' : 
                        report.compatibility_color === 'yellow' ? 'Selective & Specific' : 
                        'Particular & Defined'
                      }</h3>
                      <p className="text-white/90">
                        This is a summary of your compatibility profile based on the assessment you completed.
                      </p>
                    </div>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">Key Compatibility Traits</h4>
                          <div className="space-y-4">
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Openness</span>
                                <span className="font-medium">75%</span>
                              </div>
                              <div className="w-full bg-neutral-dark/10 rounded-full h-2">
                                <div 
                                  className="bg-[#e83a8e] h-2 rounded-full" 
                                  style={{ width: '75%' }}
                                ></div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Emotional Stability</span>
                                <span className="font-medium">68%</span>
                              </div>
                              <div className="w-full bg-neutral-dark/10 rounded-full h-2">
                                <div 
                                  className="bg-[#e83a8e] h-2 rounded-full" 
                                  style={{ width: '68%' }}
                                ></div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Communication</span>
                                <span className="font-medium">82%</span>
                              </div>
                              <div className="w-full bg-neutral-dark/10 rounded-full h-2">
                                <div 
                                  className="bg-[#e83a8e] h-2 rounded-full" 
                                  style={{ width: '82%' }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Button asChild className="w-full bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
                          <Link href="/results">
                            View Full Detailed Report <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Relationship Style</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-neutral-dark/80">
                          Your attachment style influences how you connect with partners.
                        </p>
                        <Button asChild variant="link" className="px-0 text-[#e83a8e]">
                          <Link href="/results">Learn more</Link>
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Communication Pattern</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-neutral-dark/80">
                          Your unique way of expressing needs and resolving conflicts.
                        </p>
                        <Button asChild variant="link" className="px-0 text-[#e83a8e]">
                          <Link href="/results">Learn more</Link>
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Growth Areas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-neutral-dark/80">
                          Opportunities to enhance your relationship satisfaction.
                        </p>
                        <Button asChild variant="link" className="px-0 text-[#e83a8e]">
                          <Link href="/results">Learn more</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>No Report Available</CardTitle>
                    <CardDescription>
                      You haven't completed the compatibility assessment yet.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6">
                      Take our compatibility assessment to discover your unique relationship profile
                      and receive personalized insights.
                    </p>
                    <Button asChild className="bg-[#e83a8e] hover:bg-[#d02e7d] text-white">
                      <Link href="/quiz">Take Assessment</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;