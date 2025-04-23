import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { apiClient } from '@/lib/apiClient';
import { useToast } from '@/hooks/use-toast';

interface ApiResponse {
  message?: string;
  status?: string;
  time?: string;
  error?: string;
}

export default function TestApiPage() {
  const { toast } = useToast();
  const [apiResponses, setApiResponses] = useState<Record<string, ApiResponse>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  // List of API endpoints to test
  const endpoints = [
    { name: 'Health Check', path: '/health', method: 'GET' },
    { name: 'Blog Posts', path: '/blog-posts', method: 'GET' },
    { name: 'User Info', path: '/user', method: 'GET' },
    { name: 'Test Login', path: '/login', method: 'POST', data: { username: 'testuser', password: 'password123' } },
    { name: 'Register User', path: '/register', method: 'POST', data: { username: 'newuser', password: 'password123', email: 'test@example.com' } }
  ];

  // Function to test an API endpoint
  const testEndpoint = async (endpoint: typeof endpoints[0]) => {
    setIsLoading(prev => ({ ...prev, [endpoint.name]: true }));
    
    try {
      let response;
      
      if (endpoint.method === 'GET') {
        response = await apiClient.get(endpoint.path);
      } else if (endpoint.method === 'POST') {
        response = await apiClient.post(endpoint.path, endpoint.data);
      } else {
        throw new Error(`Unsupported method: ${endpoint.method}`);
      }
      
      setApiResponses(prev => ({
        ...prev,
        [endpoint.name]: response as ApiResponse
      }));
      
      toast({
        title: `${endpoint.name} Success`,
        description: 'API endpoint responded successfully',
        variant: 'default',
      });
    } catch (error) {
      console.error(`Error testing ${endpoint.name}:`, error);
      
      setApiResponses(prev => ({
        ...prev,
        [endpoint.name]: { error: error instanceof Error ? error.message : String(error) }
      }));
      
      toast({
        title: `${endpoint.name} Failed`,
        description: error instanceof Error ? error.message : String(error),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(prev => ({ ...prev, [endpoint.name]: false }));
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">API Test Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Use this page to test various API endpoints and diagnose connection issues.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {endpoints.map((endpoint) => (
          <Card key={endpoint.name} className="shadow-md">
            <CardHeader>
              <CardTitle>{endpoint.name}</CardTitle>
              <CardDescription>
                {endpoint.method} {endpoint.path}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-48 overflow-auto">
                <pre className="bg-muted p-4 rounded-md text-sm">
                  {apiResponses[endpoint.name] 
                    ? JSON.stringify(apiResponses[endpoint.name], null, 2) 
                    : 'No response yet'}
                </pre>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => testEndpoint(endpoint)} 
                disabled={isLoading[endpoint.name]}
                className="w-full"
              >
                {isLoading[endpoint.name] ? 'Testing...' : 'Test Endpoint'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}