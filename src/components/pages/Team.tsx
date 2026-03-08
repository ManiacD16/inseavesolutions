import {
  Linkedin,
  Mail,
  Crown,
  Briefcase,
  Sparkles,
  ShieldCheck,
  Compass,
  Activity,
  Handshake,
  Clock3,
  BarChart3,
  MessageSquare,
  Users,
} from "lucide-react";
import SEO from "../SEO";

type TeamMember = {
  name: string;
  role: string;
  focus: string;
  description: string;
  icon: JSX.Element;
  linkedIn?: string;
  email?: string;
  gradient: string;
};

const leadership: TeamMember[] = [
  {
    name: "Amit Tripathi",
    role: "CEO & Founder",
    focus: "Product strategy • Enterprise delivery",
    description:
      "Entrepreneur and technology leader obsessed with building scalable platforms. Drives innovation, quality, and long-term client success.",
    icon: <Crown className="h-5 w-5 text-amber-400" />,
    linkedIn: "#",
    email: "amit@webnexfusion.com",
    gradient: "bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500",
  },
  {
    name: "Abhishek Tripathi",
    role: "CFO & Co-Founder",
    focus: "Finance • Compliance • Partnerships",
    description:
      "Financial strategist ensuring operational efficiency, disciplined growth, and risk-aware decision making across every engagement.",
    icon: <Briefcase className="h-5 w-5 text-emerald-400" />,
    linkedIn: "#",
    email: "abhishek@webnexfusion.com",
    gradient: "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500",
  },
];

const leads = [
  { name: "Priya Nair", title: "Director, Delivery", focus: "Program governance" },
  {
    name: "Rahul Menon",
    title: "Head of Product Design",
    focus: "Design systems & UX ops",
  },
  {
    name: "Sarah Lee",
    title: "Principal Architect",
    focus: "Cloud and security patterns",
  },
];

const values = [
  {
    title: "Innovation First",
    description:
      "Responsible experimentation with measurable outcomes and architecture guardrails.",
    icon: <Compass className="h-5 w-5 text-indigo-200" />,
    color: "from-indigo-500 to-violet-500",
  },
  {
    title: "Client Success",
    description: "North-star metrics align every sprint, demo, and release.",
    icon: <Handshake className="h-5 w-5 text-violet-200" />,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Transparency",
    description: "Clear communication and traceability from roadmap to production.",
    icon: <ShieldCheck className="h-5 w-5 text-purple-200" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Excellence",
    description: "Engineering craft, design rigor, and QA discipline in every release.",
    icon: <Activity className="h-5 w-5 text-rose-200" />,
    color: "from-pink-500 to-rose-500",
  },
];

const cadence = [
  {
    title: "Kickoff in 72h",
    desc: "Discovery, architecture guardrails, and a delivery plan agreed up front.",
    icon: <Clock3 className="h-5 w-5 text-indigo-200" />,
  },
  {
    title: "Weekly signals",
    desc: "Burndown, quality gates, and risk radar shared openly.",
    icon: <BarChart3 className="h-5 w-5 text-violet-200" />,
  },
  {
    title: "Design + build in sync",
    desc: "Design systems and engineering ship together—not in silos.",
    icon: <MessageSquare className="h-5 w-5 text-purple-200" />,
  },
];

const getInitials = (fullName: string) =>
  fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function TeamCard({
  name,
  role,
  focus,
  description,
  icon,
  linkedIn,
  email,
  gradient,
}: TeamMember) {
  return (
    <div className="group relative">
      <div
        className={`absolute -inset-0.5 ${gradient} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700`}
      />

      <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl border border-slate-700/50 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-transparent">
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div
          className={`absolute -top-20 -right-20 w-60 h-60 ${gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700`}
        />

        <div className="relative p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <div
                className={`absolute -inset-2 ${gradient} rounded-full opacity-75 blur-md animate-pulse`}
              />
              <div
                className={`relative w-36 h-36 rounded-full ${gradient} p-[3px] shadow-2xl`}
              >
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <div className="text-3xl font-semibold text-white/80 group-hover:text-white transition-colors duration-300">
                    {getInitials(name)}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-slate-900 shadow-lg animate-pulse" />
            </div>

            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${gradient} bg-opacity-20 border border-white/10 mb-4`}
            >
              {icon}
              <span className="text-sm font-semibold text-white">{role}</span>
            </div>

            <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-violet-400 transition-all duration-300">
              {name}
            </h3>
            <p className="text-sm text-slate-400">{focus}</p>
          </div>

          <p className="text-slate-300 leading-relaxed text-center mb-8 min-h-[100px]">
            {description}
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-6" />

          <div className="flex justify-center gap-4">
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/50 hover:bg-indigo-600/20 border border-slate-700 hover:border-indigo-500/50 transition-all duration-300"
            >
              <Linkedin className="w-4 h-4 text-slate-400 group-hover/btn:text-indigo-400 transition-colors" />
              <span className="text-sm font-medium text-slate-300 group-hover/btn:text-white transition-colors">
                LinkedIn
              </span>
            </a>
            <a
              href={`mailto:${email}`}
              className="group/btn flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/50 hover:bg-violet-600/20 border border-slate-700 hover:border-violet-500/50 transition-all duration-300"
            >
              <Mail className="w-4 h-4 text-slate-400 group-hover/btn:text-violet-400 transition-colors" />
              <span className="text-sm font-medium text-slate-300 group-hover/btn:text-white transition-colors">
                Email
              </span>
            </a>
          </div>
        </div>

        <div className={`h-1 ${gradient}`} />
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-indigo-950/30 to-slate-900 overflow-hidden">
      <SEO
        title="Meet Our Team - WebnexFusion Experts"
        description="Meet the leadership team behind WebnexFusion, combining technical excellence and strategic vision."
        canonicalUrl="https://webnexfusion.com/team"
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Hero */}
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-indigo-300" />
              <span className="text-sm font-semibold text-indigo-100">
                People • Technology • Outcomes
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-white mb-6">
              The leadership building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 animate-gradient">
                resilient digital businesses.
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              WebnexFusion is led by operators who have shipped mission-critical
              platforms, scaled engineering orgs, and obsessed over client
              results. We combine product thinking, disciplined delivery, and
              financial clarity so every build ships fast and scales with
              confidence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "Platforms shipped",
                value: "120+",
                sub: "Enterprise & consumer launches",
              },
              { label: "Avg. tenure", value: "7.4 yrs", sub: "Leadership bench" },
              { label: "On-time delivery", value: "96%", sub: "Past 24 months" },
              { label: "Regions served", value: "14", sub: "North America, EMEA, APAC" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 shadow-inner"
              >
                <p className="text-xs uppercase tracking-[0.08em] text-slate-400">
                  {item.label}
                </p>
                <p className="text-2xl font-bold text-white mt-2">{item.value}</p>
                <p className="text-sm text-slate-400">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          {leadership.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>

        {/* Advisors & Delivery Leads */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Users className="h-5 w-5 text-indigo-200" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Advisory & Delivery Leads</h2>
              <p className="text-slate-400">
                Specialists who keep engagements predictable and quality-obsessed.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leads.map((lead) => (
              <div
                key={lead.name}
                className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-indigo-400/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/20 text-indigo-100 font-semibold flex items-center justify-center">
                    {getInitials(lead.name)}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{lead.name}</p>
                    <p className="text-sm text-slate-400">{lead.title}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-300">{lead.focus}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-slate-400">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="group relative p-8 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all duration-300"
              >
                <div className="h-10 w-10 mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3
                  className={`text-lg font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${value.color}`}
                >
                  {value.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Cadence */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                How we operate engagements
              </h2>
              <p className="text-slate-300">
                A disciplined cadence designed for predictability, speed, and stakeholder
                clarity.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {cadence.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-indigo-400/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-9 w-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <p className="text-sm font-semibold text-white leading-tight">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </section>
  );
}
