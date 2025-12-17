import { Search, Pen, Code2, Rocket } from 'lucide-react';

interface ProcessStepProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ProcessStep({ number, icon, title, description }: ProcessStepProps) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
          <div className='absolute text-8xl font-bold text-white/40 select-none pointer-events-none group-hover:text-white/[0.04] transition-colors'>
          {number}
        </div>
        </div>
        <div className="mb-4 text-blue-600">{icon}</div>
        <h3 className="text-white font-medium mb-2">{title}</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function Process() {
  const steps = [
    {
      number: '1',
      icon: <Search className="h-12 w-12 text-indigo-400" />,
      title: 'Discovery & Planning',
      description: 'We analyze your requirements and create a comprehensive roadmap for success',
    },
    {
      number: '2',
      icon: <Pen className="h-12 w-12 text-blue-400" />,
      title: 'Design & Prototyping',
      description: 'Creating intuitive designs and interactive prototypes for your approval',
    },
    {
      number: '3',
      icon: <Code2 className="h-12 w-12 text-purple-400" />,
      title: 'Development & Testing',
      description: 'Building robust solutions with rigorous testing and quality assurance',
    },
    {
      number: '4',
      icon: <Rocket className="h-12 w-12 text-emerald-400" />,
      title: 'Deployment & Support',
      description: 'Launching your solution with ongoing maintenance and support',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-4">
            Our Process
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            A proven methodology to deliver exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gray-200" style={{ width: '85%', marginLeft: '7.5%' }} />
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
