import { useState, useEffect } from 'react';
import { Clipboard, Sliders, RefreshCw, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DiscountCalculator() {
    const [originalPrice, setOriginalPrice] = useState<number>(1999);
    const [discountPercent, setDiscountPercent] = useState<number>(25);
    const [additionalPercent, setAdditionalPercent] = useState<number>(0);
    const [discountDetails, setDiscountDetails] = useState<{
        savings: number;
        finalPrice: number;
        percentOffTotal: number;
    } | null>(null);

    const calculateDiscount = () => {
        if (!originalPrice || originalPrice <= 0) return;

        const primarySavings = originalPrice * (discountPercent / 100);
        const priceAfterPrimary = originalPrice - primarySavings;

        const secondarySavings = priceAfterPrimary * (additionalPercent / 100);
        const finalPrice = priceAfterPrimary - secondarySavings;

        const savings = originalPrice - finalPrice;
        const percentOffTotal = (savings / originalPrice) * 100;

        setDiscountDetails({
            savings: Math.round(savings * 100) / 100,
            finalPrice: Math.round(finalPrice * 100) / 100,
            percentOffTotal: Math.round(percentOffTotal * 100) / 100
        });
    };

    useEffect(() => {
        calculateDiscount();
    }, [originalPrice, discountPercent, additionalPercent]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(val);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">Smart Discount & Savings Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Calculate your final discounted price, total absolute savings, and stack multiple discounts (e.g. 25% Off + Extra 10% Off).
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Original Price */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Original Price (₹)</label>
                        <input
                            type="number"
                            value={originalPrice}
                            onChange={(e) => setOriginalPrice(parseFloat(e.target.value) || 0)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Primary Discount */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Primary Discount</span>
                            <span className="font-mono text-indigo-400 font-bold">{discountPercent}% OFF</span>
                        </div>

                        {/* Quick Presets */}
                        <div className="flex gap-2">
                            {[10, 20, 30, 50].map(pct => (
                                <button
                                    key={pct}
                                    onClick={() => setDiscountPercent(pct)}
                                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                                        discountPercent === pct 
                                            ? 'bg-indigo-600/30 border border-indigo-500/50 text-indigo-300' 
                                            : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10'
                                    }`}
                                >
                                    {pct}%
                                </button>
                            ))}
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="99"
                            value={discountPercent}
                            onChange={(e) => setDiscountPercent(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Stacked Discount */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Additional Stacking Discount</span>
                            <span className="font-mono text-indigo-400 font-bold">{additionalPercent}% OFF</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={additionalPercent}
                            onChange={(e) => setAdditionalPercent(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>
                </div>

                {/* Returns (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {discountDetails && (
                        <div className="space-y-6">
                            {/* Key Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Final Price</p>
                                    <p className="text-base font-bold text-indigo-400 mt-1 font-mono">{formatCurrency(discountDetails.finalPrice)}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Total Savings</p>
                                    <p className="text-base font-bold text-emerald-400 mt-1 font-mono">{formatCurrency(discountDetails.savings)}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Equivalent Off</p>
                                    <p className="text-base font-bold text-neutral-200 mt-1 font-mono">{discountDetails.percentOffTotal}% OFF</p>
                                </div>
                            </div>

                            {/* Gimmicky celebration block */}
                            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="h-5 w-5 text-emerald-400 animate-spin" />
                                    <div>
                                        <h4 className="text-xs font-semibold text-white">Smart Deal Verification</h4>
                                        <p className="text-[10px] text-neutral-400 mt-0.5">Congratulations! You are pocketing a total saving of {formatCurrency(discountDetails.savings)}!</p>
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
