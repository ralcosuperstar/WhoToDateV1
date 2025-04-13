import SimpleHero from "@/components/home/SimpleHero";
import SimpleFeaturesSection from "@/components/home/SimpleFeaturesSection";
import SimpleHowItWorks from "@/components/home/SimpleHowItWorks";
import SimpleTestimonialsSection from "@/components/home/SimpleTestimonialsSection";
import SimpleCTASection from "@/components/home/SimpleCTASection";
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>WhoToDate - Find Your Perfect Match</title>
        <meta name="description" content="WhoToDate helps you find people who are right for you through a fun quiz that's super easy to understand." />
        <meta property="og:title" content="WhoToDate - Find Your Perfect Match" />
        <meta property="og:description" content="WhoToDate helps you find people who are right for you through a fun quiz that's super easy to understand." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WhoToDate - Find Your Perfect Match" />
        <meta name="twitter:description" content="WhoToDate helps you find people who are right for you through a fun quiz that's super easy to understand." />
      </Helmet>
      
      <SimpleHero />
      <SimpleFeaturesSection />
      <SimpleHowItWorks />
      <SimpleTestimonialsSection />
      <SimpleCTASection />
    </>
  );
};

export default Home;
