import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSupabase } from '@/contexts/SupabaseContext';
import { getSupabaseClient } from '@/lib/supabase';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Check, Loader2 } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

// Schema for sign up form
const signUpSchema = z.object({
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().regex(/^\+?[0-9]{10,14}$/, 'Please enter a valid phone number (10-14 digits)')
});

// Schema for sign in form
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required')
});

// Schema for OTP verification
const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits')
});

export function CustomAuthUI() {
  const { supabase } = useSupabase();
  const [supabaseClient, setSupabaseClient] = useState<any>(null);
  
  // Get the Supabase client
  useEffect(() => {
    async function initClient() {
      const client = await getSupabaseClient();
      setSupabaseClient(client);
    }
    
    initClient();
  }, []);
  const [activeTab, setActiveTab] = useState<string>('sign-in');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationView, setVerificationView] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const { toast } = useToast();

  // Sign up form
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone: ''
    }
  });

  // Sign in form
  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // OTP verification form
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: ''
    }
  });

  // Helper function to handle existing user flow
  function handleExistingUser(userEmail: string) {
    // Show more helpful message for existing users
    toast({
      title: 'Account already exists',
      description: 'This email is already registered. Please sign in instead.',
      variant: 'destructive'
    });
    
    // Switch to sign-in tab
    setActiveTab('sign-in');
    
    // Pre-fill the email field in the sign-in form
    signInForm.setValue('email', userEmail);
  }
  
  // Handle sign up submission
  const onSignUpSubmit = async (formData: z.infer<typeof signUpSchema>) => {
    if (!supabase) {
      toast({
        title: 'Authentication error',
        description: 'Authentication system is not initialized. Please try again later.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      // Extract the data for signup
      const { first_name, last_name, email, password, phone } = formData;

      // Sign up with Supabase
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name,
            last_name,
            phone
          }
        }
      });

      console.log("Sign up response:", { data: signupData, error: signupError });
      
      // Check for explicit error about user already existing
      if (signupError) {
        if (signupError.message && (
          signupError.message.includes('User already registered') || 
          signupError.message.includes('already been registered')
        )) {
          handleExistingUser(email);
          return;
        }
        throw signupError;
      }
      
      // Supabase has a special case - when an existing user signs up,
      // it may not return an error but instead return data with a null user
      // or a data.user object with identities array of length 0
      if (!signupData.user || 
          (signupData.user.identities && signupData.user.identities.length === 0) ||
          signupData.user?.email_confirmed_at) {
          
        console.log("Detected existing user from response data");
        handleExistingUser(email);
        return;
      }

      // Show success message and prepare for OTP verification
      toast({
        title: 'Verification email sent',
        description: 'Please check your email for a verification code.',
      });

      // Switch to verification view
      setVerificationEmail(email);
      setVerificationView(true);

    } catch (error: any) {
      toast({
        title: 'Sign up failed',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign in submission
  const onSignInSubmit = async (formData: z.infer<typeof signInSchema>) => {
    if (!supabase) {
      toast({
        title: 'Authentication error',
        description: 'Authentication system is not initialized. Please try again later.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      // Sign in with Supabase
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (signInError) {
        throw signInError;
      }

      // Sync the Supabase authentication with our server
      try {
        // Get the current user after sign in
        const { data: userData } = await supabase.auth.getUser();
        
        if (userData?.user) {
          console.log("Syncing Supabase user with server:", userData.user.email);
          
          // Call our sync endpoint
          const response = await fetch('/api/supabase-sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: userData.user.email,
              user_id: userData.user.id
            }),
            credentials: 'include' // Important for cookies
          });
          
          if (!response.ok) {
            console.error("Failed to sync with server:", await response.text());
          } else {
            console.log("Successfully synced Supabase user with server");
          }
        }
      } catch (syncError) {
        console.error("Error syncing Supabase user with server:", syncError);
        // Continue even if sync fails - we want the user to be able to use the app
      }

      toast({
        title: 'Sign in successful',
        description: 'You have been signed in to your account.',
      });

    } catch (error: any) {
      toast({
        title: 'Sign in failed',
        description: error.message || 'Invalid email or password.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const onOTPSubmit = async (formData: z.infer<typeof otpSchema>) => {
    if (!supabase) {
      toast({
        title: 'Authentication error',
        description: 'Authentication system is not initialized. Please try again later.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      // Verify OTP
      const { error: otpError } = await supabase.auth.verifyOtp({
        email: verificationEmail,
        token: formData.otp,
        type: 'signup'
      });

      if (otpError) {
        throw otpError;
      }

      toast({
        title: 'Email verified',
        description: 'Your email has been verified. You are now signed in.',
      });

      // Sync the Supabase authentication with our server
      try {
        // Get the current user after sign in
        const { data: userData } = await supabase.auth.getUser();
        
        if (userData?.user) {
          console.log("Syncing Supabase user with server after verification:", userData.user.email);
          
          // Call our sync endpoint
          const response = await fetch('/api/supabase-sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: userData.user.email,
              user_id: userData.user.id
            }),
            credentials: 'include' // Important for cookies
          });
          
          if (!response.ok) {
            console.error("Failed to sync with server after verification:", await response.text());
          } else {
            console.log("Successfully synced Supabase user with server after verification");
          }
        }
      } catch (syncError) {
        console.error("Error syncing Supabase user with server after verification:", syncError);
        // Continue even if sync fails - we want the user to be able to use the app
      }

      // Reset verification view
      setVerificationView(false);

    } catch (error: any) {
      toast({
        title: 'Verification failed',
        description: error.message || 'Invalid verification code.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (verificationView) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to {verificationEmail}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...otpForm}>
            <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-6">
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="mx-auto flex flex-col items-center">
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
                    <FormDescription>
                      This code expires in 60 minutes
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            variant="link" 
            onClick={() => setVerificationView(false)}
            disabled={isLoading}
          >
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{activeTab === 'sign-up' ? 'Create Account' : 'Welcome Back'}</CardTitle>
        <CardDescription>
          {activeTab === 'sign-up' 
            ? 'Sign up to get started with WhoToDate' 
            : 'Sign in to your WhoToDate account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sign-in">
            <Form {...signInForm}>
              <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={signInForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="youremail@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signInForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="sign-up">
            <Form {...signUpForm}>
              <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={signUpForm.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="youremail@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 9XXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormDescription>
                        At least 8 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}