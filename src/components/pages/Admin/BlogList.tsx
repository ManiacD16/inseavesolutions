import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Edit, Trash2, Plus, Eye, Calendar, User, FileText } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import API_BASE_URL from "../../../config/api";
import toast from 'react-hot-toast';
import Loader from "../../Loader";

interface BlogPost {
    id: number;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
    author_name?: string;
}

interface AdminContextType {
    isDark: boolean;
}

export default function BlogList() {
    const { token } = useAuth();
    const { isDark } = useOutletContext<AdminContextType>();
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/blogs`);
            if (!response.ok) throw new Error('Failed to fetch blogs');
            const data = await response.json();
            setBlogs(data);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An error occurred';
            setError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;

        const deleteToast = toast.loading('Deleting blog...');
        try {
            const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setBlogs(blogs.filter(blog => blog.id !== id));
                toast.success('Blog deleted successfully', { id: deleteToast });
            } else {
                throw new Error('Failed to delete blog');
            }
        } catch (err) {
            toast.error('Error deleting blog', { id: deleteToast });
        }
    };

    if (isLoading) return <div className="p-8"><Loader /></div>;
    if (error) return <div className="p-8 text-center text-red-400">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Manage Blogs</h2>
                <Link
                    to="/admin/blogs/new"
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Create New
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog.id} className={`group border rounded-xl overflow-hidden shadow-lg transition-all hover:shadow-xl hover:translate-y-[-2px] ${isDark ? 'bg-[#0B1120] border-white/10' : 'bg-white border-slate-200'}`}>
                        <div className="aspect-video relative overflow-hidden bg-neutral-800">
                            {blog.image_url ? (
                                <img
                                    src={blog.image_url}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-500">
                                    <FileText className="h-12 w-12" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />

                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link
                                    to={`/blog/${blog.id}`}
                                    target="_blank"
                                    className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-white transition-colors"
                                    title="View Live"
                                >
                                    <Eye className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <h3 className={`font-semibold text-lg line-clamp-1 group-hover:text-indigo-400 transition-colors ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                    {blog.title}
                                </h3>
                                <div className="flex items-center gap-4 mt-3 text-xs text-neutral-500">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                                    </div>
                                    {blog.author_name && (
                                        <div className="flex items-center gap-1.5">
                                            <User className="h-3.5 w-3.5" />
                                            <span>{blog.author_name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <p className={`text-sm line-clamp-2 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                                {blog.description}
                            </p>

                            <div className={`pt-4 border-t flex gap-3 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                                <Link
                                    to={`/admin/blogs/edit/${blog.id}`}
                                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                                >
                                    <Edit className="h-4 w-4" />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 text-sm font-medium transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {blogs.length === 0 && !isLoading && (
                <div className={`text-center py-12 border-2 border-dashed rounded-xl ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-white/5 text-neutral-400' : 'bg-slate-100 text-neutral-400'}`}>
                        <FileText className="h-8 w-8" />
                    </div>
                    <h3 className={`text-lg font-medium mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>No blogs found</h3>
                    <p className="text-neutral-500 mb-6">Get started by creating your first blog post.</p>
                    <Link
                        to="/admin/blogs/new"
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
                    >
                        <Plus className="h-5 w-5" />
                        Create Blog
                    </Link>
                </div>
            )}
        </div>
    );
}
