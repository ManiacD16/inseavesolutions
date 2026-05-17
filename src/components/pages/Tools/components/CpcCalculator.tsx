import { useState, useEffect } from 'react';
import { Sliders, RefreshCw, BarChart } from 'lucide-react';
import toast from 'react-hot-toast';

type CalculationTarget = 'CPC' | 'Cost' | 'Clicks';

export default function CpcCalculator() {
    const [target, setTarget] = useState<CalculationTarget>('CPC');
    const [cost, setCost] = useState<number>(3000);
    const [clicks, setClicks] = useState<number>(150);
    const [cpc, setCpc] = useState<number>(20);

    const [result, setResult] = useState<number | null>(null);

    const handleCalculate = () => {
        if (target === 'CPC') {
            if (clicks <= 0) return;
            const res = cost / clicks;
            setResult(Math.round(res * 100) / 100);
        } else if (target === 'Cost') {
            const res = cpc * clicks;
            setResult(Math.round(res * 100) / 100);
        } else if (target === 'Clicks') {
            if (cpc <= 0) return;
            const res = cost / cpc;
            setResult(Math.round(res));
        }
    };

    useEffect(() => {
        handleCalculate();
    }, [target, cost, clicks, cpc]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(val);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">CPC (Cost Per Click) Campaign Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Solve for Campaign Cost, CPC rates, or total traffic clicks delivered by toggling target variables.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Calculation Target Select */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">What do you want to calculate?</label>
                        <select
                            value={target}
                            onChange={(e) => setTarget(e.target.value as CalculationTarget)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition"
                        >
                            <option value="CPC">Cost Per Click (CPC Rate)</option>
                            <option value="Cost">Total Campaign Cost (Budget)</option>
                            <option value="Clicks">Total Traffic Clicks</option>
                        </select>
                    </div>

                    {/* Cost Input */}
                    {target !== 'Cost' && (
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-neutral-300 uppercase block">Total Campaign Budget (₹)</label>
                            <input
                                type="number"
                                value={cost}
                                onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                                className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                            />
                        </div>
                    )}

                    {/* Clicks Input */}
                    {target !== 'Clicks' && (
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-neutral-300 uppercase block">Total Click Traffic</label>
                            <input
                                type="number"
                                value={clicks}
                                onChange={(e) => setClicks(parseInt(e.target.value) || 0)}
                                className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                            />
                        </div>
                    )}

                    {/* CPC Rate Input */}
                    {target !== 'CPC' && (
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-neutral-300 uppercase block">Cost Per Click (₹ CPC)</label>
                            <input
                                type="number"
                                value={cpc}
                                onChange={(e) => setCpc(parseFloat(e.target.value) || 0)}
                                className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                            />
                        </div>
                    )}
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-7 space-y-6">
                    {result !== null && (
                        <div className="space-y-6">
                            <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-2xl">
                                <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Calculated {target}</p>
                                <p className="text-3xl font-extrabold text-indigo-400 mt-2 font-mono">
                                    {target === 'CPC' && `${formatCurrency(result)} CPC`}
                                    {target === 'Cost' && formatCurrency(result)}
                                    {target === 'Clicks' && `${result.toLocaleString()} Clicks`}
                                </p>
                            </div>

                            {/* visual contextual description card */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                                <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                                    CPC Metrics Analysis
                                </span>
                                <p className="text-xs text-neutral-400 leading-relaxed">
                                    {target === 'CPC' && `Based on a budget of {formatCurrency(cost)} yielding ${clicks.toLocaleString()} clicks, your CPC is ${formatCurrency(result)}. This represents the ad spend allocation required to generate exactly one user click.`}
                                    {target === 'Cost' && `To deliver ${clicks.toLocaleString()} clicks at a targeted ${formatCurrency(cpc)} CPC rate, the total required campaign marketing budget is ${formatCurrency(result)}.`}
                                    {target === 'Clicks' && `With a marketing budget of ${formatCurrency(cost)} and a target CPC rate of ${formatCurrency(cpc)}, your campaign is projected to deliver exactly ${result.toLocaleString()} traffic clicks.`}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
