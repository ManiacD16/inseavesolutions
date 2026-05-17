import { useState, useEffect } from 'react';
import { Sliders, RefreshCw, Printer, Download, Eye, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';

export default function QrCodeGenerator() {
    const [text, setText] = useState('https://webnexfusion.com');
    const [size, setSize] = useState<number>(200); // 150, 200, 250, 300
    const [format, setFormat] = useState<'png' | 'svg'>('png');
    const [qrUrl, setQrUrl] = useState('');

    const generateQrCode = () => {
        if (!text.trim()) {
            setQrUrl('');
            return;
        }

        // We use the highly secure and fast public QR code generator API (qrserver)
        const encoded = encodeURIComponent(text.trim());
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&format=${format}`;
        setQrUrl(url);
    };

    useEffect(() => {
        generateQrCode();
    }, [text, size, format]);

    const handleDownload = async () => {
        if (!qrUrl) return;
        
        try {
            const response = await fetch(qrUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `qr-code-${size}x${size}.${format}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(blobUrl);
            toast.success('QR Code graphic downloaded successfully!');
        } catch (error) {
            // Fallback opening link in new tab if fetch fails due to CORS
            window.open(qrUrl, '_blank');
            toast.success('Opened QR code image in new window.');
        }
    };

    return (
        <div className="space-y-6 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 print:hidden">
                <div>
                    <h3 className="text-xl font-semibold text-white">QR Code Graphic Generator</h3>
                    <p className="text-sm text-neutral-400 mt-1">
                        Convert web links, contact coordinates, or standard text blocks into custom-sized scannable QR Code graphics.
                    </p>
                </div>
                {qrUrl && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => window.print()}
                            className="py-2.5 px-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                        >
                            <Printer className="h-4 w-4" /> Print QR
                        </button>
                        <button
                            onClick={handleDownload}
                            className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                        >
                            <Download className="h-4 w-4" /> Download QR
                        </button>
                    </div>
                )}
            </div>

            {/* Print layouts */}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #qr-print-preview, #qr-print-preview * {
                        visibility: visible;
                    }
                    #qr-print-preview {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        text-align: center;
                    }
                }
            `}</style>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6 print:hidden">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Target Data */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Target URL / Text Data</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={3}
                            placeholder="Type URL or text to encode..."
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500 transition leading-relaxed resize-none font-mono"
                        />
                    </div>

                    {/* QR Code Size */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Resolution Size</label>
                        <select
                            value={size}
                            onChange={(e) => setSize(parseInt(e.target.value) || 200)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="150">150 x 150 px (Compact)</option>
                            <option value="200">200 x 200 px (Standard)</option>
                            <option value="250">250 x 250 px (Medium)</option>
                            <option value="300">300 x 300 px (High-Res)</option>
                        </select>
                    </div>

                    {/* Format */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Image File Format</label>
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value as any)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="png">Raster PNG graphic</option>
                            <option value="svg">Vector SVG graphic</option>
                        </select>
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-7 flex items-center justify-center">
                    {qrUrl ? (
                        <div 
                            id="qr-print-preview" 
                            className="bg-white border border-neutral-200 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center gap-4 text-slate-800"
                        >
                            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                <img
                                    src={qrUrl}
                                    alt="Generated custom QR Code"
                                    style={{ width: `${size}px`, height: `${size}px` }}
                                    className="transition-all duration-300"
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                                    <QrCode className="h-4 w-4 text-indigo-600" /> Scannable Graphic
                                </p>
                                <p className="text-[10px] text-slate-500 mt-1 max-w-[220px] leading-relaxed truncate">
                                    {text}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-neutral-500 text-xs py-10 print:hidden">
                            Type data to render scannable QR codes.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
