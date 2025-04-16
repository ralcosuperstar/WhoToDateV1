import React from "react";
import PolicyLayout from "@/components/layout/PolicyLayout";

const CookiePolicy: React.FC = () => {
  return (
    <PolicyLayout 
      title="Cookie Policy" 
      description="WhoToDate Cookie Policy - Learn about how we use cookies and similar technologies on our platform."
      lastUpdated="April 15, 2025"
    >
      <p>
        This Cookie Policy explains how WhoToDate ("we," "our," or "us") uses cookies and similar technologies on our website at <a href="https://whotodate.com" target="_blank" rel="noopener noreferrer">whotodate.com</a> (the "Website") and our mobile application (the "App"). This Cookie Policy should be read together with our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.
      </p>
      
      <h2>What Are Cookies?</h2>
      
      <p>
        Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.
      </p>
      
      <h2>Types of Cookies We Use</h2>
      
      <p>We use the following types of cookies:</p>
      
      <h3>Essential Cookies</h3>
      <p>
        These cookies are necessary for the Website to function properly and cannot be turned off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the Website may not work correctly.
      </p>
      
      <h3>Performance Cookies</h3>
      <p>
        These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our Website. They help us understand which pages are the most and least popular and see how visitors navigate around the Website. All information these cookies collect is aggregated and therefore anonymous.
      </p>
      
      <h3>Functionality Cookies</h3>
      <p>
        These cookies enable the Website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. If you do not allow these cookies, some or all of these services may not function properly.
      </p>
      
      <h3>Targeting Cookies</h3>
      <p>
        These cookies may be set through our Website by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other websites. They do not store directly personal information but are based on uniquely identifying your browser and internet device.
      </p>
      
      <h2>Third-Party Cookies</h2>
      
      <p>
        We also use cookies from the following third parties:
      </p>
      
      <ul>
        <li><strong>Google Analytics</strong>: For website analytics and performance tracking</li>
        <li><strong>Meta/Facebook Pixel</strong>: For advertising and conversion tracking</li>
        <li><strong>Stripe</strong>: For payment processing</li>
        <li><strong>Intercom/Zendesk</strong>: For customer support services</li>
      </ul>
      
      <p>
        Each of these third parties has its own privacy and cookie policies, which we encourage you to review.
      </p>
      
      <h2>Similar Technologies</h2>
      
      <p>
        In addition to cookies, we may use the following similar technologies:
      </p>
      
      <ul>
        <li><strong>Web Beacons/Pixel Tags</strong>: Small graphic images (also known as "pixel tags" or "clear GIFs") that may be included on our Website, App, and email messages, which typically work in conjunction with cookies to identify our users and user behavior.</li>
        <li><strong>Local Storage Objects</strong>: Technologies such as HTML5 LocalStorage and IndexedDB, which are used by websites to store data in your browser. These data points cannot be deleted by changing cookie settings but can be cleared through your browser settings.</li>
        <li><strong>Mobile Device Identifiers</strong>: Similar to cookies, these identifiers are stored on your mobile device and help us analyze how our App is being used.</li>
      </ul>
      
      <h2>Your Choices Regarding Cookies</h2>
      
      <h3>Browser Controls</h3>
      <p>
        Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies or delete certain cookies. Generally, you can also manage similar technologies in the same way that you manage cookies using your browser's preferences.
      </p>
      
      <p>
        Please note that if you choose to block cookies, this may impair or prevent the functionality of our services. For example, you may not be able to log in to your account or use certain features of our Website or App.
      </p>
      
      <h3>Do Not Track</h3>
      <p>
        Some browsers have "Do Not Track" (DNT) features that can send a signal to websites you visit indicating that you do not wish to be tracked. Because there is not yet a common understanding of how to interpret DNT signals, we do not currently respond to browser DNT signals.
      </p>
      
      <h3>Opt-Out of Targeted Advertising</h3>
      <p>
        You can opt out of receiving targeted advertising through advertising networks by visiting:
      </p>
      
      <ul>
        <li>Digital Advertising Alliance (DAA): <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">http://www.aboutads.info/choices/</a></li>
        <li>European Interactive Digital Advertising Alliance (EDAA): <a href="http://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">http://www.youronlinechoices.eu/</a></li>
        <li>Network Advertising Initiative (NAI): <a href="http://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">http://optout.networkadvertising.org/</a></li>
      </ul>
      
      <h2>Cookie Consent</h2>
      
      <p>
        When you first visit our Website, you will be presented with a cookie banner that allows you to accept or decline non-essential cookies. You can change your preferences at any time by clicking on the "Cookie Preferences" link in the footer of our Website.
      </p>
      
      <h2>Changes to This Cookie Policy</h2>
      
      <p>
        We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. If we make material changes, we will notify you by posting a notice on our Website or, where legally required, by directly contacting you.
      </p>
      
      <h2>Contact Us</h2>
      
      <p>
        If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
      </p>
      
      <p>
        Email: <a href="mailto:hello@whotodate.com">hello@whotodate.com</a><br />
        Phone: <a href="https://wa.me/919370922063">+91 9370922063</a>
      </p>
    </PolicyLayout>
  );
};

export default CookiePolicy;