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
        <title>WhoToDate - Unlock Your Relationship Blueprint</title>
        <meta name="description" content="Take our FREE scientifically-validated assessment to understand your unique relationship style and create your personal relationship blueprint." />
        <meta property="og:title" content="WhoToDate - Unlock Your Relationship Blueprint" />
        <meta property="og:description" content="Take our FREE scientifically-validated assessment to understand your unique relationship style and create your personal relationship blueprint." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WhoToDate - Unlock Your Relationship Blueprint" />
        <meta name="twitter:description" content="Take our FREE scientifically-validated assessment to understand your unique relationship style and create your personal relationship blueprint." />
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
