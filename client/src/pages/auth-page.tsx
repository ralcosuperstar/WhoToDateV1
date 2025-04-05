import { useState, useEffect } from "react";
import { useLocation, useRoute, useRouter } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Heart, Mail, Lock, User, Calendar, UserRound } from "lucide-react";

// Define our validation schemas
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z.string().refine(value => {
    // Basic date validation, further validation could be added
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  }, {
    message: "Date of birth must be in the format YYYY-MM-DD"
  }),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"], {
    errorMap: () => ({ message: "Please select a gender" })
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  // Get tab from URL query parameter
  const queryParams = new URLSearchParams(window.location.search);
  const tabParam = queryParams.get('tab');
  
  const [activeTab, setActiveTab] = useState<string>(tabParam === 'register' ? 'register' : 'login');
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const { user, isLoading, loginMutation, registerMutation } = useAuth();
  
  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  // Initialize form with react-hook-form and zod validation
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "prefer-not-to-say",
      password: "",
      confirmPassword: ""
    }
  });
  
  // Handle login form submission
  async function onLoginSubmit(data: LoginFormValues) {
    try {
      await loginMutation.mutateAsync(data);
      toast({
        title: "Login successful!",
        description: "Welcome back to WhoToDate.",
        variant: "default"
      });
      navigate("/dashboard");
    } catch (error) {
      // Error handling is done in the mutation error callback in useAuth
      console.error(error);
    }
  }
  
  // Handle registration form submission
  async function onRegisterSubmit(data: RegisterFormValues) {
    try {
      // Remove confirmPassword field before sending to API
      const { confirmPassword, ...submitData } = data;
      
      await registerMutation.mutateAsync(submitData);
      toast({
        title: "Registration successful!",
        description: "Welcome to WhoToDate. Your account has been created.",
        variant: "default"
      });
      navigate("/dashboard");
    } catch (error) {
      // Error handling is done in the mutation error callback in useAuth
      console.error(error);
    }
  }
  
  // If already logged in and waiting for redirect
  if (user || isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12 mt-16 max-w-full overflow-x-hidden">
      <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
        {/* Left column: Auth forms */}
        <div className="flex flex-col justify-center space-y-6 w-full">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Welcome to WhoToDate</h1>
            <p className="text-gray-500">
              Sign in to your account or create a new one to discover your relationship compatibility profile.
            </p>
          </div>
          
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            {/* Login Form */}
            <TabsContent value="login" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Login to your account</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your compatibility profile.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  placeholder="johndoe" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center space-y-2">
                  <div className="text-sm text-gray-500">
                    Don't have an account?{" "}
                    <button 
                      className="text-primary hover:underline" 
                      onClick={() => setActiveTab("register")}
                    >
                      Register
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Registration Form */}
            <TabsContent value="register" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create a new account</CardTitle>
                  <CardDescription>
                    Register to discover your relationship compatibility profile.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  placeholder="johndoe" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  type="email" 
                                  placeholder="john.doe@example.com" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* First Name Field */}
                      <FormField
                        control={registerForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <UserRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  placeholder="John" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Last Name Field */}
                      <FormField
                        control={registerForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <UserRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  placeholder="Doe" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Date of Birth Field */}
                      <FormField
                        control={registerForm.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  type="date" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Gender Field */}
                      <FormField
                        control={registerForm.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-center space-y-2">
                  <div className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <button 
                      className="text-primary hover:underline" 
                      onClick={() => setActiveTab("login")}
                    >
                      Log in
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right column: Hero/promo image */}
        <div className="hidden md:flex flex-col justify-center">
          <div className="rounded-lg bg-gradient-to-br from-pink-100 to-rose-200 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary">
              <Heart className="h-8 w-8" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Discover Your Compatibility Profile</h2>
            <p className="mb-6 text-gray-700">
              Take our scientifically designed compatibility assessment to understand your unique relationship style, strengths, and potential challenges.
            </p>
            <div className="space-y-4">
              <div className="rounded-md bg-white/90 p-4">
                <h3 className="mb-1 font-semibold">✨ Personalized Results</h3>
                <p className="text-sm text-gray-600">
                  Get detailed insights into your relationship patterns and personality traits.
                </p>
              </div>
              <div className="rounded-md bg-white/90 p-4">
                <h3 className="mb-1 font-semibold">🔍 Scientific Approach</h3>
                <p className="text-sm text-gray-600">
                  Based on attachment theory, personality psychology, and relationship research.
                </p>
              </div>
              <div className="rounded-md bg-white/90 p-4">
                <h3 className="mb-1 font-semibold">🌟 Find Better Matches</h3>
                <p className="text-sm text-gray-600">
                  Understand which relationship dynamics will help you thrive and find happiness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}