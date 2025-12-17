import { Target, Users, Shield, Lightbulb } from 'lucide-react';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="mb-4 text-blue-600">{icon}</div>
      <h3 className="text-white font-medium mb-2">{title}</h3>
      <p className="text-md text-neutral-400 leading-relaxed">{description}</p>
    </div>
  );
}

export default function Mission() {
  const values = [
    {
      icon: <Users className="h-12 w-12 text-emerald-400" />,
      title: 'Partnership',
      description: 'We work alongside you as trusted partners in your digital journey',
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-purple-400" />,
      title: 'Innovation',
      description: 'Cutting-edge solutions powered by the latest technologies',
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-400" />,
      title: 'Security',
      description: 'Enterprise-grade security protecting your data and operations',
    },
    {
      icon: <Target className="h-12 w-12 text-indigo-400" />,
      title: 'Reliability',
      description: '99.9% uptime guarantee with 24/7 support for peace of mind',
    },
  ];

  return (
    <section id="mission" className="py-20 px-4 sm:px-6 lg:px-8  text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            At Insweave Solutions, we're committed to empowering businesses with comprehensive
            digital infrastructure and services. We combine technical expertise with business
            acumen to deliver solutions that drive growth, ensure compliance, and foster innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
