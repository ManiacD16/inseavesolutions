import { useState, useEffect } from 'react';
import { Clipboard, Sliders, RefreshCw, BarChart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FdCalculator() {
    const [principal, setPrincipal] = useState(100000); // default 1 Lakh
    const [interestRate, setInterestRate] = useState(7.1); // default 7.1%
    const [tenure, setTenure] = useState(5); // default 5 years
    const [compoundFrequency, setCompoundFrequency] = useState<1 | 2 | 4 | 12>(4); // default Quarterly (4)
    const [fdDetails, setFdDetails] = useState<{
        maturityAmount: number;
        totalInterest: number;
    } | null>(null);

    const calculateFD = () => {
        const P = principal;
        const r = interestRate / 100;
        const t = tenure;
        const n = compoundFrequency;

        // Compound Interest Formula: A = P * (1 + r/n)^(n*t)
        const maturityAmount = P * Math.pow(1 + (r / n), n * t);
        const totalInterest = maturityAmount - P;

        setFdDetails({
            maturityAmount: Math.round(maturityAmount),
            totalInterest: Math.round(totalInterest)
        });
    };

    useEffect(() => {
        calculateFD();
    }, [principal, interestRate, tenure, compoundFrequency]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    const getFrequencyLabel = (freq: number) => {
        switch (freq) {
            case 12: return 'Monthly';
            case 4: return 'Quarterly';
            case 2: return 'Half-Yearly';
            case 1: return 'Yearly';
            default: return 'Quarterly';
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">Fixed Deposit (FD) Interest Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Calculate your bank Fixed Deposit maturity proceeds and total compound interest earnings over customized terms.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Customizer Parameters (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Principal Amount */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Principal Deposit (₹)</span>
                            <span className="font-mono text-indigo-400 font-bold">{formatCurrency(principal)}</span>
                        </div>
                        <input
                            type="range"
                            min="10000"
                            max="10000000"
                            step="10000"
                            value={principal}
                            onChange={(e) => setPrincipal(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Interest Rate */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Rate of Interest (p.a.)</span>
                            <span className="font-mono text-indigo-400 font-bold">{interestRate}%</span>
                        </div>
                        <input
                            type="range"
                            min="2"
                            max="15"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Tenure */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Tenure (Years)</span>
                            <span className="font-mono text-indigo-400 font-bold">{tenure} Years</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="25"
                            step="1"
                            value={tenure}
                            onChange={(e) => setTenure(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Compounding Frequency */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Compounding Interval</label>
                        <div className="grid grid-cols-4 gap-2">
                            {([12, 4, 2, 1] as const).map(freq => (
                                <button
                                    key={freq}
                                    onClick={() => setCompoundFrequency(freq)}
                                    className={`py-2 rounded-lg text-[10px] font-bold uppercase transition ${
                                        compoundFrequency === freq 
                                            ? 'bg-indigo-600 text-white' 
                                            : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {getFrequencyLabel(freq)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Return Summary (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {fdDetails && (
                        <div className="space-y-6">
                            {/* Key Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Principal Deposited</p>
                                    <p className="text-sm font-bold text-neutral-200 mt-1 font-mono">{formatCurrency(principal)}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Interest Earned</p>
                                    <p className="text-sm font-bold text-emerald-400 mt-1 font-mono">{formatCurrency(fdDetails.totalInterest)}</p>
                                </div>
                                <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Maturity Proceeds</p>
                                    <p className="text-sm font-bold text-indigo-400 mt-1 font-mono">{formatCurrency(fdDetails.maturityAmount)}</p>
                                </div>
                            </div>

                            {/* visual progress gauge block */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                                <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                                    <BarChart className="h-4 w-4" /> Maturity Breakup Analysis
                                </span>

                                <div className="space-y-2">
                                    <div className="flex h-3 rounded-full overflow-hidden bg-white/10">
                                        <div 
                                            style={{ width: `${(principal / fdDetails.maturityAmount) * 100}%` }}
                                            className="bg-indigo-500 transition-all duration-500" 
                                            title="Deposited Principal"
                                        />
                                        <div 
                                            style={{ width: `${(fdDetails.totalInterest / fdDetails.maturityAmount) * 100}%` }}
                                            className="bg-emerald-500 transition-all duration-500" 
                                            title="Accumulated Interest"
                                        />
                                    </div>

                                    <div className="flex justify-between text-[10px] text-neutral-400">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full" /> 
                                            Principal: {Math.round((principal / fdDetails.maturityAmount) * 100)}%
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> 
                                            Interest: {Math.round((fdDetails.totalInterest / fdDetails.maturityAmount) * 100)}%
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
