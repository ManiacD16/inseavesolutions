import { useState, useEffect } from 'react';
import { Sliders, Copy, Check, Star } from 'lucide-react';
import toast from 'react-hot-toast';

type TitleStyle = 'Listicle' | 'HowTo' | 'Question' | 'Curiosity';

export default function SeoTitleGenerator() {
    const [keyword, setKeyword] = useState('Marketing');
    const [style, setStyle] = useState<TitleStyle>('Listicle');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [titles, setTitles] = useState<string[]>([]);

    const templates: Record<TitleStyle, string[]> = {
        Listicle: [
            '10 Critical [Keyword] Secrets You Must Know in 2026',
            '7 Simple [Keyword] Techniques to Double Your Growth',
            '5 Proven [Keyword] Rules for Complete Beginners',
            '12 Best [Keyword] Tools Used by Industry Leaders',
        ],
        HowTo: [
            'How to Master [Keyword] in Less Than 30 Days',
            'How to Build a High-Performing [Keyword] System from Scratch',
            'How Successful Agencies Automate [Keyword] Easily',
            'Step-by-Step Guide: How to Optimize Your [Keyword] Flow',
        ],
        Question: [
            'Is Your [Keyword] Strategy Actually Losing You Money?',
            'What is the Future of [Keyword] for Modern Businesses?',
            'Why is Nobody Talking About This Crazy [Keyword] Trick?',
            'Are You Making These 3 Costly [Keyword] Mistakes?',
        ],
        Curiosity: [
            'The Hidden Danger of Ignoring Your [Keyword] Analytics',
            'This Simple [Keyword] Hack Changed My Business Forever',
            'Why 99% of Freelancers Fail at [Keyword] (And How to Fix It)',
            'What Experts Never Tell You About Advanced [Keyword]',
        ]
    };

    const generateTitles = () => {
        if (!keyword.trim()) {
            setTitles([]);
            return;
        }

        const raw = keyword.trim();
        const capitalized = raw.charAt(0).toUpperCase() + raw.slice(1);
        
        // Match selected style templates and populate
        const primary = templates[style].map(t => t.replace(/\[Keyword\]/g, capitalized));
        
        // Add a few generic backup titles to achieve a rich list
        const backups = [
            'Ultimate Guide to [Keyword] in 2026',
            'Why Advanced [Keyword] is More Important Than Ever',
            'Transform Your Business with Strategic [Keyword]',
            '10 Things Nobody Told You About Mastering [Keyword]'
        ].map(t => t.replace(/\[Keyword\]/g, capitalized));

        setTitles([...primary, ...backups]);
    };

    useEffect(() => {
        generateTitles();
    }, [keyword, style]);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        toast.success('Title copied to clipboard!');
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">SEO Title & Meta Title Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Generate high-CTR, click-worthy titles for your blog posts and search snippets from primary keywords.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Keywords */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Seed Keyword / Topic</label>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="e.g. Marketing"
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Title style */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Headline Theme Style</label>
                        <select
                            value={style}
                            onChange={(e) => setStyle(e.target.value as TitleStyle)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="Listicle">Listicle / Number Based (Top 10...)</option>
                            <option value="HowTo">Action / How-To Guides (How to build...)</option>
                            <option value="Question">Curious Questions (Is your strategy...)</option>
                            <option value="Curiosity">Curiosity & Secrets (The hidden danger...)</option>
                        </select>
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Generated Titles (Click to copy):
                    </span>

                    {titles.length === 0 ? (
                        <div className="text-center py-10 text-xs text-neutral-500">
                            Please enter a keyword to generate SEO titles.
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
