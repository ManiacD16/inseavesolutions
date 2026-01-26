// src/pages/Features.tsx

import {
  Zap,
  ShieldCheck,
  Globe,
  Layers,
  TrendingUp,
  Headphones,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import SEO from "../SEO";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay?: string;
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
  delay = "0s",
}: FeatureCardProps) {
  return (
    <div className="group relative" style={{ animationDelay: delay }}>
      {/* Glow Effect */}
      <div
        className={`absolute -inset-0.5 ${gradient} rounded-2xl opacity-0 group-hover:opacity-75 blur-xl transition-all duration-700`}
      ></div>

      {/* Card */}
      <div className="relative h-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 transition-all duration-500 group-hover:border-transparent group-hover:-translate-y-2">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          ></div>
        </div>

        {/* Gradient Orb */}
        <div
          className={`absolute -top-10 -right-10 w-40 h-40 ${gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700`}
        ></div>

        {/* Icon Container */}
        <div
          className={`relative inline-flex p-4 rounded-xl ${gradient} bg-opacity-10 border border-white/10 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
        >
          <div className="text-white group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="relative space-y-4">
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-violet-400 transition-all duration-300">
            {title}
          </h3>

          <p className="text-slate-300 leading-relaxed">{description}</p>

          {/* Learn More Link */}
          <div className="pt-2 flex items-center gap-2 text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:gap-3">
            <span className="text-sm font-semibold">Learn more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Bottom Accent */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 ${gradient} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
        ></div>
      </div>
    </div>
  );
}

export default function Features() {
  const features: FeatureCardProps[] = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "High Performance Solutions",
      description:
        "We build fast, optimized, and scalable digital solutions that ensure smooth performance and high user engagement.",
      gradient: "bg-gradient-to-br from-indigo-500 to-violet-500",
      delay: "0s",
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Enterprise-Grade Security",
      description:
        "Our systems are designed with security-first architecture, protecting your data and digital assets at every level.",
      gradient: "bg-gradient-to-br from-violet-500 to-purple-500",
      delay: "0.1s",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global-Ready Infrastructure",
      description:
        "From hosting to applications, our solutions are built to scale globally with reliability and uptime in mind.",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
      delay: "0.2s",
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "End-to-End Services",
      description:
        "From strategy and design to development, deployment, and compliance — everything under one roof.",
      gradient: "bg-gradient-to-br from-pink-500 to-rose-500",
      delay: "0.3s",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Business-Driven Approach",
      description:
        "Every feature we deliver aligns with measurable business goals, growth, and long-term value creation.",
      gradient: "bg-gradient-to-br from-rose-500 to-orange-500",
      delay: "0.4s",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Dedicated Support & Guidance",
      description:
        "We provide continuous support, proactive monitoring, and expert guidance even after project delivery.",
      gradient: "bg-gradient-to-br from-orange-500 to-amber-500",
      delay: "0.5s",
    },
  ];

  const benefits = [
    "99.9% Uptime Guarantee",
    "24/7 Technical Support",
    "Scalable Architecture",
    "Regular Security Updates",
    "Performance Monitoring",
    "Custom Solutions",
  ];

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-900 overflow-hidden">
      <SEO
        title="Our Services - Web Design, SEO, Branding & More | WebnexFusion"
        description="Explore WebnexFusion's comprehensive digital services including high-performance web development, security, and global infrastructure."
        canonicalUrl="https://webnexfusion.com/features"
      />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"
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
              Our Features
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
            <span className="block text-white mb-2">Powerful Features</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 animate-gradient">
              Built for Modern Businesses
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-slate-300 text-lg sm:text-xl leading-relaxed">
            WebnexFusion combines{" "}
            <span className="text-indigo-400 font-semibold">technology</span>,{" "}
            <span className="text-violet-400 font-semibold">strategy</span>, and{" "}
            <span className="text-purple-400 font-semibold">innovation</span> to
            deliver feature-rich digital solutions that help businesses grow,
            scale, and stay competitive.
          </p>

          {/* Decorative Line */}
          <div className="mt-10 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mb-32">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-3xl opacity-20 blur-2xl"></div>

              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 sm:p-16">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-6">
                    <Check className="w-4 h-4" />
                    What You Get
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Everything You Need to Succeed
                  </h2>
                  <p className="text-slate-300 text-lg">
                    Comprehensive features designed for maximum impact
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-200 font-medium group-hover:text-white transition-colors">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 rounded-3xl opacity-20 blur-2xl"></div>

          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 sm:p-16 text-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Business Impact
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
                Designed to Deliver Real Business Impact
              </h2>

              <p className="text-slate-300 leading-relaxed text-lg sm:text-xl max-w-3xl mx-auto mb-10">
                Our features are not just technical capabilities — they are
                carefully crafted building blocks that empower your digital
                transformation, strengthen operations, and drive sustainable
                success.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold shadow-lg shadow-indigo-500/50 transition-all duration-300 hover:scale-105">
                  <span>Get Started Today</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 text-white font-semibold transition-all duration-300">
                  <span>View Pricing</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-slate-700/50">
                <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Free consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
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
