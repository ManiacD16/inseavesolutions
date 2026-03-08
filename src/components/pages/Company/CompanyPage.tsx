import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import SEO from "../../SEO";
import { CompanyPage as CompanyPageType } from "./companyData";

type Props = {
  page: CompanyPageType;
};

export default function CompanyPage({ page }: Props) {
  return (
    <section className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <SEO
        title={page.meta.title}
        description={page.meta.description}
        canonicalUrl={page.meta.canonical}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] right-1/5 w-[520px] h-[520px] bg-purple-500/12 rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-5xl mx-auto space-y-10">
        <header className="space-y-4">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-200">
            Company
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            {page.title}
          </h1>
          <p className="text-lg text-slate-200 max-w-3xl leading-relaxed">{page.hero}</p>
          <p className="text-slate-400 max-w-4xl leading-relaxed">{page.subtitle}</p>
        </header>

        <div className="grid md:grid-cols-[1.2fr,0.8fr] gap-8">
          <div className="space-y-4">
            {page.bullets.map((b) => (
              <div
                key={b}
                className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/70 border border-white/5"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5" />
                <p className="text-slate-200 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-slate-900 border border-white/10 shadow-xl">
              <p className="text-sm uppercase tracking-[0.1em] text-white/70 mb-2">
                Why it matters
              </p>
              <p className="text-slate-100 leading-relaxed">
                Each pillar shapes how we build, communicate, and deliver outcomes. Expect
                transparency, measurable goals, and leaders who stay close to the work.
              </p>
            </div>

            {page.cta && (
              <a
                href={page.cta.link}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-colors"
              >
                {page.cta.label} <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
