/**
 * Admin page for managing the application
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import DatabaseFix from '@/components/admin/DatabaseFix';

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  
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
        <title>Admin Tools - WhoToDate</title>
        <meta name="description" content="Administrative tools for WhoToDate platform" />
        <meta name="robots" content="noindex" /> {/* Private content */}
      </Helmet>
      
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 py-6">
          <header className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Tools</h1>
                <p className="text-gray-600">Database management and administrative functions</p>
              </div>
            </div>
          </header>
          
          <div className="grid grid-cols-1 gap-6">
            <DatabaseFix userId={user.id} isAdmin={true} />
            
            {/* Additional admin tools can be added here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;