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

  const goToSlide = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm">
            <Star className="w-4 h-4 text-indigo-400 fill-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">
              Client Testimonials
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Trusted by Businesses
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Across India
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real experiences from clients who rely on WebnexFusion for
            technology, compliance, and digital growth.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Main Card */}
          <div className="relative max-w-5xl mx-auto">
            {/* Decorative Elements */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl opacity-20 animate-pulse"></div>

            {/* Card */}
            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-1 shadow-2xl">
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: "32px 32px",
                    }}
                  ></div>
                </div>

                {/* Quote Icon */}
                <div className="absolute top-8 right-8 opacity-10">
                  <Quote className="w-24 h-24 sm:w-32 sm:h-32 text-indigo-400" />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-8">
                  {/* Stars */}
                  <div className="flex gap-1 justify-center sm:justify-start">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-100 leading-relaxed text-center sm:text-left">
                    "{reviews[current].review}"
                  </blockquote>

                  {/* Client Info */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-slate-700/50">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg ring-4 ring-indigo-500/20">
                        {reviews[current].avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900"></div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 text-center sm:text-left space-y-1">
                      <h4 className="text-xl sm:text-2xl font-bold text-white">
                        {reviews[current].name}
                      </h4>
                      <p className="text-sm sm:text-base text-indigo-300 font-medium">
                        {reviews[current].role} · {reviews[current].company}
                      </p>
                      <p className="text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                        {reviews[current].location}
                      </p>
                    </div>

                    {/* Navigation Arrows - Desktop */}
                    <div className="hidden sm:flex gap-3">
                      <button
                        onClick={handlePrev}
                        className="w-12 h-12 rounded-full bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 flex items-center justify-center transition-all duration-300 group"
                        aria-label="Previous review"
                      >
                        <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="w-12 h-12 rounded-full bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 flex items-center justify-center transition-all duration-300 group"
                        aria-label="Next review"
                      >
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-3 mt-10">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative transition-all duration-500 ${
                  index === current ? "w-12 h-3" : "w-3 h-3 hover:scale-125"
                }`}
                aria-label={`Go to review ${index + 1}`}
              >
                <div
                  className={`w-full h-full rounded-full transition-all duration-500 ${
                    index === current
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/50"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                ></div>
              </button>
            ))}
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex sm:hidden justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 flex items-center justify-center transition-all duration-300"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6 text-slate-400" />
            </button>
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 flex items-center justify-center transition-all duration-300"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mt-8">
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                style={{
                  width: `${((current + 1) / reviews.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">
          {[
            { label: "Happy Clients", value: "500+" },
            { label: "Projects Delivered", value: "1200+" },
            { label: "Years Experience", value: "8+" },
            { label: "Client Satisfaction", value: "98%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative text-center space-y-2">
                <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
