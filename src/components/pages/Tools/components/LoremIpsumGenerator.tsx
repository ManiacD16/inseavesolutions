import { useState } from 'react';
import { Clipboard, RefreshCw, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const LOREM_WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
    'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut',
    'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
    'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in',
    'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla',
    'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in',
    'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

export default function LoremIpsumGenerator() {
    const [count, setCount] = useState(5);
    const [type, setType] = useState<'paragraphs' | 'words' | 'sentences'>('paragraphs');
    const [startWithLorem, setStartWithLorem] = useState(true);
    const [wrapHtml, setWrapHtml] = useState(false);
    const [output, setOutput] = useState('');

    const generateWords = (num: number) => {
        let result = [];
        for (let i = 0; i < num; i++) {
            const word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
            result.push(word);
        }
        return result.join(' ');
    };

    const generateSentence = () => {
        const wordCount = Math.floor(Math.random() * 10) + 8; // 8 to 17 words
        let sentence = generateWords(wordCount);
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
        return sentence;
    };

    const generateParagraph = (isFirst: boolean) => {
        const sentenceCount = Math.floor(Math.random() * 4) + 4; // 4 to 7 sentences
        let sentences = [];
        
        if (isFirst && startWithLorem) {
            sentences.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
        }

        for (let i = 0; i < sentenceCount; i++) {
            sentences.push(generateSentence());
        }

        let p = sentences.join(' ');
        if (wrapHtml) {
            p = `<p>${p}</p>`;
        }
        return p;
    };

    const handleGenerate = () => {
        let result = '';

        if (type === 'paragraphs') {
            const paragraphs = [];
            for (let i = 0; i < count; i++) {
                paragraphs.push(generateParagraph(i === 0));
            }
            result = paragraphs.join(wrapHtml ? '\n' : '\n\n');
        } else if (type === 'sentences') {
            const sentences = [];
            for (let i = 0; i < count; i++) {
                sentences.push(generateSentence());
            }
            result = sentences.join(' ');
        } else if (type === 'words') {
            let words = generateWords(count);
            if (startWithLorem) {
                words = 'Lorem ipsum dolor sit amet ' + words;
            }
            result = words.charAt(0).toUpperCase() + words.slice(1);
        }

        setOutput(result);
        toast.success('Dummy content generated!');
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        toast.success('Copied dummy text!');
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">Lorem Ipsum Placeholder Text Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Instantly draft customized paragraphs, words, or sentences of Lorem Ipsum dummy text for your digital interfaces.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Customizer (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <FileText className="h-4 w-4" /> Parameters
                    </span>

                    {/* Output Type */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Generate Type</label>
                        <div className="grid grid-cols-3 gap-2">
                            {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                                        type === t 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span className="uppercase tracking-wider">Quantity</span>
                            <span className="font-mono text-indigo-400">{count} {type}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max={type === 'words' ? 300 : 20}
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3 pt-2">
                        <label className="flex items-center gap-2.5 text-xs text-neutral-300 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={startWithLorem}
                                onChange={(e) => setStartWithLorem(e.target.checked)}
                                className="w-4 h-4 rounded border-white/10 bg-black/40 accent-indigo-500 cursor-pointer"
                            />
                            <span>Start with "Lorem ipsum..."</span>
                        </label>

                        {type === 'paragraphs' && (
                            <label className="flex items-center gap-2.5 text-xs text-neutral-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={wrapHtml}
                                    onChange={(e) => setWrapHtml(e.target.checked)}
                                    className="w-4 h-4 rounded border-white/10 bg-black/40 accent-indigo-500 cursor-pointer"
                                />
                                <span>Wrap in HTML &lt;p&gt; tags</span>
                            </label>
                        )}
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerate}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10"
                    >
                        <RefreshCw className="h-4 w-4" /> Generate Placeholder
                    </button>
                </div>

                {/* Display Output (7 columns) */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                        <span>GENERATED PLACEHOLDER</span>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-white transition"
                            >
                                <Clipboard className="h-3.5 w-3.5" /> Copy Output
                            </button>
                        )}
                    </div>
                    <pre className="bg-black/35 border border-white/10 rounded-2xl p-5 text-sm text-neutral-300 font-sans select-all break-all overflow-x-auto whitespace-pre-wrap leading-relaxed h-72 overflow-y-auto">
                        {output || 'Click "Generate Placeholder" to create dummy content...'}
                    </pre>
                </div>
            </div>
        </div>
    );
}
