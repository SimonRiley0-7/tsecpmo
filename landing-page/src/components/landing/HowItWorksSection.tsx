import ScrollReveal from './ScrollReveal';
import PixelPanel from './PixelPanel';
import PixelIcon from './PixelIcon';

const steps = [
  {
    icon: 'document' as const,
    title: 'Submit Evidence',
    description: 'Upload a Markdown file',
  },
  {
    icon: 'debate' as const,
    title: 'Hear Both Sides',
    description: 'Support vs Oppose',
  },
  {
    icon: 'verdict' as const,
    title: 'Final Verdict',
    description: 'AI Synthesizes the Truth',
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-20 px-4 bg-secondary">
      {/* Section title */}
      <ScrollReveal className="text-center mb-12">
        <h2 className="text-lg md:text-xl text-foreground mb-4">
          HOW IT WORKS
        </h2>
        <div className="flex items-center justify-center gap-2">
          <div className="w-12 h-1 bg-border" />
          <div className="w-3 h-3 bg-accent" />
          <div className="w-12 h-1 bg-border" />
        </div>
      </ScrollReveal>

      {/* Steps */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <ScrollReveal
            key={index}
            delay={(index + 1) * 200}
            className="flex"
          >
            <PixelPanel
              variant="cream"
              className="flex flex-col items-center text-center w-full"
            >
              {/* Step number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-[8px] border-2 border-wood-dark">
                STEP {index + 1}
              </div>

              {/* Icon */}
              <PixelIcon icon={step.icon} size="lg" className="mb-4 mt-4" />

              {/* Title */}
              <h3 className="text-xs text-foreground mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[10px] text-muted-foreground">
                {step.description}
              </p>

              {/* Connector arrow (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <div className="flex gap-[2px]">
                    <div className="w-2 h-2 bg-accent" />
                    <div className="w-2 h-2 bg-accent" />
                    <div className="w-3 h-3 bg-accent" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
                  </div>
                </div>
              )}
            </PixelPanel>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
