import { useState, useEffect } from 'react';
import { Sliders, RefreshCw, BarChart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RoiCalculator() {
    const [amountInvested, setAmountInvested] = useState<number>(10000);
    const [amountReturned, setAmountReturned] = useState<number>(18000);
    const [durationDays, setDurationDays] = useState<number>(90); // Investment duration

    const [roiDetails, setRoiDetails] = useState<{
        investmentGain: number;
        roiPercent: number;
        annualisedRoi: number;
    } | null>(null);

    const calculateRoi = () => {
        if (amountInvested <= 0) return;

        const investmentGain = amountReturned - amountInvested;
        const roiPercent = (investmentGain / amountInvested) * 100;
        
        // Annualised ROI = ((Amount Returned / Amount Invested) ^ (365 / Days) - 1) * 100
        const ratio = amountReturned / amountInvested;
        const exponent = 365 / durationDays;
        const annualisedRoi = (Math.pow(ratio, exponent) - 1) * 100;

        setRoiDetails({
            investmentGain: Math.round(investmentGain * 100) / 100,
            roiPercent: Math.round(roiPercent * 100) / 100,
            annualisedRoi: Math.round(annualisedRoi * 100) / 100
        });
    };

    useEffect(() => {
        calculateRoi();
    }, [amountInvested, amountReturned, durationDays]);

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
                <h3 className="text-xl font-semibold text-white">Marketing ROI (Return on Investment) Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Calculate campaign returns, net profits, and annualized growth rates to evaluate ad spend efficiency.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Amount Invested */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Amount Invested (Ad Spend) (₹)</label>
                        <input
                            type="number"
                            value={amountInvested}
                            onChange={(e) => setAmountInvested(parseFloat(e.target.value) || 0)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Amount Returned */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase block">Amount Returned (Revenue generated) (₹)</label>
                        <input
                            type="number"
                            value={amountReturned}
                            onChange={(e) => setAmountReturned(parseFloat(e.target.value) || 0)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Duration Days */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Campaign Duration (Days)</span>
                            <span className="font-mono text-indigo-400 font-bold">{durationDays} Days</span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="365"
                            value={durationDays}
                            onChange={(e) => setDurationDays(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>
                </div>

                {/* Summary */}
                <div className="lg:col-span-7 space-y-6">
                    {roiDetails && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Net Investment Gain</p>
                                    <p className="text-base font-bold text-indigo-400 mt-1 font-mono">{formatCurrency(roiDetails.investmentGain)}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Net ROI (%)</p>
                                    <p className="text-base font-bold text-emerald-400 mt-1 font-mono">{roiDetails.roiPercent}%</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Annualised ROI</p>
                                    <p className="text-base font-bold text-neutral-200 mt-1 font-mono">{roiDetails.annualisedRoi}%</p>
                                </div>
                            </div>

                            {/* Visual Progress bar */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                                <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                                    <BarChart className="h-4 w-4" /> Investment Returns Split
                                </span>

                                <div className="space-y-2">
                                    <div className="flex h-3 rounded-full overflow-hidden bg-white/10">
                                        <div 
                                            style={{ width: `${Math.max(0, Math.min(100, (amountInvested / amountReturned) * 100))}%` }}
                                            className="bg-neutral-500 transition-all duration-500" 
                                        />
                                        <div 
                                            style={{ width: `${Math.max(0, Math.min(100, (roiDetails.investmentGain / amountReturned) * 100))}%` }}
                                            className="bg-indigo-500 transition-all duration-500" 
                                        />
                                    </div>

                                    <div className="flex justify-between text-[10px] text-neutral-400">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-neutral-500 rounded-full" /> 
                                            Principal Invested: {amountReturned > 0 ? Math.round((amountInvested / amountReturned) * 100) : 0}%
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full" /> 
                                            Net Campaign Profit: {Math.max(0, Math.round(roiDetails.roiPercent))}%
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
