// src/pages/Team.tsx

import { Linkedin, Briefcase, Crown } from "lucide-react";

function TeamCard({
  name,
  role,
  description,
  icon,
}: {
  name: string;
  role: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center transition-all hover:border-indigo-500/40 hover:shadow-indigo-500/20 hover:shadow-2xl">
      {/* Profile Image */}
      <div className="relative mx-auto mb-6 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 p-[2px]">
        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl">
          👤
        </div>
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-3 text-indigo-400">{icon}</div>

      {/* Name */}
      <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>

      {/* Role */}
      <p className="text-sm text-indigo-300 mb-4">{role}</p>

      {/* Description */}
      <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>

      {/* Social */}
      <div className="mt-6 flex justify-center">
        <button className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition">
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </button>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-sm mb-4">
            Leadership Team
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Meet the Minds Behind WebnexFusion
          </h1>
          <p className="max-w-3xl mx-auto text-neutral-400 text-lg leading-relaxed">
            Our leadership team combines technical excellence, strategic vision,
            and financial expertise to build scalable digital solutions and
            long-term business value.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* CEO */}
          <TeamCard
            name="Amit Tripathi"
            role="CEO & Founder"
            icon={<Crown className="h-6 w-6" />}
            description="A visionary entrepreneur and technology leader with a strong passion for building scalable digital products. Amit leads WebnexFusion with a focus on innovation, quality, and long-term client success."
          />

          {/* CFO */}
          <TeamCard
            name="Abhishek Tripathi"
            role="CFO & Co-Founder"
            icon={<Briefcase className="h-6 w-6" />}
            description="A strategic financial expert ensuring operational efficiency and sustainable growth. Abhishek drives financial planning, compliance, and business strategy to strengthen the company’s foundation."
          />
        </div>
      </div>
    </section>
  );
}
