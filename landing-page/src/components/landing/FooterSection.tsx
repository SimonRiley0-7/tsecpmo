import ScrollReveal from "./ScrollReveal";
import PixelButton from "./PixelButton";

const FooterSection = () => {
  const scrollToTop = () => {
    const el = document.getElementById("top");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative px-4 pt-10 pb-12 bg-foreground text-cream overflow-hidden">
      {/* Pixel pattern */}
      <div className="absolute inset-x-0 top-0 h-4 flex">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className={i % 2 === 0 ? "flex-1 h-full bg-cream/15" : "flex-1 h-full bg-transparent"}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="pixel-border bg-cream/10 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="w-2 h-2 bg-accent" />
                AETHER
              </div>
              <p className="mt-3 text-[9px] leading-relaxed text-cream/80 max-w-xl">
                Deliberative multi-agent analysis for complex reports. Structured debate, coordinated stages,
                and one unified, actionable output.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="pixel-border-thin bg-cream/10 px-3 py-2 text-[8px] text-cream/80">
                  MULTI-AGENT
                </span>
                <span className="pixel-border-thin bg-cream/10 px-3 py-2 text-[8px] text-cream/80">
                  STRUCTURED DEBATE
                </span>
                <span className="pixel-border-thin bg-cream/10 px-3 py-2 text-[8px] text-cream/80">
                  INTERPRETABLE OUTPUT
                </span>
              </div>
            </div>

            <div className="w-full md:w-auto flex flex-col gap-3">
              <PixelButton variant="secondary" size="sm" onClick={scrollToTop}>
                Back to Top
              </PixelButton>
              <div className="text-[8px] text-cream/60 leading-relaxed">
                Built for transparent reasoning across sales, statistics, org analysis, and policy.
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-cream/20 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="text-[8px] text-cream/60">
              © 2026 AETHER • ALL RIGHTS RESERVED
            </div>
            <div className="flex items-center gap-4 text-[8px] text-cream/60">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent/70" />
                STATUS: ONLINE
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cream/40" />
                BUILD: v0.1
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default FooterSection;


