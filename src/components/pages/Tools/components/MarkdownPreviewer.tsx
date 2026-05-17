import { useState } from 'react';
import { Clipboard, Eye, Code, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MarkdownPreviewer() {
    const [markdown, setMarkdown] = useState(`# Welcome to WebnexFusion Markdown Editor!

Here is a quick demonstration of what you can do:

## Formatting Styles
You can make text **bold** or *italic* easily, or embed \`inline code blocks\` inside sentences.

## Interactive Elements
Create custom hyperlinks like [WebnexFusion Website](https://webnexfusion.com) to route traffic.

* Learn, build, and optimize daily.
* Share viral content tools!`);

    const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');

    const parseMarkdown = (md: string) => {
        let html = md
            // Escape HTML tags to prevent XSS in code segments
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // Headers
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold border-b border-white/10 pb-2 mb-4 text-white">$1</h1>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-3 text-white">$1</h2>')
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-3 mb-2 text-white">$1</h3>')
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Inline Code
            .replace(/\`(.*?)\`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded font-mono text-xs text-indigo-300">$1</code>')
            // Links
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:text-indigo-300 underline">$1</a>')
            // Lists (simple conversion)
            .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc text-neutral-300">$1</li>')
            .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-neutral-300">$1</li>')
            // Paragraph breaks
            .replace(/\n\n/g, '</p><p class="mb-4 text-neutral-300 leading-relaxed">')
            .replace(/\n/g, '<br />');

        return `<p class="mb-4 text-neutral-300 leading-relaxed">${html}</p>`;
    };

    const generatedHtml = parseMarkdown(markdown);

    const handleCopyHtml = () => {
        navigator.clipboard.writeText(generatedHtml);
        toast.success('Copied HTML code!');
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">Markdown Live Previewer & HTML Editor</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Write standard Markdown syntax on the left, see beautiful HTML rendering, and copy pure HTML rules instantly.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Editor Left */}
                <div className="space-y-2 flex flex-col h-[400px]">
                    <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                        <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> MARKDOWN EDITOR</span>
                        <span className="text-[10px] text-neutral-500 font-mono">{markdown.length} chars</span>
                    </div>
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        className="flex-1 w-full bg-black/45 border border-white/10 rounded-2xl p-5 text-sm outline-none text-white focus:border-indigo-500 transition font-mono leading-relaxed resize-none"
                        placeholder="# Enter Markdown here..."
                    />
                </div>

                {/* Preview/HTML Right */}
                <div className="space-y-2 flex flex-col h-[400px]">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition ${
                                    activeTab === 'preview'
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Eye className="h-3.5 w-3.5" /> Live Preview
                            </button>
                            <button
                                onClick={() => setActiveTab('html')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition ${
                                    activeTab === 'html'
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <Code className="h-3.5 w-3.5" /> Raw HTML
                            </button>
                        </div>

                        {activeTab === 'html' && (
                            <button
                                onClick={handleCopyHtml}
                                className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-white transition font-semibold"
                            >
                                <Clipboard className="h-3.5 w-3.5" /> Copy HTML
                            </button>
                        )}
                    </div>

                    <div className="flex-1 w-full bg-black/35 border border-white/10 rounded-2xl p-5 overflow-y-auto">
                        {activeTab === 'preview' ? (
                            <div 
                                className="prose prose-invert max-w-none text-sm text-neutral-300"
                                dangerouslySetInnerHTML={{ __html: generatedHtml }}
                            />
                        ) : (
                            <pre className="text-xs text-indigo-300 font-mono whitespace-pre-wrap select-all leading-relaxed break-all">
                                {generatedHtml}
                            </pre>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
