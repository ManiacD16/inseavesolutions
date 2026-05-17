import { useState, useEffect } from 'react';
import { Sliders, RefreshCw, BarChart } from 'lucide-react';
import toast from 'react-hot-toast';

type CalculationTarget = 'CPM' | 'Cost' | 'Impressions';

export default function CpmCalculator() {
    const [target, setTarget] = useState<CalculationTarget>('CPM');
    const [cost, setCost] = useState<number>(5000);
    const [impressions, setImpressions] = useState<number>(250000);
    const [cpm, setCpm] = useState<number>(20);

    const [result, setResult] = useState<number | null>(null);

    const handleCalculate = () => {
        if (target === 'CPM') {
            if (impressions <= 0) return;
            const res = (cost / impressions) * 1000;
            setResult(Math.round(res * 100) / 100);
        } else if (target === 'Cost') {
            if (impressions <= 0) return;
            const res = (cpm * impressions) / 1000;
            setResult(Math.round(res * 100) / 100);
        } else if (target === 'Impressions') {
            if (cpm <= 0) return;
            const res = (cost / cpm) * 1000;
            setResult(Math.round(res));
        }
    };

    useEffect(() => {
        handleCalculate();
    }, [target, cost, impressions, cpm]);

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
                <h3 className="text-xl font-semibold text-white">CPM (Cost Per Mille) Campaign Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Solve for Campaign Cost, CPM rates, or total impressions delivered by toggling target variables.
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
                            <option value="CPM">Cost Per Mille (CPM Rate)</option>
                            <option value="Cost">Total Campaign Cost (Budget)</option>
                            <option value="Impressions">Total Impressions Delivered</option>
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

                    {/* Impressions Input */}
                    {target !== 'Impressions' && (
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-neutral-300 uppercase block">Total Ad Impressions</label>
                            <input
                                type="number"
                                value={impressions}
                                onChange={(e) => setImpressions(parseInt(e.target.value) || 0)}
                                className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                            />
                        </div>
                    )}

                    {/* CPM Rate Input */}
                    {target !== 'CPM' && (
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-neutral-300 uppercase block">Cost Per Thousand Impressions (₹ CPM)</label>
                            <input
                                type="number"
                                value={cpm}
                                onChange={(e) => setCpm(parseFloat(e.target.value) || 0)}
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
                                    {target === 'CPM' && `${formatCurrency(result)} CPM`}
                                    {target === 'Cost' && formatCurrency(result)}
                                    {target === 'Impressions' && `${result.toLocaleString()} Impressions`}
                                </p>
                            </div>

                            {/* visual contextual description card */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                                <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                                    Campaign Metrics Analysis
                                </span>
                                <p className="text-xs text-neutral-400 leading-relaxed">
                                    {target === 'CPM' && `Based on a budget of ${formatCurrency(cost)} yielding ${impressions.toLocaleString()} views, your CPM is ${formatCurrency(result)}. This represents the ad spend allocation required to generate exactly 1,000 ad impressions.`}
                                    {target === 'Cost' && `To deliver ${impressions.toLocaleString()} views at a targeted ${formatCurrency(cpm)} CPM rate, the total required campaign marketing budget is ${formatCurrency(result)}.`}
                                    {target === 'Impressions' && `With a marketing budget of ${formatCurrency(cost)} and a target CPM rate of ${formatCurrency(cpm)}, your campaign is projected to deliver exactly ${result.toLocaleString()} individual ad impressions.`}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
