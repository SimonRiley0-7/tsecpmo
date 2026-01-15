import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import PixelButton from "./PixelButton";

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const LandingNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "how-it-works" | "agents" | "features" | "cta" | null
  >(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["how-it-works", "agents", "features", "cta"] as const;
    const elements = ids
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((x): x is { id: (typeof ids)[number]; el: HTMLElement } => Boolean(x.el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id && ids.includes(visible.target.id as any)) {
          setActiveSection(visible.target.id as any);
        }
      },
      { root: null, threshold: [0.2, 0.35, 0.5], rootMargin: "-20% 0px -60% 0px" }
    );

    elements.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleOpenDemo = () => {
    const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL;
    if (dashboardUrl) window.location.href = dashboardUrl;
    else scrollToId("cta");
  };

  const navItemClass = (id: NonNullable<typeof activeSection>) =>
    cn(
      "relative text-[10px] px-1.5 py-0.5",
      "text-foreground/80 hover:text-foreground",
      activeSection === id && "text-foreground",
      "after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-[2px] after:bg-accent after:scale-x-0 after:origin-center after:transition-transform after:duration-200",
      activeSection === id && "after:scale-x-100"
    );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div
        className={cn(
          "mx-auto max-w-6xl",
          "px-6",
          "transition-all duration-200 ease-out",
          isScrolled ? "py-2" : "py-3"
        )}
      >
        <div className="flex items-center justify-between gap-6">
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="flex items-center gap-2 text-[11px] text-foreground"
          >
            <span className="w-2 h-2 bg-accent" />
            AETHER
          </button>

          <div className="hidden md:flex items-center gap-6">
            <button
              type="button"
              onClick={() => {
                setActiveSection("how-it-works");
                scrollToId("how-it-works");
              }}
              className={navItemClass("how-it-works")}
            >
              HOW IT WORKS
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSection("agents");
                scrollToId("agents");
              }}
              className={navItemClass("agents")}
            >
              AGENTS
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSection("features");
                scrollToId("features");
              }}
              className={navItemClass("features")}
            >
              FEATURES
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSection("cta");
                scrollToId("cta");
              }}
              className={navItemClass("cta")}
            >
              START
            </button>
          </div>

          <div className="flex items-center gap-4">
            <PixelButton variant="primary" size="sm" glowing onClick={handleOpenDemo}>
              Open Demo
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingNav;


