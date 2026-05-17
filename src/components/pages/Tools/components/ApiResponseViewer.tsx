import { useState } from 'react';
import { Clipboard, Send, Play, Terminal, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ApiResponseViewer() {
    const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
    const [method, setMethod] = useState<'GET' | 'POST' | 'PUT'>('GET');
    const [reqBody, setReqBody] = useState('{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}');
    const [response, setResponse] = useState<any>(null);
    const [resHeaders, setResHeaders] = useState<any>(null);
    const [status, setStatus] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSend = async () => {
        setLoading(true);
        setError('');
        setResponse(null);
        setResHeaders(null);
        setStatus(null);

        try {
            const options: RequestInit = {
                method,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            if (method !== 'GET') {
                options.body = reqBody;
            }

            const res = await fetch(url, options);
            setStatus(res.status);

            // Fetch Headers
            const headersObj: Record<string, string> = {};
            res.headers.forEach((value, key) => {
                headersObj[key] = value;
            });
            setResHeaders(headersObj);

            const json = await res.json();
            setResponse(json);
            toast.success(`Request completed with Status ${res.status}`);
        } catch (e: any) {
            setError(e.message || 'API request failed due to CORS policies or network disruption.');
            toast.error('Request failed.');
        } finally {
            setLoading(false);
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
                <h3 className="text-xl font-semibold text-white">API Response Viewer & HTTP Request Client</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Simulate API endpoints and inspect raw responses client-side. Test public, CORS-enabled REST endpoints instantly.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Request details (6 columns) */}
                <div className="lg:col-span-6 space-y-4">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase block border-b border-white/5 pb-2">
                        Configure HTTP Request
                    </span>

                    {/* Method and URL */}
                    <div className="flex gap-2">
                        <select
                            value={method}
                            onChange={(e) => setMethod(e.target.value as any)}
                            className="bg-black/45 border border-white/10 rounded-xl px-3 text-xs text-white outline-none font-bold"
                        >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                        </select>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                            placeholder="https://api.example.com/data"
                        />
                    </div>

                    {/* Request Body (only for non-GET) */}
                    {method !== 'GET' && (
                        <div className="space-y-2">
                            <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">JSON Request Body</label>
                            <textarea
                                value={reqBody}
                                onChange={(e) => setReqBody(e.target.value)}
                                rows={6}
                                className="w-full bg-black/45 border border-white/10 rounded-xl p-3 text-xs outline-none text-indigo-300 focus:border-indigo-500 transition font-mono leading-relaxed resize-none"
                            />
                        </div>
                    )}

                    <button
                        onClick={handleSend}
                        disabled={loading || !url.trim()}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10"
                    >
                        {loading ? 'Sending Request...' : <span className="flex items-center gap-1.5"><Send className="h-4 w-4" /> Trigger HTTP Request</span>}
                    </button>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 text-xs text-neutral-400">
                        <HelpCircle className="h-5 w-5 text-neutral-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                            <strong>Note:</strong> Since this runs purely in your browser, target URLs must have CORS headers enabled (like <code>Access-Control-Allow-Origin: *</code>). Testing standard mock sites like JSONPlaceholder is fully supported!
                        </span>
                    </div>
                </div>

                {/* Response details (6 columns) */}
                <div className="lg:col-span-6 space-y-4">
                    {/* Status Badge */}
                    {status && (
                        <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-semibold">
                            <span className="text-neutral-400">Response Status Code:</span>
                            <span className={`px-2.5 py-1 rounded ${
                                status >= 200 && status < 300 
                                    ? 'bg-emerald-500/10 text-emerald-400' 
                                    : 'bg-red-500/10 text-red-400'
                            }`}>
                                {status} {status === 200 ? 'OK' : status === 201 ? 'CREATED' : 'ERROR'}
                            </span>
                        </div>
                    )}

                    {/* JSON Output */}
                    <div className="space-y-2 flex flex-col h-[340px]">
                        <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                            <span className="flex items-center gap-1.5"><Terminal className="h-4 w-4" /> RESPONSE BODY JSON</span>
                            {response && (
                                <button
                                    onClick={() => handleCopy(response)}
                                    className="text-[10px] text-indigo-400 hover:underline"
                                >
                                    Copy JSON
                                </button>
                            )}
                        </div>
                        <pre className="flex-1 bg-black/35 border border-white/10 rounded-2xl p-4 text-xs text-neutral-300 font-mono select-all break-all overflow-y-auto whitespace-pre-wrap leading-relaxed">
                            {loading 
                                ? 'Dispatching network request...' 
                                : error 
                                    ? `Error: ${error}` 
                                    : response 
                                        ? JSON.stringify(response, null, 2) 
                                        : 'Awaiting HTTP request dispatch...'}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
