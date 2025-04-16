import { useState } from 'react';
import { useSupabase } from '@/contexts/SupabaseContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function SupabaseLogoutButton() {
  const { supabase } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (!supabase) return;

    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      // No need to redirect, the auth state will update and UI will change
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleLogout} 
      disabled={isLoading}
      className="w-full"
    >
      <LogOut className="mr-2 h-4 w-4" />
      {isLoading ? 'Signing out...' : 'Sign out'}
    </Button>
  );
}