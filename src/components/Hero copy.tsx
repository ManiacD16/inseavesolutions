import { ArrowRight, Award } from "lucide-react";
import { useTypewriter } from "./common/useTypewriter";

export default function Hero() {
  const typedText = useTypewriter(
    "Trusted Digital & Legal Solutions for Growing Businesses.",
    45
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* background grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-8">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            Your Vision my Creation
          </div>

          {/* main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Digital Infrastructure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              For Modern Enterprises.
            </span>
          </h1>

          {/* typing animated text */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto mb-10 min-h-[3rem]">
            {typedText}
            <span className="ml-1 inline-block w-0.5 h-5 bg-indigo-400 animate-pulse" />
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection("services")}
              className="group inline-flex items-center gap-2 px-8 py-4 text-base sm:text-lg font-medium rounded-full
              bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/30 transition"
            >
              Explore Services
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection("certifications")}
              className="group inline-flex items-center gap-2 px-8 py-4 text-base sm:text-lg font-medium rounded-full
              border border-slate-700 bg-slate-900/60 text-slate-100 hover:border-indigo-400 transition"
            >
              <Award className="h-5 w-5" />
              View Certifications
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
