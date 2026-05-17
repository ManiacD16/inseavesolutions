import { useState, useEffect } from 'react';
import { Sliders, RefreshCw, Copy, Check, Hash } from 'lucide-react';
import toast from 'react-hot-toast';

type HashtagCategory = 'Coding' | 'Marketing' | 'Fitness' | 'Travel';

export default function HashtagGenerator() {
    const [keyword, setKeyword] = useState('marketing');
    const [category, setCategory] = useState<HashtagCategory>('Marketing');
    const [copiedAll, setCopiedAll] = useState(false);

    const [hashtags, setHashtags] = useState<{
        high: string[];
        medium: string[];
        low: string[];
    }>({ high: [], medium: [], low: [] });

    const hashtagPresets: Record<HashtagCategory, { high: string[]; medium: string[]; low: string[] }> = {
        Coding: {
            high: ['#programming', '#coding', '#developer', '#tech', '#software', '#computerscience'],
            medium: ['#coderlife', '#webdev', '#javascript', '#reactjs', '#pythonprogramming', '#fullstack'],
            low: ['#developerhumor', '#codenewbie', '#frontenddev', '#softwareengineerlife', '#100daysofcode']
        },
        Marketing: {
            high: ['#marketing', '#digitalmarketing', '#socialmedia', '#business', '#seo', '#branding'],
            medium: ['#marketingstrategy', '#contentmarketing', '#onlinebusiness', '#growthhacking', '#socialmediatips'],
            low: ['#smallbizmarketing', '#seotips', '#inboundmarketing', '#marketingagencylife', '#copywritingtips']
        },
        Fitness: {
            high: ['#fitness', '#gym', '#workout', '#motivation', '#health', '#training'],
            medium: ['#fitnessgoals', '#gymmotivation', '#bodybuilding', '#cardio', '#fitfam', '#nutrition'],
            low: ['#homeworkoutvideos', '#fitnessforlife', '#hiittraining', '#strengthandconditioning', '#fitnesstips']
        },
        Travel: {
            high: ['#travel', '#photography', '#adventure', '#wanderlust', '#nature', '#explore'],
            medium: ['#travelgram', '#instatravel', '#travelphotography', '#solotravel', '#vacation', '#beautifuldestinations'],
            low: ['#backpackerlife', '#offthebeatenpath', '#travelhacks', '#hiddengems', '#roadtripadventure']
        }
    };

    const generateHashtags = () => {
        if (!keyword.trim()) {
            setHashtags({ high: [], medium: [], low: [] });
            return;
        }

        const raw = keyword.trim().toLowerCase().replace(/#/g, '');
        const preset = hashtagPresets[category];

        // Process presets by appending custom user keywords
        const high = [...preset.high, `#${raw}`, `#${raw}life`].slice(0, 8);
        const medium = [...preset.medium, `#${raw}strategy`, `#${raw}tools`].slice(0, 8);
        const low = [...preset.low, `#learn${raw}`, `#${raw}expert`].slice(0, 8);

        setHashtags({ high, medium, low });
    };

    useEffect(() => {
        generateHashtags();
    }, [keyword, category]);

    const handleCopyAll = () => {
        const all = [...hashtags.high, ...hashtags.medium, ...hashtags.low].join(' ');
        if (!all) return;

        navigator.clipboard.writeText(all);
        setCopiedAll(true);
        toast.success('All hashtags copied to clipboard!');
        setTimeout(() => setCopiedAll(false), 2000);
    };

    const handleCopyIndividual = (tag: string) => {
        navigator.clipboard.writeText(tag);
        toast.success(`Copied "${tag}"`);
    };

    return (
        <div className="space-y-6 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                    <h3 className="text-xl font-semibold text-white">Social Media Hashtag Generator</h3>
                    <p className="text-sm text-neutral-400 mt-1">
                        Generate viral hashtags categorized by reach and density competition metrics to optimize social discovery.
                    </p>
                </div>
                {keyword.trim() && (
                    <button
                        onClick={handleCopyAll}
                        className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 text-xs"
                    >
                        {copiedAll ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy All Hashtags
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Seed Keyword */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Seed Keyword / Topic</label>
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="e.g. marketing"
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Niche category */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Platform Niche Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as HashtagCategory)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="Marketing">Digital Marketing & SEO</option>
                            <option value="Coding">Software Engineering & Coding</option>
                            <option value="Fitness">Fitness, Gym & Wellness</option>
                            <option value="Travel">Travel Vlog & Photography</option>
                        </select>
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-7 space-y-6">
                    {keyword.trim() && (
                        <div className="space-y-5">
                            {/* Broad Reach */}
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">High Reach / Broad Volume (High competition)</span>
                                <div className="flex flex-wrap gap-2">
                                    {hashtags.high.map((tag, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleCopyIndividual(tag)}
                                            className="px-3 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sky-300 rounded-lg text-xs transition font-mono"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Niche reach */}
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Niche Authority / Target Density (Medium competition)</span>
                                <div className="flex flex-wrap gap-2">
                                    {hashtags.medium.map((tag, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleCopyIndividual(tag)}
                                            className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-300 rounded-lg text-xs transition font-mono"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Niche reach */}
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Laser Targeted / Long-Tail (Low competition)</span>
                                <div className="flex flex-wrap gap-2">
                                    {hashtags.low.map((tag, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleCopyIndividual(tag)}
                                            className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 rounded-lg text-xs transition font-mono"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
