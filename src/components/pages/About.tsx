// src/pages/About.tsx

import { Rocket, Target, ShieldCheck, TrendingUp } from "lucide-react";

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-indigo-500/40 transition-all">
      <div className="text-indigo-400 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
    </div>
  );
}

export default function About() {
  return (
    <section className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-sm mb-4">
            About WebnexFusion
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Building Digital Solutions with Purpose
          </h1>
          <p className="max-w-3xl mx-auto text-neutral-400 text-lg leading-relaxed">
            WebnexFusion is a modern IT and digital solutions company focused on
            empowering businesses through technology, innovation, and trust.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-24 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-white mb-6">
              Our Journey
            </h2>
            <p className="text-neutral-400 leading-relaxed mb-4">
              The journey of{" "}
              <span className="text-white font-medium">WebnexFusion</span> began
              with a simple yet powerful vision — to help businesses establish a
              strong, reliable, and scalable digital presence.
            </p>

            <p className="text-neutral-400 leading-relaxed mb-4">
              Initially, our work started under the foundation of
              <span className="text-white font-medium">
                {" "}
                Tripathi Enterprise
              </span>
              , where we provided technology support, digital services, and
              business solutions to small and growing organizations.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              Like every startup journey, our early days were filled with
              challenges — limited resources, evolving technologies, and the
              responsibility to deliver quality beyond expectations. These
              struggles shaped our mindset, strengthened our processes, and
              refined our commitment to excellence.
            </p>
          </div>

          {/* Visual Block */}
          <div className="relative bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-white/10 rounded-3xl p-10">
            <p className="text-white text-xl font-medium leading-relaxed">
              “We didn’t just build websites and software — we built trust,
              long-term partnerships, and digital foundations.”
            </p>
          </div>
        </div>

        {/* Evolution */}
        <div className="mb-24">
          <h2 className="text-3xl font-semibold text-white mb-8 text-center">
            From Tripathi Enterprise to WebnexFusion
          </h2>
          <p className="max-w-4xl mx-auto text-neutral-400 text-center leading-relaxed">
            As our expertise grew, so did our ambition. What started as Tripathi
            Enterprise evolved into WebnexFusion — a brand that represents
            innovation, scalability, and fusion of technology with business
            strategy. Today, WebnexFusion delivers end-to-end IT, digital,
            hosting, compliance, and business solutions under one roof.
          </p>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-semibold text-white mb-12 text-center">
            What Drives Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <InfoCard
              icon={<Rocket className="h-8 w-8" />}
              title="Innovation First"
              description="We continuously adopt modern technologies to deliver future-ready digital solutions."
            />

            <InfoCard
              icon={<Target className="h-8 w-8" />}
              title="Client-Centric Approach"
              description="Every solution we build is aligned with real business goals and measurable outcomes."
            />

            <InfoCard
              icon={<ShieldCheck className="h-8 w-8" />}
              title="Trust & Transparency"
              description="We believe long-term success comes from honest communication and ethical practices."
            />

            <InfoCard
              icon={<TrendingUp className="h-8 w-8" />}
              title="Sustainable Growth"
              description="Our focus is not just delivery, but creating systems that scale with your business."
            />
          </div>
        </div>

        {/* Closing */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-6">
            Our Vision Forward
          </h2>
          <p className="text-neutral-400 leading-relaxed text-lg">
            WebnexFusion aims to become a trusted digital growth partner for
            startups, enterprises, and global businesses by delivering reliable,
            secure, and innovative technology solutions that stand the test of
            time.
          </p>
        </div>
      </div>
    </section>
  );
}
