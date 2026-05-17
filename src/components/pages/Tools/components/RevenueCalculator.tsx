import { useState, useEffect } from 'react';
import { Clipboard, Sliders, RefreshCw, BarChart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RevenueCalculator() {
    const [avgPrice, setAvgPrice] = useState<number>(2500); // Average price per unit
    const [unitsSold, setUnitsSold] = useState<number>(120); // Quantity sold
    const [deductionsPercent, setDeductionsPercent] = useState<number>(5); // Discounts / refunds %

    const [revenueDetails, setRevenueDetails] = useState<{
        grossRevenue: number;
        deductionsAmount: number;
        netRevenue: number;
    } | null>(null);

    const calculateRevenue = () => {
        if (avgPrice < 0 || unitsSold < 0 || deductionsPercent < 0) return;

        const grossRevenue = avgPrice * unitsSold;
        const deductionsAmount = grossRevenue * (deductionsPercent / 100);
        const netRevenue = grossRevenue - deductionsAmount;

        setRevenueDetails({
            grossRevenue: Math.round(grossRevenue * 100) / 100,
            deductionsAmount: Math.round(deductionsAmount * 100) / 100,
            netRevenue: Math.round(netRevenue * 100) / 100
        });
    };

    useEffect(() => {
        calculateRevenue();
    }, [avgPrice, unitsSold, deductionsPercent]);

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
                <h3 className="text-xl font-semibold text-white">Gross vs. Net Revenue Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Calculate total operational revenues by multiplying sales quantities, and subtract stacked refunds/discounts.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Avg Price per unit */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Average Price per Unit (₹)</label>
                        <input
                            type="number"
                            value={avgPrice}
                            onChange={(e) => setAvgPrice(parseFloat(e.target.value) || 0)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Units sold */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Total Units / Contracts Sold</label>
                        <input
                            type="number"
                            value={unitsSold}
                            onChange={(e) => setUnitsSold(parseInt(e.target.value) || 0)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Deductions percent slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Discounts / Refunds Rate (%)</span>
                            <span className="font-mono text-indigo-400 font-bold">{deductionsPercent}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={deductionsPercent}
                            onChange={(e) => setDeductionsPercent(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>
                </div>

                {/* Returns Summary (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {revenueDetails && (
                        <div className="space-y-6">
                            {/* Key Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Net Earned Revenue</p>
                                    <p className="text-base font-bold text-indigo-400 mt-1 font-mono">{formatCurrency(revenueDetails.netRevenue)}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Gross Product Revenue</p>
                                    <p className="text-base font-bold text-neutral-200 mt-1 font-mono">{formatCurrency(revenueDetails.grossRevenue)}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Deductions amount</p>
                                    <p className="text-base font-bold text-rose-400 mt-1 font-mono">{formatCurrency(revenueDetails.deductionsAmount)}</p>
                                </div>
                            </div>

                            {/* Visual Progress allocations */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                                <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                                    <BarChart className="h-4 w-4" /> Revenue Flow Split
                                </span>

                                <div className="space-y-2">
                                    <div className="flex h-3 rounded-full overflow-hidden bg-white/10">
                                        <div 
                                            style={{ width: `${100 - deductionsPercent}%` }}
                                            className="bg-indigo-500 transition-all duration-500" 
                                            title="Net Profit flow"
                                        />
                                        <div 
                                            style={{ width: `${deductionsPercent}%` }}
                                            className="bg-rose-500 transition-all duration-500" 
                                            title="Refund deductions flow"
                                        />
                                    </div>

                                    <div className="flex justify-between text-[10px] text-neutral-400">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full" /> 
                                            Retained Earnings: {100 - deductionsPercent}%
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full" /> 
                                            Adjustments / Refunds: {deductionsPercent}%
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
