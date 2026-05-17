import { useState, useEffect } from 'react';
import { Sliders, Copy, Check, Info } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SlugGenerator() {
    const [text, setText] = useState('10 Amazing React JS Hacks for Beginners 🔥!');
    const [removeStopwords, setRemoveStopwords] = useState(true);
    const [removeEmojis, setRemoveEmojis] = useState(true);
    const [slug, setSlug] = useState('');
    const [copied, setCopied] = useState(false);

    const stopwords = ['a', 'an', 'the', 'for', 'with', 'is', 'at', 'to', 'in', 'on', 'of', 'and', 'or', 'but', 'by', 'from'];

    const generateSlug = () => {
        if (!text.trim()) {
            setSlug('');
            return;
        }

        let processed = text.trim();

        // 1. Remove emojis if enabled
        if (removeEmojis) {
            const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\p{Emoji_Presentation}/gu;
            processed = processed.replace(emojiRegex, '');
        }

        // 2. Convert to lowercase and split into words
        processed = processed.toLowerCase();
        let words = processed.match(/[a-z0-9]+/g) || [];

        // 3. Remove stopwords if enabled
        if (removeStopwords) {
            words = words.filter(word => !stopwords.includes(word));
        }

        // 4. Join with hyphens
        const resultSlug = words.join('-');
        setSlug(resultSlug);
    };

    useEffect(() => {
        generateSlug();
    }, [text, removeStopwords, removeEmojis]);

    const handleCopy = () => {
        if (!slug) return;
        navigator.clipboard.writeText(slug);
        setCopied(true);
        toast.success('Slug copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">SEO URL Slug Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Convert messy article headers and page titles into clean, lowercase, URL-friendly slug links.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-6 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Text Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Page Title / String</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={3}
                            placeholder="Type title here..."
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500 transition leading-relaxed resize-none font-mono"
                        />
                    </div>

                    {/* Toggles */}
                    <div className="space-y-3 pt-2">
                        <label className="flex items-center gap-3 cursor-pointer text-xs text-neutral-300">
                            <input
                                type="checkbox"
                                checked={removeStopwords}
                                onChange={(e) => setRemoveStopwords(e.target.checked)}
                                className="w-4 h-4 rounded bg-black border border-white/10 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>Remove English stopwords (for, with, standard...)</span>
                        </label>
                        
                        <label className="flex items-center gap-3 cursor-pointer text-xs text-neutral-300">
                            <input
                                type="checkbox"
                                checked={removeEmojis}
                                onChange={(e) => setRemoveEmojis(e.target.checked)}
                                className="w-4 h-4 rounded bg-black border border-white/10 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>Strip Emojis and Special Characters</span>
                        </label>
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-6 space-y-5">
                    {slug && (
                        <div className="space-y-4">
                            <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-2xl space-y-3">
                                <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                                    <Info className="h-4 w-4" /> Clean URL Slug
                                </span>
                                
                                <input
                                    type="text"
                                    readOnly
                                    value={slug}
                                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-xs text-neutral-200 outline-none font-mono select-all"
                                />

                                <button
                                    onClick={handleCopy}
                                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                                >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Slug Link
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
