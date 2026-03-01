import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, User, Share2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import API_BASE_URL from "../../config/api";

interface Blog {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string;
    author: string;
    tags: string[];
    image_url: string;
    created_at: string;
}

export default function BlogDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/blogs/${slug}`);
                if (!response.ok) {
                    throw new Error("Blog not found");
                }
                const data = await response.json();
                setBlog(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load blog");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchBlog();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
                Loading...
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

    return (
        <div className="min-h-screen bg-[#020617] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>{blog.title} - WebnexFusion</title>
                <meta name="description" content={blog.description} />
                <link rel="canonical" href={`https://webnexfusion.com/blog/${blog.slug}`} />
            </Helmet>

            <article className="max-w-4xl mx-auto">
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
                        {blog.tags && blog.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-6 text-neutral-400 text-sm border-b border-white/10 pb-8">
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

                {/* Featured Image (if any) */}
                {blog.image_url && (
                    <div className="mb-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-500/10">
                        <img
                            src={blog.image_url}
                            alt={blog.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                {/* dangerouslySetInnerHTML is used here assuming the content is sanitized HTML from the rich text editor */}
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
                        {/* Add share buttons/logic here */}
                        <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition">
                            <Share2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
}
