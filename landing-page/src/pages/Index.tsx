import HeroSection from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import CTASection from '@/components/landing/CTASection';

const Index = () => {
  return (
    <main className="min-h-screen bg-background font-pixel">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
};

export default Index;
