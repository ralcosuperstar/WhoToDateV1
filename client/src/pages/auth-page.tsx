import { useState, useEffect, useCallback } from "react";
import { useLocation, useRouter } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, Smartphone, User, Mail } from "lucide-react";

// Phone input validation
const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format

// Define validation schemas
const phoneSchema = z.object({
  phoneNumber: z.string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(phoneRegex, "Must be a valid Indian mobile number"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

const registrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;
type RegistrationFormValues = z.infer<typeof registrationSchema>;

export default function AuthPage() {
  // Router
  const [location, navigate] = useLocation();
  
  // Auth states
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  
  // Flow states
  const [activeTab, setActiveTab] = useState<string>("login");
  const [authStep, setAuthStep] = useState<"phone" | "otp" | "register">("phone");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isExistingUser, setIsExistingUser] = useState<boolean | null>(null);
  
  // Form initialization
  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "",
    }
  });
  
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    }
  });
  
  const registrationForm = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: ""
    }
  });
  
  // If already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  
  // Request OTP mutation
  const requestOtpMutation = useMutation({
    mutationFn: async (data: PhoneFormValues) => {
      const forFlow = activeTab === "login" ? "login" : "registration";
      const res = await apiRequest("POST", `/api/request-otp?for=${forFlow}`, data);
      return await res.json();
    },
    onSuccess: (data) => {
      setPhoneNumber(phoneForm.getValues().phoneNumber);
      setAuthStep("otp");
      toast({
        title: "OTP Sent",
        description: "Enter the 6-digit code sent to your phone",
      });
    },
    onError: (error: any) => {
      // Handle specific errors
      if (error.message?.includes("already registered")) {
        setIsExistingUser(true);
        toast({
          title: "Phone number already registered",
          description: "This phone number is already in use. Try logging in instead.",
          variant: "destructive",
        });
      } else if (error.message?.includes("not found")) {
        setIsExistingUser(false);
        toast({
          title: "Phone number not registered",
          description: "No account found with this number. Register first.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error sending OTP",
          description: error.message || "Please try again later",
          variant: "destructive",
        });
      }
    },
  });
  
  // Verify OTP mutation
  const verifyOtpMutation = useMutation({
    mutationFn: async (data: { phoneNumber: string; otp: string; userData?: RegistrationFormValues }) => {
      const res = await apiRequest("POST", "/api/verify-otp", data);
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: activeTab === "login" ? "Login successful!" : "Registration complete!",
        description: "Welcome to WhoToDate.",
      });
      // Reset all states and forms
      setAuthStep("phone");
      setPhoneNumber("");
      phoneForm.reset();
      otpForm.reset();
      registrationForm.reset();
      
      // Redirect to home page
      navigate("/");
    },
    onError: (error: any) => {
      toast({
        title: "Verification failed",
        description: error.message || "Please try again with a new OTP",
        variant: "destructive",
      });
    },
  });
  
  // Handle phone form submission
  const onPhoneSubmit = (data: PhoneFormValues) => {
    requestOtpMutation.mutate(data);
  };
  
  // Handle OTP form submission
  const onOtpSubmit = (data: OtpFormValues) => {
    if (activeTab === "register" && authStep === "otp") {
      // For registration flow, after OTP validation, show registration form
      setAuthStep("register");
    } else {
      // For login flow, verify OTP directly
      verifyOtpMutation.mutate({
        phoneNumber: phoneNumber,
        otp: data.otp
      });
    }
  };
  
  // Handle registration form submission
  const onRegistrationSubmit = (data: RegistrationFormValues) => {
    // Combine registration data with phone and OTP
    verifyOtpMutation.mutate({
      phoneNumber: phoneNumber,
      otp: otpForm.getValues().otp,
      userData: data
    });
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setAuthStep("phone");
    setPhoneNumber("");
    phoneForm.reset();
    otpForm.reset();
    registrationForm.reset();
  };
  
  // If already logged in and waiting for redirect
  if (user || isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-full overflow-x-hidden">
      <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
        {/* Left column: Auth forms */}
        <div className="flex flex-col justify-center space-y-6 w-full max-w-md mx-auto">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome to WhoToDate</h1>
            <p className="text-muted-foreground">
              Discover your relationship compatibility profile
            </p>
          </div>
          
          <Tabs defaultValue="login" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Login to your account</CardTitle>
                  <CardDescription>
                    Enter your phone number to receive a verification code.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {authStep === "phone" && (
                    <Form {...phoneForm}>
                      <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                        <FormField
                          control={phoneForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">
                                    +91
                                  </span>
                                  <div className="relative flex-1">
                                    <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                      placeholder="9876543210" 
                                      className="pl-10 rounded-l-none" 
                                      maxLength={10}
                                      {...field} 
                                    />
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={requestOtpMutation.isPending}
                        >
                          {requestOtpMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending OTP...
                            </>
                          ) : (
                            "Send OTP"
                          )}
                        </Button>
                      </form>
                    </Form>
                  )}
                  
                  {authStep === "otp" && (
                    <Form {...otpForm}>
                      <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                        <Alert className="mb-4 border-blue-200 text-blue-800 bg-blue-50">
                          <AlertCircle className="h-4 w-4 text-blue-600" />
                          <AlertTitle>OTP sent!</AlertTitle>
                          <AlertDescription>
                            Enter the 6-digit code sent to {phoneNumber}
                          </AlertDescription>
                        </Alert>
                        
                        <FormField
                          control={otpForm.control}
                          name="otp"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Verification Code</FormLabel>
                              <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                  <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                  </InputOTPGroup>
                                </InputOTP>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-between">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setAuthStep("phone")}
                          >
                            Back
                          </Button>
                          <Button 
                            type="submit" 
                            disabled={verifyOtpMutation.isPending}
                          >
                            {verifyOtpMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                              </>
                            ) : (
                              "Verify"
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Create a new account</CardTitle>
                  <CardDescription>
                    Register to discover your relationship compatibility profile.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {authStep === "phone" && (
                    <Form {...phoneForm}>
                      <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                        <FormField
                          control={phoneForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground">
                                    +91
                                  </span>
                                  <div className="relative flex-1">
                                    <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                      placeholder="9876543210" 
                                      className="pl-10 rounded-l-none" 
                                      maxLength={10}
                                      {...field} 
                                    />
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={requestOtpMutation.isPending}
                        >
                          {requestOtpMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending OTP...
                            </>
                          ) : (
                            "Continue"
                          )}
                        </Button>
                      </form>
                    </Form>
                  )}
                  
                  {authStep === "otp" && (
                    <Form {...otpForm}>
                      <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                        <Alert className="mb-4 border-blue-200 text-blue-800 bg-blue-50">
                          <AlertCircle className="h-4 w-4 text-blue-600" />
                          <AlertTitle>OTP sent!</AlertTitle>
                          <AlertDescription>
                            Enter the 6-digit code sent to {phoneNumber}
                          </AlertDescription>
                        </Alert>
                        
                        <FormField
                          control={otpForm.control}
                          name="otp"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Verification Code</FormLabel>
                              <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                  <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                  </InputOTPGroup>
                                </InputOTP>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-between">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setAuthStep("phone")}
                          >
                            Back
                          </Button>
                          <Button 
                            type="submit" 
                            disabled={otpForm.getValues().otp.length !== 6}
                          >
                            Continue
                          </Button>
                        </div>
                      </form>
                    </Form>
                  )}
                  
                  {authStep === "register" && (
                    <Form {...registrationForm}>
                      <form onSubmit={registrationForm.handleSubmit(onRegistrationSubmit)} className="space-y-4">
                        <Alert className="mb-4 border-green-200 text-green-800 bg-green-50">
                          <AlertCircle className="h-4 w-4 text-green-600" />
                          <AlertTitle>Phone Verified!</AlertTitle>
                          <AlertDescription>
                            Please complete your profile details
                          </AlertDescription>
                        </Alert>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={registrationForm.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={registrationForm.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={registrationForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
                          control={registrationForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
                        
                        <div className="flex justify-between">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setAuthStep("otp")}
                          >
                            Back
                          </Button>
                          <Button 
                            type="submit" 
                            disabled={verifyOtpMutation.isPending}
                          >
                            {verifyOtpMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Account...
                              </>
                            ) : (
                              "Complete Registration"
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right column: Hero section */}
        <div className="flex flex-col justify-center py-6 md:py-12 space-y-6 hidden md:flex">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Discover Your Perfect Relationship Match
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs mr-3">1</span>
                <div>
                  <p className="font-medium">Take our scientific compatibility quiz</p>
                  <p className="text-sm text-muted-foreground">
                    Answer questions that analyze your personality traits, attachment style, and relationship values
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs mr-3">2</span>
                <div>
                  <p className="font-medium">Get your compatibility profile</p>
                  <p className="text-sm text-muted-foreground">
                    Receive a detailed Green, Yellow, or Red compatibility rating with personalized insights
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs mr-3">3</span>
                <div>
                  <p className="font-medium">Find better relationships</p>
                  <p className="text-sm text-muted-foreground">
                    Use your compatibility profile to identify ideal relationship matches and improve your dating life
                  </p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="rounded-lg bg-muted p-6">
            <h3 className="text-lg font-medium mb-2">Why WhoToDate?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our scientific approach is based on years of relationship research analyzing thousands of successful couples across India.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md bg-background p-3">
                <p className="text-3xl font-bold text-primary">96%</p>
                <p className="text-xs text-muted-foreground">of users report better understanding of their relationship patterns</p>
              </div>
              <div className="rounded-md bg-background p-3">
                <p className="text-3xl font-bold text-primary">83%</p>
                <p className="text-xs text-muted-foreground">report improved compatibility with their partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}