import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loadRazorpay, createOrder } from "@/lib/razorpay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Report } from "@shared/schema";

const PaymentForm = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if user is authenticated
  const { data: user, isLoading: isUserLoading } = useQuery({ 
    queryKey: ['/api/me'],
    retry: false
  });
  
  // Check if report exists
  const { data: report, isLoading: isReportLoading } = useQuery<Report>({ 
    queryKey: ['/api/report'],
    enabled: !!user
  });
  
  // Create payment record
  const createPaymentMutation = useMutation({
    mutationFn: async (data: { 
      reportId: number, 
      amount: number,
      razorpayPaymentId: string,
      status: string 
    }) => {
      const res = await apiRequest("POST", "/api/payment", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/report'] });
      toast({
        title: "Payment successful!",
        description: "Your report is now available.",
      });
      navigate("/report");
    },
    onError: (error) => {
      toast({
        title: "Payment verification failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });
  
  useEffect(() => {
    // Load Razorpay script
    loadRazorpay();
  }, []);
  
  const handlePay = async () => {
    if (!report || !user) return;
    
    setIsLoading(true);
    
    try {
      // Check if report is already paid
      if (report.isPaid) {
        navigate("/report");
        return;
      }
      
      // Make payment
      const orderId = await createOrder(999 * 100); // Convert to paise
      
      const options = {
        key: process.env.RAZORPAY_KEY_ID || "rzp_test_Key",
        amount: 999 * 100, // in paise
        currency: "INR",
        name: "MyDate",
        description: "Compatibility Report Payment",
        order_id: orderId,
        handler: function(response: any) {
          // Save payment details
          createPaymentMutation.mutate({
            reportId: report.id,
            amount: 999 * 100, // in paise
            razorpayPaymentId: response.razorpay_payment_id,
            status: "success"
          });
        },
        prefill: {
          name: user.fullName || user.username,
          email: user.email,
        },
        theme: {
          color: "#6366F1",
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
            toast({
              title: "Payment cancelled",
              description: "You can complete the payment later.",
            });
          }
        }
      };
      
      const razorpay = (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (isUserLoading || isReportLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Authentication Required</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please log in to purchase your report.</p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => navigate("/login?redirect=payment")}
            className="w-full"
          >
            Log In
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (!report) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Assessment Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You need to complete the compatibility assessment before making a payment.</p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => navigate("/quiz")}
            className="w-full"
          >
            Take Assessment
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (report.isPaid) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-emerald-500">Payment Already Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You have already purchased your report. You can view it now.</p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => navigate("/report")}
            className="w-full"
          >
            View Report
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Your Compatibility Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="p-4 bg-primary/5 rounded-lg">
            <p className="font-medium mb-2">What's included in your report:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Detailed 20+ page personality and compatibility analysis</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Insights into your attachment style, values, and relationship patterns</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Personalized recommendations for relationship growth</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary mt-0.5 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Lifetime access to your report</span>
              </li>
            </ul>
          </div>
          
          <div className="border-t border-neutral-dark/10 pt-4 pb-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Amount:</span>
              <span className="text-xl font-bold">₹999</span>
            </div>
            <p className="text-xs text-neutral-dark/70 mt-1">One-time payment, no recurring charges</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handlePay}
          disabled={isLoading || createPaymentMutation.isPending}
          className="w-full"
        >
          {isLoading || createPaymentMutation.isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Processing...
            </>
          ) : (
            'Pay ₹999 Securely'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentForm;
