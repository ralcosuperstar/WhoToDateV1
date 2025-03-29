import { Helmet } from 'react-helmet';
import PaymentForm from "@/components/payment/PaymentForm";

const Payment = () => {
  return (
    <>
      <Helmet>
        <title>Payment - MyDate Compatibility Report</title>
        <meta name="description" content="Unlock your full compatibility report with a one-time payment and discover your relationship personality." />
        <meta name="robots" content="noindex" /> {/* Don't index payment pages */}
      </Helmet>
      
      <div className="min-h-screen bg-neutral-light pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-lg">
          <div className="text-center mb-8">
            <h1 className="font-heading font-bold text-2xl md:text-3xl">Unlock Your Full Report</h1>
            <p className="text-neutral-dark/70 mt-2">
              Complete your payment to access your comprehensive compatibility profile.
            </p>
          </div>
          
          <PaymentForm />
          
          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-dark/70 mb-2">Secure payment powered by Razorpay</p>
            <div className="flex justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-neutral-dark/40">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-neutral-dark/40">SSL Encrypted & Secure</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
