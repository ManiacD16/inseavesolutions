import { Target, Users, Shield, Lightbulb } from "lucide-react";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div
      className="group flex flex-col items-center text-center p-8 rounded-2xl
                 bg-slate-900/60 border border-white/5
                 transition-all duration-300
                 hover:-translate-y-2 hover:border-indigo-500/40
                 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      {/* Icon */}
      <div
        className="mb-6 flex items-center justify-center w-16 h-16 rounded-xl
                   bg-gradient-to-br from-indigo-500/20 to-purple-500/20
                   group-hover:scale-110 transition-transform"
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-lg mb-3 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function Mission() {
  const values = [
    {
      icon: <Users className="h-8 w-8 text-emerald-400" />,
      title: "Client-Centric Partnership",
      description:
        "We collaborate closely with our clients, aligning digital strategies with real business goals to deliver long-term value.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-purple-400" />,
      title: "Innovation & Scalability",
      description:
        "Our solutions are built using modern technologies, ensuring scalability, adaptability, and future readiness.",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-400" />,
      title: "Security & Compliance",
      description:
        "We prioritize data protection, system security, and regulatory compliance across all digital operations.",
    },
    {
      icon: <Target className="h-8 w-8 text-indigo-400" />,
      title: "Operational Excellence",
      description:
        "We ensure performance, reliability, and on-time delivery through well-defined processes and continuous monitoring.",
    },
  ];

  return (
    <section
      id="mission"
      className="relative py-24 px-4 sm:px-6 lg:px-8 text-white
                 border-t border-blue-900/50 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Our Mission
          </h2>

          <p className="text-lg sm:text-xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            At <span className="text-white font-medium">WebnexFusion</span>, our
            mission is to deliver secure, scalable, and compliant digital
            solutions. We blend technology, strategy, and execution to help
            businesses grow with confidence in the digital era.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
