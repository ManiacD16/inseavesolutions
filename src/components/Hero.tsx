import { ArrowRight, Award } from "lucide-react";

// src/components/Hero.tsx
export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Registered under Companies Act, 2013 (MCA)
        </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-50 leading-tight mb-6">
            Digital Infrastructure {' '}<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
             For Modern Enterprises.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            From high-performance hosting and development to legal compliance
            and accounting. We weave the solutions your business needs to grow.
          </p>

          {/* buttons same, but with darker styling */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* primary CTA */}
            <button
              onClick={() => scrollToSection('services')}
              className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-full
                         bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/30"
            >
              Explore Services
              <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* secondary CTA */}
            <button
              onClick={() => scrollToSection('portfolio')}
              className="group inline-flex items-center gap-2 px-8 py-4 text-lg font-medium rounded-full
                         border border-slate-700 bg-slate-900/60 text-slate-100 hover:border-indigo-400"
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
