import { useState, useEffect } from 'react';
import { Clipboard, Sliders, RefreshCw, BarChart2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SipCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [annualRate, setAnnualRate] = useState(12);
    const [years, setYears] = useState(10);
    const [investmentDetails, setInvestmentDetails] = useState<{
        totalInvested: number;
        estimatedReturns: number;
        maturityValue: number;
    } | null>(null);

    const calculateSIP = () => {
        const P = monthlyInvestment;
        const i = (annualRate / 12) / 100;
        const n = years * 12;

        if (i === 0) {
            const total = P * n;
            setInvestmentDetails({
                totalInvested: total,
                estimatedReturns: 0,
                maturityValue: total
            });
            return;
        }

        // SIP formula: M = P * [ ( (1 + i)^n - 1 ) / i ] * (1 + i)
        const maturityValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        const totalInvested = P * n;
        const estimatedReturns = maturityValue - totalInvested;

        setInvestmentDetails({
            totalInvested: Math.round(totalInvested),
            estimatedReturns: Math.round(estimatedReturns),
            maturityValue: Math.round(maturityValue)
        });
    };

    useEffect(() => {
        calculateSIP();
    }, [monthlyInvestment, annualRate, years]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">Systematic Investment Plan (SIP) Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Estimate the future value and wealth accumulation of your mutual fund SIP investments using custom sliders.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sliders panel (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Monthly Investment */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Monthly Investment</span>
                            <span className="font-mono text-indigo-400 font-bold">{formatCurrency(monthlyInvestment)}</span>
                        </div>
                        <input
                            type="range"
                            min="500"
                            max="100000"
                            step="500"
                            value={monthlyInvestment}
                            onChange={(e) => setMonthlyInvestment(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Annual Rate */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Expected Return Rate (p.a.)</span>
                            <span className="font-mono text-indigo-400 font-bold">{annualRate}%</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            step="0.5"
                            value={annualRate}
                            onChange={(e) => setAnnualRate(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Time Period */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Time Period (Years)</span>
                            <span className="font-mono text-indigo-400 font-bold">{years} Years</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="40"
                            step="1"
                            value={years}
                            onChange={(e) => setYears(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>
                </div>

                {/* Wealth Summary (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {investmentDetails && (
                        <div className="space-y-6">
                            {/* Key Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Total Invested</p>
                                    <p className="text-base font-bold text-neutral-200 mt-1 font-mono">{formatCurrency(investmentDetails.totalInvested)}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Est. Returns</p>
                                    <p className="text-base font-bold text-emerald-400 mt-1 font-mono">{formatCurrency(investmentDetails.estimatedReturns)}</p>
                                </div>
                                <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Maturity Value</p>
                                    <p className="text-base font-bold text-indigo-400 mt-1 font-mono">{formatCurrency(investmentDetails.maturityValue)}</p>
                                </div>
                            </div>

                            {/* visual progress gauge block */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                                <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                                    <BarChart2 className="h-4 w-4" /> Wealth Split Analysis
                                </span>

                                <div className="space-y-2">
                                    <div className="flex h-3 rounded-full overflow-hidden bg-white/10">
                                        <div 
                                            style={{ width: `${(investmentDetails.totalInvested / investmentDetails.maturityValue) * 100}%` }}
                                            className="bg-indigo-500 transition-all duration-500" 
                                            title="Invested Principal"
                                        />
                                        <div 
                                            style={{ width: `${(investmentDetails.estimatedReturns / investmentDetails.maturityValue) * 100}%` }}
                                            className="bg-emerald-500 transition-all duration-500" 
                                            title="Estimated Returns"
                                        />
                                    </div>

                                    <div className="flex justify-between text-[10px] text-neutral-400">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full" /> 
                                            Invested: {Math.round((investmentDetails.totalInvested / investmentDetails.maturityValue) * 100)}%
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> 
                                            Est. Returns: {Math.round((investmentDetails.estimatedReturns / investmentDetails.maturityValue) * 100)}%
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
