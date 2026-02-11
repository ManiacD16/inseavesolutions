import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ArrowLeft, Save } from "lucide-react";

export default function BlogEditor() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
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
            // Fetch existing blog data
            const fetchBlog = async () => {
                try {
                    // Since we need ID to fetch for editing properly (slug might change), 
                    // but our public API uses slug. 
                    // However, the dashboard logic passes ID. Ideally we need an endpoint to get by ID or just filter from all.
                    // For now, let's assume we can fetch by slug if we had it, or we need to add GET /api/blogs/id/:id
                    // Or just fetch all and find (inefficient but works for now)
                    const response = await fetch('/api/blogs');
                    const data = await response.json();
                    const blog = data.find((b: any) => b.id === parseInt(id));

                    if (blog) {
                        setTitle(blog.title);
                        setDescription(blog.description || "");
                        setContent(blog.content);
                        setAuthor(blog.author || "");
                        setImageUrl(blog.image_url || "");
                        setTags(blog.tags ? blog.tags.join(", ") : "");
                    } else {
                        setError("Blog not found");
                    }
                } catch (err) {
                    console.error(err);
                    setError("Failed to load blog");
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

        try {
            const url = isEditing ? `/api/blogs/${id}` : '/api/blogs';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to save blog");
            }

            navigate('/admin');
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">
                    {isEditing ? "Edit Blog" : "Create New Blog"}
                </h1>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-300 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white"
                                placeholder="Blog Title"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-300">Author</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white"
                                placeholder="Author Name"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Description (Summary)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white h-24 resize-none"
                            placeholder="Brief description for SEO and cards..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Featured Image</label>
                        <div className="flex gap-4 items-center">
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white"
                                placeholder="Image URL or upload file"
                            />
                            <label className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition">
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

                                        try {
                                            setLoading(true);
                                            const res = await fetch('/api/upload', {
                                                method: 'POST',
                                                body: formData
                                            });
                                            if (!res.ok) throw new Error('Upload failed');
                                            const data = await res.json();
                                            setImageUrl(data.imageUrl);
                                        } catch (err) {
                                            console.error(err);
                                            setError('Image upload failed');
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                />
                            </label>
                        </div>
                        {imageUrl && (
                            <img src={imageUrl} alt="Preview" className="h-32 w-auto object-cover rounded-lg border border-white/10 mt-2" />
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Tags (comma separated)</label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white"
                            placeholder="Tech, AI, Business"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Content</label>
                        <div className="bg-white text-black rounded-lg overflow-hidden">
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                className="h-64 mb-12" // mb-12 to make space for toolbar if needed or simple spacing
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                    >
                        <Save className="h-4 w-4" />
                        {loading ? "Saving..." : "Save Blog"}
                    </button>
                </form>
            </div>
        </div >
    );
}
