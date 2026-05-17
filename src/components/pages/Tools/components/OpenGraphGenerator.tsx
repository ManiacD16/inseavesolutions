import { useState, useEffect } from 'react';
import { Sliders, Copy, Check, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OpenGraphGenerator() {
    const [title, setTitle] = useState('My Awesome Page');
    const [description, setDescription] = useState('An outstanding digital marketing and developer web application.');
    const [url, setUrl] = useState('https://inseave.com/page');
    const [imageUrl, setImageUrl] = useState('https://inseave.com/assets/og-cover.png');
    const [type, setType] = useState('website');
    
    const [ogCode, setOgCode] = useState('');
    const [copied, setCopied] = useState(false);

    const generateCode = () => {
        const code = `<!-- Open Graph / Facebook Meta Tags -->
<meta property="og:type" content="${type}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${imageUrl}" />

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${imageUrl}" />`;
        
        setOgCode(code);
    };

    useEffect(() => {
        generateCode();
    }, [title, description, url, imageUrl, type]);

    const handleCopy = () => {
        navigator.clipboard.writeText(ogCode);
        setCopied(true);
        toast.success('Open Graph tags copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">Open Graph Meta Tag Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Generate rich media social previews for Facebook, LinkedIn, Slack, and Twitter shares.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-4 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Share Title (og:title)</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Share Description (og:description)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono leading-relaxed"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Page URL (og:url)</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Image URL (og:image)</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Page Type (og:type)</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="website">Website</option>
                            <option value="article">Article / Blog Post</option>
                            <option value="profile">Profile / CV</option>
                            <option value="book">Book / Product</option>
                        </select>
                    </div>
                </div>

                {/* Output */}
                <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Generated Header Code:
                    </span>

                    <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-2xl space-y-4">
                        <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                            <Terminal className="h-4 w-4" /> Header Markup
                        </span>
                        
                        <textarea
                            readOnly
                            value={ogCode}
                            rows={10}
                            className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-xs text-neutral-200 outline-none resize-none font-mono select-all leading-relaxed"
                        />

                        <button
                            onClick={handleCopy}
                            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                        >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Open Graph Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
