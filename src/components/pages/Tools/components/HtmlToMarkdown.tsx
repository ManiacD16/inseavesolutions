import { useState, useEffect } from 'react';
import { Sliders, Copy, Check, Terminal } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HtmlToMarkdown() {
    const [html, setHtml] = useState('<h1>Hello World</h1>\n<p>This is a <strong>bold</strong> statement with a <a href="https://inseave.com">link</a>.</p>\n<ul>\n  <li>First item</li>\n  <li>Second item</li>\n</ul>');
    const [markdown, setMarkdown] = useState('');
    const [copied, setCopied] = useState(false);

    const convertHtmlToMarkdown = () => {
        if (!html.trim()) {
            setMarkdown('');
            return;
        }

        let md = html.trim();

        // 1. Replace H1 to H6 header tags
        md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n');
        md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n');
        md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n');
        md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n');

        // 2. Replace bold tags
        md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**');

        // 3. Replace italic tags
        md = md.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*');

        // 4. Replace links <a href="...">text</a>
        md = md.replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');

        // 5. Replace simple paragraphs
        md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');

        // 6. Replace list items
        md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1');
        md = md.replace(/<\/?(ul|ol)[^>]*>/gi, '\n');

        // 7. Strip out any remaining miscellaneous tags
        md = md.replace(/<[^>]+>/g, '');

        // 8. Clean up multiple line breaks
        md = md.replace(/\n{3,}/g, '\n\n');

        setMarkdown(md.trim());
    };

    useEffect(() => {
        convertHtmlToMarkdown();
    }, [html]);

    const handleCopy = () => {
        if (!markdown) return;
        navigator.clipboard.writeText(markdown);
        setCopied(true);
        toast.success('Markdown copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">HTML to Markdown Converter</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Translate raw HTML code structures and rich tags back into standard, simplified Markdown syntax.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* HTML Input */}
                <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Raw HTML Input Code:
                    </span>
                    <textarea
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        rows={11}
                        placeholder="Paste your raw HTML here..."
                        className="w-full bg-black/45 border border-white/10 rounded-2xl p-5 text-xs text-white outline-none focus:border-indigo-500 transition leading-relaxed resize-none font-mono"
                    />
                </div>

                {/* Markdown Output */}
                <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Compiled Markdown Output:
                    </span>

                    {markdown ? (
                        <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-2xl space-y-4">
                            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                                <Terminal className="h-4 w-4" /> Markdown Buffer
                            </span>

                            <textarea
                                readOnly
                                value={markdown}
                                rows={8}
                                className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-xs text-neutral-200 outline-none resize-none font-mono select-all leading-relaxed whitespace-pre"
                            />

                            <button
                                onClick={handleCopy}
                                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Markdown Syntax
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-10 text-xs text-neutral-500">
                            Type HTML to compile Markdown structures.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
