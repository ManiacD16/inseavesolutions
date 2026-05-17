import { useState } from 'react';
import { Clipboard, RefreshCw, Type, AlignLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CaseConverter() {
    const [text, setText] = useState('');

    const getStats = () => {
        const charCount = text.length;
        const words = text.trim() ? text.trim().split(/\s+/) : [];
        const wordCount = words.length;
        const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const paragraphCount = text.split(/\n+/).filter(p => p.trim().length > 0).length;
        const readTime = Math.ceil(wordCount / 225); // average reading speed 225 wpm

        return { charCount, wordCount, sentenceCount, paragraphCount, readTime };
    };

    const handleCopy = () => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        toast.success('Copied text to clipboard!');
    };

    const handleCaseChange = (caseType: 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake' | 'pascal' | 'constant') => {
        if (!text) return;

        let result = text;
        const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);

        switch (caseType) {
            case 'upper':
                result = text.toUpperCase();
                break;
            case 'lower':
                result = text.toLowerCase();
                break;
            case 'title':
                result = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
                break;
            case 'sentence':
                result = text.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
                break;
            case 'camel':
                result = words.map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join('');
                break;
            case 'snake':
                result = words.join('_');
                break;
            case 'pascal':
                result = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
                break;
            case 'constant':
                result = words.map(w => w.toUpperCase()).join('_');
                break;
        }

        setText(result);
        toast.success(`Converted to ${caseType} case!`);
    };

    const stats = getStats();

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">Smart Text Case Converter</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Convert your texts, code strings, or content structures dynamically into different writing or programming cases.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs and conversions (8 columns) */}
                <div className="lg:col-span-8 space-y-4">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste or type your text here to transform cases..."
                        rows={8}
                        className="w-full bg-black/45 border border-white/10 rounded-2xl p-5 text-sm outline-none text-white focus:border-indigo-500 transition font-sans leading-relaxed resize-y"
                    />

                    {/* Case Buttons */}
                    <div className="flex flex-wrap gap-2.5">
                        <button
                            onClick={() => handleCaseChange('sentence')}
                            disabled={!text}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-xl border border-white/5 text-xs font-semibold uppercase tracking-wider transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Sentence case
                        </button>
                        <button
                            onClick={() => handleCaseChange('upper')}
                            disabled={!text}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-xl border border-white/5 text-xs font-semibold uppercase tracking-wider transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            UPPER CASE
                        </button>
                        <button
                            onClick={() => handleCaseChange('lower')}
                            disabled={!text}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-xl border border-white/5 text-xs font-semibold uppercase tracking-wider transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            lower case
                        </button>
                        <button
                            onClick={() => handleCaseChange('title')}
                            disabled={!text}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-xl border border-white/5 text-xs font-semibold uppercase tracking-wider transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Title Case
                        </button>
                        <button
                            onClick={() => handleCaseChange('camel')}
                            disabled={!text}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-xl border border-white/5 text-xs font-semibold uppercase tracking-wider transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            camelCase
                        </button>
                        <button
                            onClick={() => handleCaseChange('snake')}
                            disabled={!text}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-xl border border-white/5 text-xs font-semibold uppercase tracking-wider transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            snake_case
                        </button>
                        <button
                            onClick={() => handleCaseChange('pascal')}
                            disabled={!text}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-xl border border-white/5 text-xs font-semibold uppercase tracking-wider transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            PascalCase
                        </button>
                        <button
                            onClick={() => handleCaseChange('constant')}
                            disabled={!text}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-xl border border-white/5 text-xs font-semibold uppercase tracking-wider transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            CONSTANT_CASE
                        </button>
                    </div>
                </div>

                {/* Statistics panel (4 columns) */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6 space-y-4">
                        <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                            <AlignLeft className="h-4 w-4" /> Text Analytics
                        </span>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/35 border border-white/5 p-3.5 rounded-xl">
                                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Characters</p>
                                <p className="text-lg font-bold text-neutral-200 mt-1 font-mono">{stats.charCount}</p>
                            </div>
                            <div className="bg-black/35 border border-white/5 p-3.5 rounded-xl">
                                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Words</p>
                                <p className="text-lg font-bold text-neutral-200 mt-1 font-mono">{stats.wordCount}</p>
                            </div>
                            <div className="bg-black/35 border border-white/5 p-3.5 rounded-xl">
                                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Sentences</p>
                                <p className="text-lg font-bold text-neutral-200 mt-1 font-mono">{stats.sentenceCount}</p>
                            </div>
                            <div className="bg-black/35 border border-white/5 p-3.5 rounded-xl">
                                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Paragraphs</p>
                                <p className="text-lg font-bold text-neutral-200 mt-1 font-mono">{stats.paragraphCount}</p>
                            </div>
                        </div>

                        <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-xl flex items-center justify-between text-xs text-neutral-300">
                            <span>Estimated Read Time:</span>
                            <span className="font-bold text-indigo-400 uppercase tracking-wider">{stats.readTime} min read</span>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setText('')}
                                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-xl border border-white/5 transition text-xs font-semibold uppercase tracking-wider"
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleCopy}
                                disabled={!text}
                                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition text-xs uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                            >
                                <Clipboard className="h-4 w-4" /> Copy Text
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
