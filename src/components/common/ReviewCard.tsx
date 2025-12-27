import { Star, Quote } from "lucide-react";

interface ReviewCardProps {
  name: string;
  role: string;
  location: string;
  review: string;
}

export default function ReviewCard({
  name,
  role,
  location,
  review,
}: ReviewCardProps) {
  return (
    <div className="relative group bg-slate-900/60 border border-white/5 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10">
      {/* gradient accent */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />

      {/* quote icon */}
      <Quote className="relative z-10 w-8 h-8 text-indigo-400 mb-4" />

      {/* review text */}
      <p className="relative z-10 text-neutral-300 text-sm leading-relaxed mb-6">
        “{review}”
      </p>

      {/* footer */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <p className="text-xs text-neutral-400">
            {role} · {location}
          </p>
        </div>

        {/* rating */}
        <div className="flex items-center gap-1 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  );
}
