// src/pages/Blog.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowUpRight } from "lucide-react";
import SEO from "../SEO";
import API_BASE_URL from "../../config/api";

interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  content: string;
  author: string;
  tags: string[] | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  tag: string;
  slug: string;
}

function BlogCard({ title, description, date, tag, slug }: BlogCardProps) {
  return (
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all hover:border-indigo-500/40 hover:shadow-indigo-500/20 hover:shadow-2xl flex flex-col h-full">
      <div className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-300 mb-4 w-fit">
        {tag}
      </div>

      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition line-clamp-2">
        {title}
      </h3>

      <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-grow line-clamp-3">
        {description}
      </p>

      <div className="flex items-center justify-between text-sm text-neutral-400 mt-auto">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {date}
        </div>

        <Link
          to={`/blog/${slug}`}
          className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition"
        >
          Read More
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blogs`);
        if (response.ok) {
          const result = await response.json();
          setBlogs(result.data || []);
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
        {loading ? (
          <div className="text-center text-neutral-400">Loading articles...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  title={blog.title}
                  description={blog.description || (blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '')}
                  date={new Date(blog.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  tag={blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 ? blog.tags[0] : "Tech"}
                  slug={blog.slug}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-neutral-500">
                No articles found.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
