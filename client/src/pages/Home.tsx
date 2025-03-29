import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ScienceSection from "@/components/home/ScienceSection";
import ReportPreviewSection from "@/components/home/ReportPreviewSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogSection from "@/components/home/BlogSection";
import CTASection from "@/components/home/CTASection";
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>WhoToDate - Discover Your Compatibility DNA</title>
        <meta name="description" content="WhoToDate helps you discover your relationship compatibility profile through a fun, scientific assessment tailored for Indian singles." />
        <meta property="og:title" content="WhoToDate - Discover Your Compatibility DNA" />
        <meta property="og:description" content="WhoToDate helps you discover your relationship compatibility profile through a fun, scientific assessment tailored for Indian singles." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WhoToDate - Discover Your Compatibility DNA" />
        <meta name="twitter:description" content="WhoToDate helps you discover your relationship compatibility profile through a fun, scientific assessment tailored for Indian singles." />
      </Helmet>
      
      <HeroSection />
      <FeaturesSection />
      <ScienceSection />
      <ReportPreviewSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
    </>
  );
};

export default Home;
