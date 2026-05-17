import { useState, useEffect } from 'react';
import { Sliders, Copy, Check, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SitemapGenerator() {
    const [baseUrl, setBaseUrl] = useState('https://inseave.com');
    const [paths, setPaths] = useState('/\n/about\n/services\n/resources/tools');
    const [freq, setFreq] = useState('weekly');
    const [priority, setPriority] = useState('0.8');

    const [sitemapCode, setSitemapCode] = useState('');
    const [copied, setCopied] = useState(false);

    const generateCode = () => {
        if (!baseUrl.trim()) {
            setSitemapCode('');
            return;
        }

        let base = baseUrl.trim();
        if (base.endsWith('/')) {
            base = base.slice(0, -1);
        }

        const lines = paths.split('\n').map(p => p.trim()).filter(p => p);
        const today = new Date().toISOString().split('T')[0];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        lines.forEach(line => {
            const formattedPath = line.startsWith('/') ? line : '/' + line;
            const fullUrl = base + formattedPath;
            xml += `
  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
        });

        xml += `\n</urlset>`;
        setSitemapCode(xml);
    };

    useEffect(() => {
        generateCode();
    }, [baseUrl, paths, freq, priority]);

    const handleCopy = () => {
        navigator.clipboard.writeText(sitemapCode);
        setCopied(true);
        toast.success('Sitemap XML copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">XML Sitemap Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Compile structural sitemap XML listings client-side to notify Google and Bing crawlers about active pages.
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

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-neutral-400 uppercase">Change Frequency</label>
                            <select
                                value={freq}
                                onChange={(e) => setFreq(e.target.value)}
                                className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 transition"
                            >
                                <option value="hourly">Hourly</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-neutral-400 uppercase">Default Priority</label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 transition"
                            >
                                <option value="1.0">1.0 (Highest)</option>
                                <option value="0.8">0.8 (Medium-High)</option>
                                <option value="0.5">0.5 (Default)</option>
                                <option value="0.3">0.3 (Lowest)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Relative URLs List (one per line)</label>
                        <textarea
                            value={paths}
                            onChange={(e) => setPaths(e.target.value)}
                            rows={6}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono leading-relaxed"
                        />
                    </div>
                </div>

                {/* Output */}
                <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Generated Sitemap.xml Code:
                    </span>

                    <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-2xl space-y-4">
                        <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                            <Terminal className="h-4 w-4" /> XML Markup Buffer
                        </span>
                        
                        <textarea
                            readOnly
                            value={sitemapCode}
                            rows={12}
                            className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-xs text-neutral-200 outline-none resize-none font-mono select-all leading-relaxed"
                        />

                        <button
                            onClick={handleCopy}
                            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                        >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Sitemap XML Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
