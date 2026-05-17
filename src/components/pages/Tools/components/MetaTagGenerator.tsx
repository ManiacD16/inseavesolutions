import { useState, useEffect } from 'react';
import { Sliders, Copy, Check, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MetaTagGenerator() {
    const [title, setTitle] = useState('My Awesome Website');
    const [description, setDescription] = useState('A professional suite of developer and marketing online tools.');
    const [keywords, setKeywords] = useState('tools, utility, software');
    const [robotsIndex, setRobotsIndex] = useState('index');
    const [robotsFollow, setRobotsFollow] = useState('follow');
    const [author, setAuthor] = useState('WebnexFusion');
    const [copied, setCopied] = useState(false);
    const [metaCode, setMetaCode] = useState('');

    const generateCode = () => {
        const code = `<!-- HTML Meta Tags -->
<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />
<meta name="robots" content="${robotsIndex}, ${robotsFollow}" />
<meta name="author" content="${author}" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta charset="UTF-8" />`;
        setMetaCode(code);
    };

    useEffect(() => {
        generateCode();
    }, [title, description, keywords, robotsIndex, robotsFollow, author]);

    const handleCopy = () => {
        navigator.clipboard.writeText(metaCode);
        setCopied(true);
        toast.success('Meta tags copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">HTML Meta Tag Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Generate production-grade SEO meta tags for your website headers to optimize Google index crawling.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-4 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Site Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Meta Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono leading-relaxed"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Keywords (comma-separated)</label>
                        <input
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-neutral-400 uppercase">Robots Index</label>
                            <select
                                value={robotsIndex}
                                onChange={(e) => setRobotsIndex(e.target.value)}
                                className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 transition"
                            >
                                <option value="index">Index (Allowed)</option>
                                <option value="noindex">No-Index (Blocked)</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-neutral-400 uppercase">Robots Follow</label>
                            <select
                                value={robotsFollow}
                                onChange={(e) => setRobotsFollow(e.target.value)}
                                className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 transition"
                            >
                                <option value="follow">Follow links</option>
                                <option value="nofollow">No-Follow links</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>
                </div>

                {/* Output */}
                <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Generated Header Code:
                    </span>

                    <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-2xl space-y-4">
                        <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                            <Terminal className="h-4 w-4" /> Header XML tags
                        </span>
                        
                        <textarea
                            readOnly
                            value={metaCode}
                            rows={8}
                            className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-xs text-neutral-200 outline-none resize-none font-mono select-all leading-relaxed"
                        />

                        <button
                            onClick={handleCopy}
                            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                        >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Meta HTML Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
