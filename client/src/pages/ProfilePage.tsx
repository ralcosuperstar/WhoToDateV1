import React from 'react';
import { Helmet } from 'react-helmet';
import { Loader2, UserCog } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import PersonalInformationForm from '@/components/profile/PersonalInformationForm';
import { runDatabaseDiagnostic } from '@/lib/databaseUtils';
import { toast } from '@/hooks/use-toast';

/**
 * ProfilePage component for editing user profile information
 * This page allows users to update their personal information
 */
const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  
  // Run a diagnostic
  const handleRunDiagnostic = async () => {
    try {
      const result = await runDatabaseDiagnostic();
      
      if (result.success) {
        toast({
          title: 'Diagnostic Completed',
          description: 'All database connections are working properly.',
        });
      } else {
        toast({
          title: 'Diagnostic Issues Found',
          description: 'Some database connections had issues. Check the console for details.',
          variant: 'destructive',
        });
      }
      
      console.log('Database diagnostic results:', result.diagnosticResults);
    } catch (error) {
      console.error('Error running diagnostic:', error);
      
      toast({
        title: 'Diagnostic Failed',
        description: 'Could not complete database diagnostic.',
        variant: 'destructive',
      });
    }
  };
  
  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
          <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Profile Settings - WhoToDate</title>
        <meta name="description" content="Manage your personal information and account settings on WhoToDate." />
        <meta name="robots" content="noindex" /> {/* Private content */}
      </Helmet>
      
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 py-6">
          <header className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Profile Settings</h1>
                <p className="text-gray-600">Manage your personal information and account preferences</p>
              </div>
              
              {/* Only show diagnostic button in development */}
              {import.meta.env.DEV && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRunDiagnostic}
                  className="mt-4 md:mt-0"
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  Run Diagnostic
                </Button>
              )}
            </div>
          </header>
          
          <div className="grid grid-cols-1 gap-6">
            <PersonalInformationForm user={user} />
            
            {/* Future sections can be added here */}
            {/* 
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Additional Settings</h2>
              <p className="text-gray-500">More user settings can be added here</p>
            </section>
            */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;