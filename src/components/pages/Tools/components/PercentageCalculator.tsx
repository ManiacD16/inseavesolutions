import { useState } from 'react';
import { Clipboard, Calculator, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PercentageCalculator() {
    // Operation 1: What is X% of Y
    const [op1Percent, setOp1Percent] = useState<number>(10);
    const [op1Val, setOp1Val] = useState<number>(500);
    const [op1Result, setOp1Result] = useState<number | null>(50);

    // Operation 2: X is what percent of Y
    const [op2Val1, setOp2Val1] = useState<number>(150);
    const [op2Val2, setOp2Val2] = useState<number>(750);
    const [op2Result, setOp2Result] = useState<number | null>(20);

    // Operation 3: % Increase/decrease from X to Y
    const [op3Val1, setOp3Val1] = useState<number>(200);
    const [op3Val2, setOp3Val2] = useState<number>(250);
    const [op3Result, setOp3Result] = useState<{ change: number; type: 'increase' | 'decrease' | 'none' } | null>({ change: 25, type: 'increase' });

    const handleOp1 = () => {
        const res = (op1Percent / 100) * op1Val;
        setOp1Result(Math.round(res * 100) / 100);
        toast.success("Calculated portion value!");
    };

    const handleOp2 = () => {
        if (op2Val2 === 0) {
            toast.error("Denominator value cannot be zero!");
            return;
        }
        const res = (op2Val1 / op2Val2) * 100;
        setOp2Result(Math.round(res * 100) / 100);
        toast.success("Calculated percentage portion!");
    };

    const handleOp3 = () => {
        if (op3Val1 === 0) {
            toast.error("Initial value cannot be zero!");
            return;
        }
        const diff = op3Val2 - op3Val1;
        const res = (diff / op3Val1) * 100;
        const type = diff > 0 ? 'increase' : diff < 0 ? 'decrease' : 'none';
        setOp3Result({
            change: Math.round(Math.abs(res) * 100) / 100,
            type
        });
        toast.success("Calculated percentage change!");
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">General Percentage Mathematics Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Perform portion ratios, fractions, and percentage change (growth or depreciation) calculations instantly.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Portion (Op 1) */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div>
                        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block border-b border-white/5 pb-2">
                            What is X% of Y?
                        </span>
                        
                        <div className="space-y-3 mt-4">
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                    <label className="text-[10px] text-neutral-500 font-semibold block uppercase">Percent (X)</label>
                                    <input
                                        type="number"
                                        value={op1Percent}
                                        onChange={(e) => setOp1Percent(parseFloat(e.target.value) || 0)}
                                        className="w-full bg-black/45 border border-white/10 rounded-lg p-2 mt-1 text-white outline-none font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-neutral-500 font-semibold block uppercase">Of Value (Y)</label>
                                    <input
                                        type="number"
                                        value={op1Val}
                                        onChange={(e) => setOp1Val(parseFloat(e.target.value) || 0)}
                                        className="w-full bg-black/45 border border-white/10 rounded-lg p-2 mt-1 text-white outline-none font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <button
                            onClick={handleOp1}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs transition"
                        >
                            Calculate Portion
                        </button>
                        
                        {op1Result !== null && (
                            <div className="bg-black/35 border border-white/5 p-3 rounded-lg text-center font-mono">
                                <span className="text-[10px] text-neutral-500 uppercase font-semibold block">Result</span>
                                <span className="text-lg font-bold text-neutral-200 mt-1 block">{op1Result}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Percentage Ratio (Op 2) */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div>
                        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block border-b border-white/5 pb-2">
                            X is what % of Y?
                        </span>
                        
                        <div className="space-y-3 mt-4">
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                    <label className="text-[10px] text-neutral-500 font-semibold block uppercase">Portion (X)</label>
                                    <input
                                        type="number"
                                        value={op2Val1}
                                        onChange={(e) => setOp2Val1(parseFloat(e.target.value) || 0)}
                                        className="w-full bg-black/45 border border-white/10 rounded-lg p-2 mt-1 text-white outline-none font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-neutral-500 font-semibold block uppercase">Whole Value (Y)</label>
                                    <input
                                        type="number"
                                        value={op2Val2}
                                        onChange={(e) => setOp2Val2(parseFloat(e.target.value) || 0)}
                                        className="w-full bg-black/45 border border-white/10 rounded-lg p-2 mt-1 text-white outline-none font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <button
                            onClick={handleOp2}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs transition"
                        >
                            Calculate Ratio
                        </button>
                        
                        {op2Result !== null && (
                            <div className="bg-black/35 border border-white/5 p-3 rounded-lg text-center font-mono">
                                <span className="text-[10px] text-neutral-500 uppercase font-semibold block">Result</span>
                                <span className="text-lg font-bold text-neutral-200 mt-1 block">{op2Result}%</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Percentage Change (Op 3) */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                    <div>
                        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block border-b border-white/5 pb-2">
                            % Change from X to Y
                        </span>
                        
                        <div className="space-y-3 mt-4">
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                    <label className="text-[10px] text-neutral-500 font-semibold block uppercase">Initial (X)</label>
                                    <input
                                        type="number"
                                        value={op3Val1}
                                        onChange={(e) => setOp3Val1(parseFloat(e.target.value) || 0)}
                                        className="w-full bg-black/45 border border-white/10 rounded-lg p-2 mt-1 text-white outline-none font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] text-neutral-500 font-semibold block uppercase">Final (Y)</label>
                                    <input
                                        type="number"
                                        value={op3Val2}
                                        onChange={(e) => setOp3Val2(parseFloat(e.target.value) || 0)}
                                        className="w-full bg-black/45 border border-white/10 rounded-lg p-2 mt-1 text-white outline-none font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <button
                            onClick={handleOp3}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs transition"
                        >
                            Calculate Growth
                        </button>
                        
                        {op3Result !== null && (
                            <div className="bg-black/35 border border-white/5 p-3 rounded-lg text-center font-mono">
                                <span className="text-[10px] text-neutral-500 uppercase font-semibold block">Change Result</span>
                                <span className={`text-lg font-bold mt-1 block ${
                                    op3Result.type === 'increase' 
                                        ? 'text-emerald-400' 
                                        : op3Result.type === 'decrease' 
                                            ? 'text-rose-400' 
                                            : 'text-neutral-200'
                                }`}>
                                    {op3Result.type === 'increase' ? '+' : op3Result.type === 'decrease' ? '-' : ''}
                                    {op3Result.change}% {op3Result.type}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
