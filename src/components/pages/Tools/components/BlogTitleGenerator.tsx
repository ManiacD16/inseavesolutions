import { useState, useEffect } from 'react';
import { Sliders, Copy, Check, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

type BlogStyleType = 'Guide' | 'Listicle' | 'PainPoint';

export default function BlogTitleGenerator() {
    const [keyword, setKeyword] = useState('Digital marketing');
    const [style, setStyle] = useState<BlogStyleType>('Guide');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [titles, setTitles] = useState<string[]>([]);

    const templates: Record<BlogStyleType, string[]> = {
        Guide: [
            'The Ultimate Guide to Mastering [Keyword] in 2026',
            'Step-by-Step [Keyword] Blueprint for Modern Marketers',
            'What is [Keyword]? A Complete Beginner\'s Handbook',
            'Advanced [Keyword] Methodologies Explained Simply',
        ],
        Listicle: [
            '10 Revolutionary [Keyword] Tools You Must Try Today',
            '7 Crucial [Keyword] Trends Reshaping the Industry',
            '5 Common [Keyword] Mistakes and How to Avoid Them',
            '12 Best [Keyword] Platforms for High-Growth Startups',
        ],
        PainPoint: [
            'Struggling with [Keyword]? Here is Your Emergency Plan',
            'How to Solve Your Worst [Keyword] Bottlenecks Instantly',
            'Why Your Current [Keyword] Campaign is Actually Flailing',
            'The Hidden Cost of Ignoring Strategic [Keyword] Work'
        ]
    };

    const generateTitles = () => {
        if (!keyword.trim()) {
            setTitles([]);
            return;
        }

        const raw = keyword.trim();
        const capitalized = raw.charAt(0).toUpperCase() + raw.slice(1);
        
        // Populate matching templates
        const primary = templates[style].map(t => t.replace(/\[Keyword\]/g, capitalized));
        
        // General backup items
        const backups = [
            'Mastering [Keyword]: Strategies that Work',
            'Why We Love Advanced [Keyword] (And You Should Too)',
            'Transform Your Company Operations with Strategic [Keyword]',
            '10 Things Nobody Told You About [Keyword]'
        ].map(t => t.replace(/\[Keyword\]/g, capitalized));

        setTitles([...primary, ...backups]);
    };

    useEffect(() => {
        generateTitles();
    }, [keyword, style]);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        toast.success('Blog title copied!');
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <FileText className="h-6 w-6 text-indigo-400" /> SEO Blog Title Generator
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Ideate click-worthy blog topic headlines, informational articles, and listicle guides optimized for Google crawlers.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Target keyword */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Seed Keyword / Topic</label>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="e.g. Digital marketing"
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Blog Style */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Blog Article Theme</label>
                        <select
                            value={style}
                            onChange={(e) => setStyle(e.target.value as BlogStyleType)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="Guide">Ultimate Informational Guides & Blueprints</option>
                            <option value="Listicle">Listicles, Tools & Modern Trends Lists</option>
                            <option value="PainPoint">Problem-Solving & Answering Pain Points</option>
                        </select>
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Generated Blog Titles (Click to copy):
                    </span>

                    {titles.length === 0 ? (
                        <div className="text-center py-10 text-xs text-neutral-500">
                            Enter keywords to generate titles.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3">
                            {titles.map((titleText, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleCopy(titleText, idx)}
                                    className="w-full text-left p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition duration-200 flex justify-between items-center group gap-4"
                                >
                                    <span className="text-xs text-neutral-200 font-semibold group-hover:text-white transition-colors leading-relaxed">
                                        {titleText}
                                    </span>
                                    <div className="p-2 bg-white/5 border border-white/10 rounded-lg group-hover:bg-indigo-600 group-hover:border-indigo-500 transition text-neutral-400 group-hover:text-white shrink-0">
                                        {copiedIndex === idx ? (
                                            <Check className="h-3.5 w-3.5" />
                                        ) : (
                                            <Copy className="h-3.5 w-3.5" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
