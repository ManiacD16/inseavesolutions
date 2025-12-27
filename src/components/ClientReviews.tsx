import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

export default function ClientReviewsCarousel() {
  const reviews = [
    {
      name: "Rohit Jain",
      role: "Founder",
      location: "Delhi, India",
      review:
        "WebnexFusion delivered a high-performance website and handled our compliance seamlessly. Extremely professional and reliable team.",
    },
    {
      name: "Anjali Patel",
      role: "Business Owner",
      location: "Ahmedabad, Gujarat",
      review:
        "Their digital marketing strategy significantly improved our online visibility and lead quality within just a few months.",
    },
    {
      name: "Sandeep Kumar",
      role: "Director",
      location: "Bengaluru, Karnataka",
      review:
        "Excellent technical expertise and clear communication. Post-launch support has been outstanding.",
    },
    {
      name: "Neha Verma",
      role: "Startup Consultant",
      location: "Noida, UP",
      review:
        "From company registration to website deployment, everything was handled under one roof with complete transparency.",
    },
    {
      name: "Amit Shah",
      role: "E-commerce Owner",
      location: "Surat, Gujarat",
      review:
        "Our Shopify store performance and security improved drastically. Very responsive and knowledgeable team.",
    },
    {
      name: "Pooja Nair",
      role: "Operations Manager",
      location: "Kochi, Kerala",
      review:
        "WebnexFusion helped us streamline our digital infrastructure with excellent documentation and timely delivery.",
    },
    {
      name: "Vikas Malhotra",
      role: "Managing Partner",
      location: "Chandigarh, India",
      review:
        "A trustworthy digital and compliance partner. Highly recommended for businesses looking for long-term growth.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [paused, reviews.length]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-blue-900/50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          What Our Clients Say
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto mb-12">
          Trusted by businesses across India for digital, legal, and technology
          solutions.
        </p>

        {/* Carousel */}
        <div
          className="relative bg-slate-900/60 border border-white/5 rounded-2xl p-8 overflow-hidden transition"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="w-10 h-10 text-indigo-400 mx-auto mb-6" />

          <p className="text-neutral-300 text-base leading-relaxed mb-8 min-h-[120px]">
            “{reviews[current].review}”
          </p>

          <div className="mb-4">
            <h4 className="text-white font-semibold">
              {reviews[current].name}
            </h4>
            <p className="text-sm text-neutral-400">
              {reviews[current].role} · {reviews[current].location}
            </p>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 text-yellow-400 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400" />
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-8 bg-indigo-500"
                    : "w-2 bg-neutral-500 hover:bg-neutral-400"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
