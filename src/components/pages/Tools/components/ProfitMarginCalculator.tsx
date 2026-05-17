import { useState, useEffect } from 'react';
import { Clipboard, Sliders, RefreshCw, BarChart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfitMarginCalculator() {
    const [costPrice, setCostPrice] = useState<number>(200);
    const [sellingPrice, setSellingPrice] = useState<number>(300);

    const [profitDetails, setProfitDetails] = useState<{
        profitAmount: number;
        grossMargin: number;
        markup: number;
    } | null>(null);

    const calculateProfit = () => {
        if (costPrice < 0 || sellingPrice < 0) return;

        const profitAmount = sellingPrice - costPrice;
        
        // Margin = (Profit / Selling Price) * 100
        const grossMargin = sellingPrice > 0 ? (profitAmount / sellingPrice) * 100 : 0;
        
        // Markup = (Profit / Cost Price) * 100
        const markup = costPrice > 0 ? (profitAmount / costPrice) * 100 : 0;

        setProfitDetails({
            profitAmount: Math.round(profitAmount * 100) / 100,
            grossMargin: Math.round(grossMargin * 100) / 100,
            markup: Math.round(markup * 100) / 100
        });
    };

    useEffect(() => {
        calculateProfit();
    }, [costPrice, sellingPrice]);

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
                <h3 className="text-xl font-semibold text-white">Profit Margin & Markup Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Calculate net profit, gross margin %, and markup % based on Cost Price and Selling Price metrics.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Cost Price */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Cost Price (₹)</label>
                        <input
                            type="number"
                            value={costPrice}
                            onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Selling Price */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Selling Price (₹)</label>
                        <input
                            type="number"
                            value={sellingPrice}
                            onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>
                </div>

                {/* Returns Summary (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {profitDetails && (
                        <div className="space-y-6">
                            {/* Key Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Net Profit Amount</p>
                                    <p className="text-base font-bold text-indigo-400 mt-1 font-mono">{formatCurrency(profitDetails.profitAmount)}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Gross Profit Margin</p>
                                    <p className="text-base font-bold text-emerald-400 mt-1 font-mono">{profitDetails.grossMargin}%</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Markup Rate</p>
                                    <p className="text-base font-bold text-neutral-200 mt-1 font-mono">{profitDetails.markup}%</p>
                                </div>
                            </div>

                            {/* visual progress gauge block */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                                <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                                    <BarChart className="h-4 w-4" /> Margin Visualizer
                                </span>

                                <div className="space-y-2">
                                    <div className="flex h-3 rounded-full overflow-hidden bg-white/10">
                                        <div 
                                            style={{ width: `${Math.max(0, Math.min(100, (costPrice / sellingPrice) * 100))}%` }}
                                            className="bg-amber-500 transition-all duration-500" 
                                            title="Cost share"
                                        />
                                        <div 
                                            style={{ width: `${Math.max(0, Math.min(100, (profitDetails.profitAmount / sellingPrice) * 100))}%` }}
                                            className="bg-indigo-500 transition-all duration-500" 
                                            title="Profit Share"
                                        />
                                    </div>

                                    <div className="flex justify-between text-[10px] text-neutral-400">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" /> 
                                            Cost: {sellingPrice > 0 ? Math.round((costPrice / sellingPrice) * 100) : 0}%
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full" /> 
                                            Profit Margin: {Math.max(0, Math.round(profitDetails.grossMargin))}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
