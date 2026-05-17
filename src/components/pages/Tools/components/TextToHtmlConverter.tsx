import { useState } from 'react';
import { Clipboard, RefreshCw, FileCode, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TextToHtmlConverter() {
    const [text, setText] = useState(`Text to HTML Converter Demo

Write or paste your standard text copy here to get semantic HTML markup.

Key Features:
- Converts line breaks to paragraphs
- Detects URLs like https://webnexfusion.com and turns them into links
- Converts bulleted lines starting with '-' or '*' into HTML list items

Try editing this content to see real-time HTML rendering!`);

    const [linkify, setLinkify] = useState(true);
    const [listify, setListify] = useState(true);
    const [paragraphify, setParagraphify] = useState(true);

    const convertToHtml = (rawText: string) => {
        if (!rawText.trim()) return '';

        let processed = rawText;

        // 1. Escape HTML entities to prevent malformed tags
        processed = processed
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // 2. Linkify URLs
        if (linkify) {
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            processed = processed.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:underline">$1</a>');
        }

        // 3. Convert bullet lists
        if (listify) {
            const lines = processed.split('\n');
            let inList = false;
            processed = lines.map(line => {
                const trimmed = line.trim();
                const isBullet = trimmed.startsWith('-') || trimmed.startsWith('*');
                
                if (isBullet) {
                    const content = trimmed.substring(1).trim();
                    let item = `<li>${content}</li>`;
                    if (!inList) {
                        inList = true;
                        item = `<ul class="list-disc pl-5 my-2 space-y-1">\n  ${item}`;
                    } else {
                        item = `  ${item}`;
                    }
                    return item;
                } else {
                    if (inList) {
                        inList = false;
                        return `</ul>\n${line}`;
                    }
                    return line;
                }
            }).join('\n');
            
            if (inList) {
                processed += '\n</ul>';
            }
        }

        // 4. Wrap Paragraphs
        if (paragraphify) {
            // Split by double line breaks for distinct paragraphs
            const paragraphs = processed.split(/\n\n+/);
            processed = paragraphs
                .map(p => {
                    const trimmed = p.trim();
                    if (trimmed.startsWith('<ul') || trimmed.endsWith('</ul>')) {
                        return trimmed;
                    }
                    return `<p class="mb-4 leading-relaxed">${trimmed.replace(/\n/g, '<br />')}</p>`;
                })
                .join('\n');
        } else {
            processed = processed.replace(/\n/g, '<br />');
        }

        return processed;
    };

    const generatedHtml = convertToHtml(text);

    const handleCopy = () => {
        if (!generatedHtml) return;
        navigator.clipboard.writeText(generatedHtml);
        toast.success('Copied HTML markup!');
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">Semantic Text to HTML Converter</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Convert raw, unformatted text into perfectly structured, semantic HTML tags suitable for blogs and websites.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Editor & Controls (6 columns) */}
                <div className="lg:col-span-6 space-y-5">
                    {/* Text Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">Raw Plain Text</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter or paste your text content here..."
                            rows={8}
                            className="w-full bg-black/45 border border-white/10 rounded-2xl p-5 text-sm outline-none text-white focus:border-indigo-500 transition font-sans leading-relaxed resize-none h-64"
                        />
                    </div>

                    {/* Options Panel */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                        <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase block border-b border-white/5 pb-2">
                            Formatting Controls
                        </span>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={paragraphify}
                                    onChange={(e) => setParagraphify(e.target.checked)}
                                    className="w-4 h-4 rounded border-white/10 bg-black/40 accent-indigo-500 cursor-pointer"
                                />
                                <span>Paragraphs (&lt;p&gt;)</span>
                            </label>

                            <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={linkify}
                                    onChange={(e) => setLinkify(e.target.checked)}
                                    className="w-4 h-4 rounded border-white/10 bg-black/40 accent-indigo-500 cursor-pointer"
                                />
                                <span>Linkify URLs</span>
                            </label>

                            <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={listify}
                                    onChange={(e) => setListify(e.target.checked)}
                                    className="w-4 h-4 rounded border-white/10 bg-black/40 accent-indigo-500 cursor-pointer"
                                />
                                <span>Lists (&lt;ul&gt;/&lt;li&gt;)</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Code and Preview (6 columns) */}
                <div className="lg:col-span-6 space-y-4">
                    {/* HTML Code Box */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                            <span className="flex items-center gap-1"><FileCode className="h-4 w-4" /> GENERATED HTML</span>
                            {generatedHtml && (
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-white transition font-semibold"
                                >
                                    <Clipboard className="h-3.5 w-3.5" /> Copy Code
                                </button>
                            )}
                        </div>
                        <pre className="bg-black/35 border border-white/10 rounded-2xl p-5 text-xs text-indigo-300 font-mono select-all break-all overflow-x-auto whitespace-pre-wrap leading-relaxed h-52 overflow-y-auto">
                            {generatedHtml || 'Code will generate automatically...'}
                        </pre>
                    </div>

                    {/* Quick Live Preview Block */}
                    <div className="space-y-1.5">
                        <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block">Live Render Preview</span>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 max-h-36 overflow-y-auto text-sm text-neutral-300 prose prose-invert">
                            {generatedHtml ? (
                                <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
                            ) : (
                                <span className="text-neutral-500 italic">Preview screen empty...</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
