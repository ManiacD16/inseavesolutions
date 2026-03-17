import { useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Save } from "lucide-react";
import toast from 'react-hot-toast';
import API_BASE_URL from "../../../config/api";
import Loader from "../../Loader";

interface AdminContextType {
    isDark: boolean;
}

export default function BlogEditor() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isDark } = useOutletContext<AdminContextType>();
    const isEditing = !!id;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("WebnexFusion Team");
    const [imageUrl, setImageUrl] = useState("");
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isEditing) {
            const fetchBlog = async () => {
                try {
                    const response = await fetch(`${API_BASE_URL}/api/blogs`);
                    const result = await response.json();
                    const blog = (result.data || []).find((b: any) => b.id === parseInt(id));

                    if (blog) {
                        setTitle(blog.title);
                        setDescription(blog.description || "");
                        setContent(blog.content);
                        setAuthor(blog.author || "");
                        setImageUrl(blog.image_url || "");
                        setTags(blog.tags ? blog.tags.join(", ") : "");
                    } else {
                        const message = "Blog not found";
                        setError(message);
                        toast.error(message);
                    }
                } catch (err) {
                    const message = "Failed to load blog";
                    console.error(err);
                    setError(message);
                    toast.error(message);
                }
            };

            fetchBlog();
        }
    }, [id, isEditing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const blogData = {
            title,
            description,
            content,
            author,
            image_url: imageUrl,
            tags: tags.split(",").map(t => t.trim()).filter(t => t),
        };

        const saveToast = toast.loading(isEditing ? 'Updating blog...' : 'Creating blog...');
        try {
            const url = isEditing ? `${API_BASE_URL}/api/blogs/${id}` : `${API_BASE_URL}/api/blogs`;
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogData),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "Failed to save blog");
            }

            toast.success(isEditing ? 'Blog updated successfully!' : 'Blog created successfully!', { id: saveToast });
            navigate('/admin');
        } catch (err) {
            const message = err instanceof Error ? err.message : "An error occurred";
            setError(message);
            toast.error(message, { id: saveToast });
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = `w-full px-4 py-2 rounded-lg outline-none transition ${isDark
        ? 'bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder:text-neutral-500'
        : 'bg-white border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-slate-900 placeholder:text-slate-400'
        }`;

    const labelClasses = `text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-slate-700'}`;

    return (
        <div className={isDark ? 'text-white' : 'text-slate-900'}>
            {loading && <Loader fullScreen />}
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">
                    {isEditing ? "Edit Blog" : "Create New Blog"}
                </h1>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className={labelClasses}>Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={inputClasses}
                                placeholder="Blog Title"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className={labelClasses}>Author</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className={inputClasses}
                                placeholder="Author Name"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className={labelClasses}>Description (Summary)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`${inputClasses} h-24 resize-none`}
                            placeholder="Brief description for SEO and cards..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className={labelClasses}>Featured Image</label>
                        <div className="flex gap-4 items-center">
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className={`flex-1 ${inputClasses}`} // Apply same input classes
                                placeholder="Image URL or upload file"
                            />
                            <label className={`cursor-pointer px-4 py-2 rounded-lg transition ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}>
                                Upload
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        const formData = new FormData();
                                        formData.append('image', file);

                                        const uploadToast = toast.loading('Uploading image...');
                                        try {
                                            setLoading(true);
                                            const res = await fetch(`${API_BASE_URL}/api/upload`, {
                                                method: 'POST',
                                                body: formData
                                            });
                                            if (!res.ok) throw new Error('Upload failed');
                                            const result = await res.json();
                                            setImageUrl(result.data.imageUrl);
                                            toast.success('Image uploaded', { id: uploadToast });
                                        } catch (err) {
                                            console.error(err);
                                            setError('Image upload failed');
                                            toast.error('Image upload failed', { id: uploadToast });
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                />
                            </label>
                        </div>
                        {imageUrl && (
                            <img src={imageUrl} alt="Preview" className={`h-32 w-auto object-cover rounded-lg mt-2 ${isDark ? 'border border-white/10' : 'border border-slate-200'}`} />
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className={labelClasses}>Tags (comma separated)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className={inputClasses}
                            placeholder="Tech, AI, Business"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className={labelClasses}>Content</label>
                        <div className={`rounded-lg overflow-hidden ${isDark ? 'bg-white text-black' : 'bg-white border border-slate-200'}`}>
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                className="h-64 mb-12"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-8 shadow-lg shadow-indigo-500/20"
                    >
                        <Save className="h-4 w-4" />
                        {loading ? "Saving..." : "Save Blog"}
                    </button>
                </form>
            </div>
        </div >
    );
}
