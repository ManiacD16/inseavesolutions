import { useState, useEffect } from 'react';
import { Clipboard, Sliders, RefreshCw, BarChart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EmiCalculator() {
    const [loanAmount, setLoanAmount] = useState(1000000); // default 10 Lakh
    const [interestRate, setInterestRate] = useState(8.5); // default 8.5%
    const [tenure, setTenure] = useState(15); // default 15 years
    const [emiDetails, setEmiDetails] = useState<{
        monthlyEmi: number;
        totalInterest: number;
        totalPayment: number;
    } | null>(null);

    const calculateEMI = () => {
        const P = loanAmount;
        const r = (interestRate / 12) / 100;
        const n = tenure * 12;

        if (r === 0) {
            setEmiDetails({
                monthlyEmi: P / n,
                totalInterest: 0,
                totalPayment: P
            });
            return;
        }

        // EMI Formula: P * r * (1 + r)^n / [ (1 + r)^n - 1 ]
        const monthlyEmi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = monthlyEmi * n;
        const totalInterest = totalPayment - P;

        setEmiDetails({
            monthlyEmi: Math.round(monthlyEmi),
            totalInterest: Math.round(totalInterest),
            totalPayment: Math.round(totalPayment)
        });
    };

    useEffect(() => {
        calculateEMI();
    }, [loanAmount, interestRate, tenure]);

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
                <h3 className="text-xl font-semibold text-white">Equated Monthly Installment (EMI) Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Calculate your monthly loan installments (EMIs), interest burden, and total payouts using customized parameters.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Loan Amount */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Loan Amount</span>
                            <span className="font-mono text-indigo-400 font-bold">{formatCurrency(loanAmount)}</span>
                        </div>
                        <input
                            type="range"
                            min="50000"
                            max="10000000"
                            step="10000"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Interest Rate */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Interest Rate (p.a.)</span>
                            <span className="font-mono text-indigo-400 font-bold">{interestRate}%</span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="20"
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
                            max="30"
                            step="1"
                            value={tenure}
                            onChange={(e) => setTenure(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>
                </div>

                {/* Summary (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {emiDetails && (
                        <div className="space-y-6">
                            {/* Key Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Monthly EMI</p>
                                    <p className="text-base font-bold text-indigo-400 mt-1 font-mono">{formatCurrency(emiDetails.monthlyEmi)}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Principal Loan</p>
                                    <p className="text-base font-bold text-neutral-200 mt-1 font-mono">{formatCurrency(loanAmount)}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Interest Payable</p>
                                    <p className="text-base font-bold text-rose-400 mt-1 font-mono">{formatCurrency(emiDetails.totalInterest)}</p>
                                </div>
                            </div>

                            {/* visual progress gauge block */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                                <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                                    <BarChart className="h-4 w-4" /> Total Payment Breakup
                                </span>

                                <div className="space-y-2">
                                    <div className="flex h-3 rounded-full overflow-hidden bg-white/10">
                                        <div 
                                            style={{ width: `${(loanAmount / emiDetails.totalPayment) * 100}%` }}
                                            className="bg-indigo-500 transition-all duration-500" 
                                            title="Loan Principal"
                                        />
                                        <div 
                                            style={{ width: `${(emiDetails.totalInterest / emiDetails.totalPayment) * 100}%` }}
                                            className="bg-rose-500 transition-all duration-500" 
                                            title="Total Interest"
                                        />
                                    </div>

                                    <div className="flex justify-between text-[10px] text-neutral-400">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full" /> 
                                            Principal: {Math.round((loanAmount / emiDetails.totalPayment) * 100)}%
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full" /> 
                                            Interest: {Math.round((emiDetails.totalInterest / emiDetails.totalPayment) * 100)}%
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
