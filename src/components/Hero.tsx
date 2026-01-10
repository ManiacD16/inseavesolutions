import { ArrowRight, Award } from "lucide-react";
import { useTypewriter } from "./common/useTypewriter";

export default function Hero() {
  const typedText = useTypewriter(
    "WebnexFusion delivers legally compliant digital infrastructure —including web development, cloud solutions, business registrations,statutory filings, and financial support — under one secure platform",
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
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
            </span>
            Your Vision, My Creation
          </div>

          {/* main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Smart Digital Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              Built for Business Growth.
            </span>
          </h1>

          {/* typing animated text */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto mb-10 min-h-[3rem]">
            {typedText}
            <span className="ml-1 inline-block w-0.5 h-5 bg-indigo-400 animate-pulse" />
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* Primary Button */}
            <button
              onClick={() => scrollToSection("services")}
              className="group relative inline-flex items-center justify-center gap-2
      w-56 sm:w-60 h-14 sm:h-16
      text-base sm:text-lg font-semibold rounded-full
      bg-indigo-500 text-white
      shadow-lg shadow-indigo-500/30
      overflow-hidden transition-all duration-300
      hover:shadow-indigo-500/50 hover:scale-[1.03]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Services
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>

              {/* hover glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={() => scrollToSection("certifications")}
              className="group relative inline-flex items-center justify-center gap-2
      w-56 sm:w-60 h-14 sm:h-16
      text-base sm:text-lg font-semibold rounded-full
      border border-slate-700
      bg-slate-900/60 text-slate-100
      overflow-hidden transition-all duration-300
      hover:border-indigo-400 hover:scale-[1.03]"
            >
              {/* <span className="relative z-10 flex items-center gap-2">
                <Award className="h-5 w-5" />
                View Certifications
              </span> */}

              {/* subtle shine */}
              <span className="absolute -left-10 top-0 h-full w-10 bg-white/10 rotate-12 translate-x-[-150%] group-hover:translate-x-[400%] transition-transform duration-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
