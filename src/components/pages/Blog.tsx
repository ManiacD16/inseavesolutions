// src/pages/Blog.tsx

import { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowUpRight, Search, X, ChevronLeft, ChevronRight, Clock, BookOpen } from "lucide-react";
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
  tags: string[] | null;
  slug: string;
  imageUrl?: string | null;
  content: string;
  author: string;
}

function BlogCard({ title, description, date, tags, slug, imageUrl, content, author }: BlogCardProps) {
  // Calculate reading time
  const readingTime = useMemo(() => {
    const words = content ? content.replace(/<[^>]*>/g, "").split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  }, [content]);

  const displayTag = tags && Array.isArray(tags) && tags.length > 0 ? tags[0] : "Insights";

  return (
    <div className="group bg-slate-900/35 backdrop-blur-xl border border-slate-800/80 rounded-3xl overflow-hidden transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)] hover:-translate-y-1.5 flex flex-col h-full">
      {/* Image container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950 shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10 transition-opacity duration-500" />
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950/30 to-violet-950/30 text-indigo-400">
            <BookOpen className="h-10 w-10 stroke-[1.2] opacity-40 animate-pulse" />
          </div>
        )}
        
        {/* Dynamic Category Tag Overlay */}
        <span className="absolute top-5 left-5 z-20 px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-xl bg-indigo-600/90 text-white backdrop-blur-md border border-indigo-400/20 shadow-lg shadow-indigo-500/10">
          {displayTag}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow">
        {/* Meta Info */}
        <div className="flex items-center gap-3 text-[11px] font-bold text-neutral-400 mb-4">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <span className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[10px] text-indigo-400 font-black uppercase">
              {author ? author.charAt(0) : "W"}
            </span>
            {author || "WebnexFusion Team"}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-indigo-400/70" />
            {readingTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-extrabold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300 line-clamp-2 leading-snug">
          <Link to={`/blog/${slug}`}>{title}</Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-450 leading-relaxed mb-6 flex-grow line-clamp-3">
          {description}
        </p>

        {/* Card Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-800/60 mt-auto text-xs">
          <div className="flex items-center gap-1.5 text-neutral-450 font-semibold">
            <Calendar className="h-4 w-4 text-indigo-400/70" />
            <span>{date}</span>
          </div>

          <Link
            to={`/blog/${slug}`}
            className="flex items-center gap-1 font-bold text-indigo-400 hover:text-indigo-300 transition-colors group/btn uppercase tracking-wider"
          >
            <span>Read Article</span>
            <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Standard 6 items per page fits a 3-column layout perfectly!
  
  const gridRef = useRef<HTMLDivElement>(null);

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

  // Extract all categories dynamically from tags in all blogs
  const categories = useMemo(() => {
    const tagSet = new Set<string>();
    blogs.forEach((blog) => {
      if (blog.tags && Array.isArray(blog.tags)) {
        blog.tags.forEach((tag) => {
          if (tag) tagSet.add(tag.trim());
        });
      }
    });
    return ["All", ...Array.from(tagSet)];
  }, [blogs]);

  // Filtered blogs matching search & selected category
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.description && blog.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (blog.content && blog.content.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" ||
        (blog.tags && Array.isArray(blog.tags) && blog.tags.some(tag => tag.trim().toLowerCase() === selectedCategory.toLowerCase()));

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  // Total pages calculation
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

  // Paginated articles in grid
  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBlogs.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredBlogs, itemsPerPage]);

  // Handle page change with smooth scroll to top of grid
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  return (
    <section className="min-h-screen pt-32 pb-28 px-4 sm:px-6 lg:px-8 bg-[#020617] relative overflow-hidden">
      {/* Premium ambient lights */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[85%] h-[600px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      
      <SEO
        title="Insights & Trends - WebnexFusion Blog"
        description="Read the latest insights on web development, digital marketing, AI, and business growth from WebnexFusion. High-quality guides for technology and marketing."
        canonicalUrl="https://webnexfusion.com/blog"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-[11px] font-extrabold uppercase tracking-widest border border-indigo-500/20 mb-5 shadow-lg shadow-indigo-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Insights Hub
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none mb-6">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Insights</span> &amp; Industry Updates
          </h1>
          <p className="text-neutral-450 text-base sm:text-lg leading-relaxed font-medium max-w-3xl mx-auto">
            Deep dives, tech tutorials, and strategic insights on custom software architecture, SEO methodologies, cybersecurity, and digital scaling from WebnexFusion.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col lg:flex-row gap-5 justify-between items-center mb-12 bg-slate-900/30 border border-slate-800/85 p-5 rounded-3xl backdrop-blur-xl">
          {/* Categories Horizontal Scrolling Container - PERFECT ALIGNMENT WITH STANDARD PADDINGS */}
          <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto py-1 scrollbar-none mask-image-right">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 text-xs sm:text-sm font-extrabold rounded-2xl whitespace-nowrap transition-all duration-300 border uppercase tracking-wider ${
                    isActive
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                      : "bg-slate-950/60 border-slate-800 text-neutral-400 hover:text-white hover:border-slate-750"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-2.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Anchor point to scroll to on page change */}
        <div ref={gridRef} className="scroll-mt-28" />

        {/* Loading and Blog Grid Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-400 gap-4">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold tracking-widest uppercase text-[10px] animate-pulse text-indigo-300">Fetching latest stories...</p>
          </div>
        ) : (
          <div>
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/10 border border-dashed border-slate-800/80 rounded-3xl max-w-lg mx-auto">
                <Search className="h-12 w-12 text-slate-700 mx-auto mb-4 stroke-[1.2]" />
                <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                <p className="text-neutral-555 text-sm px-6 leading-relaxed">
                  We couldn't find any articles matching "{searchQuery}" under the category "{selectedCategory}".
                </p>
              </div>
            ) : (
              <div>
                {/* Section Title */}
                {paginatedBlogs.length > 0 && (
                  <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                    Articles List
                    <span className="text-xs font-bold text-neutral-400 bg-slate-900 border border-slate-800 px-3.5 py-1 rounded-full ml-1">
                      {filteredBlogs.length} {filteredBlogs.length === 1 ? "Article" : "Articles"}
                    </span>
                  </h2>
                )}

                {/* Highly Professional Balanced 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedBlogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      title={blog.title}
                      description={blog.description || (blog.content ? blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : '')}
                      date={new Date(blog.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      tags={blog.tags}
                      slug={blog.slug}
                      imageUrl={blog.image_url}
                      content={blog.content}
                      author={blog.author}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-850 pt-8">
                    {/* Showing Results Info */}
                    <div className="text-xs font-semibold text-neutral-400">
                      Showing{" "}
                      <span className="text-white">
                        {((currentPage - 1) * itemsPerPage) + 1}
                      </span>{" "}
                      to{" "}
                      <span className="text-white">
                        {Math.min(currentPage * itemsPerPage, filteredBlogs.length)}
                      </span>{" "}
                      of <span className="text-white">{filteredBlogs.length}</span> articles
                    </div>

                    {/* Pagination Numbers Navigation */}
                    <div className="flex items-center gap-2">
                      {/* Prev Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous Page"
                        className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-neutral-400 hover:text-white hover:border-slate-700 disabled:opacity-20 disabled:hover:text-neutral-400 disabled:hover:border-slate-800 transition-all duration-300"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      {/* Numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        const isCurrent = page === currentPage;
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`min-w-[40px] h-10 px-2.5 rounded-xl text-xs font-black border transition-all duration-300 ${
                              isCurrent
                                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                                : "bg-slate-900 border-slate-800 text-neutral-400 hover:text-white hover:border-slate-700"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}

                      {/* Next Button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Next Page"
                        className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-neutral-400 hover:text-white hover:border-slate-700 disabled:opacity-20 disabled:hover:text-neutral-400 disabled:hover:border-slate-800 transition-all duration-300"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
