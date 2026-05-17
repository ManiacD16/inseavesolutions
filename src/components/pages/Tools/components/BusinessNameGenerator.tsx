import { useState, useEffect } from 'react';
import { Sliders, RefreshCw, Copy, Check, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

type NameIndustry = 'Tech' | 'Creative' | 'Finance' | 'Health';
type NameStyle = 'Compound' | 'Minimalist' | 'Modern';

export default function BusinessNameGenerator() {
    const [keyword, setKeyword] = useState('cloud');
    const [industry, setIndustry] = useState<NameIndustry>('Tech');
    const [style, setStyle] = useState<NameStyle>('Compound');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [names, setNames] = useState<string[]>([]);

    const generateNames = () => {
        if (!keyword.trim()) {
            setNames([]);
            return;
        }

        const raw = keyword.trim().toLowerCase();
        const capitalized = raw.charAt(0).toUpperCase() + raw.slice(1);
        let list: string[] = [];

        if (style === 'Compound') {
            list = [
                `${capitalized}ify`,
                `${capitalized}ly`,
                `${capitalized}labs`,
                `${capitalized}flow`,
                `${capitalized}nest`,
                `${capitalized}grid`,
                `${capitalized}nexus`,
                `${capitalized}vault`,
                `${capitalized}scale`,
                `${capitalized}pulse`,
                `${capitalized}base`,
                `${capitalized}loop`,
            ];
        } else if (style === 'Minimalist') {
            list = [
                `Aero${capitalized}`,
                `Nova${capitalized}`,
                `Zen${capitalized}`,
                `Syn${capitalized}`,
                `Velo${capitalized}`,
                `Apex${capitalized}`,
                `Pure${capitalized}`,
                `Core${capitalized}`,
                `Eco${capitalized}`,
                `Opti${capitalized}`,
                `Flex${capitalized}`,
                `Meta${capitalized}`,
            ];
        } else { // Modern / Agency style
            if (industry === 'Tech') {
                list = [
                    `${capitalized} Tech`,
                    `${capitalized} Systems`,
                    `${capitalized} Logic`,
                    `${capitalized} Networks`,
                ];
            } else if (industry === 'Creative') {
                list = [
                    `${capitalized} Studio`,
                    `${capitalized} & Co`,
                    `${capitalized} Creative`,
                    `The ${capitalized} Agency`,
                ];
            } else if (industry === 'Finance') {
                list = [
                    `${capitalized} Capital`,
                    `${capitalized} Venture`,
                    `${capitalized} Advisors`,
                    `${capitalized} Wealth`,
                ];
            } else {
                list = [
                    `${capitalized} Health`,
                    `${capitalized} Fit`,
                    `${capitalized} Care`,
                    `${capitalized} Vital`,
                ];
            }
            // Add some generic premium modern names
            list = [
                ...list,
                `Velo ${capitalized}`,
                `Intel ${capitalized}`,
                `Prism ${capitalized}`,
                `Aura ${capitalized}`,
                `Helix ${capitalized}`,
                `Shift ${capitalized}`,
                `Helix ${capitalized}`,
                `Element ${capitalized}`,
            ];
        }

        setNames(list);
    };

    useEffect(() => {
        generateNames();
    }, [keyword, industry, style]);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        toast.success(`Business name "${text}" copied!`);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">SaaS & Agency Business Name Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Ideate professional, unique, and brandable corporate names based on industry modifiers and style schemes.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Shield className="h-4 w-4" /> Parameters
                    </span>

                    {/* Keywords */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Seed Keyword / Theme</label>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="e.g. cloud"
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Industry */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Target Niche Category</label>
                        <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value as NameIndustry)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="Tech">Tech / Software / SaaS</option>
                            <option value="Creative">Creative / Marketing Agency</option>
                            <option value="Finance">Finance / Consulting / Wealth</option>
                            <option value="Health">Health / Fitness / Care</option>
                        </select>
                    </div>

                    {/* Style */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Name Linguistics Style</label>
                        <select
                            value={style}
                            onChange={(e) => setStyle(e.target.value as NameStyle)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="Compound">Compound Suffixes (Keyword + flow)</option>
                            <option value="Minimalist">Minimalist Prefixes (Nova + Keyword)</option>
                            <option value="Modern">Modern Dual Word (Keyword + Studio)</option>
                        </select>
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Generated Brand Options:
                    </span>

                    {names.length === 0 ? (
                        <div className="text-center py-10 text-xs text-neutral-500">
                            Please type a seed keyword to generate names.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {names.map((name, idx) => {
                                // Mock a domain checking badge
                                const ext = idx % 2 === 0 ? '.com' : '.io';
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleCopy(name, idx)}
                                        className="text-left p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition duration-200 flex justify-between items-center group gap-3"
                                    >
                                        <div>
                                            <span className="text-xs text-neutral-200 font-semibold group-hover:text-white transition-colors leading-relaxed">
                                                {name}
                                            </span>
                                            <p className="text-[9px] text-emerald-400 font-bold mt-1 font-mono uppercase tracking-wider">
                                                {ext} Available
                                            </p>
                                        </div>
                                        <div className="p-2 bg-white/5 border border-white/10 rounded-lg group-hover:bg-indigo-600 group-hover:border-indigo-500 transition text-neutral-400 group-hover:text-white shrink-0">
                                            {copiedIndex === idx ? (
                                                <Check className="h-3.5 w-3.5" />
                                            ) : (
                                                <Copy className="h-3.5 w-3.5" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
