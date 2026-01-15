import { useEffect, useState, useRef } from 'react';
import PixelButton from './PixelButton';
import ScrollReveal from './ScrollReveal';
import courtroomBg from '@/assets/courtroom-bg.png';

const CTASection = () => {
  const [showFlash, setShowFlash] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const offset = window.innerHeight - rect.top;
        if (offset > 0) {
          setScrollY(offset);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    setShowFlash(true);
    setTimeout(() => {
      setShowFlash(false);
      window.location.href = 'http://localhost:5173';
    }, 300);
  };

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background with darker overlay and parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-75 ease-out"
        style={{
          backgroundImage: `url(${courtroomBg})`,
          transform: `translateY(${-scrollY * 0.2}px) scale(1.2)`
        }}
      />
      <div className="absolute inset-0 bg-foreground/60" />

      {/* Screen flash effect */}
      {showFlash && (
        <div className="absolute inset-0 animate-screen-flash z-20 pointer-events-none" />
      )}

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Content */}
      <ScrollReveal
        className="relative z-10 max-w-xl mx-auto text-center"
      >
        {/* Decorative gavel icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center bg-cream/90 border-4 border-border">
            <div className="animate-pixel-bob">
              {/* Simple gavel */}
              <div className="w-8 h-3 bg-wood-medium border-2 border-foreground" />
              <div className="w-2 h-4 bg-wood-light border-2 border-foreground mx-auto -mt-[2px]" />
            </div>
          </div>
        </div>

        {/* Text box */}
        <div className="pixel-panel p-8 mb-8">
          <h2 className="text-sm md:text-lg text-foreground mb-4">
            READY TO DELIBERATE?
          </h2>
          <p className="text-[10px] text-muted-foreground mb-6 leading-relaxed">
            Upload a report, watch agents debate each factor, then export a unified improvement plan.
          </p>

          {/* CTA Button */}
          <PixelButton
            variant="primary"
            size="lg"
            glowing
            onClick={handleClick}
          >
            Open Demo
          </PixelButton>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default CTASection;
