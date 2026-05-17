import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, TrendingUp, ChevronRight, Clock, Link as LinkIcon, Check, Linkedin, Twitter, Facebook, BookOpen, ArrowUpRight, Mail } from "lucide-react";
import SEO from "../SEO";
import API_BASE_URL from "../../config/api";
import toast from "react-hot-toast";

interface Blog {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    content: string;
    author: string;
    tags: string[] | null;
    image_url: string | null;
    meta_title: string | null;
    meta_description: string | null;
    focus_keyword: string | null;
    created_at: string;
}

interface ToCItem {
    id: string;
    text: string;
}

export default function BlogDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // ToC and Share States
    const [toc, setToC] = useState<ToCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [copied, setCopied] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        const fetchBlogAndRecent = async () => {
            try {
                // Fetch specific blog
                const response = await fetch(`${API_BASE_URL}/api/blogs/${slug}`);
                if (!response.ok) {
                    throw new Error("Blog not found");
                }
                const result = await response.json();
                setBlog(result.data || result);

                // Fetch recent blogs
                const recentRes = await fetch(`${API_BASE_URL}/api/blogs`);
                if (recentRes.ok) {
                    const recentResult = await recentRes.json();
                    let allBlogs = recentResult.data || [];
                    // Filter out current blog and get top 3 recent ones
                    let filtered = allBlogs.filter((b: Blog) => b.slug !== slug).slice(0, 3);
                    setRecentBlogs(filtered);
                }

            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load blog");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchBlogAndRecent();
        }
    }, [slug]);

    // Compute reading time dynamically: ~200 words per minute
    const readingTime = useMemo(() => {
        if (!blog || !blog.content) return "1 min read";
        const words = blog.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
        const minutes = Math.max(1, Math.ceil(words / 200));
        return `${minutes} min read`;
    }, [blog]);

    // Parse content and inject IDs into H2 headings for ToC linking
    const processedContent = useMemo(() => {
        if (!blog || !blog.content) return "";
        let headingIndex = 0;
        return blog.content.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs, text) => {
            const cleanText = text.replace(/<[^>]*>/g, '').trim();
            const id = `heading-${cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${headingIndex++}`;
            return `<h2 id="${id}" class="scroll-mt-28"${attrs}>${text}</h2>`;
        });
    }, [blog]);

    // Populate ToC list from H2 elements in content
    useEffect(() => {
        if (blog && blog.content) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(blog.content, 'text/html');
            const headingElements = doc.querySelectorAll('h2');
            const extracted: ToCItem[] = [];
            headingElements.forEach((el, index) => {
                const text = el.textContent || '';
                const cleanText = text.trim();
                const id = `heading-${cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`;
                extracted.push({ id, text: cleanText });
            });
            setToC(extracted);
            if (extracted.length > 0) {
                setActiveId(extracted[0].id);
            }
        }
    }, [blog]);

    // Scrollspy effect to highlight ToC headings on scroll
    useEffect(() => {
        if (toc.length === 0) return;

        const handleScroll = () => {
            const headings = document.querySelectorAll('h2[id^="heading-"]');
            let currentActiveId = "";

            for (let i = 0; i < headings.length; i++) {
                const el = headings[i];
                const rect = el.getBoundingClientRect();
                if (rect.top <= 160) {
                    currentActiveId = el.id;
                } else {
                    break;
                }
            }

            if (currentActiveId) {
                setActiveId(currentActiveId);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Run once on load
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [toc]);

    // Share link handler
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    // Newsletter submit
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailInput.trim()) return;
        setSubscribed(true);
        toast.success("Successfully subscribed to newsletter!");
        setEmailInput("");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-neutral-400 font-bold uppercase tracking-widest text-xs animate-pulse text-indigo-300">Loading Article...</p>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white gap-4">
                <p className="text-xl text-red-400 font-extrabold">{error || "Blog not found"}</p>
                <Link to="/blog" className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-indigo-400 hover:text-indigo-300 flex items-center gap-2 font-bold transition-all shadow-lg">
                    <ArrowLeft className="h-5 w-5" /> Back to Blog
                </Link>
            </div>
        );
    }

    // Determine keywords (combine focus keyword and tags)
    const keywordsArray = [];
    if (blog.focus_keyword) keywordsArray.push(blog.focus_keyword);
    if (blog.tags && Array.isArray(blog.tags)) keywordsArray.push(...blog.tags);
    const keywords = keywordsArray.length > 0 ? keywordsArray.join(', ') : undefined;

    return (
        <div className="min-h-screen bg-[#020617] pt-32 pb-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Scoped CSS to guarantee Stripe/Medium-grade flawless reading experiences */}
            <style dangerouslySetInnerHTML={{__html: `
                .article-body p {
                    margin-bottom: 2rem;
                    font-size: 1.15rem;
                    line-height: 1.95;
                    color: #e2e8f0; /* slate-200 */
                    font-weight: 450;
                }
                @media (min-width: 640px) {
                    .article-body p {
                        font-size: 1.22rem;
                    }
                }
                .article-body h2 {
                    font-size: 2rem; /* text-3xl sm:text-4xl */
                    font-weight: 900;
                    color: #ffffff;
                    margin-top: 4.5rem;
                    margin-bottom: 1.75rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    padding-bottom: 0.75rem;
                    scroll-margin-top: 130px;
                    letter-spacing: -0.025em;
                }
                @media (min-width: 640px) {
                    .article-body h2 {
                        font-size: 2.25rem;
                    }
                }
                .article-body h3 {
                    font-size: 1.625rem; /* text-2xl */
                    font-weight: 800;
                    color: #a5b4fc; /* indigo-300 */
                    margin-top: 3rem;
                    margin-bottom: 1.25rem;
                    letter-spacing: -0.02em;
                }
                .article-body ul {
                    list-style-type: disc;
                    padding-left: 2rem;
                    margin-bottom: 2rem;
                    color: #cbd5e1; /* slate-300 */
                }
                .article-body ol {
                    list-style-type: decimal;
                    padding-left: 2rem;
                    margin-bottom: 2rem;
                    color: #cbd5e1;
                }
                .article-body li {
                    margin-bottom: 0.75rem;
                    line-height: 1.85;
                    font-size: 1.15rem;
                }
                @media (min-width: 640px) {
                    .article-body li {
                        font-size: 1.2rem;
                    }
                }
                .article-body blockquote {
                    border-left: 4px solid #6366f1; /* indigo-500 */
                    padding-left: 2rem;
                    font-style: italic;
                    color: #e0e7ff; /* indigo-100 */
                    margin: 3rem 0;
                    background: rgba(99, 102, 241, 0.04);
                    padding-top: 1.5rem;
                    padding-bottom: 1.5rem;
                    padding-right: 2rem;
                    border-top-right-radius: 1.5rem;
                    border-bottom-right-radius: 1.5rem;
                    font-size: 1.25rem;
                }
                .article-body pre {
                    background-color: #050b18;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 1.5rem;
                    padding: 1.75rem;
                    overflow-x: auto;
                    margin: 3rem 0;
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.3);
                }
                .article-body code {
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                    background-color: rgba(99, 102, 241, 0.15);
                    color: #c7d2fe;
                    padding: 0.2rem 0.5rem;
                    border-radius: 0.5rem;
                    font-size: 0.9em;
                    font-weight: 600;
                }
                .article-body pre code {
                    background-color: transparent;
                    color: #e2e8f0;
                    padding: 0;
                    font-size: 0.95rem;
                    font-weight: normal;
                }
                .article-body a {
                    color: #818cf8; /* indigo-400 */
                    text-decoration: underline;
                    text-underline-offset: 4px;
                    font-weight: 700;
                    transition: color 0.2s;
                }
                .article-body a:hover {
                    color: #a5b4fc;
                }
                .article-body img {
                    border-radius: 2rem;
                    margin: 3.5rem auto;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.4);
                    display: block;
                    max-width: 100%;
                    height: auto;
                }
            `}} />

            {/* Glowing background highlights */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-[40%] left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

            <SEO 
                title={blog.meta_title || `${blog.title} - WebnexFusion Blog`} 
                description={blog.meta_description || blog.description || blog.content.substring(0, 160).replace(/<[^>]*>?/gm, '')}
                canonicalUrl={`https://webnexfusion.com/blog/${blog.slug}`}
                image={blog.image_url || undefined}
                type="article"
                author={blog.author}
                keywords={keywords}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Back button */}
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900/60 border border-slate-800 text-neutral-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-300 mb-12 group shadow-md"
                >
                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-extrabold uppercase tracking-wider">Back to Articles</span>
                </Link>

                {/* Article Header */}
                <header className="mb-14 max-w-5xl">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {blog.tags && Array.isArray(blog.tags) && blog.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-black border border-indigo-500/20 uppercase tracking-widest shadow-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-10 leading-[1.1] tracking-tight">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm sm:text-base text-neutral-400 pb-10 border-b border-slate-800/80">
                        {/* Author */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-black text-indigo-300 text-base uppercase shadow-sm">
                                {blog.author ? blog.author.charAt(0) : "W"}
                            </div>
                            <span className="font-extrabold text-neutral-200">{blog.author || "WebnexFusion Team"}</span>
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800 hidden sm:block" />
                        
                        {/* Date */}
                        <div className="flex items-center gap-2 font-medium">
                            <Calendar className="h-5 w-5 text-indigo-400/80" />
                            <span>
                                {new Date(blog.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-800 hidden sm:block" />

                        {/* Read Time */}
                        <div className="flex items-center gap-2 font-medium">
                            <Clock className="h-5 w-5 text-indigo-400/80" />
                            <span>{readingTime}</span>
                        </div>
                    </div>
                </header>

                {/* Featured Cover Image */}
                {blog.image_url && (
                    <div className="mb-20 p-3 bg-slate-900/30 border border-slate-800/80 rounded-[3.5rem] shadow-2xl backdrop-blur-md aspect-[21/9] relative group overflow-hidden">
                        <div className="w-full h-full rounded-[2.8rem] overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent z-10" />
                            <img 
                                src={blog.image_url} 
                                alt={blog.title} 
                                loading="eager"
                                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-102"
                            />
                        </div>
                    </div>
                )}

                {/* Two Column Layout: Content vs Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Main Content Column */}
                    <div className="lg:col-span-8">
                        {/* Content Box */}
                        <article 
                            className="article-body max-w-none"
                            dangerouslySetInnerHTML={{ __html: processedContent }}
                        />

                        {/* Footer details */}
                        <div className="mt-20 pt-12 border-t border-slate-850">
                            {/* Author Bio Card */}
                            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-slate-900/30 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-14 backdrop-blur-md">
                                <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-black text-white text-3xl uppercase shadow-lg shadow-indigo-500/20 shrink-0">
                                    {blog.author ? blog.author.substring(0, 2) : "WN"}
                                </div>
                                <div>
                                    <h4 className="text-xl font-extrabold text-white mb-2.5">Written by {blog.author || "WebnexFusion Team"}</h4>
                                    <p className="text-neutral-400 text-base leading-relaxed font-medium">
                                        WebnexFusion expert developers and strategic consultants contribute high-quality tutorials, technical checklists, and business metrics to spark growth and optimize application development processes worldwide.
                                    </p>
                                </div>
                            </div>

                            {/* Share this article */}
                            <div className="flex flex-col md:flex-row gap-5 items-center justify-between p-7 rounded-3xl bg-slate-900/10 border border-slate-800/80 backdrop-blur-xl">
                                <span className="text-base font-extrabold text-neutral-300">Enjoyed this article? Share with your network:</span>
                                <div className="flex items-center gap-3">
                                    {/* Copy Link Button */}
                                    <button 
                                        onClick={handleCopyLink}
                                        title="Copy link"
                                        className="p-3 rounded-2xl bg-slate-900 hover:bg-indigo-600/20 border border-slate-800 text-white hover:text-indigo-400 hover:border-indigo-500/30 transition-all shadow-md flex items-center gap-2 text-xs font-black uppercase tracking-wider"
                                    >
                                        {copied ? <Check className="h-5 w-5 text-green-400 animate-bounce" /> : <LinkIcon className="h-5 w-5 text-indigo-400" />}
                                        <span>{copied ? "Copied!" : "Copy Link"}</span>
                                    </button>

                                    {/* LinkedIn Share */}
                                    <a 
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Share on LinkedIn"
                                        className="p-3 rounded-2xl bg-slate-900 hover:bg-blue-600/20 border border-slate-800 text-neutral-400 hover:text-blue-400 hover:border-blue-500/30 transition-all shadow-md"
                                    >
                                        <Linkedin className="h-5 w-5" />
                                    </a>

                                    {/* Twitter Share */}
                                    <a 
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Share on Twitter"
                                        className="p-3 rounded-2xl bg-slate-900 hover:bg-sky-600/20 border border-slate-800 text-neutral-400 hover:text-sky-400 hover:border-sky-500/30 transition-all shadow-md"
                                    >
                                        <Twitter className="h-5 w-5" />
                                    </a>

                                    {/* Facebook Share */}
                                    <a 
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Share on Facebook"
                                        className="p-3 rounded-2xl bg-slate-900 hover:bg-blue-800/20 border border-slate-800 text-neutral-400 hover:text-blue-500 hover:border-blue-600/30 transition-all shadow-md"
                                    >
                                        <Facebook className="h-5 w-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sticky Sidebar Column */}
                    <div className="lg:col-span-4 lg:pl-6">
                        <div className="sticky top-28 space-y-10">
                            {/* Table of Contents Widget */}
                            {toc.length > 0 && (
                                <div className="bg-slate-900/20 border border-slate-800/80 rounded-[2.5rem] p-8 backdrop-blur-md hidden lg:block">
                                    <h3 className="text-xs font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                                        <span className="w-1 h-5 bg-indigo-500 rounded-full" />
                                        Outline
                                    </h3>
                                    
                                    <div className="relative pl-4 border-l border-slate-800">
                                        <nav className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-none">
                                            {toc.map((item) => {
                                                const isActive = activeId === item.id;
                                                return (
                                                    <a
                                                        key={item.id}
                                                        href={`#${item.id}`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            document.getElementById(item.id)?.scrollIntoView({
                                                                behavior: "smooth"
                                                            });
                                                            setActiveId(item.id);
                                                        }}
                                                        className={`block text-sm leading-snug transition-all duration-300 font-bold relative -left-[17px] pl-[16px] ${
                                                            isActive
                                                                ? "text-indigo-400 border-l-2 border-indigo-500 font-extrabold scale-102"
                                                                : "text-neutral-400 hover:text-white border-l-2 border-transparent"
                                                        }`}
                                                    >
                                                        {item.text}
                                                    </a>
                                                );
                                            })}
                                        </nav>
                                    </div>
                                </div>
                            )}

                            {/* Recent Articles Widget */}
                            <div className="bg-slate-900/20 border border-slate-800/80 rounded-[2.5rem] p-8 backdrop-blur-md">
                                <h3 className="text-xs font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                                    <TrendingUp className="h-5 w-5 text-indigo-400" />
                                    Recent Stories
                                </h3>
                                <div className="space-y-6">
                                    {recentBlogs.length > 0 ? (
                                        recentBlogs.map((rb) => (
                                            <Link 
                                                to={`/blog/${rb.slug}`} 
                                                key={rb.id} 
                                                className="group flex gap-4 pb-5 border-b border-slate-800/60 last:border-0 last:pb-0"
                                            >
                                                {/* Mini Thumbnail */}
                                                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800/60">
                                                    {rb.image_url ? (
                                                        <img src={rb.image_url} alt={rb.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-indigo-400 bg-slate-900">
                                                            <BookOpen className="h-6 w-6 opacity-30 animate-pulse" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="min-w-0 flex flex-col justify-center">
                                                    <h4 className="text-sm font-extrabold text-white group-hover:text-indigo-400 transition-colors duration-300 line-clamp-2 leading-snug">
                                                        {rb.title}
                                                    </h4>
                                                    <span className="text-[11px] text-neutral-500 font-bold uppercase tracking-wider mt-2 flex items-center gap-1">
                                                        <Calendar className="h-3.5 w-3.5 text-indigo-400/80" />
                                                        {new Date(rb.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-neutral-500 text-sm">No recent articles found.</p>
                                    )}
                                </div>
                            </div>

                            {/* Newsletter signup widget */}
                            <div className="bg-gradient-to-b from-indigo-950/20 to-slate-950/40 border border-indigo-500/20 rounded-[2.5rem] p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                                <Mail className="h-9 w-9 text-indigo-400 mb-5 stroke-[1.5]" />
                                <h3 className="text-lg font-black text-white mb-2">Subscribe to newsletter</h3>
                                <p className="text-neutral-400 text-xs leading-relaxed mb-6 font-semibold">
                                    Get hand-crafted SEO blueprints, programming paradigms, and WebnexFusion release logs delivered directly to your inbox.
                                </p>
                                
                                {subscribed ? (
                                    <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black rounded-2xl flex items-center gap-2">
                                        <Check className="h-5 w-5 shrink-0" />
                                        <span>Thanks for subscribing!</span>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubscribe} className="space-y-4">
                                        <input 
                                            type="email" 
                                            required
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
                                            placeholder="Enter your professional email" 
                                            className="w-full px-4 py-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 transition-colors"
                                        />
                                        <button 
                                            type="submit" 
                                            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-indigo-500/10"
                                        >
                                            Subscribe
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Bottom Call to Action */}
                            <div className="bg-gradient-to-br from-indigo-900/35 to-violet-900/35 border border-indigo-500/20 rounded-[2.5rem] p-8 text-center backdrop-blur-md relative overflow-hidden">
                                <h3 className="text-xl font-black text-white mb-3 leading-tight">Transform your digital presence</h3>
                                <p className="text-neutral-350 text-xs leading-relaxed mb-6 font-semibold">
                                    Discuss how WebnexFusion can engineer your enterprise application or scale your brand online.
                                </p>
                                <Link to="/contact" className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-white hover:bg-indigo-100 text-slate-950 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-indigo-500/10 group/cta">
                                    <span>Get in Touch</span>
                                    <ArrowUpRight className="h-4.5 w-4.5 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
