import { useState, useEffect } from 'react';
import { Clipboard, Sliders, RefreshCw, AlertTriangle, check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BreakEvenCalculator() {
    const [fixedCosts, setFixedCosts] = useState<number>(50000); // Fixed annual/monthly costs
    const [sellingPrice, setSellingPrice] = useState<number>(150); // Sale price per unit
    const [variableCost, setVariableCost] = useState<number>(90); // Variable cost per unit

    const [breakEvenDetails, setBreakEvenDetails] = useState<{
        contributionMargin: number;
        breakEvenUnits: number;
        breakEvenRevenue: number;
        isValid: boolean;
    } | null>(null);

    const calculateBreakEven = () => {
        if (fixedCosts < 0 || sellingPrice < 0 || variableCost < 0) return;

        const contributionMargin = sellingPrice - variableCost;

        if (contributionMargin <= 0) {
            setBreakEvenDetails({
                contributionMargin,
                breakEvenUnits: 0,
                breakEvenRevenue: 0,
                isValid: false
            });
            return;
        }

        const breakEvenUnits = fixedCosts / contributionMargin;
        const breakEvenRevenue = breakEvenUnits * sellingPrice;

        setBreakEvenDetails({
            contributionMargin: Math.round(contributionMargin * 100) / 100,
            breakEvenUnits: Math.round(breakEvenUnits),
            breakEvenRevenue: Math.round(breakEvenRevenue),
            isValid: true
        });
    };

    useEffect(() => {
        calculateBreakEven();
    }, [fixedCosts, sellingPrice, variableCost]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">Business Break-even Sales Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Determine the exact sales volume (units and total revenue) needed to cover all operational fixed and variable expenses.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Fixed Costs */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Total Fixed Costs (₹)</label>
                        <input
                            type="number"
                            value={fixedCosts}
                            onChange={(e) => setFixedCosts(parseFloat(e.target.value) || 0)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Selling Price per unit */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Selling Price per Unit (₹)</label>
                        <input
                            type="number"
                            value={sellingPrice}
                            onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Variable Cost per unit */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Variable Cost per Unit (₹)</label>
                        <input
                            type="number"
                            value={variableCost}
                            onChange={(e) => setVariableCost(parseFloat(e.target.value) || 0)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>
                </div>

                {/* Returns Summary (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {breakEvenDetails && (
                        <div className="space-y-6">
                            {/* Validation warning or Stats */}
                            {!breakEvenDetails.isValid ? (
                                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400 text-xs">
                                    <AlertTriangle className="h-6 w-6 shrink-0" />
                                    <div>
                                        <strong>Negative Contribution Margin:</strong> Your selling price per unit is equal to or lower than your variable costs. You will lose money on every unit sold, making a break-even point mathematically impossible.
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-xl">
                                        <p className="text-[10px] text-neutral-500 uppercase font-semibold">Break-Even Sales (Units)</p>
                                        <p className="text-xl font-bold text-indigo-400 mt-1 font-mono">{breakEvenDetails.breakEvenUnits} Units</p>
                                    </div>
                                    <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                        <p className="text-[10px] text-neutral-500 uppercase font-semibold">Break-Even Revenue</p>
                                        <p className="text-base font-bold text-emerald-400 mt-1 font-mono">{formatCurrency(breakEvenDetails.breakEvenRevenue)}</p>
                                    </div>
                                    <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                        <p className="text-[10px] text-neutral-500 uppercase font-semibold">Margin per Unit</p>
                                        <p className="text-base font-bold text-neutral-200 mt-1 font-mono">{formatCurrency(breakEvenDetails.contributionMargin)}</p>
                                    </div>
                                </div>
                            )}

                            {breakEvenDetails.isValid && (
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                                    <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block">
                                        Break-even Assessment
                                    </span>
                                    <p className="text-xs text-neutral-400 leading-relaxed">
                                        To cover your total fixed costs of {formatCurrency(fixedCosts)}, you must sell at least <strong>{breakEvenDetails.breakEvenUnits} units</strong>. Any unit sold beyond this quantity directly contributes to your net operational profit.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
