import { useState, useEffect } from 'react';
import { Sliders, Copy, Check, Youtube } from 'lucide-react';
import toast from 'react-hot-toast';

export default function YoutubeTagGenerator() {
    const [topic, setTopic] = useState('React JS Tutorial');
    const [copied, setCopied] = useState(false);
    const [tags, setTags] = useState<string[]>([]);

    const generateTags = () => {
        if (!topic.trim()) {
            setTags([]);
            return;
        }

        const raw = topic.trim();
        const lower = raw.toLowerCase();

        // Create a dynamic relevant tags list based on the keywords parsed
        const list = [
            raw,
            `${raw} tutorial`,
            `learn ${lower}`,
            `${lower} for beginners`,
            `best ${lower} video`,
            `how to use ${lower}`,
            `advanced ${lower}`,
            `${lower} guide`,
            `${lower} tips`,
            `${lower} tricks`,
            `programming`,
            `coding`,
            `development`,
            `course`,
            `crash course`,
            `${lower} 2026`
        ];

        setTags(list);
    };

    useEffect(() => {
        generateTags();
    }, [topic]);

    const handleCopyAll = () => {
        if (tags.length === 0) return;
        const text = tags.join(', ');
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success('YouTube tags copied! Ready to paste in Studio.');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Youtube className="h-6 w-6 text-red-500" /> YouTube Tag Generator
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Generate search-targeted keyword tags to optimize your YouTube video visibility and rank higher in suggestions.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-4 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Video Topic / Main Keyword</label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g. React JS Tutorial"
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>
                </div>

                {/* Output */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                            Generated Video Keywords ({tags.length}):
                        </span>
                        {tags.length > 0 && (
                            <button
                                onClick={handleCopyAll}
                                className="py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                            >
                                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} Copy All Tags
                            </button>
                        )}
                    </div>

                    {tags.length === 0 ? (
                        <div className="text-center py-10 text-xs text-neutral-500">
                            Enter a topic to generate tags.
                        </div>
                    ) : (
                        <div className="bg-indigo-600/5 border border-indigo-500/20 p-5 rounded-2xl space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-lg text-xs text-neutral-200 font-semibold hover:border-indigo-500/50 hover:text-white transition duration-200 font-mono"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
