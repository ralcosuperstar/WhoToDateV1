import { useState, useEffect } from 'react';
import { useSupabase } from '@/contexts/SupabaseContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Database, UserPlus, BookPlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function SupabaseDbTest() {
  const { user, isLoading: authLoading } = useSupabase();
  const [activeTab, setActiveTab] = useState('status');
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to test database connection
  const testDatabase = async () => {
    try {
      setIsLoading(true);
      console.log('Testing database connection...');
      
      // First try the Supabase connection directly to log results
      try {
        const directResponse = await fetch('/api/supabase-direct-test');
        console.log('Direct Supabase test response:', directResponse.ok ? 'OK' : 'Failed');
        if (directResponse.ok) {
          const directData = await directResponse.json();
          console.log('Direct Supabase test data:', directData);
        }
      } catch (directError) {
        console.error('Direct Supabase test error:', directError);
      }
      
      // Now try the actual db-test endpoint
      const response = await fetch('/api/db-test');
      console.log('DB test response:', response.ok ? 'OK' : 'Failed', response.status);
      
      if (!response.ok) {
        throw new Error(`Database test failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('DB test data:', data);
      setTestResult(data);
      
      toast({
        title: data.success ? 'Database test succeeded' : 'Database test failed',
        description: data.message,
        variant: data.success ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error('Error testing database:', error);
      toast({
        title: 'Database test failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to create a test user
  const createTestUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/db-test/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Create user test failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      setTestResult(data);
      
      toast({
        title: data.success ? 'Test user created' : 'User creation failed',
        description: data.success ? `User created with ID: ${data.user.id.slice(0, 8)}...` : data.message,
        variant: data.success ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error('Error creating test user:', error);
      toast({
        title: 'User creation failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to create a test blog post
  const createTestBlogPost = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/db-test/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Create blog post test failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      setTestResult(data);
      
      toast({
        title: data.success ? 'Test blog post created' : 'Blog post creation failed',
        description: data.success ? `Blog created with slug: ${data.blogPost.slug}` : data.message,
        variant: data.success ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error('Error creating test blog post:', error);
      toast({
        title: 'Blog post creation failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Run the database test on initial load
  useEffect(() => {
    testDatabase();
  }, []);
  
  // Show a loader while auth is still loading
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Supabase Database Integration Test</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="status">Status</TabsTrigger>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="status" className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Database Connection Status</CardTitle>
              <CardDescription>Current status of your Supabase database connection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Authentication Status:</p>
                  <p>
                    {user ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Logged In</Badge>
                    ) : (
                      <Badge variant="destructive">Not Logged In</Badge>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">User ID:</p>
                  <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis">
                    {user ? user.id : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Database Connection:</p>
                  <p>
                    {testResult?.success ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Connected</Badge>
                    ) : (
                      <Badge variant="destructive">Failed</Badge>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">User Count:</p>
                  <p className="text-sm text-muted-foreground">
                    {testResult?.storage?.userCount !== undefined ? testResult.storage.userCount : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={testDatabase} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing Connection...
                  </>
                ) : (
                  <>
                    <Database className="mr-2 h-4 w-4" />
                    Test Database Connection
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="create" className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Create Test Data</CardTitle>
              <CardDescription>Create test users and blog posts in the database</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Use these buttons to create test data in your Supabase database. This will help verify that your application's database integration is working correctly.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={createTestUser} 
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating User...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Test User
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={createTestBlogPost} 
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Blog Post...
                    </>
                  ) : (
                    <>
                      <BookPlus className="mr-2 h-4 w-4" />
                      Create Test Blog Post
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>Results from the latest database test</CardDescription>
            </CardHeader>
            <CardContent>
              {testResult ? (
                <pre className="bg-secondary p-4 rounded-md overflow-auto max-h-96">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              ) : (
                <p className="text-center text-muted-foreground">No test results available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}