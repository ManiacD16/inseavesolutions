import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function ClientReviewsCarousel() {
  const reviews = [
    {
      name: "Rohit Jain",
      role: "Founder",
      location: "Delhi, India",
      review:
        "WebnexFusion delivered a high-performance website and handled our compliance seamlessly. Extremely professional and reliable team.",
      avatar: "RJ",
      company: "TechVista Solutions",
    },
    {
      name: "Anjali Patel",
      role: "Business Owner",
      location: "Ahmedabad, Gujarat",
      review:
        "Their digital marketing strategy significantly improved our online visibility and lead quality within just a few months.",
      avatar: "AP",
      company: "GreenLeaf Organics",
    },
    {
      name: "Sandeep Kumar",
      role: "Director",
      location: "Bengaluru, Karnataka",
      review:
        "Excellent technical expertise and clear communication. Post-launch support has been outstanding.",
      avatar: "SK",
      company: "InnovateTech Labs",
    },
    {
      name: "Neha Verma",
      role: "Startup Consultant",
      location: "Noida, UP",
      review:
        "From company registration to website deployment, everything was handled under one roof with complete transparency.",
      avatar: "NV",
      company: "Velocity Ventures",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [paused, current]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* ===== SAME BACKGROUND LAYERS ===== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 w-full text-indigo-400 flex items-center justify-center py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm">
              <Star className="w-4 h-4 text-indigo-400 fill-indigo-400" />
              <span className="text-sm font-medium text-indigo-300">
                Client Testimonials
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Trusted by Businesses
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Across India
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              Real experiences from clients who rely on WebnexFusion for
              technology, compliance, and digital growth.
            </p>
          </div>

          {/* Carousel */}
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative max-w-5xl mx-auto">
              {/* Glow blobs */}
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl opacity-20 animate-pulse" />
              <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl opacity-20 animate-pulse" />

              {/* Card */}
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-1 shadow-2xl">
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 overflow-hidden">
                  {/* Grid dots */}
                  <div className="absolute inset-0 opacity-5">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                        backgroundSize: "32px 32px",
                      }}
                    />
                  </div>

                  <div className="absolute top-8 right-8 opacity-10">
                    <Quote className="w-24 h-24 text-indigo-400" />
                  </div>

                  <div className="relative z-10 space-y-8">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>

                    <blockquote className="text-2xl text-white">
                      “{reviews[current].review}”
                    </blockquote>

                    <div className="flex items-center gap-6 pt-6 border-t border-slate-700/50">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                        {reviews[current].avatar}
                      </div>

                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white">
                          {reviews[current].name}
                        </h4>
                        <p className="text-indigo-300 text-sm">
                          {reviews[current].role} · {reviews[current].company}
                        </p>
                        <p className="text-slate-400 text-sm">
                          {reviews[current].location}
                        </p>
                      </div>

                      <div className="hidden sm:flex gap-3">
                        <button
                          onClick={handlePrev}
                          className="w-12 h-12 rounded-full bg-slate-800 hover:bg-indigo-600 border border-slate-700 flex items-center justify-center"
                        >
                          <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="w-12 h-12 rounded-full bg-slate-800 hover:bg-indigo-600 border border-slate-700 flex items-center justify-center"
                        >
                          <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-10">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-3 rounded-full transition-all ${
                    i === current ? "w-10 bg-indigo-500" : "w-3 bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
