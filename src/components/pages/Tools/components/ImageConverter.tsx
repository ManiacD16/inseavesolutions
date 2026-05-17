import { useState, useRef } from 'react';
import { Upload, Download, FileImage, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ImageConverter() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [fileName, setFileName] = useState('');
    const [fileSize, setFileSize] = useState<number>(0);
    const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/webp');
    const [quality, setQuality] = useState(80);
    const [convertedSrc, setConvertedSrc] = useState<string | null>(null);
    const [convertedSize, setConvertedSize] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setFileSize(file.size);
        setConvertedSrc(null);
        setConvertedSize(0);

        const reader = new FileReader();
        reader.onload = (event) => {
            setImageSrc(event.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleConvert = () => {
        if (!imageSrc) return;
        setLoading(true);

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
                toast.error('Canvas processing failed!');
                setLoading(false);
                return;
            }

            // If target is JPEG, paint white background in case of PNG transparency
            if (targetFormat === 'image/jpeg') {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0);

            // Compress and convert
            const qualityValue = targetFormat === 'image/png' ? undefined : quality / 100;
            const dataUrl = canvas.toDataURL(targetFormat, qualityValue);
            setConvertedSrc(dataUrl);

            // Estimate converted size from base64 string
            const base64Length = dataUrl.split(',')[1].length;
            const estimatedBytes = Math.floor(base64Length * 0.75);
            setConvertedSize(estimatedBytes);
            
            setLoading(false);
            toast.success('Converted successfully!');
        };
        img.onerror = () => {
            toast.error('Failed to load image.');
            setLoading(false);
        };
        img.src = imageSrc;
    };

    const triggerDownload = () => {
        if (!convertedSrc) return;
        const link = document.createElement('a');
        const ext = targetFormat === 'image/jpeg' ? 'jpg' : targetFormat === 'image/png' ? 'png' : 'webp';
        const baseName = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
        link.download = `${baseName}_converted.${ext}`;
        link.href = convertedSrc;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = 2;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const handleClear = () => {
        setImageSrc(null);
        setFileName('');
        setFileSize(0);
        setConvertedSrc(null);
        setConvertedSize(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">Image Converter & Compressor</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Convert any PNG, JPEG, or WebP image locally inside your browser and adjust output quality compression.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Upload & Controls (5 columns) */}
                <div className="lg:col-span-5 space-y-6 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Drag and Drop Zone */}
                    {!imageSrc ? (
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full h-44 rounded-xl border border-dashed border-white/20 hover:border-indigo-500/50 hover:bg-white/5 flex flex-col items-center justify-center gap-3 transition group"
                        >
                            <Upload className="h-10 w-10 text-neutral-500 group-hover:text-indigo-400 transition" />
                            <span className="text-sm text-neutral-300 font-semibold">Upload Image File</span>
                            <span className="text-xs text-neutral-500">Supports PNG, JPG, WEBP</span>
                        </button>
                    ) : (
                        <div className="space-y-4">
                            <div className="relative rounded-xl overflow-hidden border border-white/10 max-h-48 bg-black/40 flex items-center justify-center">
                                <img src={imageSrc} alt="Source preview" className="object-contain max-h-44" />
                            </div>
                            <div className="flex justify-between items-center bg-white/5 border border-white/5 p-3 rounded-lg text-xs">
                                <div className="space-y-1">
                                    <p className="text-white font-medium truncate max-w-[150px]" title={fileName}>{fileName}</p>
                                    <p className="text-neutral-400">{formatBytes(fileSize)}</p>
                                </div>
                                <button
                                    onClick={handleClear}
                                    className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-300 rounded border border-red-500/20 transition font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Controls */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                        {/* Format Select */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Target Format</label>
                            <select
                                value={targetFormat}
                                onChange={(e) => setTargetFormat(e.target.value as any)}
                                className="w-full bg-black/45 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none text-white focus:border-indigo-500 transition"
                            >
                                <option value="image/webp">WEBP (.webp)</option>
                                <option value="image/jpeg">JPEG (.jpg)</option>
                                <option value="image/png">PNG (.png)</option>
                            </select>
                        </div>

                        {/* Quality Compressor (not for PNG) */}
                        {targetFormat !== 'image/png' && (
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium text-neutral-300">
                                    <span className="uppercase tracking-wider">Compression Quality</span>
                                    <span className="font-mono text-indigo-400">{quality}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={quality}
                                    onChange={(e) => setQuality(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                />
                            </div>
                        )}

                        {/* Process Button */}
                        <button
                            onClick={handleConvert}
                            disabled={!imageSrc || loading}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? 'Processing...' : 'Convert Image'}
                        </button>
                    </div>
                </div>

                {/* Conversion Result (7 columns) */}
                <div className="lg:col-span-7 flex flex-col justify-between min-h-[350px]">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col justify-center items-center text-center relative overflow-hidden">
                        {convertedSrc ? (
                            <div className="w-full h-full flex flex-col justify-between space-y-6">
                                <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase block text-left">CONVERTED RESULT</span>
                                
                                <div className="relative rounded-xl overflow-hidden border border-white/10 max-h-48 bg-black/40 flex items-center justify-center">
                                    <img src={convertedSrc} alt="Converted preview" className="object-contain max-h-44" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 bg-white/5 border border-white/5 p-4 rounded-xl text-left">
                                    <div>
                                        <p className="text-[10px] text-neutral-500 uppercase font-semibold">Original Size</p>
                                        <p className="text-sm font-semibold text-neutral-300 mt-0.5">{formatBytes(fileSize)}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-neutral-500 uppercase font-semibold">Compressed Size</p>
                                        <p className="text-sm font-semibold text-emerald-400 mt-0.5">
                                            {formatBytes(convertedSize)}
                                            {convertedSize < fileSize && (
                                                <span className="text-[10px] text-emerald-500 ml-1.5 font-normal">
                                                    (-{((1 - convertedSize / fileSize) * 100).toFixed(0)}%)
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={triggerDownload}
                                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2"
                                >
                                    <Download className="h-4.5 w-4.5" /> Download Converted File
                                </button>
                            </div>
                        ) : (
                            <div className="text-neutral-500 max-w-sm">
                                <FileImage className="h-12 w-12 text-neutral-600 mx-auto mb-3" />
                                <h4 className="text-sm font-semibold text-neutral-300">Conversion Output</h4>
                                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                                    Once your upload is processed, the compressed image comparison, final dimensions, and download link will appear here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
