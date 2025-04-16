import { useState } from 'react';
import { useSupabase } from '@/contexts/SupabaseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function SupabaseLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useSupabase();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please enter both email and password.',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Log the login attempt
      console.log('Attempting login with Supabase:', email);
      
      const response = await signIn(email, password);
      console.log('Supabase login response:', response);
      
      if (response.error) {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: response.error.message || 'An error occurred during login',
        });
        console.error('Login error from Supabase:', response.error);
      } else {
        toast({
          title: 'Login Successful',
          description: 'Welcome back!',
        });
        // Redirect can be handled by the auth state in the parent component
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          disabled={isLoading}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          'Log in'
        )}
      </Button>
    </form>
  );
}

export function SupabaseRegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useSupabase();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill in all fields.',
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Password Mismatch',
        description: 'Passwords do not match. Please try again.',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Log the registration attempt
      console.log('Attempting registration with Supabase:', email);
      
      const response = await signUp(email, password);
      console.log('Supabase registration response:', response);
      
      if (response.error) {
        toast({
          variant: 'destructive',
          title: 'Registration Failed',
          description: response.error.message || 'An error occurred during registration',
        });
        console.error('Registration error from Supabase:', response.error);
      } else {
        toast({
          title: 'Registration Successful',
          description: 'Please check your email to confirm your account.',
        });
        // Redirect can be handled by the auth state in the parent component
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="register-email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="register-password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          disabled={isLoading}
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirm-password" className="text-sm font-medium">
          Confirm Password
        </label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          disabled={isLoading}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </Button>
    </form>
  );
}

export function SupabaseLogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { signOut } = useSupabase();
  const { toast } = useToast();

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await signOut();
      
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Logout Failed',
          description: error.message,
        });
      } else {
        toast({
          title: 'Logged Out',
          description: 'You have been successfully logged out.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging out...
        </>
      ) : (
        'Log out'
      )}
    </Button>
  );
}

export function SupabaseAuthStatus() {
  const { user, isLoading } = useSupabase();
  
  if (isLoading) {
    return <div className="text-sm">Loading authentication status...</div>;
  }
  
  if (user) {
    return (
      <div className="text-sm">
        <p>Logged in as: <span className="font-medium">{user.email}</span></p>
      </div>
    );
  }
  
  return <div className="text-sm">Not logged in</div>;
}