import { useState, useEffect, useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Edit, Trash2, Plus, Eye, Calendar, User, FileText, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import API_BASE_URL from "../../../config/api";
import toast from 'react-hot-toast';
import Loader from "../../Loader";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    image_url: string | null;
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
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 10;

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/blogs`);
            if (!response.ok) throw new Error('Failed to fetch blogs');
            const result = await response.json();
            setBlogs(result.data || []);
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

    // Filtered blogs based on search query
    const filteredBlogs = useMemo(() => {
        return blogs.filter(blog => 
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (blog.author_name && blog.author_name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [blogs, searchQuery]);

    // Pagination logic
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Reset to page 1 when search query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    if (isLoading) return <div className="p-8"><Loader /></div>;
    if (error) return <div className="p-8 text-center text-red-400">{error}</div>;

    const thClasses = `px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-neutral-400 bg-[#0B1120] border-b border-white/10' : 'text-slate-500 bg-slate-50 border-b border-slate-200'}`;
    const tdClasses = `px-6 py-4 whitespace-nowrap border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Manage Blogs</h2>
                
                <div className="flex w-full sm:w-auto items-center gap-4">
                    <div className={`relative flex-1 sm:w-64`}>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className={`h-4 w-4 ${isDark ? 'text-neutral-400' : 'text-slate-400'}`} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm transition outline-none ${isDark 
                                ? 'bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:border-indigo-500' 
                                : 'bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'}`}
                        />
                    </div>
                    
                    <Link
                        to="/admin/blogs/new"
                        className="flex shrink-0 items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-lg shadow-indigo-500/20"
                    >
                        <Plus className="h-4 w-4" />
                        Create New
                    </Link>
                </div>
            </div>

            <div className={`rounded-xl overflow-hidden border shadow-sm ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className={thClasses}>Article</th>
                                <th className={thClasses}>Author</th>
                                <th className={thClasses}>Date Published</th>
                                <th className={thClasses}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
                            {paginatedBlogs.length > 0 ? (
                                paginatedBlogs.map((blog) => (
                                    <tr key={blog.id} className={`transition-colors ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'}`}>
                                        <td className={tdClasses}>
                                            <div className="flex items-center gap-4">
                                                <div className={`h-12 w-16 shrink-0 rounded-lg overflow-hidden border ${isDark ? 'bg-neutral-800 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                                                    {blog.image_url ? (
                                                        <img src={blog.image_url} alt={blog.title} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center">
                                                            <FileText className={`h-5 w-5 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0 max-w-xs sm:max-w-md lg:max-w-lg">
                                                    <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                                        {blog.title}
                                                    </p>
                                                    <p className={`text-xs truncate mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                                                        {blog.description || "No description provided"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={tdClasses}>
                                            <div className="flex items-center gap-2">
                                                <div className={`h-6 w-6 rounded-full flex items-center justify-center ${isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                                                    <User className="h-3 w-3" />
                                                </div>
                                                <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                                                    {blog.author_name || "Admin"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className={tdClasses}>
                                            <div className="flex items-center gap-2">
                                                <Calendar className={`h-4 w-4 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`} />
                                                <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                                                    {new Date(blog.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                        </td>
                                        <td className={tdClasses}>
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    to={`/blog/${blog.slug}`}
                                                    target="_blank"
                                                    title="View Publicly"
                                                    className={`p-1.5 rounded-md transition-colors ${isDark ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    to={`/admin/blogs/edit/${blog.id}`}
                                                    title="Edit Blog"
                                                    className={`p-1.5 rounded-md transition-colors ${isDark ? 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10' : 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50'}`}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(blog.id)}
                                                    title="Delete Blog"
                                                    className={`p-1.5 rounded-md transition-colors ${isDark ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'text-red-500 hover:text-red-600 hover:bg-red-50'}`}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <div className={`mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-3 ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                                            <Search className={`h-5 w-5 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`} />
                                        </div>
                                        <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>No blogs found</h3>
                                        <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                                            {searchQuery ? `No results match "${searchQuery}"` : "Get started by creating a new blog post."}
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                    <div className={`px-6 py-4 border-t flex items-center justify-between ${isDark ? 'border-white/10 bg-[#0B1120]' : 'border-slate-200 bg-slate-50'}`}>
                        <div className={`text-sm ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                            Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredBlogs.length)}</span> of <span className="font-medium">{filteredBlogs.length}</span> results
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`p-1.5 rounded-md transition-colors ${isDark ? 'hover:bg-white/10 text-white disabled:opacity-30' : 'hover:bg-slate-200 text-slate-700 disabled:opacity-30'}`}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <span className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`p-1.5 rounded-md transition-colors ${isDark ? 'hover:bg-white/10 text-white disabled:opacity-30' : 'hover:bg-slate-200 text-slate-700 disabled:opacity-30'}`}
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
