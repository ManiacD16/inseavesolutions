import { useState, useEffect } from 'react';
import { Sliders, RefreshCw, BarChart2, BookOpen } from 'lucide-react';

interface WordStat {
    word: string;
    count: number;
    percentage: number;
}

export default function KeywordDensityChecker() {
    const [text, setText] = useState('SEO tools are essential for digital success. By analyzing keyword density, you can optimize your SEO tools for search engines. Ensure your tools are helpful and provide value.');
    const [excludeStopwords, setExcludeStopwords] = useState(true);
    const [minWordLength, setMinWordLength] = useState<number>(3);
    const [stats, setStats] = useState<WordStat[]>([]);
    const [totalWords, setTotalWords] = useState(0);
    const [uniqueWords, setUniqueWords] = useState(0);

    const stopwords = ['the', 'and', 'a', 'of', 'to', 'in', 'is', 'for', 'that', 'by', 'on', 'with', 'this', 'an', 'are', 'your', 'you', 'it', 'as', 'at'];

    const analyzeText = () => {
        if (!text.trim()) {
            setStats([]);
            setTotalWords(0);
            setUniqueWords(0);
            return;
        }

        // Tokenize and clean text
        const cleanText = text.toLowerCase().replace(/[^\w\s]/g, ' ');
        const rawWords = cleanText.split(/\s+/).filter(w => w);
        setTotalWords(rawWords.length);

        // Filter based on options
        let filtered = rawWords;
        if (excludeStopwords) {
            filtered = filtered.filter(w => !stopwords.includes(w));
        }
        if (minWordLength > 0) {
            filtered = filtered.filter(w => w.length >= minWordLength);
        }

        // Count frequencies
        const frequencyMap: Record<string, number> = {};
        filtered.forEach(word => {
            frequencyMap[word] = (frequencyMap[word] || 0) + 1;
        });

        // Convert to list
        const list: WordStat[] = Object.keys(frequencyMap).map(word => {
            const count = frequencyMap[word];
            const percentage = filtered.length > 0 ? (count / filtered.length) * 100 : 0;
            return { word, count, percentage };
        });

        // Sort by frequency
        list.sort((a, b) => b.count - a.count);

        setUniqueWords(Object.keys(frequencyMap).length);
        setStats(list.slice(0, 15)); // Get top 15 words
    };

    useEffect(() => {
        analyzeText();
    }, [text, excludeStopwords, minWordLength]);

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">Keyword Density & Frequency Checker</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Analyze content copy, inspect primary keyword frequency densities, and align keywords with standard search engine ratios (optimal: 1-2%).
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-6 space-y-4">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={10}
                        placeholder="Paste your blog content or landing page text copy here to check keyword counts..."
                        className="w-full bg-black/45 border border-white/10 rounded-2xl p-5 text-xs text-white outline-none focus:border-indigo-500 transition leading-relaxed resize-none font-mono"
                    />

                    {/* Stats metrics */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-neutral-400 font-bold uppercase">Total Words</p>
                                <p className="text-lg font-bold text-white mt-1">{totalWords}</p>
                            </div>
                            <BookOpen className="h-5 w-5 text-indigo-400" />
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-neutral-400 font-bold uppercase">Filtered Unique</p>
                                <p className="text-lg font-bold text-white mt-1">{uniqueWords}</p>
                            </div>
                            <BarChart2 className="h-5 w-5 text-emerald-400" />
                        </div>
                    </div>
                </div>

                {/* Parameters & Analysis */}
                <div className="lg:col-span-6 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters & Densities
                    </span>

                    <div className="flex flex-wrap gap-4 items-center">
                        <label className="flex items-center gap-3 cursor-pointer text-xs text-neutral-300">
                            <input
                                type="checkbox"
                                checked={excludeStopwords}
                                onChange={(e) => setExcludeStopwords(e.target.checked)}
                                className="w-4 h-4 rounded bg-black border border-white/10 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>Exclude Grammatical Stopwords</span>
                        </label>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-400">Min word length:</span>
                            <input
                                type="number"
                                min={1}
                                max={8}
                                value={minWordLength}
                                onChange={(e) => setMinWordLength(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-14 bg-black border border-white/10 rounded px-2 py-1 text-xs text-white text-center font-mono outline-none"
                            />
                        </div>
                    </div>

                    {/* Table results */}
                    <div className="space-y-3">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                            Top Keyword Frequency Breakdown:
                        </span>

                        {stats.length === 0 ? (
                            <div className="text-center py-6 text-xs text-neutral-500">
                                Paste copy to review keywords.
                            </div>
                        ) : (
                            <div className="border border-white/5 rounded-xl overflow-hidden bg-black/30">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-white/5 text-neutral-400 font-bold border-b border-white/5">
                                        <tr>
                                            <th className="px-4 py-2">Word</th>
                                            <th className="px-4 py-2 text-right">Count</th>
                                            <th className="px-4 py-2 text-right">Density %</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-neutral-200">
                                        {stats.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                                                <td className="px-4 py-2.5 font-mono font-semibold">{row.word}</td>
                                                <td className="px-4 py-2.5 text-right font-mono font-bold text-white">{row.count}</td>
                                                <td className="px-4 py-2.5 text-right font-mono text-indigo-400 font-bold">{row.percentage.toFixed(1)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
