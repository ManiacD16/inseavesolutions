import { useState, useEffect } from 'react';
import { Sliders, Copy, Check, Star } from 'lucide-react';
import toast from 'react-hot-toast';

type TitleTone = 'Clickbait' | 'SearchFriendly' | 'Drama';

export default function YoutubeTitleGenerator() {
    const [keyword, setKeyword] = useState('React Coding');
    const [tone, setTone] = useState<TitleTone>('Clickbait');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [titles, setTitles] = useState<string[]>([]);

    const templates: Record<TitleTone, string[]> = {
        Clickbait: [
            'I Tried [Keyword] for 100 Hours... Here is What Happened! 😱',
            'Do NOT Learn [Keyword] Until You Watch This Video!',
            'Why 99% of People Fail at [Keyword] (And How to Fix It)',
            'Is [Keyword] Actually Dead in 2026? (The Brutal Truth)',
        ],
        SearchFriendly: [
            'Complete [Keyword] Course for Beginners (2026 Tutorial)',
            'How to Build a High-Performing [Keyword] System Easily',
            '[Keyword] Explained in 5 Minutes (Simple & Visual)',
            'Step-by-Step Guide: How to Optimize Your [Keyword] Flow',
        ],
        Drama: [
            'They Lied to You About [Keyword]!',
            'Why I Am Leaving [Keyword] Forever... 💔',
            'Advanced [Keyword] Hacks They Don\'t Want You to Know',
            'How I Built a Six-Figure Business Using Only [Keyword]'
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
        const primary = templates[tone].map(t => t.replace(/\[Keyword\]/g, capitalized));
        
        // General backup items
        const backups = [
            'Ultimate Guide: Master [Keyword] Today',
            'My Favorite [Keyword] Secret Revealed!',
            '10 [Keyword] Tricks You Will Wish You Knew Sooner',
            'Stop Doing [Keyword] Like This!'
        ].map(t => t.replace(/\[Keyword\]/g, capitalized));

        setTitles([...primary, ...backups]);
    };

    useEffect(() => {
        generateTitles();
    }, [keyword, tone]);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        toast.success('YouTube title copied!');
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">YouTube Video Title Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Generate clickbait-curiosity or strictly search-optimized titles designed to boost YouTube video CTR metrics.
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
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Seed Keyword / Video Topic</label>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="e.g. React Coding"
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Headline Tone */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Video Headline Tone</label>
                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value as TitleTone)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="Clickbait">Curiosity Spark & Clickbait (😱, dead...)</option>
                            <option value="SearchFriendly">Search Optimized & Tutorial (Course, 2026...)</option>
                            <option value="Drama">Action, Secrets & Drama (They lied, leaving...)</option>
                        </select>
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Generated Video Titles (Click to copy):
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
