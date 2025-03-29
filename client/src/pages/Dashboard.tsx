import { Helmet } from 'react-helmet';
import UserDashboard from "@/components/dashboard/UserDashboard";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - MyDate</title>
        <meta name="description" content="Access your MyDate dashboard, manage your profile, and view your compatibility report." />
        <meta name="robots" content="noindex" /> {/* Private content */}
      </Helmet>
      
      <div className="min-h-screen bg-neutral-light pt-24 pb-16">
        <UserDashboard />
      </div>
    </>
  );
};

export default Dashboard;
