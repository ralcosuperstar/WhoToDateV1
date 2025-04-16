import React from "react";
import PolicyLayout from "@/components/layout/PolicyLayout";

const RefundPolicy: React.FC = () => {
  return (
    <PolicyLayout 
      title="Refund Policy" 
      description="WhoToDate Refund Policy - Learn about our refund terms and conditions for premium services and report purchases."
      lastUpdated="April 15, 2025"
    >
      <p>
        This Refund Policy outlines the terms and conditions regarding refunds for purchases made on WhoToDate's website at <a href="https://whotodate.com" target="_blank" rel="noopener noreferrer">whotodate.com</a> (the "Website") and our mobile application (the "App"). This policy applies to all premium services, compatibility reports, and counseling sessions.
      </p>
      
      <h2>Premium Subscriptions</h2>
      
      <h3>14-Day Refund Period for New Subscriptions</h3>
      <p>
        For first-time subscribers to our premium services, we offer a 14-day refund period from the date of purchase. If you are not satisfied with our premium services within this period, you may request a full refund.
      </p>
      
      <h3>Subscription Renewals</h3>
      <p>
        Automatic subscription renewals are not eligible for refunds unless:
      </p>
      <ul>
        <li>You requested cancellation prior to renewal but were charged anyway</li>
        <li>There is a demonstrable technical failure that prevented you from accessing the paid features</li>
      </ul>
      
      <h3>Subscription Cancellation</h3>
      <p>
        Cancelling your subscription will stop future billing but will not automatically trigger a refund. Your access to premium features will continue until the end of your current billing period. To cancel your subscription:
      </p>
      <ol>
        <li>Log in to your account</li>
        <li>Go to Settings &gt; Subscription</li>
        <li>Click "Cancel Subscription"</li>
        <li>Follow the prompts to confirm cancellation</li>
      </ol>
      
      <h2>Compatibility Reports</h2>
      
      <h3>48-Hour Refund Period</h3>
      <p>
        We offer a 48-hour refund period for one-time compatibility report purchases. If you are not satisfied with your report, you may request a refund within 48 hours of purchase, provided you have not downloaded or extensively accessed the report.
      </p>
      
      <h3>Report Content Disputes</h3>
      <p>
        Refunds based on disagreement with the content or assessment methodology of the report are considered on a case-by-case basis. Please note that our reports are based on established psychological frameworks and the information you provide during the assessment process.
      </p>
      
      <h2>Counseling Sessions</h2>
      
      <h3>Cancellation Policy</h3>
      <p>
        For counseling sessions with our verified professionals:
      </p>
      <ul>
        <li><strong>24+ hours notice</strong>: Full refund or session credit</li>
        <li><strong>12-24 hours notice</strong>: 75% refund or full session credit</li>
        <li><strong>4-12 hours notice</strong>: 50% refund or full session credit</li>
        <li><strong>Less than 4 hours notice</strong>: No refund (except in emergency circumstances)</li>
      </ul>
      
      <h3>No-Shows</h3>
      <p>
        If you miss a scheduled counseling session without prior notification, no refund will be provided.
      </p>
      
      <h3>Counselor Cancellations</h3>
      <p>
        If a counselor cancels a session, you will receive a full refund or the option to reschedule at no additional cost.
      </p>
      
      <h2>Technical Issues</h2>
      
      <p>
        If technical issues prevent you from accessing a paid service or feature, please contact our support team immediately. Refunds for technical issues are granted only if:
      </p>
      <ul>
        <li>The issue was on our end (server problems, platform bugs, etc.)</li>
        <li>We were unable to resolve the issue within a reasonable time frame</li>
        <li>You reported the issue to us promptly</li>
      </ul>
      
      <h2>Ineligible for Refunds</h2>
      
      <p>
        The following circumstances are generally not eligible for refunds:
      </p>
      <ul>
        <li>Requests made after the specified refund period has expired</li>
        <li>Dissatisfaction with the matching recommendations or compatibility results</li>
        <li>Subscription cancellations after the refund period has expired</li>
        <li>Claimed lack of use of the services during the subscription period</li>
        <li>Violation of our Terms of Service</li>
        <li>Purchases made with promotional or discounted pricing</li>
      </ul>
      
      <h2>How to Request a Refund</h2>
      
      <p>
        To request a refund, please:
      </p>
      <ol>
        <li>Email <a href="mailto:hello@whotodate.com">hello@whotodate.com</a> with the subject line "Refund Request"</li>
        <li>Include your account email address, purchase date, and order/transaction ID</li>
        <li>Provide a brief explanation for your refund request</li>
        <li>Attach any relevant screenshots or evidence, if applicable</li>
      </ol>
      
      <h2>Refund Processing</h2>
      
      <p>
        When a refund is approved:
      </p>
      <ul>
        <li>Refunds will be processed to the original payment method used for the purchase</li>
        <li>Processing time typically takes 5-10 business days, depending on your payment provider</li>
        <li>You will receive email confirmation once the refund has been processed</li>
      </ul>
      
      <h2>Exceptions</h2>
      
      <p>
        We understand that exceptional circumstances can arise. In cases of serious illness, family emergencies, or other extenuating circumstances, we may consider refund requests outside of our standard policy on a case-by-case basis. Please provide any relevant documentation to support such requests.
      </p>
      
      <h2>Changes to This Policy</h2>
      
      <p>
        We may update this Refund Policy from time to time. If we make material changes, we will notify you by email (if you have provided one) or by posting a notice on our Website prior to the changes becoming effective.
      </p>
      
      <h2>Contact Us</h2>
      
      <p>
        If you have any questions about this Refund Policy, please contact us at:
      </p>
      
      <p>
        Email: <a href="mailto:hello@whotodate.com">hello@whotodate.com</a><br />
        Phone: <a href="https://wa.me/919370922063">+91 9370922063</a>
      </p>
    </PolicyLayout>
  );
};

export default RefundPolicy;