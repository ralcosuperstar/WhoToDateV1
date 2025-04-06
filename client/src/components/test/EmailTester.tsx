import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function EmailTester() {
  const [email, setEmail] = useState("");
  const [forceResend, setForceResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to test",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/debug/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, forceResend }),
      });

      const data = await response.json();
      setResult(data);

      if (response.ok) {
        toast({
          title: "Email Test Complete",
          description: data.message,
        });
      } else {
        toast({
          title: "Email Test Failed",
          description: data.message || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to test email:", error);
      toast({
        title: "Email Test Failed",
        description: "Network or server error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Email Verification Tester</CardTitle>
        <CardDescription>
          Send a test verification email to verify email functionality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="force-resend"
              checked={forceResend}
              onCheckedChange={(checked) => setForceResend(!!checked)}
            />
            <Label
              htmlFor="force-resend"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Force real email (instead of preview)
            </Label>
          </div>
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              "Send Test Email"
            )}
          </Button>
        </form>

        {result && (
          <div className="mt-4 p-3 bg-muted rounded-md">
            <h4 className="font-medium mb-1">Test Result:</h4>
            <p className="text-sm">{result.message}</p>
            {result.details && (
              <p className="text-sm text-muted-foreground mt-1">{result.details}</p>
            )}
            {result.token && (
              <>
                <p className="text-xs mt-3 font-medium">Verification Token:</p>
                <code className="text-xs block mt-1 p-2 bg-black/5 rounded overflow-x-auto">
                  {result.token}
                </code>
              </>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>Emails in dev mode use Ethereal (fake emails)</p>
        <p>Force real to use Resend API</p>
      </CardFooter>
    </Card>
  );
}