import { useState, useEffect } from 'react';
import { Lock, Unlock, Clipboard, RefreshCw, Palette } from 'lucide-react';
import toast from 'react-hot-toast';

interface ColorNode {
    hex: string;
    locked: boolean;
}

export default function ColorPaletteGenerator() {
    const [colors, setColors] = useState<ColorNode[]>([
        { hex: '#6366f1', locked: false },
        { hex: '#a855f7', locked: false },
        { hex: '#ec4899', locked: false },
        { hex: '#f43f5e', locked: false },
        { hex: '#eab308', locked: false }
    ]);
    const [preset, setPreset] = useState<'random' | 'pastel' | 'neon' | 'cool' | 'warm'>('random');

    const generateRandomHex = (type: typeof preset) => {
        let hex = '#';
        const chars = '0123456789abcdef';
        
        if (type === 'pastel') {
            // Pastel colors: High lightness, medium saturation
            const r = Math.floor((Math.random() * 127) + 127).toString(16).padStart(2, '0');
            const g = Math.floor((Math.random() * 127) + 127).toString(16).padStart(2, '0');
            const b = Math.floor((Math.random() * 127) + 127).toString(16).padStart(2, '0');
            return `#${r}${g}${b}`;
        }
        
        if (type === 'neon') {
            // Neon colors: High brightness, high saturation
            const primaryColor = Math.floor(Math.random() * 3);
            const r = (primaryColor === 0 ? 255 : Math.floor(Math.random() * 50)).toString(16).padStart(2, '0');
            const g = (primaryColor === 1 ? 255 : Math.floor(Math.random() * 50)).toString(16).padStart(2, '0');
            const b = (primaryColor === 2 ? 255 : Math.floor(Math.random() * 50)).toString(16).padStart(2, '0');
            return `#${r}${g}${b}`;
        }

        if (type === 'cool') {
            // Cool shades: Blues, greens, teals, purples
            const r = Math.floor(Math.random() * 100).toString(16).padStart(2, '0');
            const g = Math.floor((Math.random() * 155) + 100).toString(16).padStart(2, '0');
            const b = Math.floor((Math.random() * 155) + 100).toString(16).padStart(2, '0');
            return `#${r}${g}${b}`;
        }

        if (type === 'warm') {
            // Warm shades: Reds, oranges, yellows, warm browns
            const r = Math.floor((Math.random() * 155) + 100).toString(16).padStart(2, '0');
            const g = Math.floor(Math.random() * 120).toString(16).padStart(2, '0');
            const b = Math.floor(Math.random() * 80).toString(16).padStart(2, '0');
            return `#${r}${g}${b}`;
        }

        // Complete random
        for (let i = 0; i < 6; i++) {
            hex += chars[Math.floor(Math.random() * 16)];
        }
        return hex;
    };

    const handleGenerate = () => {
        const newColors = colors.map(c => {
            if (c.locked) return c;
            return { ...c, hex: generateRandomHex(preset) };
        });
        setColors(newColors);
    };

    useEffect(() => {
        handleGenerate();
    }, [preset]);

    const toggleLock = (index: number) => {
        const updated = [...colors];
        updated[index].locked = !updated[index].locked;
        setColors(updated);
    };

    const handleColorChange = (index: number, val: string) => {
        if (!val.startsWith('#') || val.length > 7) return;
        const updated = [...colors];
        updated[index].hex = val;
        setColors(updated);
    };

    const copyColor = (hex: string) => {
        navigator.clipboard.writeText(hex);
        toast.success(`Copied Hex ${hex.toUpperCase()}!`);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">Harmonious Color Palette Generator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Generate, lock, and customize professional color palettes. Tap Spacebar or click Generate to cycle new shades.
                </p>
            </div>

            {/* Presets and Central Generator */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-neutral-400 mr-2 uppercase tracking-wider font-semibold">Presets:</span>
                    {(['random', 'pastel', 'neon', 'cool', 'warm'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setPreset(type)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                                preset === type 
                                    ? 'bg-indigo-600 text-white' 
                                    : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleGenerate}
                    className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10"
                >
                    <RefreshCw className="h-4 w-4" /> Generate Palette
                </button>
            </div>

            {/* Columns Display */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 h-80">
                {colors.map((color, index) => {
                    const isDark = parseInt(color.hex.replace('#', ''), 16) < 0xffffff / 2;
                    return (
                        <div
                            key={index}
                            style={{ backgroundColor: color.hex }}
                            className="rounded-2xl relative flex flex-col justify-between p-4 transition-all duration-500 shadow-lg border border-white/5 overflow-hidden group hover:scale-[1.02]"
                        >
                            {/* Locked indicator overlay */}
                            {color.locked && (
                                <div className="absolute top-2.5 right-2.5 p-1 bg-black/40 rounded-lg text-white">
                                    <Lock className="h-3.5 w-3.5" />
                                </div>
                            )}

                            {/* Color Action Bar */}
                            <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => toggleLock(index)}
                                    className={`p-2 rounded-xl transition ${
                                        isDark 
                                            ? 'bg-white/20 text-white hover:bg-white/30' 
                                            : 'bg-black/20 text-black hover:bg-black/30'
                                    }`}
                                    title={color.locked ? 'Unlock color' : 'Lock color'}
                                >
                                    {color.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                                </button>
                                <button
                                    onClick={() => copyColor(color.hex)}
                                    className={`p-2 rounded-xl transition ${
                                        isDark 
                                            ? 'bg-white/20 text-white hover:bg-white/30' 
                                            : 'bg-black/20 text-black hover:bg-black/30'
                                    }`}
                                    title="Copy HEX Code"
                                >
                                    <Clipboard className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Hex and Label */}
                            <div className="space-y-1.5 z-10">
                                <input
                                    type="text"
                                    value={color.hex.toUpperCase()}
                                    onChange={(e) => handleColorChange(index, e.target.value)}
                                    style={{ color: isDark ? '#ffffff' : '#000000' }}
                                    className="w-full bg-black/10 hover:bg-black/20 border-none rounded px-2 py-1 text-center font-mono font-bold text-sm tracking-widest uppercase outline-none focus:bg-black/30"
                                />
                                <p
                                    style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}
                                    className="text-center font-bold text-[10px] uppercase tracking-wider"
                                >
                                    Color {index + 1}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
