import { useState } from 'react';
import { Play, Clipboard, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function JsonFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleFormat = () => {
        if (!input.trim()) {
            setError(null);
            setOutput('');
            return;
        }
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, 4));
            setError(null);
            toast.success('Formatted successfully!');
        } catch (e: any) {
            setError(e.message);
            setOutput('');
        }
    };

    const handleMinify = () => {
        if (!input.trim()) {
            setError(null);
            setOutput('');
            return;
        }
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError(null);
            toast.success('Minified successfully!');
        } catch (e: any) {
            setError(e.message);
            setOutput('');
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        toast.success('Copied to clipboard!');
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setError(null);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">JSON Formatter & Validator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Paste raw JSON to validate, format, or minify it instantly.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Panel */}
                <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-neutral-300">Input JSON</label>
                        <div className="flex gap-2">
                            <button
                                onClick={handleFormat}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-medium"
                            >
                                <Play className="h-3 w-3" /> Format
                            </button>
                            <button
                                onClick={handleMinify}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition font-medium"
                            >
                                Minify
                            </button>
                            <button
                                onClick={handleClear}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-lg transition font-medium"
                            >
                                <Trash2 className="h-3 w-3" /> Clear
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='{\n  "name": "WebnexFusion",\n  "type": "Solutions",\n  "status": "Active"\n}'
                        className="w-full h-80 pl-4 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white font-mono text-sm placeholder:text-neutral-600 resize-none"
                    />
                </div>

                {/* Output Panel */}
                <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-neutral-300">Result</label>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition font-medium"
                            >
                                <Clipboard className="h-3.5 w-3.5" /> Copy Code
                            </button>
                        )}
                    </div>
                    <div className="relative w-full h-80 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                        {error ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-red-500/5">
                                <AlertCircle className="h-10 w-10 text-red-400 mb-2" />
                                <span className="text-sm font-semibold text-red-300">Invalid JSON</span>
                                <span className="text-xs text-red-400 mt-1 font-mono">{error}</span>
                            </div>
                        ) : output ? (
                            <textarea
                                readOnly
                                value={output}
                                className="w-full h-full pl-4 pr-4 py-3 bg-transparent outline-none border-none text-white font-mono text-sm resize-none"
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-neutral-500">
                                <CheckCircle2 className="h-10 w-10 text-neutral-600 mb-2" />
                                <span className="text-sm">Validation and formatting output will appear here.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
