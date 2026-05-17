import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Save, Image as ImageIcon, UploadCloud, Tag, User, AlignLeft, FileText, ArrowLeft, Search, Link as LinkIcon, Key, Type, X, CheckCircle, AlertTriangle, Info } from "lucide-react";
import toast from 'react-hot-toast';
import API_BASE_URL from "../../../config/api";
import Loader from "../../Loader";
import { Link } from "react-router-dom";

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
    
    // SEO Fields & Tags
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [slug, setSlug] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    
    // Focus Keywords Array
    const [focusKeywords, setFocusKeywords] = useState<string[]>([]);
    const [keywordInput, setKeywordInput] = useState("");

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
                        setTags(blog.tags || []);
                        
                        setSlug(blog.slug || "");
                        setMetaTitle(blog.meta_title || "");
                        setMetaDescription(blog.meta_description || "");
                        
                        const kw = blog.focus_keyword ? blog.focus_keyword.split(",").map((k: string) => k.trim()).filter((k: string) => k) : [];
                        setFocusKeywords(kw);
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

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = tagInput.trim();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setTagInput("");
        } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
            const newTags = [...tags];
            newTags.pop();
            setTags(newTags);
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newKeyword = keywordInput.trim();
            if (newKeyword && !focusKeywords.includes(newKeyword)) {
                setFocusKeywords([...focusKeywords, newKeyword]);
            }
            setKeywordInput("");
        } else if (e.key === 'Backspace' && !keywordInput && focusKeywords.length > 0) {
            const newKws = [...focusKeywords];
            newKws.pop();
            setFocusKeywords(newKws);
        }
    };

    const removeKeyword = (kwToRemove: string) => {
        setFocusKeywords(focusKeywords.filter(kw => kw !== kwToRemove));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadToast = toast.loading('Uploading image...');
        const formData = new FormData();
        formData.append('image', file);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/upload.php`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            
            let result;
            try {
                result = await response.json();
            } catch (err) {
                throw new Error('Server returned invalid response');
            }
            
            if (!response.ok) {
                throw new Error(result.message || 'Upload failed');
            }

            setImageUrl(result.data.imageUrl);
            toast.success('Image uploaded successfully', { id: uploadToast });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error uploading image';
            toast.error(message, { id: uploadToast });
        } finally {
            e.target.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!title || !content) {
            toast.error('Title and content are required');
            setLoading(false);
            return;
        }

        const blogData = {
            title,
            description,
            content,
            author,
            image_url: imageUrl,
            tags: tags,
            slug,
            meta_title: metaTitle,
            meta_description: metaDescription,
            focus_keyword: focusKeywords.join(', ')
        };

        const saveToast = toast.loading(isEditing ? 'Updating blog...' : 'Creating blog...');
        try {
            const url = isEditing ? `${API_BASE_URL}/api/blogs/${id}` : `${API_BASE_URL}/api/blogs`;
            const method = isEditing ? 'PUT' : 'POST';

            const token = localStorage.getItem('token');
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
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

    // SEO Analysis Logic
    const seoAnalysis = useMemo(() => {
        let score = 0;
        const maxScore = 100;
        const checks = [];

        const targetTitle = metaTitle || title;
        const targetDesc = metaDescription || description;
        
        // 1. Title Length (Optimal: 40-60 chars) - 20 pts
        if (targetTitle.length > 0) {
            if (targetTitle.length >= 40 && targetTitle.length <= 60) {
                score += 20;
                checks.push({ type: 'success', text: 'Title length is optimal.' });
            } else {
                score += 10;
                checks.push({ type: 'warning', text: 'Title length should be between 40-60 characters.' });
            }
        } else {
            checks.push({ type: 'error', text: 'Missing title.' });
        }

        // 2. Meta Description Length (Optimal: 120-160 chars) - 20 pts
        if (targetDesc.length > 0) {
            if (targetDesc.length >= 120 && targetDesc.length <= 160) {
                score += 20;
                checks.push({ type: 'success', text: 'Meta description length is optimal.' });
            } else {
                score += 10;
                checks.push({ type: 'warning', text: 'Meta description should be between 120-160 characters.' });
            }
        } else {
            checks.push({ type: 'error', text: 'Missing meta description.' });
        }

        // 3. Content Length (Optimal: > 300 words) - 20 pts
        const wordCount = content.replace(/<[^>]*>?/gm, '').split(/\s+/).filter(w => w.length > 0).length;
        if (wordCount >= 300) {
            score += 20;
            checks.push({ type: 'success', text: `Content length is good (${wordCount} words).` });
        } else if (wordCount > 0) {
            score += 10;
            checks.push({ type: 'warning', text: `Content is too short (${wordCount} words). Aim for 300+ words.` });
        } else {
            checks.push({ type: 'error', text: 'Content is empty.' });
        }

        // 4. Focus Keywords Usage - 25 pts
        if (focusKeywords.length > 0) {
            let keywordScore = 0;
            const kwChecks = [];
            const primaryKw = focusKeywords[0].toLowerCase();
            
            if (targetTitle.toLowerCase().includes(primaryKw)) {
                keywordScore += 10;
                kwChecks.push('Title');
            }
            if (targetDesc.toLowerCase().includes(primaryKw)) {
                keywordScore += 5;
                kwChecks.push('Description');
            }
            if (content.toLowerCase().includes(primaryKw)) {
                keywordScore += 10;
                kwChecks.push('Content');
            }

            score += keywordScore;
            
            if (keywordScore === 25) {
                checks.push({ type: 'success', text: 'Focus keyword found in Title, Description, and Content.' });
            } else if (keywordScore > 0) {
                checks.push({ type: 'warning', text: `Focus keyword found in: ${kwChecks.join(', ')}. Try to include it everywhere.` });
            } else {
                checks.push({ type: 'error', text: 'Focus keyword not found in Title, Description, or Content.' });
            }
        } else {
            checks.push({ type: 'error', text: 'Add at least one focus keyword to analyze keyword density.' });
        }

        // 5. Image Presence - 15 pts
        if (imageUrl) {
            score += 15;
            checks.push({ type: 'success', text: 'Featured image is set.' });
        } else {
            checks.push({ type: 'error', text: 'Missing featured image.' });
        }

        let color = 'text-red-500';
        let bgScore = 'bg-red-500';
        if (score >= 80) { color = 'text-green-500'; bgScore = 'bg-green-500'; }
        else if (score >= 50) { color = 'text-yellow-500'; bgScore = 'bg-yellow-500'; }

        return { score, color, bgScore, checks };
    }, [title, metaTitle, description, metaDescription, content, focusKeywords, imageUrl]);

    const inputClasses = `w-full px-4 py-2.5 rounded-lg outline-none transition font-medium ${isDark
        ? 'bg-[#0B1120] border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder:text-neutral-600'
        : 'bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-slate-900 placeholder:text-slate-400'
        }`;

    const labelClasses = `text-sm font-semibold mb-1.5 flex items-center gap-2 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`;
    const cardClasses = `p-6 rounded-xl border shadow-sm ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`;

    return (
        <div className={`max-w-7xl mx-auto ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {loading && <Loader fullScreen />}
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link to="/admin" className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}>
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">
                            {isEditing ? "Edit Blog Post" : "Create New Post"}
                        </h1>
                        <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                            {isEditing ? "Update your article content and details." : "Draft a new professional article for your audience."}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-500/20"
                >
                    <Save className="h-4 w-4" />
                    {loading ? "Saving..." : (isEditing ? "Update Post" : "Publish Post")}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg mb-6 flex items-center gap-2">
                    <span className="font-medium">Error:</span> {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className={cardClasses}>
                        <div className="space-y-6">
                            <div>
                                <label className={labelClasses}><FileText className="h-4 w-4 text-indigo-400"/> Article Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`${inputClasses} text-lg`}
                                    placeholder="Enter a captivating title..."
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClasses}><AlignLeft className="h-4 w-4 text-indigo-400"/> Summary Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className={`${inputClasses} h-24 resize-none leading-relaxed`}
                                    placeholder="A brief summary for UI cards (not SEO meta)..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={labelClasses}>Article Content</label>
                                <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                                    <ReactQuill
                                        theme="snow"
                                        value={content}
                                        onChange={setContent}
                                        className={`h-[500px] ${isDark ? 'bg-[#0B1120] text-white quill-dark' : 'bg-slate-50 text-black'}`}
                                        modules={{
                                            toolbar: [
                                                [{ 'header': [1, 2, 3, false] }],
                                                ['bold', 'italic', 'underline', 'strike'],
                                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                                ['link', 'image', 'blockquote', 'code-block'],
                                                ['clean']
                                            ],
                                        }}
                                    />
                                </div>
                                {/* Keep extra space for quill toolbar overlap */}
                                <div className="h-12"></div>
                            </div>
                        </div>
                    </div>

                    {/* SEO Settings Card */}
                    <div className={cardClasses}>
                        <h3 className={`font-semibold text-lg mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                            <Search className="h-5 w-5 text-indigo-400" />
                            Search Engine Optimization (SEO)
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <label className={labelClasses}><LinkIcon className="h-4 w-4 text-indigo-400"/> Permalink (Slug)</label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className={inputClasses}
                                    placeholder="Leave blank to auto-generate"
                                />
                                <p className="text-xs text-neutral-500 mt-1.5">Custom URL slug (e.g. 'my-awesome-post').</p>
                            </div>

                            <div>
                                <label className={labelClasses}><Type className="h-4 w-4 text-indigo-400"/> Meta Title</label>
                                <input
                                    type="text"
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                    className={inputClasses}
                                    placeholder="SEO Title (50-60 chars)"
                                    maxLength={60}
                                />
                                <div className="flex justify-between items-center mt-1.5">
                                    <p className="text-xs text-neutral-500">Title for search results.</p>
                                    <span className={`text-xs font-medium ${metaTitle.length > 60 || metaTitle.length < 40 && metaTitle.length > 0 ? 'text-yellow-500' : metaTitle.length >= 40 ? 'text-green-500' : 'text-neutral-500'}`}>{metaTitle.length}/60</span>
                                </div>
                            </div>

                            <div>
                                <label className={labelClasses}><AlignLeft className="h-4 w-4 text-indigo-400"/> Meta Description</label>
                                <textarea
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    className={`${inputClasses} h-24 resize-none`}
                                    placeholder="SEO description (150-160 chars)"
                                    maxLength={160}
                                />
                                <div className="flex justify-between items-center mt-1.5">
                                    <p className="text-xs text-neutral-500">Description for search results.</p>
                                    <span className={`text-xs font-medium ${metaDescription.length > 160 || metaDescription.length < 120 && metaDescription.length > 0 ? 'text-yellow-500' : metaDescription.length >= 120 ? 'text-green-500' : 'text-neutral-500'}`}>{metaDescription.length}/160</span>
                                </div>
                            </div>

                            <div>
                                <label className={labelClasses}><Key className="h-4 w-4 text-indigo-400"/> Focus Keywords</label>
                                <div className={`flex flex-wrap items-center gap-2 p-2 rounded-lg transition min-h-[44px] ${isDark
                                    ? 'bg-[#0B1120] border border-white/10 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 text-white'
                                    : 'bg-slate-50 border border-slate-200 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 text-slate-900'
                                    }`}>
                                    {focusKeywords.map((kw, index) => (
                                        <span key={index} className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
                                            {kw}
                                            <button type="button" onClick={() => removeKeyword(kw)} className={`rounded-full p-0.5 hover:bg-black/10 transition-colors`}>
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={keywordInput}
                                        onChange={(e) => setKeywordInput(e.target.value)}
                                        onKeyDown={handleKeywordKeyDown}
                                        className={`flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm p-1 ${isDark ? 'text-white placeholder:text-neutral-600' : 'text-slate-900 placeholder:text-slate-400'}`}
                                        placeholder={focusKeywords.length === 0 ? "Type keyword & press Enter" : ""}
                                    />
                                </div>
                                <p className="text-xs text-neutral-500 mt-1.5">First keyword is considered the primary focus keyword.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* SEO Score Display - Now Sticky in Sidebar */}
                    <div className={`${cardClasses} sticky top-24`}>
                        <div className="text-center mb-6">
                            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>SEO Score</h4>
                            <div className="relative inline-flex items-center justify-center">
                                <svg className="w-32 h-32 transform -rotate-90">
                                    <circle cx="64" cy="64" r="56" className={`stroke-current ${isDark ? 'text-white/10' : 'text-slate-200'}`} strokeWidth="12" fill="transparent" />
                                    <circle cx="64" cy="64" r="56" className={`stroke-current ${seoAnalysis.color} transition-all duration-1000 ease-out`} strokeWidth="12" fill="transparent" strokeDasharray="351.858" strokeDashoffset={351.858 - (351.858 * seoAnalysis.score) / 100} strokeLinecap="round" />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center">
                                    <span className={`text-3xl font-bold ${seoAnalysis.color}`}>{seoAnalysis.score}</span>
                                    <span className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>/ 100</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>SEO Analysis</h4>
                            {seoAnalysis.checks.map((check, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                    {check.type === 'success' && <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-green-500" />}
                                    {check.type === 'warning' && <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-yellow-500" />}
                                    {check.type === 'error' && <Info className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />}
                                    <span className={isDark ? 'text-neutral-300' : 'text-slate-600'}>{check.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cardClasses}>
                        <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                            <ImageIcon className="h-5 w-5 text-indigo-400" />
                            Featured Image
                        </h3>
                        
                        <div className="space-y-4">
                            {imageUrl ? (
                                <div className="relative group rounded-xl overflow-hidden border border-white/10 aspect-video bg-neutral-900">
                                    <img src={imageUrl} alt="Featured" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <label className="cursor-pointer px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-neutral-200 transition">
                                            Change Image
                                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <label className={`cursor-pointer flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed transition-all ${isDark ? 'border-white/20 hover:border-indigo-500 hover:bg-white/5' : 'border-slate-300 hover:border-indigo-500 hover:bg-slate-50'}`}>
                                    <UploadCloud className={`h-10 w-10 mb-3 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`} />
                                    <span className={`text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Click to upload image</span>
                                    <span className="text-xs text-neutral-500 mt-1">PNG, JPG, WEBP up to 5MB</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                </label>
                            )}

                            <div>
                                <label className={`text-xs font-medium mb-1 block ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Or paste URL</label>
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className={inputClasses}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cardClasses}>
                        <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                            <Tag className="h-5 w-5 text-indigo-400" />
                            Publishing Details
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className={labelClasses}><User className="h-4 w-4 text-indigo-400"/> Author</label>
                                <input
                                    type="text"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className={inputClasses}
                                />
                            </div>

                            <div>
                                <label className={labelClasses}><Tag className="h-4 w-4 text-indigo-400"/> Tags</label>
                                <div className={`flex flex-wrap items-center gap-2 p-2 rounded-lg transition min-h-[44px] ${isDark
                                    ? 'bg-[#0B1120] border border-white/10 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 text-white'
                                    : 'bg-slate-50 border border-slate-200 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 text-slate-900'
                                    }`}>
                                    {tags.map((tag, index) => (
                                        <span key={index} className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                                            {tag}
                                            <button type="button" onClick={() => removeTag(tag)} className={`rounded-full p-0.5 hover:bg-black/10 transition-colors`}>
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        className={`flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm p-1 ${isDark ? 'text-white placeholder:text-neutral-600' : 'text-slate-900 placeholder:text-slate-400'}`}
                                        placeholder={tags.length === 0 ? "Type and press Enter..." : ""}
                                    />
                                </div>
                                <p className="text-xs text-neutral-500 mt-1.5">Press Enter or comma to add a tag.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Dark mode styles for ReactQuill */}
            {isDark && (
                <style>{`
                    .quill-dark .ql-toolbar {
                        border-color: rgba(255,255,255,0.1);
                        background-color: rgba(255,255,255,0.02);
                    }
                    .quill-dark .ql-container {
                        border-color: rgba(255,255,255,0.1);
                    }
                    .quill-dark .ql-stroke {
                        stroke: #cbd5e1;
                    }
                    .quill-dark .ql-fill {
                        fill: #cbd5e1;
                    }
                    .quill-dark .ql-picker {
                        color: #cbd5e1;
                    }
                    .quill-dark .ql-snow .ql-picker.ql-header .ql-picker-label::before {
                        color: #cbd5e1;
                    }
                `}</style>
            )}
        </div>
    );
}
