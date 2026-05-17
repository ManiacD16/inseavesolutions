import { useState, useEffect } from 'react';
import { Clipboard, Sliders, RefreshCw, Layers } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PricingCalculator() {
    const [cogs, setCogs] = useState<number>(500); // Cost of Goods Sold
    const [targetMargin, setTargetMargin] = useState<number>(30); // Target Margin %
    const [salesTax, setSalesTax] = useState<number>(18); // Sales Tax / GST %

    const [pricingDetails, setPricingDetails] = useState<{
        sellingPriceExclTax: number;
        taxAmount: number;
        sellingPriceInclTax: number;
        profitAmount: number;
    } | null>(null);

    const calculatePricing = () => {
        if (cogs <= 0) return;

        // Formula: Price = COGS / (1 - Margin%)
        const marginDecimal = targetMargin / 100;
        
        // Prevent division by zero if target margin is 100%
        const denominator = 1 - marginDecimal;
        const sellingPriceExclTax = denominator > 0 ? cogs / denominator : cogs;

        const taxAmount = sellingPriceExclTax * (salesTax / 100);
        const sellingPriceInclTax = sellingPriceExclTax + taxAmount;
        const profitAmount = sellingPriceExclTax - cogs;

        setPricingDetails({
            sellingPriceExclTax: Math.round(sellingPriceExclTax * 100) / 100,
            taxAmount: Math.round(taxAmount * 100) / 100,
            sellingPriceInclTax: Math.round(sellingPriceInclTax * 100) / 100,
            profitAmount: Math.round(profitAmount * 100) / 100
        });
    };

    useEffect(() => {
        calculatePricing();
    }, [cogs, targetMargin, salesTax]);

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
                <h3 className="text-xl font-semibold text-white">Target Product Pricing Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Establish optimal wholesale/retail pricing points based on product costs, desired markups, and regional tax obligations.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* COGS */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Cost of Goods Sold (COGS) (₹)</label>
                        <input
                            type="number"
                            value={cogs}
                            onChange={(e) => setCogs(parseFloat(e.target.value) || 0)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Target Gross Margin Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Target Gross Margin (%)</span>
                            <span className="font-mono text-indigo-400 font-bold">{targetMargin}%</span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="90"
                            value={targetMargin}
                            onChange={(e) => setTargetMargin(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Sales Tax / GST Slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Sales Tax / GST (%)</span>
                            <span className="font-mono text-indigo-400 font-bold">{salesTax}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="28"
                            value={salesTax}
                            onChange={(e) => setSalesTax(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>
                </div>

                {/* Returns Summary (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {pricingDetails && (
                        <div className="space-y-6">
                            {/* Key Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Recommended Retail Price (Excl. Tax)</p>
                                    <p className="text-xl font-bold text-indigo-400 mt-1 font-mono">{formatCurrency(pricingDetails.sellingPriceExclTax)}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Net Profit per Unit</p>
                                    <p className="text-xl font-bold text-emerald-400 mt-1 font-mono">{formatCurrency(pricingDetails.profitAmount)}</p>
                                </div>
                            </div>

                            {/* visual progress gauge block */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                                <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                                    <Layers className="h-4 w-4" /> Pricing Breakup (Tax-Inclusive Base)
                                </span>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs text-neutral-400">
                                        <span>Cost Price (COGS):</span>
                                        <span className="font-mono text-neutral-200">{formatCurrency(cogs)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-neutral-400">
                                        <span>Net Markup Margin Profit:</span>
                                        <span className="font-mono text-emerald-400">{formatCurrency(pricingDetails.profitAmount)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-neutral-400">
                                        <span>Sales Tax / GST Amount ({salesTax}%):</span>
                                        <span className="font-mono text-rose-400">{formatCurrency(pricingDetails.taxAmount)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-neutral-300 border-t border-white/5 pt-3 font-semibold">
                                        <span>Final Shelf Price (Inclusive of Tax):</span>
                                        <span className="font-mono text-indigo-400 font-bold">{formatCurrency(pricingDetails.sellingPriceInclTax)}</span>
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
