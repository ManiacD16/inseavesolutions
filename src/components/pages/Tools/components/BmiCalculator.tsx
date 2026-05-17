import { useState, useEffect } from 'react';
import { Clipboard, Sliders, RefreshCw, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BmiCalculator() {
    const [weight, setWeight] = useState(70); // kg
    const [height, setHeight] = useState(170); // cm
    const [bmiDetails, setBmiDetails] = useState<{
        bmi: number;
        category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
        color: string;
        bgColor: string;
        tip: string;
    } | null>(null);

    const calculateBMI = () => {
        const heightMeters = height / 100;
        const bmi = weight / (heightMeters * heightMeters);
        const roundedBmi = Math.round(bmi * 10) / 10;

        let category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese' = 'Normal';
        let color = 'text-emerald-400';
        let bgColor = 'bg-emerald-500/10 border-emerald-500/20';
        let tip = 'Great job! Keep maintaining a balanced diet and regular physical exercise.';

        if (roundedBmi < 18.5) {
            category = 'Underweight';
            color = 'text-amber-400';
            bgColor = 'bg-amber-500/10 border-amber-500/20';
            tip = 'Consider consulting a healthcare provider or nutritionist to plan a balanced weight-gain program.';
        } else if (roundedBmi >= 25 && roundedBmi < 29.9) {
            category = 'Overweight';
            color = 'text-orange-400';
            bgColor = 'bg-orange-500/10 border-orange-500/20';
            tip = 'Consider adopting a light daily calorie deficit and incorporating cardiovascular exercises.';
        } else if (roundedBmi >= 30) {
            category = 'Obese';
            color = 'text-red-400';
            bgColor = 'bg-red-500/10 border-red-500/20';
            tip = 'Please consult a registered dietitian or doctor for a professional health and fitness assessment.';
        }

        setBmiDetails({
            bmi: roundedBmi,
            category,
            color,
            bgColor,
            tip
        });
    };

    useEffect(() => {
        calculateBMI();
    }, [weight, height]);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">Body Mass Index (BMI) Health Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Calculate your BMI profile client-side and map your health status across standard classification scales.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sliders (5 columns) */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Sliders className="h-4 w-4" /> Parameters
                    </span>

                    {/* Weight slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Weight (kg)</span>
                            <span className="font-mono text-indigo-400 font-bold">{weight} kg</span>
                        </div>
                        <input
                            type="range"
                            min="20"
                            max="200"
                            value={weight}
                            onChange={(e) => setWeight(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>

                    {/* Height slider */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-neutral-300">
                            <span>Height (cm)</span>
                            <span className="font-mono text-indigo-400 font-bold">{height} cm</span>
                        </div>
                        <input
                            type="range"
                            min="100"
                            max="250"
                            value={height}
                            onChange={(e) => setHeight(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>
                </div>

                {/* Return Summary (7 columns) */}
                <div className="lg:col-span-7 space-y-6">
                    {bmiDetails && (
                        <div className="space-y-6">
                            {/* Key Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-black/35 border border-white/5 p-4 rounded-xl flex flex-col justify-center">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Your BMI Score</p>
                                    <p className="text-3xl font-extrabold text-indigo-400 mt-1 font-mono">{bmiDetails.bmi}</p>
                                </div>
                                <div className={`border p-4 rounded-xl flex flex-col justify-center ${bmiDetails.bgColor}`}>
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Classification</p>
                                    <p className={`text-2xl font-extrabold mt-1 ${bmiDetails.color}`}>{bmiDetails.category}</p>
                                </div>
                            </div>

                            {/* visual progress gauge block */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                                <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5">
                                    <Activity className="h-4 w-4" /> BMI Index Scale
                                </span>

                                <div className="space-y-2">
                                    {/* colored scale bars */}
                                    <div className="flex h-3 rounded-full overflow-hidden bg-white/10 relative">
                                        <div className="w-[18.5%] bg-amber-500" title="Underweight" />
                                        <div className="w-[25%] bg-emerald-500" title="Normal" />
                                        <div className="w-[20%] bg-orange-500" title="Overweight" />
                                        <div className="w-[36.5%] bg-red-500" title="Obese" />
                                        
                                        {/* pointer indicator representing current score */}
                                        <div 
                                            style={{ 
                                                left: `${Math.min(Math.max(((bmiDetails.bmi - 10) / 35) * 100, 2), 98)}%` 
                                            }}
                                            className="absolute top-0 w-2 h-3 bg-white border border-black shadow"
                                        />
                                    </div>

                                    <div className="flex justify-between text-[8px] text-neutral-500 uppercase font-bold tracking-wider">
                                        <span>&lt; 18.5 Under</span>
                                        <span>18.5-24.9 Normal</span>
                                        <span>25-29.9 Over</span>
                                        <span>&gt; 30 Obese</span>
                                    </div>
                                </div>
                            </div>

                            {/* health tip box */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-neutral-400 leading-relaxed">
                                <strong>Health Recommendation:</strong> {bmiDetails.tip}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
