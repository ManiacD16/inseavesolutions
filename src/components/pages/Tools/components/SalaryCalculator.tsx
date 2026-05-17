import { useState, useEffect } from 'react';
import { Clipboard, Sliders, RefreshCw, BarChart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SalaryCalculator() {
    const [grossAnnual, setGrossAnnual] = useState(800000); // 8 Lakhs p.a.
    const [providentFund, setProvidentFund] = useState(21600); // standard 1800/mo
    const [professionalTax, setProfessionalTax] = useState(2400); // standard 2400/yr
    const [insurance, setInsurance] = useState(12000); // standard insurance
    const [salaryDetails, setSalaryDetails] = useState<{
        grossMonthly: number;
        annualTax: number;
        annualDeductions: number;
        netAnnual: number;
        netMonthly: number;
    } | null>(null);

    // Calculate Indian Income Tax (New Regime slab estimate)
    const calculateTax = (income: number) => {
        let taxable = income - 50000; // standard deduction of 50,000 INR
        if (taxable <= 700000) return 0; // Tax rebate up to 7 Lakhs under new regime

        let tax = 0;
        
        // Slabs:
        // 0 to 3L: 0%
        // 3L to 6L: 5%
        // 6L to 9L: 10%
        // 9L to 12L: 15%
        // 12L to 15L: 20%
        // Above 15L: 30%
        if (taxable > 1500000) {
            tax += (taxable - 1500000) * 0.30;
            taxable = 1500000;
        }
        if (taxable > 1200000) {
            tax += (taxable - 1200000) * 0.20;
            taxable = 1200000;
        }
        if (taxable > 900000) {
            tax += (taxable - 900000) * 0.15;
            taxable = 900000;
        }
        if (taxable > 600000) {
            tax += (taxable - 600000) * 0.10;
            taxable = 600000;
        }
        if (taxable > 300000) {
            tax += (taxable - 300000) * 0.05;
        }

        // Add 4% Cess
        return tax * 1.04;
    };

    const handleCalculate = () => {
        const annualTax = calculateTax(grossAnnual);
        const annualDeductions = providentFund + professionalTax + insurance + annualTax;
        const netAnnual = grossAnnual - annualDeductions;

        setSalaryDetails({
            grossMonthly: Math.round(grossAnnual / 12),
            annualTax: Math.round(annualTax),
            annualDeductions: Math.round(annualDeductions),
            netAnnual: Math.round(netAnnual),
            netMonthly: Math.round(netAnnual / 12)
        });
    };

    useEffect(() => {
        handleCalculate();
    }, [grossAnnual, providentFund, professionalTax, insurance]);

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
                <h3 className="text-xl font-semibold text-white">In-Hand Salary & Income Tax Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Calculate your monthly net in-hand salary, annual tax deductions under the new tax regime, and employee PF deductions.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Gross Annual */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Gross Annual CTC (₹)</span>
                            <span className="font-mono text-indigo-400 font-bold">{formatCurrency(grossAnnual)}</span>
                        </div>
                        <input
                            type="range"
                            min="200000"
                            max="5000000"
                            step="20000"
                            value={grossAnnual}
                            onChange={(e) => setGrossAnnual(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Employee PF */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Annual Provident Fund (PF) Contribution</span>
                            <span className="font-mono text-indigo-400 font-bold">{formatCurrency(providentFund)}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="1200"
                            value={providentFund}
                            onChange={(e) => setProvidentFund(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Health Insurance */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Annual Health Insurance Premium</span>
                            <span className="font-mono text-indigo-400 font-bold">{formatCurrency(insurance)}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="50000"
                            step="1000"
                            value={insurance}
                            onChange={(e) => setInsurance(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>
                </div>

                {/* Return Summary (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {salaryDetails && (
                        <div className="space-y-6">
                            {/* Key Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Net Monthly Take-Home</p>
                                    <p className="text-base font-bold text-indigo-400 mt-1 font-mono">{formatCurrency(salaryDetails.netMonthly)}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Net Annual Take-Home</p>
                                    <p className="text-sm font-bold text-neutral-200 mt-1 font-mono">{formatCurrency(salaryDetails.netAnnual)}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Annual Income Tax</p>
                                    <p className="text-sm font-bold text-rose-400 mt-1 font-mono">{formatCurrency(salaryDetails.annualTax)}</p>
                                </div>
                            </div>

                            {/* visual progress gauge block */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                                <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                                    <BarChart className="h-4 w-4" /> CTC Allocation Breakdown
                                </span>

                                <div className="space-y-2">
                                    <div className="flex h-3 rounded-full overflow-hidden bg-white/10">
                                        <div 
                                            style={{ width: `${(salaryDetails.netAnnual / grossAnnual) * 100}%` }}
                                            className="bg-indigo-500 transition-all duration-500" 
                                            title="In-Hand Take Home"
                                        />
                                        <div 
                                            style={{ width: `${(salaryDetails.annualTax / grossAnnual) * 100}%` }}
                                            className="bg-rose-500 transition-all duration-500" 
                                            title="Income Tax"
                                        />
                                        <div 
                                            style={{ width: `${((providentFund + insurance + professionalTax) / grossAnnual) * 100}%` }}
                                            className="bg-amber-500 transition-all duration-500" 
                                            title="Provident Fund & Deductions"
                                        />
                                    </div>

                                    <div className="flex justify-between text-[10px] text-neutral-400 flex-wrap gap-2">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full" /> 
                                            Take Home: {Math.round((salaryDetails.netAnnual / grossAnnual) * 100)}%
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full" /> 
                                            Income Tax: {Math.round((salaryDetails.annualTax / grossAnnual) * 100)}%
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" /> 
                                            Deductions: {Math.round(((providentFund + insurance + professionalTax) / grossAnnual) * 100)}%
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
