// src/pages/Features.tsx

import {
  Zap,
  ShieldCheck,
  Globe,
  Layers,
  TrendingUp,
  Headphones,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all hover:border-indigo-500/40 hover:shadow-indigo-500/20 hover:shadow-2xl">
      <div className="mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
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
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Enterprise-Grade Security",
      description:
        "Our systems are designed with security-first architecture, protecting your data and digital assets at every level.",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global-Ready Infrastructure",
      description:
        "From hosting to applications, our solutions are built to scale globally with reliability and uptime in mind.",
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "End-to-End Services",
      description:
        "From strategy and design to development, deployment, and compliance — everything under one roof.",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Business-Driven Approach",
      description:
        "Every feature we deliver aligns with measurable business goals, growth, and long-term value creation.",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Dedicated Support & Guidance",
      description:
        "We provide continuous support, proactive monitoring, and expert guidance even after project delivery.",
    },
  ];

  return (
    <section className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-sm mb-4">
            Our Features
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Powerful Features Built for Modern Businesses
          </h1>
          <p className="max-w-3xl mx-auto text-neutral-400 text-lg leading-relaxed">
            WebnexFusion combines technology, strategy, and innovation to
            deliver feature-rich digital solutions that help businesses grow,
            scale, and stay competitive.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Bottom Highlight */}
        <div className="mt-24 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-6">
            Designed to Deliver Real Business Impact
          </h2>
          <p className="text-neutral-400 leading-relaxed text-lg">
            Our features are not just technical capabilities — they are
            carefully crafted building blocks that empower your digital
            transformation, strengthen operations, and drive sustainable
            success.
          </p>
        </div>
      </div>
    </section>
  );
}
