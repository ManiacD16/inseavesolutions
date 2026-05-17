import { useState } from 'react';
import { Clipboard, Sliders, RefreshCw, Layout } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GlassmorphismGenerator() {
    const [blur, setBlur] = useState(16);
    const [opacity, setOpacity] = useState(15);
    const [color, setColor] = useState('#ffffff');
    const [borderOpacity, setBorderOpacity] = useState(25);
    const [borderRadius, setBorderRadius] = useState(24);
    const [borderWidth, setBorderWidth] = useState(1);

    const hexToRgb = (hex: string) => {
        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    };

    const rgbColor = hexToRgb(color);
    const bgOpacityDecimal = (opacity / 100).toFixed(2);
    const borderOpacityDecimal = (borderOpacity / 100).toFixed(2);

    const generatedCss = `/* Frosted Glassmorphism Effect */
background: rgba(${rgbColor}, ${bgOpacityDecimal});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: ${borderWidth}px solid rgba(${rgbColor}, ${borderOpacityDecimal});
border-radius: ${borderRadius}px;`;

    const generatedTailwind = `bg-white/[${bgOpacityDecimal}] backdrop-blur-[${blur}px] border border-white/[${borderOpacityDecimal}] rounded-[${borderRadius}px]`;

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    const handleReset = () => {
        setBlur(16);
        setOpacity(15);
        setColor('#ffffff');
        setBorderOpacity(25);
        setBorderRadius(24);
        setBorderWidth(1);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">CSS Glassmorphism Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Design modern, frosted-glass components with real-time preview and export pure CSS/Tailwind rules.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sliders Control (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                            <Sliders className="h-4 w-4" /> Parameters
                        </span>
                        <button
                            onClick={handleReset}
                            className="p-1 hover:bg-white/10 rounded text-neutral-400 hover:text-white transition"
                            title="Reset Parameters"
                        >
                            <RefreshCw className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    {/* Blur Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Backdrop Blur</span>
                            <span className="font-mono text-indigo-400">{blur}px</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="40"
                            value={blur}
                            onChange={(e) => setBlur(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Opacity Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Background Opacity</span>
                            <span className="font-mono text-indigo-400">{opacity}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={opacity}
                            onChange={(e) => setOpacity(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Border Opacity Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Border Opacity</span>
                            <span className="font-mono text-indigo-400">{borderOpacity}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={borderOpacity}
                            onChange={(e) => setBorderOpacity(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Corner Radius Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Corner Radius</span>
                            <span className="font-mono text-indigo-400">{borderRadius}px</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={borderRadius}
                            onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Color Picker */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-neutral-300 block">Frosted Color tint</label>
                        <div className="flex gap-3">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-10 h-10 rounded border-none outline-none cursor-pointer bg-transparent"
                            />
                            <input
                                type="text"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="flex-1 bg-black/35 border border-white/10 rounded-lg px-3 text-sm outline-none text-white font-mono"
                                placeholder="#ffffff"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview and CSS (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Visual Preview */}
                    <div className="relative h-56 rounded-2xl overflow-hidden flex items-center justify-center border border-white/10 bg-[#090d1f]">
                        {/* Dynamic background colorful shapes to emphasize frosted blur */}
                        <div className="absolute top-[20%] left-[20%] w-24 h-24 bg-rose-500 rounded-full blur-[10px] animate-pulse" />
                        <div className="absolute bottom-[20%] right-[25%] w-32 h-32 bg-indigo-500 rounded-full blur-[15px]" />
                        <div className="absolute top-[10%] right-[15%] w-16 h-16 bg-amber-500 rounded-full blur-[8px]" />

                        {/* Live glassmorphic preview element */}
                        <div
                            style={{
                                background: `rgba(${rgbColor}, ${bgOpacityDecimal})`,
                                backdropFilter: `blur(${blur}px)`,
                                WebkitBackdropFilter: `blur(${blur}px)`,
                                border: `${borderWidth}px solid rgba(${rgbColor}, ${borderOpacityDecimal})`,
                                borderRadius: `${borderRadius}px`,
                            }}
                            className="w-64 h-36 relative flex flex-col justify-between p-5 shadow-2xl transition-all duration-300"
                        >
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-semibold text-white/80 tracking-wider">PREVIEW CARD</span>
                                <Layout className="h-4 w-4 text-white/60" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white">Glassmorphism UI</h4>
                                <p className="text-[10px] text-white/70 mt-1">backdrop-blur: {blur}px</p>
                            </div>
                        </div>
                    </div>

                    {/* Generated Code Boxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Vanilla CSS */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                                <span>CSS CODE</span>
                                <button
                                    onClick={() => handleCopy(generatedCss)}
                                    className="flex items-center gap-1 text-[10px] text-indigo-400 hover:text-white transition"
                                >
                                    <Clipboard className="h-3 w-3" /> Copy
                                </button>
                            </div>
                            <pre className="bg-black/35 border border-white/10 rounded-xl p-3.5 text-[11px] text-neutral-300 font-mono select-all break-all overflow-x-auto whitespace-pre-wrap leading-relaxed h-28">
                                {generatedCss}
                            </pre>
                        </div>

                        {/* Tailwind CSS */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                                <span>TAILWIND CLASSES</span>
                                <button
                                    onClick={() => handleCopy(generatedTailwind)}
                                    className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-white transition"
                                >
                                    <Clipboard className="h-3 w-3" /> Copy
                                </button>
                            </div>
                            <pre className="bg-black/35 border border-white/10 rounded-xl p-3.5 text-[11px] text-neutral-300 font-mono select-all break-all overflow-x-auto whitespace-pre-wrap leading-relaxed h-28">
                                {generatedTailwind}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
