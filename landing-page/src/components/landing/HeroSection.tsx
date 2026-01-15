import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import PixelButton from './PixelButton';
import TypewriterText from './TypewriterText';
import courtroomBg from '@/assets/courtroom-bg.png';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterCourtroom = () => {
    window.location.href = 'http://localhost:5173';
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-75 ease-out"
        style={{
          backgroundImage: `url(${courtroomBg})`,
          transform: `translateY(${scrollY * 0.4}px) scale(1.1)`
        }}
      />

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-foreground/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-28 pb-20">
        {/* Pixel text box overlay */}
        <div
          className={cn(
            'pixel-panel max-w-2xl mx-auto text-center p-8',
            isLoaded ? 'animate-fade-up' : 'opacity-0'
          )}
        >
          {/* Title */}
          <h1 className="text-xl md:text-3xl text-foreground leading-relaxed mb-6">
            <TypewriterText
              text="AETHER"
              speed={80}
              delay={300}
              showCursor={false}
              onComplete={() => setShowSubtitle(true)}
            />
          </h1>

          {/* Decorative pixel divider */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-1 bg-accent" />
            <div className="w-2 h-2 bg-accent" />
            <div className="w-8 h-1 bg-accent" />
          </div>

          {/* Subtitle */}
          <p
            className={cn(
              'text-[10px] md:text-xs text-muted-foreground mb-8 leading-relaxed',
              showSubtitle ? 'animate-fade-up' : 'opacity-0'
            )}
          >
            {showSubtitle && (
              <TypewriterText
                text="Deliberative multi-agent analysis with transparent debates and unified recommendations."
                speed={40}
                onComplete={() => setShowButtons(true)}
              />
            )}
          </p>

          {/* CTA Buttons */}
          <div
            className={cn(
              'flex flex-col sm:flex-row gap-4 justify-center',
              showButtons ? 'animate-fade-up' : 'opacity-0'
            )}
          >
            <PixelButton
              variant="primary"
              size="lg"
              glowing
              onClick={handleEnterCourtroom}
            >
              Open Demo
            </PixelButton>
            <PixelButton
              variant="secondary"
              size="lg"
              onClick={scrollToHowItWorks}
            >
              How It Works
            </PixelButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[8px] text-cream/80">SCROLL</span>
          <div className="flex flex-col gap-1 animate-pixel-bob">
            <div className="w-2 h-2 bg-cream/60" />
            <div className="w-2 h-2 bg-cream/40" />
            <div className="w-2 h-2 bg-cream/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
