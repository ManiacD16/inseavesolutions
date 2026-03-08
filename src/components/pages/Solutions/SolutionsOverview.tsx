import { Link } from "react-router-dom";
import { solutionItems } from "./solutionData";

const categories = ["Service", "Business Challenge", "Industry"] as const;

export default function SolutionsOverview() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[480px] h-[480px] bg-indigo-500/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-40px] right-1/5 w-[520px] h-[520px] bg-purple-500/10 rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-10">
        <header className="space-y-3 text-center">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-200">
            Solutions Catalog
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Explore how we solve for you
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto">
            Browse by service, business challenge, or industry focus. Each page explains
            the outcomes, capabilities, and engagement signals you can expect from
            WebnexFusion.
          </p>
        </header>

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-white">{category}</h2>
                <div className="h-px flex-1 ml-4 bg-gradient-to-r from-white/20 to-transparent" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {solutionItems
                  .filter((s) => s.category === category)
                  .map((s) => (
                    <Link
                      key={s.slug}
                      to={
                        s.category === "Industry"
                          ? `/solutions/industry/${s.slug}`
                          : `/solutions/${s.slug}`
                      }
                      className="group block p-6 rounded-3xl bg-slate-900/70 border border-white/5 hover:border-indigo-400/40 transition-colors"
                    >
                      <p className="text-xs uppercase tracking-[0.08em] text-indigo-200 mb-2">
                        {s.category}
                      </p>
                      <h3 className="text-lg font-semibold text-white group-hover:text-indigo-100">
                        {s.title}
                      </h3>
                      <p className="text-sm text-slate-300 mt-2 line-clamp-3">
                        {s.subtitle}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-200">
                        Read more <span aria-hidden>→</span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
