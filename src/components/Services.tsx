import {
  Globe,
  Code2,
  Smartphone,
  ShoppingBag,
  ShieldAlert,
  Server,
  Terminal,
  Calculator,
  Layout,
  Copyright,
  Landmark,
  Banknote,
  KeyRound,
  Receipt,
  Palette,
} from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="glass glass-hover rounded-xl bg-gray-900/50 p-5 border border-white/5 transition-all duration-300 group">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-white font-medium mb-1.5 tracking-tight">{title}</h3>
        <p className="text-xs text-neutral-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function Services() {
  const technologyServices = [
    { icon: <Globe className="p-2 w-12 h-12 text-indigo-400 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-500/15 transition-colors" />, title: 'Domain Hosting', description: 'Affordable domains and lightning-fast hosting with full DNS management and security.'  },
    { icon: <Code2 className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/15 transition-colors p-2 text-blue-400 " />, title: 'Web Development', description: 'Custom websites and web applications tailored to your business goals.' },
    { icon: <Smartphone className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/15 transition-colors p-2 text-purple-400" />, title: 'App Development', description: 'Native and cross-platform mobile apps for Android and iOS.' },
    { icon: <Layout className="w-12 h-12 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-4 group-hover:bg-pink-500/15 transition-colors p-2 text-pink-400" />, title: 'Website Design', description: 'Modern UI/UX, responsive layouts, and complete redesign of outdated websites.' },
    { icon: <ShieldAlert className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/15 transition-colors p-2 text-red-400" />, title: 'Security Repair', description: 'Malware cleanup, security hardening, and quick recovery for hacked websites.' },
    { icon: <ShoppingBag className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/15 transition-colors p-2 text-emerald-400" />, title: 'E-Commerce Solutions', description: 'Online stores with secure payments, product management, and order tracking.' },
    { icon: <Server className="w-12 h-12 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4 group-hover:bg-teal-500/15 transition-colors p-2 text-teal-400" />, title: 'Server Management', description: '24/7 monitoring, updates, backups, and performance tuning for your servers.' },
    { icon: <Palette className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/15 transition-colors p-2 text-orange-400" />, title: 'Graphic Design', description: 'Creative logos, branding, and visual assets that make your business stand out.' },
    { icon: <Terminal className="w-12 h-12 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4 group-hover:bg-yellow-500/15 transition-colors p-2 text-yellow-400" />, title: 'Custom Development', description: 'Bespoke code solutions to solve unique business challenges and integrate complex systems.' },
  ];

  const businessServices = [
    { icon: <Calculator className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/15 transition-colors p-2 text-emerald-400" />, title: 'Accounting Services', description: 'Meticulous accounting and bookkeeping to maintain accurate financial records.' },
    { icon: <Copyright className="w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500/15 transition-colors p-2 text-green-400" />, title: 'Trademark Registration', description: 'Protect your intellectual property with professional trademark and copyright registration.' },
    { icon: <Receipt className="w-12 h-12 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4 group-hover:bg-violet-500/15 transition-colors p-2 text-violet-400" />, title: 'Tax Services', description: 'Expert handling of income tax return filings and representation for any tax-related cases.' },
    { icon: <Landmark className="w-12 h-12 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4 group-hover:bg-rose-500/15 transition-colors p-2 text-rose-400" />, title: 'Government Registrations', description: 'Navigating the complexities of official government registrations to ensure full compliance.' },
    { icon: <Banknote className="w-12 h-12 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4 group-hover:bg-teal-500/15 transition-colors p-2 text-teal-400" />, title: 'Loan Assistance', description: 'Guidance and support in preparing documentation and applications for securing business loans.' },
    { icon: <KeyRound className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/15 transition-colors p-2 text-amber-400" />, title: 'Digital Signatures (DSC)', description: 'Providing secure and legally valid Digital Signature Certificates for all your online transactions.' },
  ];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-4">
            Our Services
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Comprehensive solutions tailored for your business needs
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-6 pl-1">
            Technology & Digital
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
            {technologyServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}

              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-6 pl-1">
            Business, Legal & Financial
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
