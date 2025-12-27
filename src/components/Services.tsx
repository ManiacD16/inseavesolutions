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
  Puzzle,
  TrendingUp,
  Store,
} from "lucide-react";

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
        <h3 className="text-white font-medium mb-1.5 tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-neutral-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Services() {
  const technologyServices = [
    {
      icon: (
        <Globe className="p-2 w-12 h-12 text-indigo-400 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-500/15 transition-colors" />
      ),
      title: "Domain & Hosting Solutions",
      description:
        "Reliable domain registration and high-performance hosting with secure DNS, uptime monitoring, and scalability.",
    },
    {
      icon: (
        <Code2 className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/15 transition-colors p-2 text-blue-400" />
      ),
      title: "Professional Web Development",
      description:
        "Custom-built, fast, and secure websites engineered to drive engagement, conversions, and business growth.",
    },
    {
      icon: (
        <Smartphone className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/15 transition-colors p-2 text-purple-400" />
      ),
      title: "Mobile App Development",
      description:
        "Scalable Android and iOS applications designed for performance, usability, and seamless user experience.",
    },
    {
      icon: (
        <Layout className="w-12 h-12 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-4 group-hover:bg-pink-500/15 transition-colors p-2 text-pink-400" />
      ),
      title: "UI/UX & Website Design",
      description:
        "Modern, responsive, and user-centric designs that strengthen brand identity and improve customer trust.",
    },
    {
      icon: (
        <ShieldAlert className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:bg-red-500/15 transition-colors p-2 text-red-400" />
      ),
      title: "Website Security & Recovery",
      description:
        "Advanced security audits, malware removal, and protection strategies to safeguard digital assets.",
    },
    {
      icon: (
        <ShoppingBag className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/15 transition-colors p-2 text-emerald-400" />
      ),
      title: "E-Commerce Development",
      description:
        "End-to-end e-commerce solutions with secure payments, inventory control, and order management systems.",
    },
    {
      icon: (
        <Server className="w-12 h-12 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4 group-hover:bg-teal-500/15 transition-colors p-2 text-teal-400" />
      ),
      title: "Server & Infrastructure Management",
      description:
        "Optimized server setup, monitoring, backups, and performance tuning for uninterrupted operations.",
    },
    {
      icon: (
        <Palette className="w-12 h-12 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/15 transition-colors p-2 text-orange-400" />
      ),
      title: "Branding & Graphic Design",
      description:
        "Professional logos, brand kits, and marketing creatives crafted to establish a strong visual presence.",
    },
    {
      icon: (
        <Terminal className="w-12 h-12 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4 group-hover:bg-yellow-500/15 transition-colors p-2 text-yellow-400" />
      ),
      title: "Custom Software Solutions",
      description:
        "Tailor-made software development to automate workflows and solve complex business challenges.",
    },
    {
      icon: (
        <Puzzle className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/15 transition-colors p-2 text-cyan-400" />
      ),
      title: "Plugin & Module Development",
      description:
        "Custom-built plugins and modules designed to extend functionality, improve performance, and integrate seamlessly with existing systems.",
    },
    {
      icon: (
        <TrendingUp className="w-12 h-12 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center mb-4 group-hover:bg-fuchsia-500/15 transition-colors p-2 text-fuchsia-400" />
      ),
      title: "Digital Marketing Services",
      description:
        "Result-driven digital marketing strategies including SEO, social media marketing, paid campaigns, and lead generation to grow your brand online.",
    },
    {
      icon: (
        <Store className="w-12 h-12 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4 group-hover:bg-sky-500/15 transition-colors p-2 text-sky-400" />
      ),
      title: "WordPress & Shopify Development",
      description:
        "Custom WordPress and Shopify websites with optimized performance, secure architecture, and easy content management.",
    },
  ];

  const businessServices = [
    {
      icon: (
        <Calculator className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/15 transition-colors p-2 text-emerald-400" />
      ),
      title: "Accounting & Bookkeeping",
      description:
        "Accurate accounting, bookkeeping, and financial reporting to ensure transparency and compliance.",
    },
    {
      icon: (
        <Copyright className="w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4 group-hover:bg-green-500/15 transition-colors p-2 text-green-400" />
      ),
      title: "Trademark & IP Registration",
      description:
        "Legal assistance for trademark, copyright, and intellectual property protection.",
    },
    {
      icon: (
        <Receipt className="w-12 h-12 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4 group-hover:bg-violet-500/15 transition-colors p-2 text-violet-400" />
      ),
      title: "Taxation & Compliance Services",
      description:
        "Income tax filing, GST compliance, and expert support for notices and assessments.",
    },
    {
      icon: (
        <Landmark className="w-12 h-12 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4 group-hover:bg-rose-500/15 transition-colors p-2 text-rose-400" />
      ),
      title: "Company & Government Registrations",
      description:
        "End-to-end support for business registrations, licenses, and statutory approvals.",
    },
    {
      icon: (
        <Banknote className="w-12 h-12 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4 group-hover:bg-teal-500/15 transition-colors p-2 text-teal-400" />
      ),
      title: "Business Loan Assistance",
      description:
        "Professional guidance for documentation, eligibility checks, and loan application processes.",
    },
    {
      icon: (
        <KeyRound className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/15 transition-colors p-2 text-amber-400" />
      ),
      title: "Digital Signature Certificates (DSC)",
      description:
        "Secure and legally valid DSC issuance for filings, tenders, and online transactions.",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 px-4 sm:px-6 lg:px-8 border-t border-blue-900/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-4">
            Our Professional Services
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Integrated digital, legal, and financial solutions designed to
            support sustainable business growth.
          </p>
        </div>

        {/* Technology */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-6 pl-1">
            Technology & Digital Solutions
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

        {/* Business */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest mb-6 pl-1">
            Business, Legal & Financial Services
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
