import { useState } from 'react';
import { Sliders, Eye, AlertCircle, Laptop, Smartphone } from 'lucide-react';

export default function SerpPreview() {
    const [title, setTitle] = useState('Inseave Solutions - High Performance Web Development Agency');
    const [description, setDescription] = useState('Build custom CRM dashboards, premium marketing layouts, and secure enterprise software with absolute speed and style.');
    const [slug, setSlug] = useState('resources/tools');
    const [domain, setDomain] = useState('https://inseave.com');
    const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

    // SEO length checkers
    const isTitleOver = title.length > 60;
    const isDescOver = description.length > 160;

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">Google SERP Snippet Preview Checker</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Audit exactly how your Meta Titles and Descriptions will display in Google search result pages.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-4 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Devices */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setDevice('desktop')}
                            className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                                device === 'desktop'
                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                                    : 'bg-black/35 border-white/10 text-neutral-400 hover:text-white'
                            }`}
                        >
                            <Laptop className="h-3.5 w-3.5" /> Desktop Preview
                        </button>
                        <button
                            onClick={() => setDevice('mobile')}
                            className={`py-2 px-3 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                                device === 'mobile'
                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                                    : 'bg-black/35 border-white/10 text-neutral-400 hover:text-white'
                            }`}
                        >
                            <Smartphone className="h-3.5 w-3.5" /> Mobile Preview
                        </button>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-neutral-300 uppercase block">Meta Title</label>
                            <span className={`text-[10px] font-mono ${isTitleOver ? 'text-rose-400' : 'text-neutral-400'}`}>
                                {title.length} / 60 chars
                            </span>
                        </div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-neutral-300 uppercase block">Meta Description</label>
                            <span className={`text-[10px] font-mono ${isDescOver ? 'text-rose-400' : 'text-neutral-400'}`}>
                                {description.length} / 160 chars
                            </span>
                        </div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono leading-relaxed"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Root Domain Name</label>
                        <input
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">URL Slug / Pathway</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-7 space-y-6">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase flex items-center gap-1.5">
                        <Eye className="h-4 w-4 text-indigo-400" /> Google Search Preview
                    </span>

                    {/* Google SERP Card visual */}
                    <div className="bg-white border border-neutral-200 rounded-2xl shadow-xl p-6 text-slate-800 space-y-3 font-sans">
                        {/* Desktop view */}
                        {device === 'desktop' ? (
                            <div className="space-y-1 max-w-[600px]">
                                {/* Path breadcrumb */}
                                <p className="text-[12px] text-slate-500 flex items-center gap-1 truncate font-sans">
                                    {domain.replace(/https?:\/\//, '')} <span className="text-slate-400">› {slug.replace(/\//g, ' › ')}</span>
                                </p>
                                {/* Title Link */}
                                <h4 className="text-[20px] font-medium text-[#1a0dab] hover:underline cursor-pointer leading-tight truncate">
                                    {title}
                                </h4>
                                {/* Description */}
                                <p className="text-[14px] text-[#4d5156] leading-relaxed line-clamp-2">
                                    {description}
                                </p>
                            </div>
                        ) : (
                            /* Mobile View */
                            <div className="space-y-1.5 max-w-[360px]">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[10px] text-slate-500">
                                        G
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-800 font-bold truncate">
                                            {domain.replace(/https?:\/\//, '')}
                                        </p>
                                        <p className="text-[9px] text-slate-400 truncate">
                                            {domain}/{slug}
                                        </p>
                                    </div>
                                </div>
                                <h4 className="text-[16px] font-semibold text-[#1a0dab] leading-snug">
                                    {title}
                                </h4>
                                <p className="text-[12px] text-[#4d5156] leading-relaxed line-clamp-3">
                                    {description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Flags Alerts */}
                    <div className="space-y-2">
                        {isTitleOver && (
                            <div className="flex items-center gap-2 text-rose-400 bg-rose-500/5 border border-rose-500/20 p-3.5 rounded-xl text-xs">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                <span><strong>Warning:</strong> Title exceeds 60 characters. Search engines will truncate it!</span>
                            </div>
                        )}
                        {isDescOver && (
                            <div className="flex items-center gap-2 text-rose-400 bg-rose-500/5 border border-rose-500/20 p-3.5 rounded-xl text-xs">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                <span><strong>Warning:</strong> Description exceeds 160 characters. Search engines will truncate it!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
