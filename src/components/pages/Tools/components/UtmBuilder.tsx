import { useState, useEffect } from 'react';
import { Sliders, RefreshCw, Copy, Check, Link2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UtmBuilder() {
    const [baseUrl, setBaseUrl] = useState('https://inseave.com');
    const [source, setSource] = useState('newsletter');
    const [medium, setMedium] = useState('email');
    const [campaign, setCampaign] = useState('summer_promo_2026');
    const [term, setTerm] = useState('');
    const [content, setContent] = useState('');

    const [fullUrl, setFullUrl] = useState('');
    const [isValidUrl, setIsValidUrl] = useState(true);
    const [copied, setCopied] = useState(false);

    const buildUrl = () => {
        if (!baseUrl.trim()) {
            setFullUrl('');
            setIsValidUrl(false);
            return;
        }

        try {
            // URL constructor to check syntax and append params safely
            const urlObj = new URL(baseUrl.trim());
            
            if (source.trim()) urlObj.searchParams.set('utm_source', source.trim());
            if (medium.trim()) urlObj.searchParams.set('utm_medium', medium.trim());
            if (campaign.trim()) urlObj.searchParams.set('utm_campaign', campaign.trim());
            if (term.trim()) urlObj.searchParams.set('utm_term', term.trim());
            if (content.trim()) urlObj.searchParams.set('utm_content', content.trim());

            setFullUrl(urlObj.toString());
            setIsValidUrl(true);
        } catch (e) {
            // Backup parsing to handle URLs without protocol e.g. "inseave.com"
            setIsValidUrl(false);
            
            let appended = baseUrl.trim();
            if (!appended.startsWith('http://') && !appended.startsWith('https://')) {
                appended = 'https://' + appended;
            }

            try {
                const urlObj = new URL(appended);
                if (source.trim()) urlObj.searchParams.set('utm_source', source.trim());
                if (medium.trim()) urlObj.searchParams.set('utm_medium', medium.trim());
                if (campaign.trim()) urlObj.searchParams.set('utm_campaign', campaign.trim());
                if (term.trim()) urlObj.searchParams.set('utm_term', term.trim());
                if (content.trim()) urlObj.searchParams.set('utm_content', content.trim());
                
                setFullUrl(urlObj.toString());
                setIsValidUrl(true);
            } catch (err) {
                setFullUrl('');
            }
        }
    };

    useEffect(() => {
        buildUrl();
    }, [baseUrl, source, medium, campaign, term, content]);

    const handleCopy = () => {
        if (!fullUrl) return;
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        toast.success('UTM Campaign URL copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">UTM Campaign Link Builder</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Construct tracking URLs with custom analytics parameters to attribute web traffic sources accurately inside Google Analytics.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-4 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Website URL */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Base Website URL</label>
                        <input
                            type="text"
                            value={baseUrl}
                            onChange={(e) => setBaseUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Source */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Campaign Source (utm_source)</label>
                        <input
                            type="text"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            placeholder="e.g. google, newsletter"
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Medium */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Campaign Medium (utm_medium)</label>
                        <input
                            type="text"
                            value={medium}
                            onChange={(e) => setMedium(e.target.value)}
                            placeholder="e.g. cpc, banner, email"
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Campaign Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Campaign Name (utm_campaign)</label>
                        <input
                            type="text"
                            value={campaign}
                            onChange={(e) => setCampaign(e.target.value)}
                            placeholder="e.g. spring_sale"
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Term & Content */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-neutral-400 uppercase">Term (utm_term)</label>
                            <input
                                type="text"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                placeholder="Keywords"
                                className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-neutral-400 uppercase">Content (utm_content)</label>
                            <input
                                type="text"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Ad creative"
                                className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                            />
                        </div>
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-7 space-y-6">
                    {fullUrl && (
                        <div className="space-y-5">
                            {/* URL output panel */}
                            <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-2xl space-y-3">
                                <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                                    <Link2 className="h-4 w-4" /> Generated Campaign URL
                                </span>
                                
                                <textarea
                                    readOnly
                                    value={fullUrl}
                                    rows={4}
                                    className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-xs text-neutral-200 outline-none resize-none font-mono select-all leading-relaxed"
                                />

                                <button
                                    onClick={handleCopy}
                                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                                >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Tracking URL
                                </button>
                            </div>

                            {/* Validation warning */}
                            {!isValidUrl && (
                                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-center gap-3 text-yellow-300 text-xs leading-relaxed">
                                    <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-400" />
                                    <span>
                                        <strong>Malformed base URL detected:</strong> Appending parameters to an absolute https:// protocol framework will make link dispatch robust.
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
