import HeroSection from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import AgentsSection from '@/components/landing/AgentsSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import CTASection from '@/components/landing/CTASection';
import LandingNav from '@/components/landing/LandingNav';
import FooterSection from '@/components/landing/FooterSection';

const Index = () => {
  return (
    <main className="min-h-screen bg-background font-pixel">
      <div id="top" />
      <LandingNav />
      <HeroSection />
      <HowItWorksSection />
      <AgentsSection />
      <FeaturesSection />
      <CTASection />
      <FooterSection />
    </main>
  );
};

export default Index;
