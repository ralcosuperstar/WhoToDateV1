import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SimpleApiTest() {
  const [results, setResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  // Simple test endpoints that should work without auth
  const endpoints = [
    { name: 'Main API Health', url: '/api/health' },
    { name: 'Blog Posts', url: '/api/blog-posts' },
    { name: 'Direct Fetch 5000', url: 'http://localhost:5000/api/health' },
    { name: 'Test Server Health', url: 'http://localhost:4400/api/health' },
    { name: 'Test Server Config', url: 'http://localhost:4400/api/config' },
  ];

  const testEndpoint = async (endpoint: { name: string; url: string }) => {
    setLoading(true);
    setResults(prev => ({ 
      ...prev, 
      [endpoint.name]: { status: 'loading', data: null, error: null } 
    }));

    try {
      const startTime = performance.now();
      const response = await fetch(endpoint.url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      
      let data: any;
      let contentType = response.headers.get('content-type') || '';
      
      // Check if the response is JSON or HTML
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = {
          responseText: text.substring(0, 150) + (text.length > 150 ? '...' : ''),
          contentType,
          htmlResponse: contentType.includes('text/html')
        };
      }
      
      setResults(prev => ({
        ...prev,
        [endpoint.name]: {
          status: response.ok ? 'success' : 'error',
          statusCode: response.status,
          contentType,
          data,
          error: null,
          time: responseTime
        }
      }));
    } catch (error) {
      console.error(`Error testing ${endpoint.name}:`, error);
      setResults(prev => ({
        ...prev,
        [endpoint.name]: {
          status: 'error',
          data: null,
          error: error instanceof Error ? error.message : String(error)
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const testAllEndpoints = () => {
    endpoints.forEach(endpoint => {
      testEndpoint(endpoint);
    });
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Simple API Test</h1>
      <p className="text-muted-foreground mb-6">
        Testing direct API connectivity to diagnose middleware interception issues
      </p>
      
      <div className="flex gap-4 mb-8">
        <Button 
          onClick={testAllEndpoints} 
          disabled={loading}
          variant="default"
        >
          Test All Endpoints
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {endpoints.map(endpoint => (
          <Card key={endpoint.name}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>{endpoint.name}</span>
                {results[endpoint.name] && (
                  <span className={`text-sm ${
                    results[endpoint.name]?.status === 'success' 
                      ? 'text-green-500' 
                      : results[endpoint.name]?.status === 'loading'
                        ? 'text-blue-500'
                        : 'text-red-500'
                  }`}>
                    {results[endpoint.name]?.status === 'success' && <>✓ </>}
                    {results[endpoint.name]?.status === 'error' && <>✗ </>}
                    {results[endpoint.name]?.status}
                    {results[endpoint.name]?.statusCode && <> ({results[endpoint.name]?.statusCode})</>}
                    {results[endpoint.name]?.time && <> {results[endpoint.name]?.time}ms</>}
                  </span>
                )}
              </CardTitle>
              <div className="text-sm text-muted-foreground">{endpoint.url}</div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-md p-4 max-h-60 overflow-auto">
                <pre className="text-xs">
                  {results[endpoint.name] 
                    ? JSON.stringify(results[endpoint.name], null, 2)
                    : 'Click Test All Endpoints to start'
                  }
                </pre>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => testEndpoint(endpoint)}
                  disabled={loading}
                  variant="outline"
                  size="sm"
                >
                  Test Endpoint
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}