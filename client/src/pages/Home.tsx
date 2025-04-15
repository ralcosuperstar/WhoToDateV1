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
        <title>WhoToDate - Find Who to Date With Science and Fun</title>
        <meta name="description" content="Take our FREE 5-minute compatibility quiz to boost your dating confidence. Discover your personality traits, attachment style, and who fits you best." />
        <meta property="og:title" content="WhoToDate - Find Who to Date With Science and Fun" />
        <meta property="og:description" content="Take our FREE 5-minute compatibility quiz to boost your dating confidence. Discover your personality traits, attachment style, and who fits you best." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WhoToDate - Find Who to Date With Science and Fun" />
        <meta name="twitter:description" content="Take our FREE 5-minute compatibility quiz to boost your dating confidence. Discover your personality traits, attachment style, and who fits you best." />
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
