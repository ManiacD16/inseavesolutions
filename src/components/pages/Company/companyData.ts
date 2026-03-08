export type CompanyPage = {
  slug: string;
  title: string;
  hero: string;
  subtitle: string;
  bullets: string[];
  cta?: { label: string; link: string };
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
};

export const companyPages: CompanyPage[] = [
  {
    slug: "leadership",
    title: "Leadership",
    hero: "Operators who blend product thinking with disciplined delivery.",
    subtitle:
      "Our leadership bench has shipped enterprise platforms, scaled engineering orgs, and kept complex programs on-track with transparency.",
    bullets: [
      "Executive sponsors for every engagement with weekly steering.",
      "Experience across regulated sectors: finance, healthcare, logistics.",
      "Metrics-first mindset: delivery, quality, and adoption signals.",
    ],
    meta: {
      title: "Leadership | WebnexFusion",
      description:
        "Meet the leadership team guiding WebnexFusion’s delivery, product strategy, and client success.",
      canonical: "https://webnexfusion.com/company/leadership",
    },
  },
  {
    slug: "careers",
    title: "Careers",
    hero: "Build products that ship, scale, and matter.",
    subtitle:
      "Join product minds, designers, engineers, and SREs who care about craft, learning, and measurable impact.",
    bullets: [
      "Clear growth paths and mentorship for every role.",
      "Remote-first with intentional in-person collaboration weeks.",
      "Shipping culture: small squads, strong ownership, quality gates.",
    ],
    cta: { label: "View open roles", link: "/contact" },
    meta: {
      title: "Careers | WebnexFusion",
      description:
        "Explore careers at WebnexFusion. Remote-first teams shipping high-impact products with quality and ownership.",
      canonical: "https://webnexfusion.com/company/careers",
    },
  },
  {
    slug: "partners",
    title: "Partners",
    hero: "Strategic partners who accelerate delivery and compliance.",
    subtitle:
      "We co-deliver with cloud, security, and data partners to move faster while meeting your governance standards.",
    bullets: [
      "Preferred partnerships across cloud, identity, and observability vendors.",
      "Joint playbooks and accelerators to cut implementation time.",
      "Compliance-aware architectures aligned with SOC2/ISO27001.",
    ],
    meta: {
      title: "Partners | WebnexFusion",
      description:
        "Discover WebnexFusion’s partner ecosystem spanning cloud, security, data, and observability platforms.",
      canonical: "https://webnexfusion.com/company/partners",
    },
  },
  {
    slug: "company-values",
    title: "Company Values",
    hero: "Principles that keep us transparent, accountable, and customer-first.",
    subtitle:
      "We design and build with four anchors: innovation, client success, transparency, and excellence.",
    bullets: [
      "Innovation with measurable outcomes, not experiments for show.",
      "Client success as the north star for every sprint and release.",
      "Transparency through clear comms, demos, and traceability.",
      "Excellence via engineering craft, design rigor, and QA discipline.",
    ],
    meta: {
      title: "Company Values | WebnexFusion",
      description:
        "The values that guide WebnexFusion across delivery, design, engineering, and client partnerships.",
      canonical: "https://webnexfusion.com/company/company-values",
    },
  },
  {
    slug: "press-media",
    title: "Press & Media",
    hero: "News, updates, and brand resources.",
    subtitle:
      "Find our latest announcements, media assets, and story angles on how we help teams ship secure, scalable products.",
    bullets: [
      "Company news and product launch updates.",
      "Media kit: logos, bios, and approved assets.",
      "Press contact for interviews, quotes, and speaking.",
    ],
    cta: { label: "Contact press", link: "/contact" },
    meta: {
      title: "Press & Media | WebnexFusion",
      description:
        "Press and media resources for WebnexFusion: news, brand assets, and press inquiries.",
      canonical: "https://webnexfusion.com/company/press-media",
    },
  },
];
