import { Helmet } from 'react-helmet';
import DevDashboard from "@/components/dashboard/DevDashboard";

const DevDashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - WhoToDate</title>
        <meta name="description" content="Access your WhoToDate dashboard, manage your profile, and view your compatibility report." />
        <meta name="robots" content="noindex" /> {/* Private content */}
      </Helmet>
      
      <div className="min-h-screen bg-neutral-light pt-24 pb-16">
        <DevDashboard />
      </div>
    </>
  );
};

export default DevDashboardPage;