// ./Header/SolutionMegaMenu.tsx
// import React from "react";
import { ShieldCheck, Workflow, Cog, Gauge, ArrowUpRight } from "lucide-react";

type Props = {
  open: boolean;

  // mode decides styling/positioning
  mode?: "desktop" | "mobile";

  onEnter?: () => void;
  onLeave?: () => void;

  onNavigate?: (id: string) => void;

  // mobile: collapse control (optional)
  title?: string;
};

export default function SolutionMegaMenu({
  open,
  mode = "desktop",
  onEnter,
  onLeave,
  onNavigate,
  // title = "Solution",
}: Props) {
  const services = [
    { label: "Managed Services", id: "services" },
    { label: "IT Consulting & Advisory", id: "services" },
    { label: "Cyber Security", id: "services" },
    { label: "Web Development", id: "services" },
    { label: "Mobile Development", id: "services" },
    { label: "Cloud Services", id: "services" },
  ];

  const challenges = [
    { label: "Digital Transformation", icon: Workflow, id: "solution" },
    { label: "Security", icon: ShieldCheck, id: "solution" },
    { label: "Automation", icon: Cog, id: "solution" },
    { label: "Gaining Efficiency", icon: Gauge, id: "solution" },
  ];

  const industries = [
    { label: "Industry Manufacturing", id: "industries" },
    { label: "Transportation Logistics", id: "industries" },
    { label: "Healthcare", id: "industries" },
    { label: "Banks & Insurance", id: "industries" },
    { label: "Consulting Providers", id: "industries" },
    { label: "Non Profit", id: "industries" },
  ];

  const go = (id: string) => {
    onNavigate?.(id);
  };

  // ---- Desktop wrapper (full width overlay under header)
  if (mode === "desktop") {
    return (
      <div
        className={[
          "hidden md:block",
          "fixed left-0 right-0 top-16 z-[55]",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none",
          "transition-all duration-200",
        ].join(" ")}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <div className="w-screen border-t border-white/10 bg-black/90 backdrop-blur2xl">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-10">
              <div className="grid grid-cols-12 gap-10">
                {/* Services */}
                <div className="col-span-12 lg:col-span-4">
                  <h3 className="text-white text-lg font-semibold">Services</h3>
                  <div className="mt-5 space-y-3">
                    {services.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => go(s.id)}
                        className="block text-left w-full text-white/75 hover:text-white transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Business Challenges */}
                <div className="col-span-12 lg:col-span-5">
                  <h3 className="text-white text-lg font-semibold">
                    Business Challenges
                  </h3>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {challenges.map((c) => {
                      const Icon = c.icon;
                      return (
                        <button
                          key={c.label}
                          onClick={() => go(c.id)}
                          className="group text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors p-5"
                        >
                          <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-white/85" />
                          </div>
                          <div className="mt-4 text-white/90 font-semibold">
                            {c.label}
                          </div>
                          <div className="mt-1 text-xs text-white/55">
                            Explore solutions →
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Industry Focus */}
                <div className="col-span-12 lg:col-span-3">
                  <h3 className="text-white text-lg font-semibold">
                    Industry Focus
                  </h3>
                  <div className="mt-5 space-y-3">
                    {industries.map((i) => (
                      <button
                        key={i.label}
                        onClick={() => go(i.id)}
                        className="block text-left w-full text-white/75 hover:text-white transition-colors"
                      >
                        {i.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => go("industries")}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                  >
                    View all <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  // ---- Mobile version (same data, drawer-friendly layout)
  return (
    <div
      className={[
        "md:hidden",
        open ? "block" : "hidden",
        "mt-2 ml-2 rounded-2xl border border-white/10 bg-white/1 p-3",
      ].join(" ")}
    >
      <div className="text-xs tracking-wide text-white/50 px-2 pt-1">
        Services
      </div>
      {services.map((s) => (
        <button
          key={s.label}
          onClick={() => go(s.id)}
          className="w-full text-left px-2 py-2 rounded-xl text-white/75 hover:text-white hover:bg-white/10 transition-colors"
        >
          {s.label}
        </button>
      ))}

      <div className="text-xs tracking-wide text-white/50 px-2 pt-3">
        Business Challenges
      </div>
      {challenges.map((c) => (
        <button
          key={c.label}
          onClick={() => go(c.id)}
          className="w-full text-left px-2 py-2 rounded-xl text-white/75 hover:text-white hover:bg-white/10 transition-colors"
        >
          {c.label}
        </button>
      ))}

      <div className="text-xs tracking-wide text-white/50 px-2 pt-3">
        Industry Focus
      </div>
      {industries.map((i) => (
        <button
          key={i.label}
          onClick={() => go(i.id)}
          className="w-full text-left px-2 py-2 rounded-xl text-white/75 hover:text-white hover:bg-white/10 transition-colors"
        >
          {i.label}
        </button>
      ))}

      <button
        onClick={() => go("industries")}
        className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
      >
        View all <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  );
}
