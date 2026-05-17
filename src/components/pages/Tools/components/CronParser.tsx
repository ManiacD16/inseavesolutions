import { useState } from 'react';
import { Clipboard, RefreshCw, Clock, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CronParser() {
    const [cron, setCron] = useState('*/15 * * * *');
    const [explanation, setExplanation] = useState('Every 15 minutes, every hour, every day.');

    const presets = [
        { label: 'Every 5 min', expression: '*/5 * * * *', desc: 'Every 5 minutes, every hour, every day.' },
        { label: 'Every hour', expression: '0 * * * *', desc: 'At minute 0 of every hour, every day.' },
        { label: 'Daily at 12 AM', expression: '0 0 * * *', desc: 'At 12:00 AM every day.' },
        { label: 'Weekly Sun 12 AM', expression: '0 0 * * 0', desc: 'At 12:00 AM, only on Sunday.' },
        { label: 'Mon-Fri at 9 AM', expression: '0 9 * * 1-5', desc: 'At 09:00 AM, Monday through Friday.' }
    ];

    const parseCronPart = (part: string, unit: 'minute' | 'hour' | 'dom' | 'month' | 'dow'): string => {
        if (part === '*') {
            return `every ${unit}`;
        }

        if (part.includes('/')) {
            const split = part.split('/');
            const step = split[1];
            return `every ${step} ${unit}s`;
        }

        if (part.includes('-')) {
            const split = part.split('-');
            return `from ${unit} ${split[0]} to ${split[1]}`;
        }

        if (part.includes(',')) {
            const list = part.split(',');
            return `at ${unit}s ${list.join(' and ')}`;
        }

        return `at ${unit} ${part}`;
    };

    const handleParse = () => {
        const parts = cron.trim().split(/\s+/);
        if (parts.length < 5 || parts.length > 6) {
            setExplanation('Invalid cron expression. Cron expressions must have exactly 5 or 6 white-space separated fields.');
            return;
        }

        try {
            const minutesDesc = parseCronPart(parts[0], 'minute');
            const hoursDesc = parseCronPart(parts[1], 'hour');
            const domDesc = parts[2] === '*' ? '' : `on day of month ${parts[2]}`;
            const monthDesc = parts[3] === '*' ? '' : `in month ${parts[3]}`;
            const dowDesc = parts[4] === '*' ? 'every day' : `on day of week ${parts[4]}`;

            // Clean up phrasing
            let result = '';
            if (parts[0] === '0' && parts[1] !== '*') {
                const hourPad = parts[1].padStart(2, '0');
                result = `At ${hourPad}:00, ${dowDesc} ${domDesc} ${monthDesc}.`;
            } else {
                result = `${minutesDesc.charAt(0).toUpperCase() + minutesDesc.slice(1)}, ${hoursDesc}, ${dowDesc} ${domDesc} ${monthDesc}.`;
            }

            // Remove trailing spaces
            result = result.replace(/\s+/g, ' ').trim();
            setExplanation(result);
            toast.success('Parsed Cron expression successfully!');
        } catch (e) {
            setExplanation('Failed to parse cron expression. Please check your syntax fields.');
        }
    };

    const handlePresetSelect = (preset: typeof presets[0]) => {
        setCron(preset.expression);
        setExplanation(preset.desc);
        toast.success(`Selected Preset: ${preset.label}`);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">Cron Expression Parser & Time Planner</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Translate complex cron timing schedules into highly descriptive, human-readable English syntax profiles instantly.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs and Presets (6 columns) */}
                <div className="lg:col-span-6 space-y-5">
                    {/* Expression Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">Cron String Expression</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={cron}
                                onChange={(e) => setCron(e.target.value)}
                                className="flex-1 bg-black/45 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500 transition font-mono"
                                placeholder="*/15 * * * *"
                            />
                            <button
                                onClick={handleParse}
                                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition text-xs uppercase"
                            >
                                Parse
                            </button>
                        </div>
                    </div>

                    {/* Presets List */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider block">Timing Presets</label>
                        <div className="flex flex-wrap gap-2">
                            {presets.map((preset) => (
                                <button
                                    key={preset.label}
                                    onClick={() => handlePresetSelect(preset)}
                                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                                        cron === preset.expression
                                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_-3px_rgba(79,70,229,0.3)]'
                                            : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Explanation Output (6 columns) */}
                <div className="lg:col-span-6 space-y-4">
                    {/* Visual Description Panel */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6 space-y-4 h-full flex flex-col justify-between">
                        <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                            <Clock className="h-4 w-4" /> Human Translation
                        </span>

                        <div className="bg-black/35 border border-white/5 p-4 rounded-xl flex-1 flex items-center">
                            <p className="text-sm font-semibold text-neutral-300 leading-relaxed font-sans">
                                "{explanation}"
                            </p>
                        </div>

                        <div className="flex gap-3 text-[10px] text-neutral-500 leading-relaxed">
                            <HelpCircle className="h-4 w-4 text-neutral-600 shrink-0" />
                            <span>
                                Standard cron expression fields consist of: Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-6).
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
