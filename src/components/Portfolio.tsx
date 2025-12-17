interface PortfolioItemProps {
  title: string;
  description: string;
  device: React.ReactNode;
  techStack: string[];
}

function PortfolioItem({ title, description, techStack, device }: PortfolioItemProps) {
  return (
    <div className="glass glass-hover  bg-gray-900/60 rounded-2xl p-8 border border-white/5 group">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-xl font-medium tracking-tight">{title}</h3>
        <span>{device}</span>
        </div>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className="text-xs text-neutral-400 bg-white/5 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const projects = [
    {
      title: 'e-Commerce Platform',
      device: <span className="text-xs font-medium text-indigo-400 border border-indigo-500/20 bg-indigo-500/10 px-2 py-1 rounded">
                Website              </span>,
      description: 'Full-featured online shopping platform with payment integration and inventory management',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'MongoDB'],
    },
    {
      title: 'Mobile Banking App',
       device: <span className="text-xs font-medium text-blue-400 border border-blue-500/20 bg-blue-500/10 px-2 py-1 rounded">
                Mobile App              </span>,
      description: 'Secure mobile banking solution with real-time transactions and biometric authentication',
      techStack: ['React Native', 'Firebase', 'Plaid API'],
    },
    {
      title: 'SaaS Dashboard',
       device: <span className="text-xs font-medium text-purple-400 border border-purple-500/20 bg-purple-500/10 px-2 py-1 rounded">
                SaaS Platform              </span>,
      description: 'Analytics and management dashboard for enterprise resource planning',
      techStack: ['Vue.js', 'Laravel', 'MongoDB', 'MySQL', 'Redis'],
    },
    {
      title: 'Healthcare Portal',
       device: <span className="text-xs font-medium text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 rounded">
                Web Application              </span>,
      description: 'Patient management system with appointment scheduling and telemedicine features',
      techStack: ['Angular', 'Spring Boot', 'MySQL'],
    },
  ];

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-4">
            Our Portfolio
          </h2>
          <p className="text-neutral-400 max-w-xl">
            Explore our successful project implementations across various industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <PortfolioItem
              key={index}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              device={project.device}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
