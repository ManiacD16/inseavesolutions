import { Search, Pen, Code2, Rocket } from "lucide-react";

interface ProcessStepProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ProcessStep({ number, icon, title, description }: ProcessStepProps) {
  return (
    <div className="relative group">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-purple-500/50 group-hover:rotate-3">
          <div className="absolute inset-0.5 bg-slate-900 rounded-2xl flex items-center justify-center">
            <div className="relative z-10">{icon}</div>
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
            {number}
          </div>
        </div>

        <h3 className="text-white font-semibold mb-3 text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
          {title}
        </h3>

        <p className="text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Process() {
  const steps = [
    {
      number: "1",
      icon: <Search className="h-12 w-12 text-indigo-400" />,
      title: "Business Analysis & Consultation",
      description:
        "We understand your business goals, legal requirements, and technical needs to define a clear execution strategy.",
    },
    {
      number: "2",
      icon: <Pen className="h-12 w-12 text-blue-400" />,
      title: "Solution Design & Documentation",
      description:
        "Our team designs compliant, scalable, and user-centric solutions with proper technical and process documentation.",
    },
    {
      number: "3",
      icon: <Code2 className="h-12 w-12 text-purple-400" />,
      title: "Development & Quality Assurance",
      description:
        "We develop secure digital systems and conduct thorough testing to ensure performance, compliance, and reliability.",
    },
    {
      number: "4",
      icon: <Rocket className="h-12 w-12 text-emerald-400" />,
      title: "Deployment, Compliance & Support",
      description:
        "We launch your solution, assist with statutory compliance, and provide continuous monitoring and support.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-blue-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            Our Business Execution Process
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            A structured, transparent, and result-oriented approach designed for
            long-term business growth.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          <div
            className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gray-200"
            style={{ width: "85%", marginLeft: "7.5%" }}
          />

          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
