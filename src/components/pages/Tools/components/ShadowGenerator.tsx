import { useState } from 'react';
import { Clipboard, Sliders, RefreshCw, Layers } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ShadowGenerator() {
    const [hOffset, setHOffset] = useState(10);
    const [vOffset, setVOffset] = useState(10);
    const [blur, setBlur] = useState(20);
    const [spread, setSpread] = useState(0);
    const [opacity, setOpacity] = useState(15);
    const [color, setColor] = useState('#000000');
    const [inset, setInset] = useState(false);

    const hexToRgb = (hex: string) => {
        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    };

    const rgbColor = hexToRgb(color);
    const opacityDecimal = (opacity / 100).toFixed(2);
    const shadowRule = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px rgba(${rgbColor}, ${opacityDecimal})`;

    const handleCopy = () => {
        navigator.clipboard.writeText(`box-shadow: ${shadowRule};`);
        toast.success('Copied shadow style!');
    };

    const handleReset = () => {
        setHOffset(10);
        setVOffset(10);
        setBlur(20);
        setSpread(0);
        setOpacity(15);
        setColor('#000000');
        setInset(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">CSS Box-Shadow Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Design modern depth profiles by adjusting offset, blur, spread, colors, and insets with instant visual previews and CSS export.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Customizers (5 columns) */}
                <div className="lg:col-span-5 space-y-4 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
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

                    {/* Inset Toggle */}
                    <div className="flex justify-between items-center py-1">
                        <span className="text-xs font-medium text-neutral-300">Inset Shadow (Inner)</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={inset}
                                onChange={(e) => setInset(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>

                    {/* Horizontal Offset */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Horizontal Offset</span>
                            <span className="font-mono text-indigo-400">{hOffset}px</span>
                        </div>
                        <input
                            type="range"
                            min="-50"
                            max="50"
                            value={hOffset}
                            onChange={(e) => setHOffset(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Vertical Offset */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Vertical Offset</span>
                            <span className="font-mono text-indigo-400">{vOffset}px</span>
                        </div>
                        <input
                            type="range"
                            min="-50"
                            max="50"
                            value={vOffset}
                            onChange={(e) => setVOffset(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Blur Radius */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Blur Radius</span>
                            <span className="font-mono text-indigo-400">{blur}px</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={blur}
                            onChange={(e) => setBlur(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Spread Radius */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Spread Radius</span>
                            <span className="font-mono text-indigo-400">{spread}px</span>
                        </div>
                        <input
                            type="range"
                            min="-50"
                            max="50"
                            value={spread}
                            onChange={(e) => setSpread(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Color Picker & Opacity */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Shadow Color</label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-8 h-8 rounded border-none outline-none cursor-pointer bg-transparent"
                                />
                                <span className="text-xs font-mono text-neutral-300 flex items-center">{color.toUpperCase()}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-neutral-300">
                                <span>Opacity</span>
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
                    </div>
                </div>

                {/* Live Preview (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Live Preview Pane */}
                    <div className="relative h-64 rounded-2xl border border-white/10 bg-[#090d1f] flex items-center justify-center overflow-hidden">
                        <span className="absolute top-4 left-4 text-xs font-semibold text-white/55 tracking-wider uppercase">Live Preview Panel</span>

                        {/* Interactive Centered Preview Square Box */}
                        <div
                            style={{
                                boxShadow: shadowRule,
                            }}
                            className="w-36 h-36 bg-white rounded-2xl flex items-center justify-center border border-black/5"
                        >
                            <span className="text-[10px] font-bold text-neutral-800 tracking-wider">PREVIEW BOX</span>
                        </div>
                    </div>

                    {/* Copy CSS Box */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                            <span>CSS STYLING MARKUP</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-white transition font-semibold"
                            >
                                <Clipboard className="h-3.5 w-3.5" /> Copy Code
                            </button>
                        </div>
                        <pre className="bg-black/35 border border-white/10 rounded-2xl p-5 text-xs text-neutral-300 font-mono select-all break-all overflow-x-auto whitespace-pre-wrap leading-relaxed">
                            {`box-shadow: ${shadowRule};`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
