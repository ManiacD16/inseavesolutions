import { useState, useEffect } from 'react';
import { Sliders, Copy, Check, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RobotsTxtGenerator() {
    const [userAgent, setUserAgent] = useState('*');
    const [crawlDelay, setCrawlDelay] = useState('none');
    const [sitemapUrl, setSitemapUrl] = useState('https://inseave.com/sitemap.xml');
    const [disallowedPaths, setDisallowedPaths] = useState('/admin\n/api\n/tmp');
    const [allowedPaths, setAllowedPaths] = useState('/');
    
    const [robotsCode, setRobotsCode] = useState('');
    const [copied, setCopied] = useState(false);

    const generateCode = () => {
        let lines = [];
        lines.push(`User-agent: ${userAgent}`);
        
        if (crawlDelay !== 'none') {
            lines.push(`Crawl-delay: ${crawlDelay}`);
        }

        // Parse allowed paths
        const allowed = allowedPaths.split('\n').map(p => p.trim()).filter(p => p);
        allowed.forEach(p => lines.push(`Allow: ${p}`));

        // Parse disallowed paths
        const disallowed = disallowedPaths.split('\n').map(p => p.trim()).filter(p => p);
        disallowed.forEach(p => lines.push(`Disallow: ${p}`));

        // Sitemap
        if (sitemapUrl.trim()) {
            lines.push(`Sitemap: ${sitemapUrl.trim()}`);
        }

        setRobotsCode(lines.join('\n'));
    };

    useEffect(() => {
        generateCode();
    }, [userAgent, crawlDelay, sitemapUrl, disallowedPaths, allowedPaths]);

    const handleCopy = () => {
        navigator.clipboard.writeText(robotsCode);
        setCopied(true);
        toast.success('Robots.txt copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">Robots.txt Crawler Configuration Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Build a valid, crawl-safe robots.txt configuration directive file to guide search engine bots correctly.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-4 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">User-Agent bot scope</label>
                        <select
                            value={userAgent}
                            onChange={(e) => setUserAgent(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="*">All search crawlers (*)</option>
                            <option value="Googlebot">Googlebot (Google Search)</option>
                            <option value="Bingbot">Bingbot (Microsoft Bing)</option>
                            <option value="Yandex">YandexBot (Russian Search)</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Crawl-delay limits</label>
                        <select
                            value={crawlDelay}
                            onChange={(e) => setCrawlDelay(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="none">No crawl delay (Standard)</option>
                            <option value="5">5 Seconds delay</option>
                            <option value="10">10 Seconds delay</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Sitemap XML URL</label>
                        <input
                            type="text"
                            value={sitemapUrl}
                            onChange={(e) => setSitemapUrl(e.target.value)}
                            placeholder="https://example.com/sitemap.xml"
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Disallowed Paths (one per line)</label>
                        <textarea
                            value={disallowedPaths}
                            onChange={(e) => setDisallowedPaths(e.target.value)}
                            rows={3}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono leading-relaxed"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Allowed Paths (one per line)</label>
                        <textarea
                            value={allowedPaths}
                            onChange={(e) => setAllowedPaths(e.target.value)}
                            rows={2}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono leading-relaxed"
                        />
                    </div>
                </div>

                {/* Output */}
                <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Generated Robots.txt Config:
                    </span>

                    <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-2xl space-y-4">
                        <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                            <Terminal className="h-4 w-4" /> Output buffer
                        </span>
                        
                        <textarea
                            readOnly
                            value={robotsCode}
                            rows={10}
                            className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-xs text-neutral-200 outline-none resize-none font-mono select-all leading-relaxed"
                        />

                        <button
                            onClick={handleCopy}
                            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                        >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Robots.txt File
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
