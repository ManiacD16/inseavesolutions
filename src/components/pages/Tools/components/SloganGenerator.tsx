import { useState, useEffect } from 'react';
import { Sliders, RefreshCw, Copy, Check, Megaphone } from 'lucide-react';
import toast from 'react-hot-toast';

type SloganStyle = 'Premium' | 'Trust' | 'Simple' | 'Clever';

export default function SloganGenerator() {
    const [keyword, setKeyword] = useState('Workspace');
    const [style, setStyle] = useState<SloganStyle>('Premium');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [slogans, setSlogans] = useState<string[]>([]);

    const sloganTemplates: Record<SloganStyle, string[]> = {
        Premium: [
            'Redefining the Standard of [Keyword].',
            'Engineered for [Keyword] Supremacy.',
            'The Future of [Keyword], Delivered.',
            'Experience the Power of Pure [Keyword].',
            'Simply [Keyword]. Nothing Less.',
        ],
        Trust: [
            'Your Dependable Partner in [Keyword].',
            'Built on Quality, Built for [Keyword].',
            'Professional [Keyword] Workflows Made Secure.',
            'The Trusted Authority in [Keyword].',
            'Solid [Keyword] Integration Done Right.',
        ],
        Simple: [
            'Simplicity in [Keyword].',
            'Get More Out of Your [Keyword].',
            'Easy, Intelligent [Keyword] Tools.',
            'No Hassle, Just Pure [Keyword].',
            'Fast. Smart. [Keyword].',
        ],
        Clever: [
            'Think Success. Think [Keyword].',
            'Elevate Your Workflow with [Keyword].',
            'Smart Teams Choose [Keyword].',
            'The Missing Piece in Your [Keyword] Puzzle.',
            'Next-Generation [Keyword] Solutions.',
        ]
    };

    const generateSlogans = () => {
        if (!keyword.trim()) {
            setSlogans([]);
            return;
        }

        const raw = keyword.trim();
        const capitalized = raw.charAt(0).toUpperCase() + raw.slice(1);
        
        // Blend from selected style and supplement some other styled ones for a rich list
        const primary = sloganTemplates[style].map(t => t.replace(/\[Keyword\]/g, capitalized));
        
        // Add a few generic backup slogans to reach 12+ total
        const backupTemplates = [
            'Unleash the Potential of [Keyword].',
            'Accelerate Your [Keyword] Journey.',
            'The Smart Choice for Custom [Keyword].',
            'Where Innovation Meets [Keyword].',
            'Because Your [Keyword] Matters.',
            'The Ultimate Suite for Professional [Keyword].',
            'Maximize Your [Keyword] Productivity.'
        ];
        const backup = backupTemplates.map(t => t.replace(/\[Keyword\]/g, capitalized));

        setSlogans([...primary, ...backup]);
    };

    useEffect(() => {
        generateSlogans();
    }, [keyword, style]);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        toast.success('Slogan copied to clipboard!');
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">Brand Slogan & Tagline Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Generate viral, creative, and memorable corporate slogans based on brand keywords and values.
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
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Brand Keyword / Category</label>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="e.g. Workspace"
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Slogan style */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Copywriting Tone</label>
                        <select
                            value={style}
                            onChange={(e) => setStyle(e.target.value as SloganStyle)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="Premium">Premium, Bold & High Status</option>
                            <option value="Trust">Trust, Corporate Quality & B2B</option>
                            <option value="Simple">Direct, Clear & Minimalist</option>
                            <option value="Clever">Clever, Catchy & Playful</option>
                        </select>
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Generated Corporate Taglines:
                    </span>

                    {slogans.length === 0 ? (
                        <div className="text-center py-10 text-xs text-neutral-500">
                            Please enter a keyword to generate taglines.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3">
                            {slogans.map((slogan, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleCopy(slogan, idx)}
                                    className="w-full text-left p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition duration-200 flex justify-between items-center group gap-4"
                                >
                                    <span className="text-xs text-neutral-200 font-semibold group-hover:text-white transition-colors leading-relaxed">
                                        "{slogan}"
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
