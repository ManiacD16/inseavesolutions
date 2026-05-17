import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, User, Share2, TrendingUp, ChevronRight } from "lucide-react";
import SEO from "../../components/SEO";
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
    meta_title: string | null;
    meta_description: string | null;
    focus_keyword: string | null;
    created_at: string;
}

export default function BlogDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogAndRecent = async () => {
            try {
                // Fetch the specific blog
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
                    // Filter out the current one and take top 4
                    let filtered = allBlogs.filter((b: Blog) => b.slug !== slug).slice(0, 4);
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

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-neutral-400">Loading article...</p>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white gap-4">
                <p className="text-xl text-red-400">{error || "Blog not found"}</p>
                <Link to="/blog" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Blog
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
        <div className="min-h-screen bg-[#020617] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <SEO 
                title={blog.meta_title || blog.title} 
                description={blog.meta_description || blog.description || blog.content.substring(0, 160).replace(/<[^>]*>?/gm, '')}
                canonicalUrl={`https://webnexfusion.com/blog/${blog.slug}`}
                image={blog.image_url || undefined}
                type="article"
                author={blog.author}
                keywords={keywords}
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                <article className="lg:col-span-2">
                    {/* Back Link */}
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-indigo-400 transition mb-8 group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Articles
                    </Link>

                    {/* Header */}
                    <header className="mb-12">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {blog.tags && Array.isArray(blog.tags) && blog.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-medium border border-indigo-500/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-neutral-400 text-sm pb-8">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {new Date(blog.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                {blog.author || "WebnexFusion Team"}
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {blog.image_url && (
                        <div className="mb-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 aspect-[21/9]">
                            <img 
                                src={blog.image_url} 
                                alt={blog.title} 
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div
                        className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-white prose-code:text-indigo-300 prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Share/Footer */}
                    <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
                        <p className="text-neutral-400 text-sm">
                            Share this article:
                        </p>
                        <div className="flex gap-4">
                            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition">
                                <Share2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </article>

                {/* Right Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-32">
                        {/* Recent Articles Widget */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-indigo-400" />
                                Recent Articles
                            </h3>
                            <div className="space-y-6">
                                {recentBlogs.length > 0 ? (
                                    recentBlogs.map((rb) => (
                                        <Link to={`/blog/${rb.slug}`} key={rb.id} className="group block border-b border-white/5 pb-6 last:border-0 last:pb-0">
                                            <h4 className="text-base font-medium text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                                                {rb.title}
                                            </h4>
                                            <div className="flex items-center gap-4 text-xs text-neutral-400">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {new Date(rb.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                </div>
                                                <span className="flex items-center gap-1 text-indigo-400/80 group-hover:text-indigo-400 font-medium">
                                                    Read <ChevronRight className="h-3.5 w-3.5" />
                                                </span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-neutral-500 text-sm">No recent articles found.</p>
                                )}
                            </div>
                        </div>

                        {/* CTA Widget */}
                        <div className="bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-indigo-500/20 rounded-2xl p-6 text-center">
                            <h3 className="text-lg font-bold text-white mb-3">Ready to transform your digital presence?</h3>
                            <p className="text-neutral-300 text-sm mb-6">Let's discuss how WebnexFusion can help you achieve your goals.</p>
                            <Link to="/contact" className="inline-block w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20">
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
