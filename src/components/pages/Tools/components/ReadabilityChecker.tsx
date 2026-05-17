import { useState, useEffect } from 'react';
import { Sliders, RefreshCw, BarChart2, BookOpen, AlertCircle } from 'lucide-react';

export default function ReadabilityChecker() {
    const [text, setText] = useState('Standard readability testing is a great way to verify your content is easy to read. Simple words and shorter sentences work best. Try to avoid extremely complex vocabulary when writing online posts.');
    const [score, setScore] = useState<number>(75);
    const [gradeLevel, setGradeLevel] = useState('Easy to read (5th grade)');
    const [copied, setCopied] = useState(false);

    // Standard syllable counter helper
    const countSyllables = (word: string) => {
        let clean = word.toLowerCase().replace(/[^a-z]/g, '');
        if (clean.length <= 3) return 1;
        
        clean = clean.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
        clean = clean.replace(/^y/, '');
        
        const matches = clean.match(/[aeiouy]{1,2}/g);
        return matches ? matches.length : 1;
    };

    const calculateFleschScore = () => {
        if (!text.trim()) {
            setScore(100);
            setGradeLevel('N/A (Write something)');
            return;
        }

        const cleanText = text.replace(/[^\w\s.!?]/g, ' ');
        const words = cleanText.split(/\s+/).filter(w => w);
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        
        const totalWords = words.length;
        const totalSentences = sentences.length || 1;
        
        let totalSyllables = 0;
        words.forEach(w => {
            totalSyllables += countSyllables(w);
        });

        // Flesch Reading Ease score formula
        // Score = 206.835 - 1.015 * (totalWords / totalSentences) - 84.6 * (totalSyllables / totalWords)
        const avgSentenceLength = totalWords / totalSentences;
        const avgSyllablesPerWord = totalSyllables / totalWords;
        
        let fres = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
        
        // Clamp between 0 and 100
        fres = Math.max(0, Math.min(100, fres));
        setScore(Math.round(fres));

        // Evaluate Grade
        if (fres >= 90) setGradeLevel('Very Easy (5th grade)');
        else if (fres >= 80) setGradeLevel('Easy (6th grade)');
        else if (fres >= 70) setGradeLevel('Fairly Easy (7th grade)');
        else if (fres >= 60) setGradeLevel('Standard (8th - 9th grade)');
        else if (fres >= 50) setGradeLevel('Fairly Difficult (10th - 12th grade)');
        else if (fres >= 30) setGradeLevel('Difficult (College level)');
        else setGradeLevel('Very Confusing (College Graduate)');
    };

    useEffect(() => {
        calculateFleschScore();
    }, [text]);

    // Color helpers based on score
    const getScoreColor = () => {
        if (score >= 70) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5';
        if (score >= 50) return 'text-amber-400 border-amber-500/30 bg-amber-500/5';
        return 'text-rose-400 border-rose-500/30 bg-rose-500/5';
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">SEO Readability Checker</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Calculate Flesch-Kincaid reading scores, evaluate target reader demographics, and optimize copy sentences.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-7 space-y-4">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={11}
                        placeholder="Paste copy here to audit Flesch readability grades..."
                        className="w-full bg-black/45 border border-white/10 rounded-2xl p-5 text-xs text-white outline-none focus:border-indigo-500 transition leading-relaxed resize-none font-mono"
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setText('')}
                            className="py-2.5 px-4 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                        >
                            <RefreshCw className="h-4 w-4" /> Clear Text
                        </button>
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-5 space-y-5">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Readability Scores:
                    </span>

                    {/* Flesch Card Gauge */}
                    <div className={`border p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3 ${getScoreColor()}`}>
                        <span className="text-[10px] font-bold uppercase tracking-wider block text-neutral-400">
                            Flesch Reading Ease
                        </span>
                        <h4 className="text-5xl font-extrabold font-mono tracking-tight">
                            {score}
                        </h4>
                        <div>
                            <p className="text-sm font-bold text-white mt-1">{gradeLevel}</p>
                            <p className="text-[10px] text-neutral-400 mt-0.5">Optimal score: 60 - 70 (Standard reading comfort)</p>
                        </div>
                    </div>

                    {/* Optimization Suggestions */}
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
                        <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                            <AlertCircle className="h-4 w-4" /> Content Strategy Tips
                        </span>
                        
                        <ul className="text-xs text-neutral-300 space-y-2 list-disc list-inside leading-relaxed">
                            {score < 60 ? (
                                <>
                                    <li>Try splitting long sentences (over 20 words) with simple periods.</li>
                                    <li>Swap out complex words for standard synonyms.</li>
                                    <li>Optimize paragraphs to have 2-3 sentences max.</li>
                                </>
                            ) : (
                                <>
                                    <li>Your content is highly readable and perfect for general web audiences.</li>
                                    <li>Ensure keyword optimization fits nicely into simple sentences.</li>
                                    <li>Keep maintaining this standard for SEO posts!</li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
