import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SolutionItem } from "./solutionData";

type Props = {
  item: SolutionItem;
};

export default function SolutionPage({ item }: Props) {
  return (
    <section className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/5 w-[520px] h-[520px] bg-purple-500/10 rounded-full blur-[180px]" />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-200">
            {item.category}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            {item.title}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl">{item.subtitle}</p>
          <p className="text-slate-400 max-w-4xl leading-relaxed">{item.summary}</p>
        </header>

        <div className="grid md:grid-cols-[1.2fr,0.8fr] gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Expected outcomes</h2>
            <div className="space-y-4">
              {item.outcomes.map((o) => (
                <div
                  key={o}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/5"
                >
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-400" />
                  <p className="text-slate-200 leading-relaxed">{o}</p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-white pt-4">What we deliver</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {item.capabilities.map((c) => (
                <div
                  key={c}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 text-slate-200 leading-relaxed"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-slate-900 border border-white/10 shadow-xl">
              <p className="text-sm uppercase tracking-[0.1em] text-white/70 mb-2">
                Delivery signals
              </p>
              <p className="text-slate-100 leading-relaxed">
                Every engagement ships with clear milestones, weekly signals, and
                stakeholder-ready updates. We prioritize early wins while hardening the
                platform for scale.
              </p>
            </div>

            {item.stats && (
              <div className="grid grid-cols-2 gap-3">
                {item.stats.map((s) => (
                  <div
                    key={s.label}
                    className="p-4 rounded-2xl bg-slate-900/70 border border-white/5 text-white"
                  >
                    <p className="text-xs uppercase tracking-[0.08em] text-slate-400">
                      {s.label}
                    </p>
                    <p className="text-2xl font-semibold mt-1">{s.value}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="p-5 rounded-3xl bg-slate-900/70 border border-white/5">
              <h3 className="text-white font-semibold mb-2">Engagement model</h3>
              <ul className="space-y-2 text-slate-300 text-sm leading-relaxed">
                <li>• Rapid discovery & roadmap with executive-ready outputs.</li>
                <li>• Pod structure blending product, design, engineering, and QA.</li>
                <li>• Weekly steering with risk radar and dependency tracking.</li>
                <li>• Post-launch hypercare with defined exit criteria.</li>
              </ul>
            </div>

            {item.cta && (
              <a
                href={item.cta.link}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
              >
                {item.cta.label} <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
