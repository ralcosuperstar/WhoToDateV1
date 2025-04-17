import { AuthStatusTest } from '@/components/auth/AuthStatusTest';
import { CustomAuthUI } from '@/components/auth/CustomAuthUI';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Container } from '@/components/ui/container';

export default function AuthTestPage() {
  return (
    <Container className="py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Authentication Test</h1>
      
      <Tabs defaultValue="login" className="mx-auto max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login / Signup</TabsTrigger>
          <TabsTrigger value="status">Auth Status</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="mt-6">
          <CustomAuthUI />
        </TabsContent>
        
        <TabsContent value="status" className="mt-6">
          <AuthStatusTest />
        </TabsContent>
      </Tabs>
    </Container>
  );
}