import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";

const Analytics = () => {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Fetch user report
  const { data: report, isLoading, error } = useQuery({
    queryKey: ["/api/report"],
    retry: false,
  });

  useEffect(() => {
    if (report) {
      setIsDataLoaded(true);
    }
  }, [report]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Not available",
        description: "You need to complete the assessment to access analytics.",
        variant: "destructive"
      });
      navigate("/quiz");
    }
  }, [error, toast, navigate]);

  if (isLoading) {
    return (
      <div className="pt-4 pb-12 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!report || error) {
    return (
      <div className="pt-20 px-4 pb-12 min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              You need to complete the compatibility assessment before accessing analytics.
            </AlertDescription>
          </Alert>
          <Button onClick={() => navigate("/quiz")}>Take Assessment</Button>
        </div>
      </div>
    );
  }
  
  // Check if user has paid for the report
  if (report && !report.isPaid) {
    return (
      <div className="pt-20 px-4 pb-12 min-h-screen">
        <div className="container mx-auto max-w-3xl">
          <Alert className="mb-4 border-amber-500 bg-amber-50 text-amber-900">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              Please purchase the full report to access detailed analytics.
            </AlertDescription>
          </Alert>
          <Button onClick={() => navigate("/payment")} className="bg-primary hover:bg-primary/90">
            Unlock Full Report
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 pb-12 bg-neutral-50 min-h-screen">
      <Helmet>
        <title>Analytics Dashboard | WhoToDate</title>
        <meta name="description" content="Explore your compatibility dimensions in detail" />
        <meta name="robots" content="noindex" /> {/* Private content */}
      </Helmet>

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading font-bold text-3xl mb-2">Analytics Dashboard</h1>
          <p className="text-neutral-dark/70 mb-6">
            Explore your compatibility profile in detail with interactive visualizations
          </p>
          
          {report && report.report && <AnalyticsDashboard report={report.report} />}
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;