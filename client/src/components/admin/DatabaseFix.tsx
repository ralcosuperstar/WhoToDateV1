/**
 * DatabaseFix component
 * A UI for database schema management and fixes
 */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Database, Check, AlertCircle } from 'lucide-react';
import { checkUpdatedAtColumn, addUpdatedAtColumn } from '@/lib/databaseFix';

interface DatabaseFixProps {
  userId: string;
  isAdmin?: boolean;
}

/**
 * Database schema fix component for admins
 */
const DatabaseFix: React.FC<DatabaseFixProps> = ({ userId, isAdmin = false }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [status, setStatus] = useState<{
    checked: boolean;
    needsFix: boolean;
    message: string;
    error?: string;
  }>({
    checked: false,
    needsFix: false,
    message: 'Database schema has not been checked yet',
  });

  /**
   * Check database schema status
   */
  const handleCheckSchema = async () => {
    setIsChecking(true);
    
    try {
      const result = await checkUpdatedAtColumn();
      
      setStatus({
        checked: true,
        needsFix: !result.hasUpdatedAt,
        message: result.message,
        error: result.success ? undefined : 'Error checking database schema'
      });
    } catch (error) {
      setStatus({
        checked: true,
        needsFix: false,
        message: 'Error checking database schema',
        error: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setIsChecking(false);
    }
  };

  /**
   * Fix database schema by adding updated_at column
   */
  const handleFixSchema = async () => {
    setIsFixing(true);
    
    try {
      const result = await addUpdatedAtColumn();
      
      setStatus({
        checked: true,
        needsFix: !result.columnAdded,
        message: result.message,
        error: result.success ? undefined : 'Error fixing database schema'
      });
    } catch (error) {
      setStatus({
        checked: true,
        needsFix: true,
        message: 'Failed to fix database schema',
        error: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setIsFixing(false);
    }
  };

  // Only render for admins or in development
  if (!isAdmin && !import.meta.env.DEV) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center text-pink-600">
          <Database className="mr-2 h-5 w-5" />
          Database Schema Management
        </CardTitle>
        <CardDescription>
          Check and fix database schema compatibility issues
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {status.error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {status.error}
            </AlertDescription>
          </Alert>
        )}
        
        {status.checked && !status.error && (
          <Alert variant={status.needsFix ? "destructive" : "default"} className="mb-4">
            {status.needsFix ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            <AlertTitle>
              {status.needsFix ? 'Schema Needs Update' : 'Schema Compatible'}
            </AlertTitle>
            <AlertDescription>
              {status.message}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleCheckSchema}
          disabled={isChecking || isFixing}
        >
          {isChecking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Check Schema
            </>
          )}
        </Button>
        
        <Button 
          variant="default" 
          onClick={handleFixSchema}
          disabled={isChecking || isFixing || (status.checked && !status.needsFix)}
          className="bg-pink-600 hover:bg-pink-700"
        >
          {isFixing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fixing...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Fix Schema
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DatabaseFix;