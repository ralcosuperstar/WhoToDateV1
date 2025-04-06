import { EmailTester } from "@/components/test/EmailTester";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronLeft, Mail, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export default function EmailTest() {
  const [isDevMode, setIsDevMode] = useState(false);
  const [keyStatus, setKeyStatus] = useState({
    resend: false,
    mailgun: false,
    environment: "unknown"
  });

  useEffect(() => {
    // Check if in development mode
    if (window.location.hostname === "localhost" || window.location.hostname.includes("replit.dev")) {
      setIsDevMode(true);
    }

    // Check environment variables availability (just the check, not the actual values)
    fetch("/api/debug/check-env")
      .then(res => res.json())
      .then(data => {
        setKeyStatus({
          resend: data.resend_available || false,
          mailgun: data.mailgun_available || false,
          environment: data.env || "unknown"
        });
      })
      .catch(err => {
        console.error("Failed to check environment variables:", err);
      });
  }, []);

  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="pl-0">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Email Verification Testing</h1>
        <p className="text-muted-foreground">
          Test and troubleshoot the email verification system.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <EmailTester />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Configuration Status</CardTitle>
              <CardDescription>
                Current email service configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Environment</h3>
                  <p className="text-sm">
                    {keyStatus.environment === "production" ? (
                      <span className="flex items-center text-green-600">
                        <span className="bg-green-100 p-1 rounded-full mr-1.5">
                          <Mail className="h-3.5 w-3.5" />
                        </span>
                        Production Mode (real emails)
                      </span>
                    ) : (
                      <span className="flex items-center text-amber-600">
                        <span className="bg-amber-100 p-1 rounded-full mr-1.5">
                          <Mail className="h-3.5 w-3.5" />
                        </span>
                        Development Mode (fake emails)
                      </span>
                    )}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-1">Email Providers</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${keyStatus.resend ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      Resend API: {keyStatus.resend ? 'Available' : 'Not configured'}
                    </li>
                    <li className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${keyStatus.mailgun ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      Mailgun API: {keyStatus.mailgun ? 'Available' : 'Not configured'}
                    </li>
                  </ul>
                </div>

                {(!keyStatus.resend && !keyStatus.mailgun) && (
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800">No email providers configured</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          To send real emails, you need to set up either Resend or Mailgun API keys.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Help & Troubleshooting</CardTitle>
              <CardDescription>
                Common email verification issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li><strong>Emails not sending:</strong> Check API keys for Resend/Mailgun</li>
                <li><strong>Verification links not working:</strong> Check base URL configuration</li>
                <li><strong>Emails going to spam:</strong> Verify domain & SPF/DKIM records</li>
                <li><strong>Test mode:</strong> In dev mode, emails are logged to console</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}