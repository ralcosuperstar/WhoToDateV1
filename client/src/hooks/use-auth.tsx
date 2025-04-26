import { useContext } from 'react';
import { FixedSupabaseContext } from '@/contexts/FixedSupabaseContext';

/**
 * Hook to access authentication state and methods
 * This hook provides a unified interface for authentication across the application
 */
export function useAuth() {
  const context = useContext(FixedSupabaseContext);
  
  if (!context) {
    throw new Error('useAuth must be used within a FixedSupabaseProvider');
  }
  
  return context;
}

export default useAuth;