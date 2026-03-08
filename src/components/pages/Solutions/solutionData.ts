export type SolutionItem = {
  slug: string;
  title: string;
  category: "Service" | "Business Challenge" | "Industry";
  subtitle: string;
  summary: string;
  outcomes: string[];
  capabilities: string[];
  stats?: { label: string; value: string }[];
  cta?: { label: string; link: string };
};

export const solutionItems: SolutionItem[] = [
  // Services
  {
    slug: "managed-services",
    title: "Managed Services",
    category: "Service",
    subtitle: "Proactive 24x7 operations that keep your stack healthy and costs predictable.",
    summary:
      "A full-spectrum managed service desk covering infra, apps, SRE, and SecOps with clear SLAs, observability-by-default, and cost governance baked in.",
    outcomes: [
      "Reduce P1/P2 incident volume with automated runbooks and SLOs.",
      "Predictable OpEx with monthly service reviews and cost insights.",
      "Hardened posture through continuous patching and compliance checks.",
    ],
    capabilities: [
      "Site Reliability Engineering & observability rollout",
      "SecOps: SIEM tuning, threat detection, incident response",
      "Patch, backup, DR runbooks, capacity planning",
      "FinOps guardrails across cloud and SaaS spend",
    ],
    stats: [
      { label: "MTTR", value: "-38%" },
      { label: "Change success", value: "97%" },
      { label: "Coverage", value: "24x7" },
    ],
  },
  {
    slug: "it-consulting-advisory",
    title: "IT Consulting & Advisory",
    category: "Service",
    subtitle: "Strategy, governance, and architecture blueprints aligned to your boardroom goals.",
    summary:
      "We translate business objectives into executable roadmaps, target architectures, and operating models—complete with governance that teams can actually follow.",
    outcomes: [
      "Clear north-star architecture and migration phasing.",
      "Decision frameworks that de-risk vendor and build/buy calls.",
      "Change management plans that keep stakeholders aligned.",
    ],
    capabilities: [
      "Enterprise architecture & target-state design",
      "Cloud, data, and integration strategy",
      "Program governance, RACI, and success metrics",
      "Vendor evaluation and cost-benefit modeling",
    ],
    stats: [
      { label: "Roadmaps delivered", value: "60+" },
      { label: "Avg. payback", value: "<9 months" },
    ],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    category: "Service",
    subtitle: "Modern defense-in-depth with measurable risk reduction.",
    summary:
      "Security engineering, GRC, and blue-team practices that align to your risk appetite—covering cloud, app, data, and identity layers.",
    outcomes: [
      "Actionable remediation backlog prioritized by business impact.",
      "Continuous controls monitoring mapped to SOC2/ISO27001.",
      "Reduced attack surface via identity, network, and data protections.",
    ],
    capabilities: [
      "Security architecture & threat modeling",
      "IAM hardening, SSO/MFA rollout, least-privilege baselines",
      "Cloud security posture management & Kubernetes hardening",
      "AppSec pipelines: SAST/DAST/SCA with developer enablement",
    ],
    stats: [
      { label: "Findings remediated", value: "450+" },
      { label: "Coverage", value: "Cloud • App • Data • IAM" },
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    category: "Service",
    subtitle: "High-performing web apps with product thinking and measurable UX gains.",
    summary:
      "From discovery to launch, we ship accessible, performant web products backed by design systems and observability to keep experiences fast.",
    outcomes: [
      "Faster launches with reusable design systems and CI/CD.",
      "Core Web Vitals improvements that lift conversion.",
      "Secure-by-default delivery with automated quality gates.",
    ],
    capabilities: [
      "Product discovery, UX research, and rapid prototyping",
      "Design systems, accessibility, and localization",
      "Frontend engineering (React/Next) with API integration",
      "Performance tuning, observability, and error budgets",
    ],
    stats: [
      { label: "Lighthouse", value: "90+ targets" },
      { label: "Releases/month", value: "12+" },
    ],
  },
  {
    slug: "mobile-development",
    title: "Mobile Development",
    category: "Service",
    subtitle: "Native-quality mobile experiences that scale across platforms.",
    summary:
      "We craft mobile apps with robust offline patterns, secure data flows, and product analytics to keep teams learning after launch.",
    outcomes: [
      "Consistent UX across iOS and Android with platform-native polish.",
      "Offline-first and sync-safe experiences for field teams.",
      "Release discipline with feature flags and staged rollouts.",
    ],
    capabilities: [
      "Native (Swift/Kotlin) and cross-platform (React Native/Flutter)",
      "Offline and sync strategies with conflict resolution",
      "Analytics, A/B testing, and in-app messaging",
      "Secure storage, biometrics, and MDM readiness",
    ],
    stats: [
      { label: "Crash-free sessions", value: "99.5%" },
      { label: "App store ratings", value: "4.6★ avg" },
    ],
  },
  {
    slug: "cloud-services",
    title: "Cloud Services",
    category: "Service",
    subtitle: "Design, migrate, and optimize cloud estates with cost and resilience in balance.",
    summary:
      "Landing zones, migrations, and platform engineering that keep environments compliant, observable, and cost-efficient.",
    outcomes: [
      "Faster provisioning with golden images and IaC pipelines.",
      "Resilience patterns that meet RTO/RPO without overspend.",
      "Cost visibility with tagging, budgets, and guardrails.",
    ],
    capabilities: [
      "Landing zones, VPC design, and zero-trust networking",
      "Kubernetes platform engineering and GitOps",
      "Data platforms: warehouses, lakes, and streaming",
      "Backup/DR, chaos testing, and performance tuning",
    ],
    stats: [
      { label: "Cloud spend optimized", value: "15-28%" },
      { label: "Migration success", value: "100% cutover" },
    ],
  },

  // Business Challenges
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    category: "Business Challenge",
    subtitle: "Execute digital roadmaps with measurable customer and efficiency wins.",
    summary:
      "We modernize products, processes, and platforms—sequencing quick wins first, while building the capabilities and culture to sustain change.",
    outcomes: [
      "Modernized product experiences with faster release cadence.",
      "Digitized workflows that cut manual handoffs and cycle times.",
      "Change adoption tracked with leading indicators, not guesswork.",
    ],
    capabilities: [
      "Product & service redesign, discovery-to-launch pods",
      "Process digitization and automation",
      "Data/AI enablement for decisioning and personalization",
      "Operating model and capability building",
    ],
    stats: [
      { label: "Cycle time", value: "-32%" },
      { label: "CSAT lift", value: "+18 pts" },
    ],
  },
  {
    slug: "security",
    title: "Security",
    category: "Business Challenge",
    subtitle: "Reduce risk and prove compliance without slowing delivery.",
    summary:
      "Security programs that integrate with product and platform teams—so you ship fast with the right controls and evidence always ready.",
    outcomes: [
      "Aligned security roadmap tied to business risks and threats.",
      "DevSecOps pipelines that catch issues early, not after release.",
      "Audit-ready evidence mapped to SOC2/ISO27001/HIPAA controls.",
    ],
    capabilities: [
      "Risk assessments and security strategy",
      "DevSecOps automation and secure SDLC",
      "Identity, data protection, and zero trust patterns",
      "Continuous compliance and evidence automation",
    ],
    stats: [
      { label: "Vuln backlog burn", value: "85% in 90 days" },
      { label: "Audit findings", value: "Zero repeat" },
    ],
  },
  {
    slug: "automation",
    title: "Automation",
    category: "Business Challenge",
    subtitle: "Automate the right work to free teams for higher-value outcomes.",
    summary:
      "From workflow automation to intelligent document processing, we target high-ROI use cases with guardrails, measurement, and adoption playbooks.",
    outcomes: [
      "Lower handling time and error rates on critical processes.",
      "Human-in-the-loop designs to keep quality and governance.",
      "Telemetry that proves ROI and highlights next candidates.",
    ],
    capabilities: [
      "Workflow automation & orchestration",
      "RPA with exception handling and monitoring",
      "Document intelligence (OCR/NLP) with QA loops",
      "Service desk and customer ops automation",
    ],
    stats: [
      { label: "AHT reduction", value: "25-50%" },
      { label: "Automation ROI", value: "<6 months" },
    ],
  },
  {
    slug: "gaining-efficiency",
    title: "Gaining Efficiency",
    category: "Business Challenge",
    subtitle: "Lean delivery, platform re-use, and data-backed decisions to do more with less.",
    summary:
      "We benchmark current delivery, simplify architectures, and introduce platforms and practices that cut waste without cutting ambition.",
    outcomes: [
      "Fewer moving parts with clear ownership and SLAs.",
      "Shared platforms and design systems to reduce duplication.",
      "Dashboards that tie spend to product and customer value.",
    ],
    capabilities: [
      "Value-stream mapping and delivery diagnostics",
      "Platform engineering & internal developer platforms",
      "FinOps and unit economics modeling",
      "Team topology, KPIs, and enablement",
    ],
    stats: [
      { label: "Throughput", value: "+28%" },
      { label: "Infra waste", value: "-22%" },
    ],
  },

  // Industries
  {
    slug: "industry-manufacturing",
    title: "Industry Manufacturing",
    category: "Industry",
    subtitle: "Smart factory, supply resilience, and worker safety solutions.",
    summary:
      "We connect shop floors, supply chains, and quality systems to deliver real-time visibility, predictive maintenance, and safer operations.",
    outcomes: [
      "Higher OEE with predictive maintenance and downtime alerts.",
      "Traceability across plants, suppliers, and logistics.",
      "Safety compliance with digital checklists and sensors.",
    ],
    capabilities: [
      "IoT edge to cloud pipelines, MES integrations",
      "Predictive maintenance models and anomaly detection",
      "Digital work instructions and AR-assisted workflows",
      "Supplier and quality analytics with dashboards",
    ],
    stats: [
      { label: "OEE lift", value: "+12%" },
      { label: "Unplanned downtime", value: "-30%" },
    ],
  },
  {
    slug: "transportation-logistics",
    title: "Transportation Logistics",
    category: "Industry",
    subtitle: "Orchestrate fleets, warehouses, and customer promises in real time.",
    summary:
      "We build control towers, routing intelligence, and warehouse digitization that cut dwell time and boost on-time performance.",
    outcomes: [
      "Improved on-time, in-full with proactive exception handling.",
      "Lower fuel and route costs with dynamic optimization.",
      "Higher dock and warehouse throughput with digital twins.",
    ],
    capabilities: [
      "Control tower dashboards and event streaming",
      "Route optimization, geo-fencing, and driver apps",
      "WMS integrations, slotting, and labor planning",
      "Customer visibility portals and notifications",
    ],
    stats: [
      { label: "OTIF", value: "+9 pts" },
      { label: "Route cost", value: "-14%" },
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    category: "Industry",
    subtitle: "Patient-grade platforms with compliance and clinician-friendly UX.",
    summary:
      "We design secure, interoperable solutions that reduce clinician toil and improve patient engagement while staying audit-ready.",
    outcomes: [
      "Better patient engagement with mobile-first experiences.",
      "Reduced clinician burden through workflow automation.",
      "Compliance-by-design across HIPAA, SOC2, and HITRUST.",
    ],
    capabilities: [
      "EHR/EMR integrations (FHIR/HL7) and interoperability",
      "Patient apps, portals, and remote care experiences",
      "Protected health data platforms and audit trails",
      "Clinical workflow automation and prior-auth bots",
    ],
    stats: [
      { label: "No-show reduction", value: "-18%" },
      { label: "Audit readiness", value: "Continuous" },
    ],
  },
  {
    slug: "banks-insurance",
    title: "Banks & Insurance",
    category: "Industry",
    subtitle: "Digital trust, compliant data, and personalized financial journeys.",
    summary:
      "We modernize legacy stacks, digitize originations and claims, and embed security and compliance controls across the stack.",
    outcomes: [
      "Faster onboarding and underwriting with straight-through processing.",
      "Reduced fraud and risk with identity and anomaly detection.",
      "Composable architectures that accelerate new products.",
    ],
    capabilities: [
      "Core modernization and API-led connectivity",
      "Digital onboarding, KYC/KYB, and identity verification",
      "Claims automation, decision engines, and AI underwriting",
      "Data governance, lineage, and regulatory reporting",
    ],
    stats: [
      { label: "Onboarding time", value: "-40%" },
      { label: "Fraud reduction", value: "-27%" },
    ],
  },
  {
    slug: "consulting-providers",
    title: "Consulting Providers",
    category: "Industry",
    subtitle: "Platforms and automation that expand billable leverage.",
    summary:
      "We help professional services firms productize repeatable IP, improve delivery margins, and gain visibility across engagements.",
    outcomes: [
      "Higher utilization and margin through delivery insight.",
      "Reusable accelerators and playbooks that reduce ramp time.",
      "Client portals that increase transparency and stickiness.",
    ],
    capabilities: [
      "Engagement management and margin dashboards",
      "Knowledge capture, playbooks, and reusable assets",
      "Client collaboration portals and reporting",
      "Automation of PMO and delivery workflows",
    ],
    stats: [
      { label: "Utilization lift", value: "+6 pts" },
      { label: "Proposal cycle", value: "-25%" },
    ],
  },
  {
    slug: "non-profit",
    title: "Non Profit",
    category: "Industry",
    subtitle: "Mission-focused tech that maximizes reach per dollar.",
    summary:
      "Digital fundraising, volunteer coordination, and data systems that give nonprofits clearer insight and more impact.",
    outcomes: [
      "Increased donor conversion and retention with better journeys.",
      "Volunteer coordination that reduces drop-offs and no-shows.",
      "Impact measurement dashboards for stakeholders and grants.",
    ],
    capabilities: [
      "CRM and donor experience modernization",
      "Volunteer apps and workforce coordination",
      "Data pipelines for impact and grant reporting",
      "Low-cost cloud architectures with governance",
    ],
    stats: [
      { label: "Donor lift", value: "+15%" },
      { label: "Ops cost", value: "-18%" },
    ],
  },
];
