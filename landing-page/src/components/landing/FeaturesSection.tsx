import ScrollReveal from './ScrollReveal';
import PixelPanel from './PixelPanel';
import PixelIcon from './PixelIcon';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: 'brain' as const,
    title: 'Deliberative Multi-Agent Reasoning',
    description: 'Separate agents extract factors, argue both sides, coordinate stages, and synthesize outcomes.',
  },
  {
    icon: 'scale' as const,
    title: 'Transparent Debate Traces',
    description: 'Expose claims, rebuttals, evidence packets, and the execution flow that produced the final report.',
  },
  {
    icon: 'gavel' as const,
    title: 'Unified, Actionable Report',
    description: 'One integrated outcome: what worked, what failed, why it happened, and how to improve.',
  },
  {
    icon: 'scroll' as const,
    title: 'Structured Coordination Flow',
    description: 'A defined pipeline governs how agents communicate, exchange context, and progress through stages.',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-20 px-4 bg-card">
      {/* Decorative pixel pattern top */}
      <div className="absolute top-0 left-0 right-0 h-4 flex">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 h-full',
              i % 2 === 0 ? 'bg-border' : 'bg-transparent'
            )}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-lg md:text-xl text-foreground mb-4">
            FEATURES
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-1 bg-border" />
            <div className="w-3 h-3 bg-accent" />
            <div className="w-12 h-1 bg-border" />
          </div>
        </ScrollReveal>

        {/* Features stack */}
        <div className="space-y-6">
          {features.map((feature, index) => (
            <ScrollReveal
              key={index}
              animation={index % 2 === 0 ? 'slide-left' : 'slide-right'}
              delay={(index + 1) * 100}
            >
              <PixelPanel
                variant="default"
                className="flex items-center gap-6 will-change-transform transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] focus-within:-translate-y-1 focus-within:scale-[1.03] hover:shadow-[inset_-4px_-4px_0_0_hsl(var(--wood-dark)/0.5),inset_4px_4px_0_0_hsl(var(--cream)/0.8),12px_12px_0_0_hsl(var(--wood-dark)/0.25)]"
              >
                {/* Icon */}
                <PixelIcon
                  icon={feature.icon}
                  size="lg"
                  animated={feature.icon === 'gavel'}
                />

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xs text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="hidden sm:flex flex-col gap-1">
                  <div className="w-2 h-2 bg-accent" />
                  <div className="w-2 h-2 bg-accent/60" />
                  <div className="w-2 h-2 bg-accent/30" />
                </div>
              </PixelPanel>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Decorative pixel pattern bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-4 flex">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 h-full',
              i % 2 === 0 ? 'bg-border' : 'bg-transparent'
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
