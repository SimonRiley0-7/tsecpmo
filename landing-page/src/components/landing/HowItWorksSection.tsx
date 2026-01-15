import ScrollReveal from './ScrollReveal';
import PixelPanel from './PixelPanel';
import PixelIcon from './PixelIcon';

const steps = [
  {
    icon: 'document' as const,
    title: 'Extract Key Factors',
    description: 'AETHER decomposes complex reports into decision-driving factors.',
  },
  {
    icon: 'debate' as const,
    title: 'Debate Each Factor',
    description: 'Support and Oppose agents challenge each claim with rebuttals.',
  },
  {
    icon: 'verdict' as const,
    title: 'Synthesize One Report',
    description: 'A unified, actionable summary with traceable reasoning and next steps.',
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

      {/* Steps timeline */}
      <div className="max-w-5xl mx-auto">
        {/* Desktop timeline */}
        <div className="hidden md:block">
          <div className="relative pl-12">
            {/* Vertical line connecting all steps */}
            <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-border" />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <ScrollReveal
                  key={step.title}
                  delay={(index + 1) * 150}
                  animation="fade-up"
                >
                  <div className="relative">
                    {/* Dot + number connected to line */}
                    <div className="absolute -left-12 top-4 flex items-center">
                      <div className="w-6 h-6 bg-accent border-2 border-wood-dark flex items-center justify-center text-[10px] text-accent-foreground">
                        {index + 1}
                      </div>
                      <div className="w-8 h-[2px] bg-border ml-2" />
                    </div>

                    <PixelPanel
                      variant="cream"
                      className="w-full text-left pr-6"
                    >
                      <div className="flex items-start gap-4">
                        <PixelIcon icon={step.icon} size="md" className="shrink-0" />
                        <div>
                          <h3 className="text-xs text-foreground mb-2">
                            {step.title}
                          </h3>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </PixelPanel>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile stacked steps */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={(index + 1) * 150}>
              <PixelPanel variant="cream" className="text-center">
                <div className="mb-2 text-[8px] text-muted-foreground tracking-[0.2em]">
                  STEP {index + 1}
                </div>
                <div className="flex justify-center mb-3">
                  <PixelIcon icon={step.icon} size="md" />
                </div>
                <h3 className="text-xs text-foreground mb-2">{step.title}</h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </PixelPanel>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
