import { useState, useEffect } from 'react';
import { Clipboard, Calculator, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GstCalculator() {
    const [amount, setAmount] = useState<number>(1000);
    const [gstRate, setGstRate] = useState<number>(18);
    const [isInclusive, setIsInclusive] = useState<boolean>(false);
    const [gstDetails, setGstDetails] = useState<{
        originalAmount: number;
        cgst: number;
        sgst: number;
        totalGst: number;
        finalAmount: number;
    } | null>(null);

    const calculateGST = () => {
        if (!amount || amount <= 0) return;

        const rate = gstRate / 100;
        let originalAmount = amount;
        let totalGst = 0;
        let finalAmount = amount;

        if (isInclusive) {
            // GST Inclusive: Remove GST from total
            originalAmount = amount / (1 + rate);
            totalGst = amount - originalAmount;
            finalAmount = amount;
        } else {
            // GST Exclusive: Add GST to base
            originalAmount = amount;
            totalGst = amount * rate;
            finalAmount = amount + totalGst;
        }

        const cgst = totalGst / 2;
        const sgst = totalGst / 2;

        setGstDetails({
            originalAmount: Math.round(originalAmount * 100) / 100,
            cgst: Math.round(cgst * 100) / 100,
            sgst: Math.round(sgst * 100) / 100,
            totalGst: Math.round(totalGst * 100) / 100,
            finalAmount: Math.round(finalAmount * 100) / 100
        });
    };

    useEffect(() => {
        calculateGST();
    }, [amount, gstRate, isInclusive]);

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
                <h3 className="text-xl font-semibold text-white">Goods and Services Tax (GST) Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Calculate CGST, SGST, Net and Gross valuations. Support both Add GST (exclusive) and Remove GST (inclusive) calculations.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Calculator className="h-4 w-4" /> Parameters
                    </span>

                    {/* Amount Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Base Amount (₹)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* GST Type Selector */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Tax Slab Calculation</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setIsInclusive(false)}
                                className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                                    !isInclusive 
                                        ? 'bg-indigo-600 text-white' 
                                        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                Add GST (Exclusive)
                            </button>
                            <button
                                onClick={() => setIsInclusive(true)}
                                className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                                    isInclusive 
                                        ? 'bg-indigo-600 text-white' 
                                        : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                Remove GST (Inclusive)
                            </button>
                        </div>
                    </div>

                    {/* Tax Rates presets & custom slider */}
                    <div className="space-y-3">
                        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">GST Rate (%)</label>
                        <div className="flex gap-2">
                            {[5, 12, 18, 28].map(rate => (
                                <button
                                    key={rate}
                                    onClick={() => setGstRate(rate)}
                                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                                        gstRate === rate 
                                            ? 'bg-indigo-600/30 border border-indigo-500/50 text-indigo-300' 
                                            : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10'
                                    }`}
                                >
                                    {rate}%
                                </button>
                            ))}
                        </div>

                        <div className="space-y-1">
                            <input
                                type="range"
                                min="1"
                                max="40"
                                value={gstRate}
                                onChange={(e) => setGstRate(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                            <div className="flex justify-between text-[10px] text-neutral-500">
                                <span>Custom Rate:</span>
                                <span className="font-bold text-indigo-400">{gstRate}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results (7 columns) */}
                <div className="lg:col-span-7 space-y-5">
                    {gstDetails && (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6 space-y-4">
                            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase block border-b border-white/5 pb-3">
                                Invoice Bill Breakup
                            </span>

                            <div className="space-y-3.5">
                                <div className="flex justify-between text-xs text-neutral-400">
                                    <span>Net Cost (Original Price):</span>
                                    <span className="font-mono text-neutral-200 font-bold">{formatCurrency(gstDetails.originalAmount)}</span>
                                </div>
                                <div className="flex justify-between text-xs text-neutral-400">
                                    <span>Central GST (CGST - 50%):</span>
                                    <span className="font-mono text-neutral-200">{formatCurrency(gstDetails.cgst)}</span>
                                </div>
                                <div className="flex justify-between text-xs text-neutral-400">
                                    <span>State GST (SGST - 50%):</span>
                                    <span className="font-mono text-neutral-200">{formatCurrency(gstDetails.sgst)}</span>
                                </div>
                                <div className="flex justify-between text-xs text-neutral-400 border-t border-white/5 pt-3">
                                    <span>Total Tax Burden (GST):</span>
                                    <span className="font-mono text-emerald-400 font-bold">{formatCurrency(gstDetails.totalGst)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-neutral-300 border-t border-white/10 pt-3">
                                    <span className="font-semibold">Gross Cost (Final Invoice Price):</span>
                                    <span className="font-mono text-indigo-400 font-bold text-base">{formatCurrency(gstDetails.finalAmount)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
