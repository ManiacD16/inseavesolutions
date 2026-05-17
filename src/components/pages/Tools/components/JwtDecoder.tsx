import { useState } from 'react';
import { Clipboard, Shield, Calendar, Clock, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function JwtDecoder() {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState<any>(null);
    const [payload, setPayload] = useState<any>(null);
    const [expiry, setExpiry] = useState<Date | null>(null);
    const [expired, setExpired] = useState<boolean | null>(null);
    const [error, setError] = useState('');

    const base64UrlDecode = (str: string) => {
        try {
            // Replace url safe characters and add padding if necessary
            let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
            while (base64.length % 4) {
                base64 += '=';
            }
            return decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
        } catch (e) {
            throw new Error('Base64Url decoding failed.');
        }
    };

    const handleDecode = () => {
        if (!token.trim()) {
            setError('');
            setHeader(null);
            setPayload(null);
            setExpiry(null);
            setExpired(null);
            return;
        }

        const parts = token.trim().split('.');
        if (parts.length !== 3) {
            setError('Invalid JWT structure. A JWT must consist of three parts separated by dots (header.payload.signature).');
            setHeader(null);
            setPayload(null);
            setExpiry(null);
            setExpired(null);
            return;
        }

        try {
            const decodedHeader = JSON.parse(base64UrlDecode(parts[0]));
            const decodedPayload = JSON.parse(base64UrlDecode(parts[1]));

            setHeader(decodedHeader);
            setPayload(decodedPayload);
            setError('');

            // Parse exp field
            if (decodedPayload.exp) {
                const expDate = new Date(decodedPayload.exp * 1000);
                setExpiry(expDate);
                setExpired(expDate.getTime() < Date.now());
            } else {
                setExpiry(null);
                setExpired(null);
            }

            toast.success('JWT Decoded successfully!');
        } catch (e) {
            setError('Decoding failed. Please ensure the token is a valid base64url encoded JWT.');
            setHeader(null);
            setPayload(null);
            setExpiry(null);
            setExpired(null);
        }
    };

    const handleCopy = (obj: any) => {
        if (!obj) return;
        navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
        toast.success('Copied JSON string!');
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">JSON Web Token (JWT) Decoder</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Decode JWT tokens client-side instantly. View structural header parameters, payload claims, and token expiration statuses.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Token Input (5 columns) */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">Encoded JWT Token</label>
                        <textarea
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                            rows={8}
                            className="w-full bg-black/45 border border-white/10 rounded-2xl p-5 text-xs outline-none text-indigo-300 focus:border-indigo-500 transition font-mono leading-relaxed resize-none h-64 break-all"
                        />
                    </div>

                    <button
                        onClick={handleDecode}
                        disabled={!token.trim()}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <Shield className="h-4 w-4" /> Decode Token
                    </button>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex gap-3 text-xs text-red-300">
                            <AlertTriangle className="h-5 w-5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                {/* Outputs Header & Payload (7 columns) */}
                <div className="lg:col-span-7 space-y-5">
                    {/* Status Info */}
                    {payload && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                                <Clock className="h-5 w-5 text-indigo-400" />
                                <div>
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Algorithm</p>
                                    <p className="text-sm font-semibold text-neutral-200 mt-0.5">{header?.alg || 'Unknown'}</p>
                                </div>
                            </div>
                            <div className={`border rounded-xl p-4 flex items-center gap-3 ${
                                expired === null 
                                    ? 'bg-white/5 border-white/10' 
                                    : expired 
                                        ? 'bg-red-500/10 border-red-500/20' 
                                        : 'bg-emerald-500/10 border-emerald-500/20'
                            }`}>
                                <Calendar className={`h-5 w-5 ${expired ? 'text-red-400' : 'text-emerald-400'}`} />
                                <div>
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Expiration Status</p>
                                    <p className={`text-sm font-semibold mt-0.5 ${expired ? 'text-red-400' : 'text-emerald-400'}`}>
                                        {expired === null 
                                            ? 'No expiration set' 
                                            : expired 
                                                ? `Expired on ${expiry?.toLocaleDateString()}` 
                                                : `Active (Expires ${expiry?.toLocaleDateString()})`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Header JSON */}
                    {header && (
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                                <span>HEADER (ALGORITHM & TOKEN TYPE)</span>
                                <button
                                    onClick={() => handleCopy(header)}
                                    className="text-[10px] text-indigo-400 hover:underline"
                                >
                                    Copy Header
                                </button>
                            </div>
                            <pre className="bg-black/35 border border-white/10 rounded-xl p-4 text-xs text-neutral-300 font-mono overflow-x-auto">
                                {JSON.stringify(header, null, 2)}
                            </pre>
                        </div>
                    )}

                    {/* Payload Claims JSON */}
                    {payload && (
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                                <span>PAYLOAD (DATA CLAIMS)</span>
                                <button
                                    onClick={() => handleCopy(payload)}
                                    className="text-[10px] text-indigo-400 hover:underline"
                                >
                                    Copy Payload
                                </button>
                            </div>
                            <pre className="bg-black/35 border border-white/10 rounded-xl p-4 text-xs text-neutral-300 font-mono overflow-x-auto max-h-56 overflow-y-auto">
                                {JSON.stringify(payload, null, 2)}
                            </pre>
                        </div>
                    )}

                    {!header && !payload && !error && (
                        <div className="h-full flex items-center justify-center text-center p-8 border border-white/10 rounded-2xl bg-white/5">
                            <div className="max-w-sm text-neutral-500 space-y-2">
                                <Shield className="h-10 w-10 mx-auto text-neutral-600" />
                                <h4 className="text-sm font-semibold text-neutral-300">Decode Results Area</h4>
                                <p className="text-xs">Once you input a valid JWT and click decode, the unpacked header parameters and claim data payloads will render here.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
