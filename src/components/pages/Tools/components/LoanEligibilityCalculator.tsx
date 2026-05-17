import { useState, useEffect } from 'react';
import { Clipboard, Sliders, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoanEligibilityCalculator() {
    const [monthlyIncome, setMonthlyIncome] = useState<number>(50000);
    const [existingEmi, setExistingEmi] = useState<number>(0);
    const [interestRate, setInterestRate] = useState<number>(8.5);
    const [tenure, setTenure] = useState<number>(20); // 20 years

    const [eligibilityDetails, setEligibilityDetails] = useState<{
        maxEmiAllowed: number;
        eligibleEmi: number;
        maxLoanAmount: number;
        isEligible: boolean;
    } | null>(null);

    const calculateEligibility = () => {
        if (!monthlyIncome || monthlyIncome <= 0) return;

        // Standard banking ratio FOIR (Fixed Obligation to Income Ratio) is usually 50%
        const foir = 0.50;
        const maxEmiAllowed = monthlyIncome * foir;
        const eligibleEmi = maxEmiAllowed - existingEmi;

        if (eligibleEmi <= 0) {
            setEligibilityDetails({
                maxEmiAllowed,
                eligibleEmi: 0,
                maxLoanAmount: 0,
                isEligible: false
            });
            return;
        }

        const r = (interestRate / 12) / 100;
        const n = tenure * 12;

        // Reverse EMI formula: P = EMI * [ (1 + r)^n - 1 ] / [ r * (1 + r)^n ]
        const maxLoanAmount = eligibleEmi * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));

        setEligibilityDetails({
            maxEmiAllowed: Math.round(maxEmiAllowed),
            eligibleEmi: Math.round(eligibleEmi),
            maxLoanAmount: Math.round(maxLoanAmount),
            isEligible: true
        });
    };

    useEffect(() => {
        calculateEligibility();
    }, [monthlyIncome, existingEmi, interestRate, tenure]);

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
                <h3 className="text-xl font-semibold text-white">Loan Eligibility & Borrowing Power Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Check your maximum home or personal loan borrowing eligibility based on standard Indian bank FOIR ratios.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs parameters (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Monthly Income */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Net Monthly Take-Home (₹)</label>
                        <input
                            type="number"
                            value={monthlyIncome}
                            onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Existing EMIs */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Existing Monthly EMIs (₹)</label>
                        <input
                            type="number"
                            value={existingEmi}
                            onChange={(e) => setExistingEmi(parseFloat(e.target.value) || 0)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    {/* Expected rate */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Expected Interest Rate (p.a.)</span>
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

                {/* Return Summary (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {eligibilityDetails && (
                        <div className="space-y-6">
                            {/* Key Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className={`border p-4 rounded-xl flex items-center gap-3 ${
                                    eligibilityDetails.isEligible 
                                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                                }`}>
                                    {eligibilityDetails.isEligible 
                                        ? <CheckCircle className="h-6 w-6 text-emerald-400 shrink-0" />
                                        : <AlertTriangle className="h-6 w-6 text-red-400 shrink-0" />
                                    }
                                    <div>
                                        <p className="text-[10px] text-neutral-500 uppercase font-semibold">Eligibility Status</p>
                                        <p className="text-sm font-bold mt-0.5">
                                            {eligibilityDetails.isEligible ? 'Eligible to Borrow' : 'Not Eligible'}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Max Loan Eligible Amount</p>
                                    <p className="text-base font-bold text-indigo-400 mt-1 font-mono">{formatCurrency(eligibilityDetails.maxLoanAmount)}</p>
                                </div>
                            </div>

                            {/* Extra stats */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                                <span className="text-xs font-semibold text-neutral-400 tracking-wider uppercase block border-b border-white/5 pb-2">
                                    Affordability Analysis
                                </span>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs text-neutral-400">
                                        <span>Max Emi Allowed (50% FOIR):</span>
                                        <span className="font-mono text-neutral-200">{formatCurrency(eligibilityDetails.maxEmiAllowed)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-neutral-400">
                                        <span>Existing EMIs Obligations:</span>
                                        <span className="font-mono text-rose-400">{formatCurrency(existingEmi)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-neutral-300 border-t border-white/5 pt-3">
                                        <span className="font-semibold">Eligible Additional EMI:</span>
                                        <span className="font-mono text-emerald-400 font-bold">{formatCurrency(eligibilityDetails.eligibleEmi)}</span>
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
