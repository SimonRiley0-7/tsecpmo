import ScrollReveal from "./ScrollReveal";
import PixelIcon from "./PixelIcon";
import PixelPanel from "./PixelPanel";

const agents = [
  {
    icon: "document" as const,
    title: "Factor Extractor",
    description:
      "Breaks a long report into the few key factors that actually drive outcomes.",
  },
  {
    icon: "debate" as const,
    title: "Support vs Oppose",
    description:
      "Two agents argue each factor from opposite sides, directly responding to each other’s claims.",
  },
  {
    icon: "brain" as const,
    title: "Coordinator",
    description:
      "Orchestrates stages, passes context, and keeps the debate structured and on-track.",
  },
  {
    icon: "verdict" as const,
    title: "Synthesizer",
    description:
      "Integrates every argument into one actionable report: what worked, what failed, why, and how to improve.",
  },
];

const AgentsSection = () => {
  return (
    <section id="agents" className="relative py-20 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-lg md:text-xl text-foreground mb-4">
            AGENTS & ROLES
          </h2>
          <p className="text-[10px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AETHER is not a single model. It’s a coordinated team: extraction, debate,
            coordination, and synthesis—designed for transparency.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-12 h-1 bg-border" />
            <div className="w-3 h-3 bg-accent" />
            <div className="w-12 h-1 bg-border" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, idx) => (
            <ScrollReveal key={agent.title} delay={(idx + 1) * 100} className="flex">
              <PixelPanel
                variant="default"
                className="w-full text-center will-change-transform transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] focus-within:-translate-y-1 focus-within:scale-[1.02]"
              >
                <div className="flex justify-center mb-4">
                  <PixelIcon icon={agent.icon} size="lg" />
                </div>
                <h3 className="text-xs text-foreground mb-3">{agent.title}</h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  {agent.description}
                </p>
              </PixelPanel>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;


