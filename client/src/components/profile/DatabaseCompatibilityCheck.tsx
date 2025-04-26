import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Database } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { ensureDatabaseCompatibility, checkDatabaseStatus } from '@/lib/databaseUtils';
import { Skeleton } from '@/components/ui/skeleton';

interface DatabaseCompatibilityCheckProps {
  userId: string;
  onCompatibilityChange?: (isCompatible: boolean) => void;
}

/**
 * Component that checks database compatibility and offers fixes
 * This is used in profile forms to ensure the database schema is compatible
 * before making updates that rely on the updated_at column
 */
export const DatabaseCompatibilityCheck: React.FC<DatabaseCompatibilityCheckProps> = ({ 
  userId,
  onCompatibilityChange
}) => {
  const [loading, setLoading] = useState(true);
  const [compatible, setCompatible] = useState<boolean | null>(null);
  const [fixing, setFixing] = useState(false);
  const [connectionType, setConnectionType] = useState<string>('unknown');
  const [message, setMessage] = useState<string>('Checking database compatibility...');

  // Function to check database status
  const checkCompatibility = async () => {
    setLoading(true);
    
    try {
      const result = await checkDatabaseStatus();
      setConnectionType(result.connectionType);
      
      if (result.success && result.hasUpdatedAt) {
        setCompatible(true);
        setMessage('Database schema is compatible');
        onCompatibilityChange?.(true);
      } else {
        setCompatible(false);
        setMessage(result.message || 'Database schema needs fixing');
        onCompatibilityChange?.(false);
      }
    } catch (error) {
      console.error('Error checking database compatibility:', error);
      setCompatible(false);
      setMessage(`Error checking compatibility: ${error instanceof Error ? error.message : String(error)}`);
      onCompatibilityChange?.(false);
    } finally {
      setLoading(false);
    }
  };

  // Function to fix database issues
  const fixDatabase = async () => {
    setFixing(true);
    
    try {
      const success = await ensureDatabaseCompatibility(userId);
      
      if (success) {
        setCompatible(true);
        setMessage('Database schema has been fixed successfully');
        onCompatibilityChange?.(true);
      } else {
        setMessage('Failed to fix database schema');
        onCompatibilityChange?.(false);
      }
    } catch (error) {
      console.error('Error fixing database:', error);
      setMessage(`Error fixing database: ${error instanceof Error ? error.message : String(error)}`);
      onCompatibilityChange?.(false);
    } finally {
      setFixing(false);
    }
  };

  // Check compatibility on mount
  useEffect(() => {
    checkCompatibility();
  }, [userId]);

  // If still loading, show skeleton
  if (loading) {
    return (
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  // If compatible, show success or nothing based on variant
  if (compatible) {
    return (
      <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-700">Database Ready</AlertTitle>
        <AlertDescription className="text-green-600 text-sm">
          {message}
          {connectionType !== 'unknown' && (
            <span className="block text-xs mt-1 text-green-500">
              Using {connectionType} connection
            </span>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  // If not compatible, show warning with fix button
  return (
    <Alert className="mb-4 bg-amber-50 text-amber-800 border-amber-200">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-700">Database Schema Issue</AlertTitle>
      <AlertDescription className="text-amber-600">
        <p className="text-sm mb-2">{message}</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fixDatabase} 
          disabled={fixing}
          className="bg-white border-amber-300 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
        >
          <Database className="mr-2 h-4 w-4" />
          {fixing ? 'Fixing...' : 'Fix Database Schema'}
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default DatabaseCompatibilityCheck;