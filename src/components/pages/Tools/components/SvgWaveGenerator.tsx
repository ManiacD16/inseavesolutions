import { useState, useEffect } from 'react';
import { Clipboard, RefreshCw, Layers } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SvgWaveGenerator() {
    const [layers, setLayers] = useState(3);
    const [amplitude, setAmplitude] = useState(80);
    const [frequency, setFrequency] = useState(4);
    const [color, setColor] = useState('#6366f1');
    const [wavePaths, setWavePaths] = useState<string[]>([]);

    const hexToRgb = (hex: string) => {
        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    };

    const generateWavePath = (layerIndex: number) => {
        const width = 1440;
        const height = 300;
        const points = [];
        const segmentCount = frequency + 2;
        const segmentWidth = width / (segmentCount - 1);

        // Adjust amplitude per layer to give depth
        const layerAmp = amplitude * (1 - layerIndex * 0.18);
        const startY = height - layerAmp - 50;

        points.push(`M 0 ${startY}`);

        for (let i = 1; i < segmentCount; i++) {
            const x = i * segmentWidth;
            // Alternate sine amplitudes per segment + slight random offset
            const direction = i % 2 === 0 ? 1 : -1;
            const y = startY + direction * (layerAmp * (0.6 + Math.random() * 0.4));
            
            // Add control points for quadratic curve
            const prevX = (i - 1) * segmentWidth;
            const controlX = prevX + segmentWidth / 2;
            points.push(`Q ${controlX} ${y} ${x} ${y}`);
        }

        points.push(`L ${width} ${height}`);
        points.push(`L 0 ${height}`);
        points.push('Z');

        return points.join(' ');
    };

    const randomizeWaves = () => {
        const paths = [];
        for (let i = 0; i < layers; i++) {
            paths.push(generateWavePath(i));
        }
        setWavePaths(paths);
    };

    useEffect(() => {
        randomizeWaves();
    }, [layers, amplitude, frequency]);

    const rgb = hexToRgb(color);
    
    // Generate layered SVGs
    const generatedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style="background-color: transparent;">
${wavePaths.map((path, idx) => {
    const opacity = (1 - idx * 0.25).toFixed(2);
    return `  <path fill="${color}" fill-opacity="${opacity}" d="${path}"></path>`;
}).join('\n')}
</svg>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedSvg);
        toast.success('Copied SVG code to clipboard!');
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">SVG Wave Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Create beautiful, organic SVG wave section dividers for your website designs and export fully clean XML SVG code.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Controls (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                            <Layers className="h-4 w-4" /> Customizer
                        </span>
                        <button
                            onClick={randomizeWaves}
                            className="flex items-center gap-1 text-xs px-3 py-1 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-lg transition font-medium"
                        >
                            <RefreshCw className="h-3 w-3" /> Randomize
                        </button>
                    </div>

                    {/* Layers Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Layered Waves</span>
                            <span className="font-mono text-indigo-400">{layers} Layers</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="4"
                            value={layers}
                            onChange={(e) => setLayers(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Wave Amplitude Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Wave Amplitude (Height)</span>
                            <span className="font-mono text-indigo-400">{amplitude}px</span>
                        </div>
                        <input
                            type="range"
                            min="30"
                            max="180"
                            value={amplitude}
                            onChange={(e) => setAmplitude(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Wave Frequency Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Wave Frequency (Count)</span>
                            <span className="font-mono text-indigo-400">{frequency} Crests</span>
                        </div>
                        <input
                            type="range"
                            min="2"
                            max="8"
                            value={frequency}
                            onChange={(e) => setFrequency(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Base Wave Color */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-neutral-300 block">Base Wave Color</label>
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
                                placeholder="#6366f1"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview and Code (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Live Preview Window */}
                    <div className="relative h-56 rounded-2xl overflow-hidden border border-white/10 bg-[#090d1f] flex flex-col justify-end">
                        <span className="absolute top-4 left-4 text-xs font-semibold text-white/50 tracking-wider">LIVE SVG PREVIEW</span>
                        
                        {/* Dynamic layered SVG element */}
                        <svg
                            viewBox="0 0 1440 300"
                            className="w-full h-44 overflow-visible"
                            style={{ backgroundColor: 'transparent' }}
                        >
                            {wavePaths.map((path, idx) => {
                                const opacity = 1 - idx * 0.25;
                                return (
                                    <path
                                        key={idx}
                                        fill={color}
                                        fillOpacity={opacity}
                                        d={path}
                                        className="transition-all duration-500"
                                    />
                                );
                            })}
                        </svg>
                    </div>

                    {/* Output Code Block */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                            <span>RAW SVG MARKUP</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-white transition"
                            >
                                <Clipboard className="h-3 w-3" /> Copy SVG Code
                            </button>
                        </div>
                        <pre className="bg-black/35 border border-white/10 rounded-xl p-3.5 text-[11px] text-neutral-300 font-mono select-all break-all overflow-x-auto whitespace-pre-wrap leading-relaxed h-44 overflow-y-auto">
                            {generatedSvg}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
