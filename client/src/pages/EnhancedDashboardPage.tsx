import { Helmet } from 'react-helmet';
import EnhancedDashboard from "@/components/dashboard/EnhancedDashboard";

const EnhancedDashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - WhoToDate</title>
        <meta name="description" content="Access your WhoToDate dashboard, manage your profile, and view your compatibility report." />
        <meta name="robots" content="noindex" /> {/* Private content */}
      </Helmet>
      
      <div className="min-h-screen bg-neutral-50">
        <EnhancedDashboard />
      </div>
    </>
  );
};

export default EnhancedDashboardPage;