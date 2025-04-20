import { Helmet } from 'react-helmet';
import SupabaseDashboard from "@/components/dashboard/SupabaseDashboard";

const SupabaseDashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - WhoToDate</title>
        <meta name="description" content="Access your WhoToDate dashboard, manage your profile, and view your compatibility report." />
        <meta name="robots" content="noindex" /> {/* Private content */}
      </Helmet>
      
      <div className="min-h-screen bg-neutral-light pt-24 pb-16">
        <SupabaseDashboard />
      </div>
    </>
  );
};

export default SupabaseDashboardPage;