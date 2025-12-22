import {
  Users,
  Building2,
  Briefcase,
  Newspaper,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

type Props = {
  open: boolean;
  mode?: "desktop" | "mobile";
  onEnter?: () => void;
  onLeave?: () => void;
  onNavigate?: (id: string) => void;
};

export default function CompanyMegaMenu({
  open,
  mode = "desktop",
  onEnter,
  onLeave,
  onNavigate,
}: Props) {
  const companyLinks = [
    { label: "About Us", id: "company" },
    { label: "Leadership", id: "company" },
    { label: "Careers", id: "company" },
    { label: "Partners", id: "company" },
    { label: "Contact", id: "contact" },
  ];

  const highlights = [
    { label: "Our Team", icon: Users, id: "company" },
    { label: "Company Values", icon: ShieldCheck, id: "company" },
    { label: "Press & Media", icon: Newspaper, id: "resources" },
    { label: "Careers", icon: Briefcase, id: "company" },
  ];

  const go = (id: string) => onNavigate?.(id);

  // ---------------- Desktop (full width overlay)
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
        <div className="w-screen border-t border-white/10 bg-black/90 backdrop-blur-xl">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-10">
              <div className="grid grid-cols-12 gap-10">
                {/* Left: Company Links */}
                <div className="col-span-12 lg:col-span-4">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-white/85" />
                    </div>
                    <h3 className="text-white text-lg font-semibold">Company</h3>
                  </div>

                  <div className="mt-5 space-y-3">
                    {companyLinks.map((l) => (
                      <button
                        key={l.label}
                        onClick={() => go(l.id)}
                        className="block text-left w-full text-white/75 hover:text-white transition-colors"
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => go("company")}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                  >
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Middle: Highlights (cards) */}
                <div className="col-span-12 lg:col-span-5">
                  <h3 className="text-white text-lg font-semibold">
                    Explore Company
                  </h3>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {highlights.map((h) => {
                      const Icon = h.icon;
                      return (
                        <button
                          key={h.label}
                          onClick={() => go(h.id)}
                          className="group text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors p-5"
                        >
                          <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-white/85" />
                          </div>

                          <div className="mt-4 text-white/90 font-semibold">
                            {h.label}
                          </div>
                          <div className="mt-1 text-xs text-white/55">
                            View details →
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Featured panel (matches theme) */}
                <div className="col-span-12 lg:col-span-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="text-white/90 font-semibold">
                      Featured
                    </div>
                    <div className="mt-2 text-sm text-white/60 leading-relaxed">
                      Learn about our mission, how we work, and how we help teams
                      ship faster with secure, scalable delivery.
                    </div>

                    <button
                      onClick={() => go("contact")}
                      className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-neutral-200 transition-colors"
                    >
                      Talk to us <ArrowUpRight className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => go("company")}
                      className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
                    >
                      View company <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  // ---------------- Mobile (same component reused)
  return (
    <div
      className={[
        "md:hidden",
        open ? "block" : "hidden",
        "mt-2 ml-2 rounded-2xl border border-white/10 bg-white/5 p-3",
      ].join(" ")}
    >
      <div className="text-xs tracking-wide text-white/50 px-2 pt-1">
        Company Links
      </div>

      {companyLinks.map((l) => (
        <button
          key={l.label}
          onClick={() => go(l.id)}
          className="w-full text-left px-2 py-2 rounded-xl text-white/75 hover:text-white hover:bg-white/10 transition-colors"
        >
          {l.label}
        </button>
      ))}

      <div className="text-xs tracking-wide text-white/50 px-2 pt-3">
        Highlights
      </div>

      {highlights.map((h) => (
        <button
          key={h.label}
          onClick={() => go(h.id)}
          className="w-full text-left px-2 py-2 rounded-xl text-white/75 hover:text-white hover:bg-white/10 transition-colors"
        >
          {h.label}
        </button>
      ))}

      <button
        onClick={() => go("contact")}
        className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-neutral-200 transition-colors"
      >
        Talk to us <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  );
}
