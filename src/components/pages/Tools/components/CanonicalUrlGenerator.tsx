import { useState, useEffect } from 'react';
import { Sliders, Copy, Check, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CanonicalUrlGenerator() {
    const [baseUrl, setBaseUrl] = useState('https://inseave.com');
    const [path, setPath] = useState('/resources/tools/');
    const [stripParams, setStripParams] = useState(true);
    const [copied, setCopied] = useState(false);
    const [canonicalTag, setCanonicalTag] = useState('');

    const generateTag = () => {
        if (!baseUrl.trim()) {
            setCanonicalTag('');
            return;
        }

        let base = baseUrl.trim();
        if (base.endsWith('/')) {
            base = base.slice(0, -1);
        }

        let child = path.trim();
        
        // Strip out analytics query parameters if enabled
        if (stripParams) {
            child = child.split(/[?#]/)[0];
        }

        if (!child.startsWith('/')) {
            child = '/' + child;
        }

        // Format to have standard clean canonical URL
        const absoluteUrl = base + child;
        setCanonicalTag(`<link rel="canonical" href="${absoluteUrl}" />`);
    };

    useEffect(() => {
        generateTag();
    }, [baseUrl, path, stripParams]);

    const handleCopy = () => {
        if (!canonicalTag) return;
        navigator.clipboard.writeText(canonicalTag);
        setCopied(true);
        toast.success('Canonical link tag copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">Canonical URL Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Generate standard canonical URL header tags to prevent Google indexing penalties for duplicate content issues.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-4 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Website Root Domain</label>
                        <input
                            type="text"
                            value={baseUrl}
                            onChange={(e) => setBaseUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Relative Path / URL Target</label>
                        <input
                            type="text"
                            value={path}
                            onChange={(e) => setPath(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer text-xs text-neutral-300 pt-2">
                        <input
                            type="checkbox"
                            checked={stripParams}
                            onChange={(e) => setStripParams(e.target.checked)}
                            className="w-4 h-4 rounded bg-black border border-white/10 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Strip query parameters (utm_source, fbclid...)</span>
                    </label>
                </div>

                {/* Output */}
                <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Generated Canonical HTML Tag:
                    </span>

                    <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-2xl space-y-4">
                        <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                            <Terminal className="h-4 w-4" /> Output Buffer
                        </span>
                        
                        <textarea
                            readOnly
                            value={canonicalTag}
                            rows={4}
                            className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-xs text-neutral-200 outline-none resize-none font-mono select-all leading-relaxed"
                        />

                        <button
                            onClick={handleCopy}
                            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                        >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Canonical Element
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
