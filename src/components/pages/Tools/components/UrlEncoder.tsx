import { useState } from 'react';
import { Clipboard, ArrowRight, RefreshCw, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UrlEncoder() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleEncode = () => {
        if (!input.trim()) return;
        try {
            setOutput(encodeURIComponent(input));
            toast.success('Encoded successfully!');
        } catch (e: any) {
            toast.error('Failed to encode: ' + e.message);
        }
    };

    const handleDecode = () => {
        if (!input.trim()) return;
        try {
            setOutput(decodeURIComponent(input));
            toast.success('Decoded successfully!');
        } catch (e: any) {
            toast.error('Failed to decode: ' + e.message);
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
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">URL Encoder / Decoder</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Convert standard text to URL-safe string format and vice versa.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Panel */}
                <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-neutral-300">Input String</label>
                        <div className="flex gap-2">
                            <button
                                onClick={handleEncode}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-medium"
                            >
                                Encode
                            </button>
                            <button
                                onClick={handleDecode}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition font-medium"
                            >
                                Decode
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
                        placeholder="Type or paste text to encode/decode (e.g. hello world & company)"
                        className="w-full h-80 pl-4 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white text-sm placeholder:text-neutral-600 resize-none"
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
                        {output ? (
                            <textarea
                                readOnly
                                value={output}
                                className="w-full h-full pl-4 pr-4 py-3 bg-transparent outline-none border-none text-white text-sm resize-none"
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-neutral-500">
                                <ArrowRight className="h-10 w-10 text-neutral-600 mb-2" />
                                <span className="text-sm">Processed output will appear here.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
