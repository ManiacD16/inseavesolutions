// src/pages/Team.tsx

import { Linkedin, Mail, Crown, Briefcase, Sparkles } from "lucide-react";

function TeamCard({
  name,
  role,
  description,
  icon,
  linkedIn,
  email,
  gradient,
}: {
  name: string;
  role: string;
  description: string;
  icon: React.ReactNode;
  linkedIn?: string;
  email?: string;
  gradient: string;
}) {
  return (
    <div className="group relative">
      {/* Glow Effect */}
      <div
        className={`absolute -inset-0.5 ${gradient} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700`}
      ></div>

      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl border border-slate-700/50 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-transparent">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Gradient Orb */}
        <div
          className={`absolute -top-20 -right-20 w-60 h-60 ${gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700`}
        ></div>

        <div className="relative p-10">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            {/* Avatar with Animated Ring */}
            <div className="relative mb-6">
              <div
                className={`absolute -inset-2 ${gradient} rounded-full opacity-75 blur-md animate-pulse`}
              ></div>
              <div
                className={`relative w-36 h-36 rounded-full ${gradient} p-[3px] shadow-2xl`}
              >
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl grayscale group-hover:grayscale-0 transition-all duration-500">
                    👤
                  </div>
                </div>
              </div>
              {/* Status Indicator */}
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-slate-900 shadow-lg animate-pulse"></div>
            </div>

            {/* Role Icon Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${gradient} bg-opacity-20 border border-white/10 mb-4`}
            >
              {icon}
              <span className="text-sm font-semibold text-white">{role}</span>
            </div>

            {/* Name */}
            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-violet-400 transition-all duration-300">
              {name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-slate-300 leading-relaxed text-center mb-8 min-h-[100px]">
            {description}
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-6"></div>

          {/* Contact Links */}
          <div className="flex justify-center gap-4">
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/50 hover:bg-indigo-600/20 border border-slate-700 hover:border-indigo-500/50 transition-all duration-300"
            >
              <Linkedin className="w-4 h-4 text-slate-400 group-hover/btn:text-indigo-400 transition-colors" />
              <span className="text-sm font-medium text-slate-300 group-hover/btn:text-white transition-colors">
                LinkedIn
              </span>
            </a>
            <a
              href={`mailto:${email}`}
              className="group/btn flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/50 hover:bg-violet-600/20 border border-slate-700 hover:border-violet-500/50 transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-slate-400 group-hover/btn:text-violet-400 transition-colors" />
              <span className="text-sm font-medium text-slate-300 group-hover/btn:text-white transition-colors">
                Email
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className={`h-1 ${gradient}`}></div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Grid Pattern Overlay */}
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

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm mb-6 group hover:border-indigo-500/40 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-violet-300">
              Leadership Team
            </span>
            <Sparkles
              className="w-4 h-4 text-violet-400 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-white mb-2">Meet the Minds Behind</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 animate-gradient">
              WebnexFusion
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-slate-300 text-lg sm:text-xl leading-relaxed">
            Our leadership team combines{" "}
            <span className="text-indigo-400 font-semibold">
              technical excellence
            </span>
            ,{" "}
            <span className="text-violet-400 font-semibold">
              strategic vision
            </span>
            , and{" "}
            <span className="text-purple-400 font-semibold">
              financial expertise
            </span>{" "}
            to build scalable digital solutions and long-term business value.
          </p>

          {/* Decorative Line */}
          <div className="mt-10 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          {/* CEO */}
          <TeamCard
            name="Amit Tripathi"
            role="CEO & Founder"
            icon={<Crown className="h-5 w-5 text-amber-400" />}
            description="A visionary entrepreneur and technology leader with a strong passion for building scalable digital products. Amit leads WebnexFusion with a focus on innovation, quality, and long-term client success."
            linkedIn="#"
            email="amit@webnexfusion.com"
            gradient="bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500"
          />

          {/* CFO */}
          <TeamCard
            name="Abhishek Tripathi"
            role="CFO & Co-Founder"
            icon={<Briefcase className="h-5 w-5 text-emerald-400" />}
            description="A strategic financial expert ensuring operational efficiency and sustainable growth. Abhishek drives financial planning, compliance, and business strategy to strengthen the company's foundation."
            linkedIn="#"
            email="abhishek@webnexfusion.com"
            gradient="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500"
          />
        </div>

        {/* Core Values Section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-slate-400">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Innovation First",
                description: "Pushing boundaries with cutting-edge solutions",
                icon: "🚀",
                color: "from-indigo-500 to-violet-500",
              },
              {
                title: "Client Success",
                description: "Your growth is our mission",
                icon: "🎯",
                color: "from-violet-500 to-purple-500",
              },
              {
                title: "Transparency",
                description: "Clear communication at every step",
                icon: "💎",
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "Excellence",
                description: "Quality without compromise",
                icon: "⭐",
                color: "from-pink-500 to-rose-500",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all duration-300"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3
                  className={`text-lg font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${value.color}`}
                >
                  {value.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles for Gradient Animation */}
      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </section>
  );
}
