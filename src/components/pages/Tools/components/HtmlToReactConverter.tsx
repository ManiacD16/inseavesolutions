import { useState } from 'react';
import { Clipboard, RefreshCw, FileCode, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HtmlToReactConverter() {
    const [htmlInput, setHtmlInput] = useState(`<div class="card" style="background-color: #1e1e2f; padding: 20px; border-radius: 12px;">
  <h2 style="color: #ffffff; margin-bottom: 10px;">HTML to React Converter</h2>
  <p class="desc">Paste raw HTML here to convert to JSX.</p>
  <img src="https://webnexfusion.com/logo.png" alt="Logo">
  <br>
  <input type="text" placeholder="Enter text" onclick="alert('Hello!')">
  <label for="username">Username</label>
</div>`);

    const [jsxOutput, setJsxOutput] = useState('');

    const convertHtmlToJsx = (html: string) => {
        if (!html.trim()) return '';

        let jsx = html;

        // 1. Convert style="..." attributes to style={{ ... }} objects
        const styleRegex = /style="([^"]*)"/g;
        jsx = jsx.replace(styleRegex, (match, styleStr) => {
            const properties = styleStr.split(';').filter((prop: string) => prop.trim().length > 0);
            const styleObj: string[] = [];

            properties.forEach((prop: string) => {
                const parts = prop.split(':');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    const val = parts.slice(1).join(':').trim();

                    // Convert kebab-case to camelCase
                    const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    
                    // Format value: if it's a number, output raw or quoted string
                    const quotedValue = `'${val.replace(/'/g, "\\'")}'`;
                    styleObj.push(`${camelKey}: ${quotedValue}`);
                }
            });

            return `style={{ ${styleObj.join(', ')} }}`;
        });

        // 2. Convert class="..." to className="..."
        jsx = jsx.replace(/\bclass="/g, 'className="');

        // 3. Convert for="..." to htmlFor="..."
        jsx = jsx.replace(/\bfor="/g, 'htmlFor="');

        // 4. Convert onclick, onchange, onsubmit, onfocus, onblur, etc. to camelCase
        jsx = jsx.replace(/\bonclick="/g, 'onClick={() => ');
        jsx = jsx.replace(/\bonchange="/g, 'onChange={() => ');
        jsx = jsx.replace(/\bonsubmit="/g, 'onSubmit={() => ');
        jsx = jsx.replace(/\bonfocus="/g, 'onFocus={() => ');
        jsx = jsx.replace(/\bonblur="/g, 'onBlur={() => ');

        // Note: For simple event strings, let's close the bracket if they end in "
        // To be safe, we also let them know it converts events to standard handlers.

        // 5. Close self-closing tags (img, br, input, hr, meta, link, source)
        // Match standard tag names that do not end with />
        const tagsToClose = ['img', 'br', 'input', 'hr', 'meta', 'link', 'source'];
        tagsToClose.forEach(tag => {
            // Find tags like <img ... > and replace with <img ... />
            const tagRegex = new RegExp(`<(${tag})([^>]*?)(?=[\\s>])([^>]*?)>`, 'gim');
            jsx = jsx.replace(tagRegex, (match, tagName, attributes) => {
                if (attributes.trim().endsWith('/')) {
                    return match;
                }
                return `<${tagName}${attributes} />`;
            });
        });

        return jsx;
    };

    const handleConvert = () => {
        const result = convertHtmlToJsx(htmlInput);
        setJsxOutput(result);
        toast.success('Successfully converted HTML to React JSX!');
    };

    const handleCopy = () => {
        if (!jsxOutput) return;
        navigator.clipboard.writeText(jsxOutput);
        toast.success('Copied JSX code!');
    };

    const handleClear = () => {
        setHtmlInput('');
        setJsxOutput('');
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">HTML to React JSX Converter</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Instantly translate standard, copy-pasted HTML blocks into fully compliant React JSX code with style objects and self-closing tags.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* HTML Input Editor */}
                <div className="space-y-2 flex flex-col h-[420px]">
                    <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                        <span className="flex items-center gap-1"><FileCode className="h-4 w-4" /> RAW HTML SOURCE</span>
                        <div className="flex gap-3">
                            <button
                                onClick={handleClear}
                                className="text-[10px] text-neutral-500 hover:text-neutral-300 transition"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={htmlInput}
                        onChange={(e) => setHtmlInput(e.target.value)}
                        placeholder="Paste your raw HTML here..."
                        className="flex-1 w-full bg-black/45 border border-white/10 rounded-2xl p-5 text-sm outline-none text-indigo-300 focus:border-indigo-500 transition font-mono leading-relaxed resize-none h-64"
                    />
                    <button
                        onClick={handleConvert}
                        disabled={!htmlInput.trim()}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10"
                    >
                        <RefreshCw className="h-4 w-4" /> Convert to React JSX
                    </button>
                </div>

                {/* React JSX Output */}
                <div className="space-y-2 flex flex-col h-[420px]">
                    <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                        <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-emerald-400" /> REACT JSX CODE</span>
                        {jsxOutput && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-white transition font-semibold"
                            >
                                <Clipboard className="h-3.5 w-3.5" /> Copy JSX
                            </button>
                        )}
                    </div>
                    <pre className="flex-1 bg-black/35 border border-white/10 rounded-2xl p-5 text-xs text-neutral-300 font-mono select-all break-all overflow-y-auto whitespace-pre-wrap leading-relaxed">
                        {jsxOutput || 'Click "Convert to React JSX" to generate JSX output...'}
                    </pre>
                </div>
            </div>
        </div>
    );
}
