import { useState } from 'react';
import { Clipboard, RefreshCw, Trash2, ArrowLeftRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Base64Converter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleEncode = () => {
        if (!input.trim()) return;
        try {
            // Support Unicode characters using btoa with encodeURIComponent
            const bytes = new TextEncoder().encode(input);
            let binary = '';
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            setOutput(window.btoa(binary));
            toast.success('Text encoded to Base64 successfully!');
        } catch (e: any) {
            toast.error('Failed to encode: ' + e.message);
        }
    };

    const handleDecode = () => {
        if (!input.trim()) return;
        try {
            const binary = window.atob(input.trim());
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            setOutput(new TextDecoder().decode(bytes));
            toast.success('Base64 decoded successfully!');
        } catch (e: any) {
            toast.error('Failed to decode. Ensure the input is valid Base64!');
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
                <h3 className="text-xl font-semibold text-white">Base64 String Converter</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Convert standard text to Base64 format and vice versa.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Panel */}
                <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-neutral-300">Input Text</label>
                        <div className="flex gap-2">
                            <button
                                onClick={handleEncode}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-medium"
                            >
                                Encode (Text → Base64)
                            </button>
                            <button
                                onClick={handleDecode}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition font-medium"
                            >
                                Decode (Base64 → Text)
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
                        placeholder="Type standard text or paste Base64 code here"
                        className="w-full h-80 pl-4 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white text-sm placeholder:text-neutral-600 resize-none font-mono"
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
                                className="w-full h-full pl-4 pr-4 py-3 bg-transparent outline-none border-none text-white text-sm resize-none font-mono"
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-neutral-500">
                                <ArrowLeftRight className="h-10 w-10 text-neutral-600 mb-2" />
                                <span className="text-sm">Processed output will appear here.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
