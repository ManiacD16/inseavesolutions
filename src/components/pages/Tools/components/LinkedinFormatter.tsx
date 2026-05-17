import { useState, useEffect } from 'react';
import { Sliders, Copy, Check, RefreshCw, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LinkedinFormatter() {
    const [text, setText] = useState('Just launched our new product today!\nWe built 48 premium web utilities to automate your daily workflows.\nCheck it out and share your thoughts below.');
    const [boldHeadline, setBoldHeadline] = useState(true);
    const [addSpacers, setAddSpacers] = useState(true);
    const [copied, setCopied] = useState(false);
    const [formattedText, setFormattedText] = useState('');

    // Standard Bold Unicode mapper helper
    const toBoldUnicode = (str: string) => {
        const boldChars: Record<string, string> = {
            a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇',
            A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧', U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭',
            '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
        };
        return str.split('').map(c => boldChars[c] || c).join('');
    };

    const formatPost = () => {
        if (!text.trim()) {
            setFormattedText('');
            return;
        }

        let lines = text.split('\n');
        
        // 1. Bold first line/headline if enabled
        if (boldHeadline && lines.length > 0) {
            lines[0] = toBoldUnicode(lines[0]);
        }

        // 2. Add spaces between lines to make it highly scannable on mobile
        let result = '';
        if (addSpacers) {
            result = lines.filter(l => l.trim()).join('\n\n🚀 ');
            // Add a starting bullet icon
            result = '🚀 ' + result;
        } else {
            result = lines.join('\n');
        }

        setFormattedText(result);
    };

    useEffect(() => {
        formatPost();
    }, [text, boldHeadline, addSpacers]);

    const handleCopy = () => {
        if (!formattedText) return;
        navigator.clipboard.writeText(formattedText);
        setCopied(true);
        toast.success('Formatted LinkedIn post copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Send className="h-6 w-6 text-indigo-400" /> LinkedIn Engagement Post Formatter
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Reformat standard social posts. Automatically adds readability spacers and converts headlines to bold unicode characters.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Raw Post Text:
                    </span>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={10}
                        placeholder="Paste your raw LinkedIn draft copy here..."
                        className="w-full bg-black/45 border border-white/10 rounded-2xl p-5 text-xs text-white outline-none focus:border-indigo-500 transition leading-relaxed resize-none font-mono"
                    />

                    {/* Parameters switches */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                        <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-2">
                            <Sliders className="h-4 w-4" /> Parameters
                        </span>

                        <label className="flex items-center gap-3 cursor-pointer text-xs text-neutral-300">
                            <input
                                type="checkbox"
                                checked={boldHeadline}
                                onChange={(e) => setBoldHeadline(e.target.checked)}
                                className="w-4 h-4 rounded bg-black border border-white/10 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>Bold first line headline (using Unicode)</span>
                        </label>
                        
                        <label className="flex items-center gap-3 cursor-pointer text-xs text-neutral-300">
                            <input
                                type="checkbox"
                                checked={addSpacers}
                                onChange={(e) => setAddSpacers(e.target.checked)}
                                className="w-4 h-4 rounded bg-black border border-white/10 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>Inject double-line breakers & bullet emojis</span>
                        </label>
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                        Formatted Engagement Post:
                    </span>

                    {formattedText ? (
                        <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-2xl space-y-4">
                            <textarea
                                readOnly
                                value={formattedText}
                                rows={10}
                                className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-xs text-neutral-200 outline-none resize-none font-sans select-all leading-relaxed whitespace-pre-wrap"
                            />

                            <button
                                onClick={handleCopy}
                                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} Copy Formatted Post
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-10 text-xs text-neutral-500">
                            Type text in the raw draft box to preview formatted options.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
