// src/pages/Blog.tsx

import { Calendar, ArrowUpRight } from "lucide-react";
import SEO from "../SEO";

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  tag: string;
}

function BlogCard({ title, description, date, tag }: BlogCardProps) {
  return (
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all hover:border-indigo-500/40 hover:shadow-indigo-500/20 hover:shadow-2xl">
      <div className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-300 mb-4">
        {tag}
      </div>

      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition">
        {title}
      </h3>

      <p className="text-sm text-neutral-400 leading-relaxed mb-6">
        {description}
      </p>

      <div className="flex items-center justify-between text-sm text-neutral-400">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {date}
        </div>

        <button className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition">
          Read More
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function Blog() {
  const blogs: BlogCardProps[] = [
    {
      title: "Digital Transformation Trends Businesses Must Adopt in 2025",
      description:
        "Explore the most impactful digital transformation trends that will define competitive businesses in 2025.",
      date: "Dec 20, 2025",
      tag: "Digital Transformation",
    },
    {
      title: "How AI is Reshaping Web Development & User Experience",
      description:
        "Learn how artificial intelligence is changing website development, personalization, and performance optimization.",
      date: "Dec 15, 2025",
      tag: "Artificial Intelligence",
    },
    {
      title: "Cyber Security Best Practices for Modern Enterprises",
      description:
        "A complete guide to protecting your business from cyber threats, data breaches, and online vulnerabilities.",
      date: "Dec 08, 2025",
      tag: "Cyber Security",
    },
    {
      title: "Why Scalable Cloud Infrastructure is Crucial in 2025",
      description:
        "Understand how cloud-native infrastructure helps businesses scale faster and reduce operational costs.",
      date: "Dec 01, 2025",
      tag: "Cloud Computing",
    },
    {
      title: "Why Every Business Needs a High-Performance Website",
      description:
        "A fast, secure, and responsive website directly impacts credibility, SEO rankings, and conversions.",
      date: "Jan 12, 2025",
      tag: "Web Development",
    },
    {
      title: "Top Digital Marketing Strategies That Drive Real ROI",
      description:
        "Discover proven digital marketing strategies to generate leads and grow brand authority.",
      date: "Jan 05, 2025",
      tag: "Digital Marketing",
    },
    {
      title: "Choosing the Right Tech Stack for Your Startup",
      description:
        "A practical guide to selecting cost-effective and scalable technologies for startups.",
      date: "Dec 28, 2024",
      tag: "Technology",
    },
    {
      title: "Secure Hosting Solutions to Protect Your Online Assets",
      description:
        "Why secure hosting, SSL, backups, and monitoring are essential for online business safety.",
      date: "Dec 18, 2024",
      tag: "Hosting & Security",
    },
    {
      title: "Legal & Compliance Essentials for New Businesses",
      description:
        "Key registrations, tax filings, and compliance requirements every startup must follow.",
      date: "Dec 10, 2024",
      tag: "Business & Legal",
    },
    {
      title: "E-Commerce Trends That Will Shape Online Selling",
      description:
        "From personalization to AI-driven shopping, explore the future of e-commerce.",
      date: "Dec 02, 2024",
      tag: "E-Commerce",
    },
    {
      title: "Why UI/UX Design Matters More Than Ever",
      description:
        "Good UI/UX design increases engagement, trust, and conversion rates for digital products.",
      date: "Nov 22, 2024",
      tag: "UI/UX Design",
    },
    {
      title: "How Automation Helps Businesses Save Time & Costs",
      description:
        "Learn how workflow automation improves efficiency and reduces manual operational overhead.",
      date: "Nov 10, 2024",
      tag: "Automation",
    },
  ];

  return (
    <section className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#020617]">
      <SEO
        title="Insights & Trends - WebnexFusion Blog"
        description="Read the latest insights on web development, digital marketing, AI, and business growth from WebnexFusion."
        canonicalUrl="https://webnexfusion.com/blog"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-sm mb-4">
            Our Blog
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Latest Insights & Industry Updates
          </h1>
          <p className="max-w-3xl mx-auto text-neutral-400 text-lg leading-relaxed">
            Explore expert-written articles on technology, digital growth,
            security, and business innovation from WebnexFusion.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
