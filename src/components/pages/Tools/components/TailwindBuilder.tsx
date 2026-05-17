import { useState } from 'react';
import { Clipboard, Sliders, RefreshCw, Layout } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TailwindBuilder() {
    const [padding, setPadding] = useState('p-6');
    const [bgColor, setBgColor] = useState('bg-indigo-600');
    const [textColor, setTextColor] = useState('text-white');
    const [rounded, setRounded] = useState('rounded-2xl');
    const [border, setBorder] = useState('border-2');
    const [borderColor, setBorderColor] = useState('border-white/20');
    const [shadow, setShadow] = useState('shadow-2xl');
    const [alignment, setAlignment] = useState('text-center');

    const compiledClasses = `flex flex-col justify-center items-center ${padding} ${bgColor} ${textColor} ${rounded} ${border} ${borderColor} ${shadow} ${alignment} transition-all duration-300 w-64 h-36`;

    const handleCopy = () => {
        navigator.clipboard.writeText(compiledClasses);
        toast.success('Copied Tailwind classes!');
    };

    const handleReset = () => {
        setPadding('p-6');
        setBgColor('bg-indigo-600');
        setTextColor('text-white');
        setRounded('rounded-2xl');
        setBorder('border-2');
        setBorderColor('border-white/20');
        setShadow('shadow-2xl');
        setAlignment('text-center');
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">Tailwind CSS Component Class Builder</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Visually build web components by toggling margins, borders, shadows, and colors, and compile standard Tailwind classes.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Visual Options (5 columns) */}
                <div className="lg:col-span-5 space-y-4 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6 max-h-[460px] overflow-y-auto custom-scrollbar">
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

                    {/* Background Color */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">Background Color</label>
                        <select
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                        >
                            <option value="bg-indigo-600">Indigo (bg-indigo-600)</option>
                            <option value="bg-emerald-600">Emerald (bg-emerald-600)</option>
                            <option value="bg-rose-600">Rose (bg-rose-600)</option>
                            <option value="bg-slate-800">Slate (bg-slate-800)</option>
                            <option value="bg-violet-600">Violet (bg-violet-600)</option>
                            <option value="bg-white">White (bg-white)</option>
                        </select>
                    </div>

                    {/* Text Color */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">Text Color</label>
                        <select
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                        >
                            <option value="text-white">White (text-white)</option>
                            <option value="text-slate-900">Dark (text-slate-900)</option>
                            <option value="text-indigo-200">Indigo Light (text-indigo-200)</option>
                            <option value="text-amber-400">Amber (text-amber-400)</option>
                        </select>
                    </div>

                    {/* Corner Radius */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">Corner Radius</label>
                        <select
                            value={rounded}
                            onChange={(e) => setRounded(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                        >
                            <option value="rounded-none">Square (rounded-none)</option>
                            <option value="rounded-md">Medium (rounded-md)</option>
                            <option value="rounded-2xl">Large Curve (rounded-2xl)</option>
                            <option value="rounded-full">Pill (rounded-full)</option>
                        </select>
                    </div>

                    {/* Padding spacing */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">Padding Spacing</label>
                        <select
                            value={padding}
                            onChange={(e) => setPadding(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                        >
                            <option value="p-2">Small (p-2)</option>
                            <option value="p-4">Medium (p-4)</option>
                            <option value="p-8">Large (p-8)</option>
                            <option value="p-12">Extra Large (p-12)</option>
                        </select>
                    </div>

                    {/* Borders */}
                    <div className="grid grid-cols-2 gap-3.5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">Border Width</label>
                            <select
                                value={border}
                                onChange={(e) => setBorder(e.target.value)}
                                className="w-full bg-black/45 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                            >
                                <option value="border-0">None (border-0)</option>
                                <option value="border-2">2px (border-2)</option>
                                <option value="border-4">4px (border-4)</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">Border Color</label>
                            <select
                                value={borderColor}
                                onChange={(e) => setBorderColor(e.target.value)}
                                className="w-full bg-black/45 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                            >
                                <option value="border-white/20">Faint White</option>
                                <option value="border-indigo-500">Indigo</option>
                                <option value="border-emerald-500">Emerald</option>
                                <option value="border-black/10">Translucent Dark</option>
                            </select>
                        </div>
                    </div>

                    {/* Shadow size */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">Drop Shadow</label>
                        <select
                            value={shadow}
                            onChange={(e) => setShadow(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                        >
                            <option value="shadow-none">None (shadow-none)</option>
                            <option value="shadow-md">Medium (shadow-md)</option>
                            <option value="shadow-2xl">Extreme (shadow-2xl)</option>
                        </select>
                    </div>
                </div>

                {/* Render and code (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Live Preview Element */}
                    <div className="relative h-60 rounded-2xl border border-white/10 bg-[#090d1f] flex items-center justify-center">
                        <span className="absolute top-4 left-4 text-xs font-semibold text-white/55 tracking-wider uppercase">Live Render</span>

                        {/* Interactive Dynamic Box */}
                        <div className={compiledClasses}>
                            <h4 className="text-sm font-bold tracking-tight">Interactive Card</h4>
                            <p className="text-[10px] opacity-80 mt-1">Tailwind Visual Builder</p>
                        </div>
                    </div>

                    {/* Code copy box */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                            <span>COMPILED TAILWIND CLASSES</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-white transition font-semibold"
                            >
                                <Clipboard className="h-3.5 w-3.5" /> Copy Classes
                            </button>
                        </div>
                        <pre className="bg-black/35 border border-white/10 rounded-2xl p-4 text-xs text-neutral-300 font-mono select-all break-all overflow-x-auto whitespace-pre-wrap leading-relaxed h-24 flex items-center">
                            {compiledClasses}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
