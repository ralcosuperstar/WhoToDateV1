import { ReactNode } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  maxWidth?: string;
}

const QuizLayout = ({ children, title, description, maxWidth = "max-w-3xl" }: QuizLayoutProps) => {
  const [, navigate] = useLocation();
  
  // Check if user is authenticated
  const { data: user, isLoading, error } = useQuery({ 
    queryKey: ['/api/me'],
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true
  });

  // Redirect if not authenticated
  if (!isLoading && !user && !error) {
    navigate("/login?redirect=quiz");
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-light pt-24 pb-16 px-4">
      <div className={`container mx-auto ${maxWidth}`}>
        <Card className="shadow-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" 
                  />
                </svg>
              </div>
            </div>
            <CardTitle className="font-heading text-2xl">{title}</CardTitle>
            {description && <p className="text-neutral-dark/70 mt-2">{description}</p>}
          </CardHeader>
          
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizLayout;
