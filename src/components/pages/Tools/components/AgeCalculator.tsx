import { useState, useEffect } from 'react';
import { Clipboard, Calendar, Clock, Smile } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AgeCalculator() {
    const [birthDate, setBirthDate] = useState('2000-01-01');
    const [ageDetail, setAgeDetail] = useState<{
        years: number;
        months: number;
        days: number;
        totalDays: number;
        totalWeeks: number;
        totalHours: number;
        nextBirthdayDays: number;
    } | null>(null);

    const calculateAge = () => {
        if (!birthDate) return;

        const dob = new Date(birthDate);
        const today = new Date();

        if (dob.getTime() > today.getTime()) {
            toast.error("Birth date cannot be in the future!");
            return;
        }

        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        if (days < 0) {
            months -= 1;
            // Get days in previous month
            const prevMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonthDate.getDate();
        }

        if (months < 0) {
            years -= 1;
            months += 12;
        }

        // Total differences
        const diffTime = Math.abs(today.getTime() - dob.getTime());
        const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalHours = totalDays * 24;

        // Next Birthday Countdown
        const nextBirthdayYear = today.getMonth() > dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate())
            ? today.getFullYear() + 1
            : today.getFullYear();
        const nextBirthday = new Date(nextBirthdayYear, dob.getMonth(), dob.getDate());
        const nextDiff = nextBirthday.getTime() - today.getTime();
        const nextBirthdayDays = Math.ceil(nextDiff / (1000 * 60 * 60 * 24));

        setAgeDetail({
            years,
            months,
            days,
            totalDays,
            totalWeeks,
            totalHours,
            nextBirthdayDays
        });
        toast.success("Age calculated successfully!");
    };

    useEffect(() => {
        calculateAge();
    }, [birthDate]);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">Exact Age & Birthday Calculator</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Calculate your exact age in years, months, and days, and track the live countdown to your next upcoming birthday.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Date Input (5 columns) */}
                <div className="lg:col-span-5 space-y-4 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Calendar className="h-4 w-4" /> Enter Birth Details
                    </span>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">Date of Birth</label>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-indigo-500 transition font-mono"
                        />
                    </div>

                    <button
                        onClick={calculateAge}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition"
                    >
                        Calculate Age
                    </button>
                </div>

                {/* Age Results (7 columns) */}
                <div className="lg:col-span-7 space-y-5">
                    {ageDetail && (
                        <div className="space-y-6">
                            {/* Primary Age Pillars */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-2xl text-center">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Years</p>
                                    <p className="text-3xl font-extrabold text-indigo-400 mt-1">{ageDetail.years}</p>
                                </div>
                                <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-2xl text-center">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Months</p>
                                    <p className="text-3xl font-extrabold text-indigo-400 mt-1">{ageDetail.months}</p>
                                </div>
                                <div className="bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-2xl text-center">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Days</p>
                                    <p className="text-3xl font-extrabold text-indigo-400 mt-1">{ageDetail.days}</p>
                                </div>
                            </div>

                            {/* Extra Time Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="bg-black/35 border border-white/5 p-3 rounded-xl text-center">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Total Weeks</p>
                                    <p className="text-sm font-bold text-neutral-200 mt-1">{ageDetail.totalWeeks}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-3 rounded-xl text-center">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Total Days</p>
                                    <p className="text-sm font-bold text-neutral-200 mt-1">{ageDetail.totalDays}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-3 rounded-xl text-center">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Total Hours</p>
                                    <p className="text-sm font-bold text-neutral-200 mt-1">{ageDetail.totalHours}</p>
                                </div>
                                <div className="bg-black/35 border border-white/5 p-3 rounded-xl text-center">
                                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Next Birthday</p>
                                    <p className="text-sm font-bold text-indigo-400 mt-1">{ageDetail.nextBirthdayDays} Days</p>
                                </div>
                            </div>

                            {/* Next Birthday Glow banner */}
                            <div className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-2xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-indigo-400" />
                                    <div>
                                        <h4 className="text-xs font-semibold text-white">Next Birthday Countdown</h4>
                                        <p className="text-[10px] text-neutral-400 mt-0.5">Only {ageDetail.nextBirthdayDays} days left until you blow out the candles!</p>
                                    </div>
                                </div>
                                <Smile className="h-6 w-6 text-indigo-400 animate-bounce" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
