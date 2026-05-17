import { useState } from 'react';
import { Sliders, Copy, Check, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TwitterCardPreview() {
    const [title, setTitle] = useState('Workspace Automation and Analytics Suite');
    const [description, setDescription] = useState('Learn how to configure, automate, and deploy enterprise productivity tools.');
    const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80');
    const [siteHandle, setSiteHandle] = useState('@webnexfusion');
    const [copied, setCopied] = useState(false);

    const twitterTags = `<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="${siteHandle}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${imageUrl}" />`;

    const handleCopy = () => {
        navigator.clipboard.writeText(twitterTags);
        setCopied(true);
        toast.success('Twitter card meta tags copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">Twitter Card Preview & Tag Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Visualize exactly how your URL link preview cards will display inside the X / Twitter feed when shared.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-4 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Card Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Card Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono leading-relaxed"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Twitter Handle (site)</label>
                        <input
                            type="text"
                            value={siteHandle}
                            onChange={(e) => setSiteHandle(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Large Image Preview URL</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Live Visual Card preview */}
                    <div className="space-y-3">
                        <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase flex items-center gap-1.5">
                            <Eye className="h-4 w-4 text-indigo-400" /> Interactive X Feed Preview
                        </span>
                        
                        <div className="max-w-[500px] bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl font-sans">
                            {/* Card Image */}
                            <div className="h-[250px] overflow-hidden bg-neutral-900 border-b border-white/10 relative">
                                <img
                                    src={imageUrl}
                                    alt="Twitter Large Card Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback if user image fails to load
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';
                                    }}
                                />
                            </div>

                            {/* Card copy */}
                            <div className="p-4 space-y-1.5 bg-neutral-950">
                                <p className="text-[10px] text-neutral-500 font-mono tracking-wide uppercase">
                                    example.com
                                </p>
                                <h4 className="text-sm font-semibold text-white truncate leading-relaxed">
                                    {title}
                                </h4>
                                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Meta tag copy block */}
                    <div className="space-y-3">
                        <textarea
                            readOnly
                            value={twitterTags}
                            rows={5}
                            className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-xs text-neutral-200 outline-none resize-none font-mono select-all leading-relaxed"
                        />

                        <button
                            onClick={handleCopy}
                            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                        >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Twitter Card Tags
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
