import MaturityHero from "../components/home/MaturityHero";
import MaturityInsightsSection from "../components/home/MaturityInsightsSection";
import MaturityMethodologySection from "../components/home/MaturityMethodologySection";
import MaturityTestimonialsSection from "../components/home/MaturityTestimonialsSection";
import MaturityCTASection from "../components/home/MaturityCTASection";
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>WhoToDate - Discover Your Relationship Compatibility DNA</title>
        <meta name="description" content="Take our scientifically-validated assessment to understand your unique relationship patterns and discover who you're most compatible with." />
        <meta property="og:title" content="WhoToDate - Discover Your Relationship Compatibility DNA" />
        <meta property="og:description" content="Take our scientifically-validated assessment to understand your unique relationship patterns and discover who you're most compatible with." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WhoToDate - Discover Your Relationship Compatibility DNA" />
        <meta name="twitter:description" content="Take our scientifically-validated assessment to understand your unique relationship patterns and discover who you're most compatible with." />
      </Helmet>
      
      <MaturityHero />
      <MaturityInsightsSection />
      <MaturityMethodologySection />
      <MaturityTestimonialsSection />
      <MaturityCTASection />
    </>
  );
};

export default Home;
