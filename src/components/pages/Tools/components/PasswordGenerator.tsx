import { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check, ShieldAlert, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PasswordGenerator() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState({ score: 0, text: 'Weak', color: 'bg-red-500' });

    const generatePassword = () => {
        let charset = '';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        if (!charset) {
            toast.error('Select at least one character type!');
            return;
        }

        let generated = '';
        const crypto = window.crypto || (window as any).msCrypto;
        if (crypto) {
            const values = new Uint32Array(length);
            crypto.getRandomValues(values);
            for (let i = 0; i < length; i++) {
                generated += charset[values[i] % charset.length];
            }
        } else {
            for (let i = 0; i < length; i++) {
                generated += charset.charAt(Math.floor(Math.random() * charset.length));
            }
        }
        setPassword(generated);
        setCopied(false);
    };

    useEffect(() => {
        generatePassword();
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    useEffect(() => {
        if (!password) return;
        let score = 0;
        if (password.length >= 8) score += 1;
        if (password.length >= 14) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        let text = 'Weak';
        let color = 'bg-red-500 w-[20%]';
        if (score === 3) {
            text = 'Fair';
            color = 'bg-orange-500 w-[50%]';
        } else if (score === 4) {
            text = 'Strong';
            color = 'bg-indigo-500 w-[80%]';
        } else if (score >= 5) {
            text = 'Very Secure';
            color = 'bg-emerald-500 w-[100%]';
        }

        setStrength({ score, text, color });
    }, [password]);

    const handleCopy = () => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        toast.success('Copied password to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">Password Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Instantly generate highly secure, random passwords.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8">
                {/* Customizer */}
                <div className="space-y-6">
                    {/* Length Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-neutral-300">Password Length</span>
                            <span className="text-indigo-400 font-mono text-base">{length}</span>
                        </div>
                        <input
                            type="range"
                            min="8"
                            max="64"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-4 pt-2">
                        <label className="text-sm font-medium text-neutral-300 block">Character Options</label>
                        
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={includeUppercase}
                                onChange={(e) => setIncludeUppercase(e.target.checked)}
                                className="w-4.5 h-4.5 rounded bg-white/5 border border-white/20 text-indigo-600 focus:ring-indigo-500 accent-indigo-500 cursor-pointer"
                            />
                            <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">Uppercase (A-Z)</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={includeLowercase}
                                onChange={(e) => setIncludeLowercase(e.target.checked)}
                                className="w-4.5 h-4.5 rounded bg-white/5 border border-white/20 text-indigo-600 focus:ring-indigo-500 accent-indigo-500 cursor-pointer"
                            />
                            <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">Lowercase (a-z)</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={(e) => setIncludeNumbers(e.target.checked)}
                                className="w-4.5 h-4.5 rounded bg-white/5 border border-white/20 text-indigo-600 focus:ring-indigo-500 accent-indigo-500 cursor-pointer"
                            />
                            <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">Numbers (0-9)</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={includeSymbols}
                                onChange={(e) => setIncludeSymbols(e.target.checked)}
                                className="w-4.5 h-4.5 rounded bg-white/5 border border-white/20 text-indigo-600 focus:ring-indigo-500 accent-indigo-500 cursor-pointer"
                            />
                            <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">Symbols (!@#$%^&*)</span>
                        </label>
                    </div>
                </div>

                {/* Display Panel */}
                <div className="flex flex-col justify-between space-y-6">
                    {/* Password display bar */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-300">Generated Password</label>
                        <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl p-4 overflow-hidden">
                            <span className="text-white font-mono tracking-wide select-all break-all pr-12 text-base md:text-lg">
                                {password || '...'}
                            </span>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                <button
                                    onClick={generatePassword}
                                    className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition"
                                    title="Regenerate"
                                >
                                    <RefreshCw className="h-4.5 w-4.5" />
                                </button>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition"
                                    title="Copy to Clipboard"
                                >
                                    {copied ? <Check className="h-4.5 w-4.5 text-emerald-400" /> : <Copy className="h-4.5 w-4.5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Strength Indicator */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-400">Password Strength:</span>
                            <span className={`font-semibold flex items-center gap-1.5 ${
                                strength.score >= 4 ? 'text-emerald-400' : strength.score === 3 ? 'text-indigo-400' : 'text-red-400'
                            }`}>
                                {strength.score >= 4 ? (
                                    <ShieldCheck className="h-4 w-4" />
                                ) : (
                                    <ShieldAlert className="h-4 w-4" />
                                )}
                                {strength.text}
                            </span>
                        </div>
                        {/* Custom progress meter */}
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
