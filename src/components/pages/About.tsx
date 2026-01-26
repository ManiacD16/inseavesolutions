// src/pages/About.tsx

import {
  Rocket,
  Target,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Award,
  Users,
  Zap,
} from "lucide-react";
import SEO from "../SEO";

function InfoCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group relative">
      {/* Glow Effect */}
      <div
        className={`absolute -inset-0.5 ${gradient} rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-all duration-500`}
      ></div>

      {/* Card */}
      <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 h-full transition-all duration-300 group-hover:border-transparent group-hover:-translate-y-2">
        {/* Icon Container */}
        <div
          className={`inline-flex p-4 rounded-xl ${gradient} bg-opacity-10 border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          <div className="text-white">{icon}</div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-violet-400 transition-all duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-300 leading-relaxed">{description}</p>

        {/* Bottom Accent Line */}
        <div
          className={`mt-6 h-1 w-0 ${gradient} rounded-full group-hover:w-full transition-all duration-500`}
        ></div>
      </div>
    </div>
  );
}

function TimelineItem({
  year,
  title,
  description,
  position,
}: {
  year: string;
  title: string;
  description: string;
  position: "left" | "right";
}) {
  return (
    <div
      className={`flex ${position === "right" ? "flex-row-reverse" : ""
        } items-center gap-8 mb-12`}
    >
      {/* Content */}
      <div className={`flex-1 ${position === "right" ? "text-right" : ""}`}>
        <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-semibold mb-3">
          {year}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-300 leading-relaxed">{description}</p>
      </div>

      {/* Timeline Dot */}
      <div className="relative flex-shrink-0">
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 ring-4 ring-indigo-500/20 shadow-lg shadow-indigo-500/50"></div>
        <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-indigo-500/30 animate-ping"></div>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>
    </div>
  );
}

function StatCard({
  number,
  label,
  icon,
}: {
  number: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative text-center space-y-3">
        <div className="flex justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
          {number}
        </div>
        <div className="text-sm text-slate-400 font-medium">{label}</div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-900 overflow-hidden">
      <SEO
        title="About WebnexFusion - IT & Digital Solutions Expert"
        description="Learn about WebnexFusion's journey, values, and mission to empower businesses through technology, innovation, and trust."
        canonicalUrl="https://webnexfusion.com/about"
      />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
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

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10 border border-indigo-500/20 backdrop-blur-sm mb-6 group hover:border-indigo-500/40 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span className="text-sm font-semibold text-indigo-300">
              About WebnexFusion
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
            <span className="block text-white mb-2">
              Building Digital Solutions
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 animate-gradient">
              with Purpose
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-slate-300 text-lg sm:text-xl leading-relaxed">
            WebnexFusion is a modern IT and digital solutions company focused on
            empowering businesses through{" "}
            <span className="text-indigo-400 font-semibold">technology</span>,{" "}
            <span className="text-violet-400 font-semibold">innovation</span>,
            and <span className="text-purple-400 font-semibold">trust</span>.
          </p>

          {/* Decorative Line */}
          <div className="mt-10 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <StatCard
            number="500+"
            label="Happy Clients"
            icon={<Users className="w-8 h-8" />}
          />
          <StatCard
            number="1200+"
            label="Projects Delivered"
            icon={<Rocket className="w-8 h-8" />}
          />
          <StatCard
            number="8+"
            label="Years Experience"
            icon={<Award className="w-8 h-8" />}
          />
          <StatCard
            number="98%"
            label="Client Satisfaction"
            icon={<Zap className="w-8 h-8" />}
          />
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-32 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold">
              <Sparkles className="w-3 h-3" />
              Our Journey
            </div>

            <h2 className="text-4xl font-bold text-white">
              Where It All Started
            </h2>

            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                The journey of{" "}
                <span className="text-white font-semibold">WebnexFusion</span>{" "}
                began with a simple yet powerful vision — to help businesses
                establish a strong, reliable, and scalable digital presence.
              </p>

              <p>
                Initially, our work started under the foundation of
                <span className="text-white font-semibold">
                  {" "}
                  Tripathi Enterprise
                </span>
                , where we provided technology support, digital services, and
                business solutions to small and growing organizations.
              </p>

              <p>
                Like every startup journey, our early days were filled with
                challenges — limited resources, evolving technologies, and the
                responsibility to deliver quality beyond expectations. These
                struggles shaped our mindset, strengthened our processes, and
                refined our commitment to excellence.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold shadow-lg shadow-indigo-500/50 transition-all duration-300 hover:scale-105">
                <span>Explore Our Services</span>
                <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Visual Quote Block */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-3xl opacity-75 blur-xl group-hover:opacity-100 transition-all duration-500"></div>

            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-3xl p-12">
              {/* Quote Icon */}
              <div className="absolute top-8 left-8 text-indigo-500/20 text-8xl font-serif">
                "
              </div>

              <div className="relative z-10 space-y-6">
                <p className="text-white text-2xl font-medium leading-relaxed">
                  We didn't just build websites and software — we built trust,
                  long-term partnerships, and digital foundations.
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-700/50">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                    W
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      WebnexFusion Team
                    </div>
                    <div className="text-slate-400 text-sm">Our Philosophy</div>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-8 right-8 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Evolution Timeline */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              From Tripathi Enterprise to WebnexFusion
            </h2>
            <p className="max-w-3xl mx-auto text-slate-300 leading-relaxed text-lg">
              As our expertise grew, so did our ambition. What started as
              Tripathi Enterprise evolved into WebnexFusion — a brand that
              represents innovation, scalability, and fusion of technology with
              business strategy.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/50 via-violet-500/50 to-purple-500/50"></div>

            <div className="lg:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/50 via-violet-500/50 to-purple-500/50"></div>

            <div className="space-y-0">
              <TimelineItem
                year="2016"
                title="The Foundation"
                description="Started as Tripathi Enterprise, providing tech support and digital services to local businesses."
                position="left"
              />
              <TimelineItem
                year="2019"
                title="Expansion Phase"
                description="Expanded services to include web development, hosting solutions, and digital marketing."
                position="right"
              />
              <TimelineItem
                year="2022"
                title="Brand Evolution"
                description="Rebranded to WebnexFusion, representing our growth and commitment to innovation."
                position="left"
              />
              <TimelineItem
                year="2025"
                title="Today & Beyond"
                description="Delivering end-to-end IT, digital, hosting, compliance, and business solutions under one roof."
                position="right"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-6">
              <Target className="w-4 h-4" />
              Core Values
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">
              What Drives Us
            </h2>
            <p className="text-slate-400 text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <InfoCard
              icon={<Rocket className="h-8 w-8" />}
              title="Innovation First"
              description="We continuously adopt modern technologies to deliver future-ready digital solutions."
              gradient="bg-gradient-to-br from-indigo-500 to-violet-500"
            />

            <InfoCard
              icon={<Target className="h-8 w-8" />}
              title="Client-Centric Approach"
              description="Every solution we build is aligned with real business goals and measurable outcomes."
              gradient="bg-gradient-to-br from-violet-500 to-purple-500"
            />

            <InfoCard
              icon={<ShieldCheck className="h-8 w-8" />}
              title="Trust & Transparency"
              description="We believe long-term success comes from honest communication and ethical practices."
              gradient="bg-gradient-to-br from-purple-500 to-pink-500"
            />

            <InfoCard
              icon={<TrendingUp className="h-8 w-8" />}
              title="Sustainable Growth"
              description="Our focus is not just delivery, but creating systems that scale with your business."
              gradient="bg-gradient-to-br from-pink-500 to-rose-500"
            />
          </div>
        </div>

        {/* Vision Section */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-3xl opacity-20 blur-2xl"></div>

          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 sm:p-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Our Vision
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Looking Forward
            </h2>

            <p className="text-slate-300 leading-relaxed text-lg sm:text-xl max-w-3xl mx-auto mb-8">
              WebnexFusion aims to become a trusted digital growth partner for
              startups, enterprises, and global businesses by delivering
              reliable, secure, and innovative technology solutions that stand
              the test of time.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold shadow-lg shadow-indigo-500/50 transition-all duration-300 hover:scale-105">
                Start Your Journey
              </button>
              <button className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 text-white font-semibold transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
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
