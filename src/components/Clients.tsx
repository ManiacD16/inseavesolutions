import React from "react";
import { Sparkles, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ClientLogo = {
  name: string;
  src?: string;
};

const DEFAULT_LOGOS: ClientLogo[] = [
  {
    name: "HostingNex",
    src: "https://tecnologia.vamtam.com/wp-content/uploads/elementor/thumbs/ND-ty6SkWNaiYy3I6E9J3lgFJJIeuHzzcdx74aHvaQ-9PFabsPmUhe_uKKqItjbtrcbw-q5jiv2gpjuggzxafx290l4mou15xce7kl05xvdhrsw.png",
  },
  {
    name: "Markoe",
    src: "https://tecnologia.vamtam.com/wp-content/uploads/elementor/thumbs/pngfind.com-registered-logo-png-2230159-q5jiv0l166dwcpd681frg53rn9f6x003wquywtkk5c.png",
  },
  {
    name: "Wario Brand",
    src: "https://tecnologia.vamtam.com/wp-content/uploads/elementor/thumbs/5b7d7d3778a94-q5jivax99cs1wey5jnwnpkhu6i089o55m61b6v588w.png",
  },
  {
    name: "DIGIHUB",
    src: "https://tecnologia.vamtam.com/wp-content/uploads/elementor/thumbs/url-q5jiuzn6zccm13ejdj14vncb1vjtpawdkm7hfjlybk.png",
  },
  {
    name: "Axleo",
    src: "https://tecnologia.vamtam.com/wp-content/uploads/elementor/thumbs/acronis-logo2-q5jiq4t7o5pa1mghqfgizvgkk7hjxlmawkv662t6gw.png",
  },
  {
    name: "Axtrem Code",
    src: "https://tecnologia.vamtam.com/wp-content/uploads/elementor/thumbs/LenovoBP-POS-color-q5jiv5a84ckbyr6cglgwalx2m6s0zhirle4eb7dla8.png",
  },
];

function StatPill({
  icon: Icon,
  label,
  value,
  gradient,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  gradient: string;
}) {
  return (
    <div className="group relative">
      <div
        className={`absolute -inset-0.5 ${gradient} rounded-full opacity-0 group-hover:opacity-75 blur transition-all duration-300`}
      ></div>
      <div className="relative inline-flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl px-6 py-3 transition-all duration-300 group-hover:border-transparent">
        <Icon className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-300">{label}</span>
          <span
            className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradient.replace(
              "bg-gradient-to-br",
              "from"
            )}`}
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}

function LogoItem({ logo }: { logo: ClientLogo }) {
  if (!logo.src) {
    return (
      <div className="group flex items-center gap-3 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-indigo-500/50 transition-all duration-300">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500" />
        <div className="leading-tight">
          <div className="text-sm font-semibold text-white">{logo.name}</div>
          <div className="text-xs text-slate-400">Brand Partner</div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative h-20 flex items-center justify-center p-6 rounded-xl bg-slate-900/30 border border-slate-700/30 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <img
        src={logo.src}
        alt={logo.name}
        className="relative h-12 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        draggable={false}
      />
    </div>
  );
}

export default function ClientLogosSection({
  logos = DEFAULT_LOGOS,
}: {
  logos?: ClientLogo[];
}) {
  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];
  const navigate = useNavigate(); // ✅ ADD THIS

  return (
    <section className="relative w-full bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-900 py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        ></div>
      </div>

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-sm font-semibold text-indigo-300">
              Trusted Worldwide
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Powering Success for</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 mt-2">
              Global Businesses
            </span>
          </h2>

          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10">
            Join thousands of satisfied clients who trust WebnexFusion for their
            digital transformation
          </p>

          {/* Stats Pills */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
            <StatPill
              icon={Users}
              label="Global Clients"
              value="20K+"
              gradient="bg-gradient-to-br from-indigo-500 to-violet-500"
            />
            <StatPill
              icon={TrendingUp}
              label="Client Satisfaction"
              value="90%+"
              gradient="bg-gradient-to-br from-violet-500 to-purple-500"
            />
          </div>
        </div>

        {/* Logos Grid - Desktop */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
            {logos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <LogoItem logo={logo} />
              </div>
            ))}
          </div>
        </div>

        {/* Logos Marquee - Mobile */}
        <div className="sm:hidden relative">
          <div className="flex gap-6 animate-scroll">
            {duplicatedLogos.map((logo, index) => (
              <div key={`${logo.name}-${index}`} className="shrink-0 w-48">
                <LogoItem logo={logo} />
              </div>
            ))}
          </div>

          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center gap-6">
          {/* Divider */}
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

          {/* Indicator */}
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <div
              className="h-2 w-2 rounded-full bg-violet-500 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-slate-400 text-sm mb-4">
              Want to join our success stories?
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl 
  bg-gradient-to-r from-indigo-600 to-violet-600 
  hover:from-indigo-500 hover:to-violet-500 
  text-white font-semibold transition-all duration-300 
  hover:scale-105 shadow-lg shadow-indigo-500/50"
            >
              <span>Become a Client</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>

      {/* Custom Styles */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
