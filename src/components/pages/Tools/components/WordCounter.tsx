import { useState } from 'react';
import { Sliders, RefreshCw, Layers, FileText, Clock, Type } from 'lucide-react';

export default function WordCounter() {
    const [text, setText] = useState('Digital copywriting is an art form. By structuring clear, readable sentences and paragraph divisions, you improve both user engagement and search engine click metrics. Paste your drafts below!');

    const getWordCount = () => {
        return text.trim() ? text.trim().split(/\s+/).length : 0;
    };

    const getCharCount = (includeSpaces = true) => {
        return includeSpaces ? text.length : text.replace(/\s/g, '').length;
    };

    const getSentenceCount = () => {
        return text.trim() ? (text.split(/[.!?]+/).filter(s => s.trim().length > 0).length) : 0;
    };

    const getParagraphCount = () => {
        return text.trim() ? (text.split(/\n+/).filter(p => p.trim().length > 0).length) : 0;
    };

    const getReadingTime = () => {
        // Average reading speed: 200 words per minute
        const words = getWordCount();
        const minutes = words / 200;
        const seconds = Math.ceil(minutes * 60);
        return seconds < 60 ? `${seconds}s` : `${Math.ceil(minutes)} min`;
    };

    const getSpeakingTime = () => {
        // Average speaking speed: 130 words per minute
        const words = getWordCount();
        const minutes = words / 130;
        const seconds = Math.ceil(minutes * 60);
        return seconds < 60 ? `${seconds}s` : `${Math.ceil(minutes)} min`;
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">Word & Character Counter</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Analyze content copies, track strict social media posting limits, and optimize paragraph lengths for visual and search indexing.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-7 space-y-4">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={11}
                        placeholder="Paste your content or article text here to check counters..."
                        className="w-full bg-black/45 border border-white/10 rounded-2xl p-5 text-xs text-white outline-none focus:border-indigo-500 transition leading-relaxed resize-none font-mono"
                    />

                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={() => setText('')}
                            className="py-2.5 px-4 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                        >
                            <RefreshCw className="h-4 w-4" /> Clear Editor
                        </button>
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-5 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Content Metrics:
                    </span>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Words</span>
                            <span className="text-2xl font-bold text-white mt-1 block font-mono">{getWordCount()}</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Chars (with spaces)</span>
                            <span className="text-2xl font-bold text-white mt-1 block font-mono">{getCharCount(true)}</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Chars (no spaces)</span>
                            <span className="text-2xl font-bold text-white mt-1 block font-mono">{getCharCount(false)}</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Sentences</span>
                            <span className="text-2xl font-bold text-white mt-1 block font-mono">{getSentenceCount()}</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Paragraphs</span>
                            <span className="text-2xl font-bold text-white mt-1 block font-mono">{getParagraphCount()}</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Reading Time</span>
                            <span className="text-2xl font-bold text-indigo-400 mt-1 block font-mono flex items-center gap-1">
                                <Clock className="h-4 w-4 shrink-0 text-indigo-400" /> {getReadingTime()}
                            </span>
                        </div>
                    </div>

                    <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-2xl space-y-3">
                        <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                            <Clock className="h-4 w-4" /> Estimated Speaking Time
                        </span>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                            Based on standard professional speaking speed limits (130 words per minute), speaking this text aloud will take approximately <strong className="text-white font-mono">{getSpeakingTime()}</strong>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
