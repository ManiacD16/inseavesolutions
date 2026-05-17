import { useState, useEffect } from 'react';
import { Sliders, RefreshCw, AlertTriangle, CheckCircle, Lightbulb, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function EmailSubjectTester() {
    const [subject, setSubject] = useState('Hurry! Free access to exclusive premium marketing secrets inside! 🔥');

    const [score, setScore] = useState<number>(0);
    const [advices, setAdvices] = useState<string[]>([]);
    const [spamCount, setSpamCount] = useState<number>(0);

    const spamWords = ['free', 'buy now', 'earn money', 'guarantee', 'act now', 'save big', 'winner', 'promo', 'cash', '100%', 'cheap', 'make money'];
    const powerWords = ['exclusive', 'secrets', 'quick', 'new', 'special', 'insider', 'limited', 'reveal', 'proven', 'grow'];

    const analyzeSubject = () => {
        let currentScore = 65;
        let findings: string[] = [];
        let foundSpam = 0;

        if (!subject.trim()) {
            setScore(0);
            setAdvices([]);
            setSpamCount(0);
            return;
        }

        // 1. Length Check
        const len = subject.length;
        if (len >= 40 && len <= 60) {
            currentScore += 15;
            findings.push('Perfect subject line length! Subject is between 40-60 characters, ideal for desktop and mobile displays.');
        } else if (len < 30) {
            currentScore -= 10;
            findings.push('Slightly too short. Add more descriptive power words or offer value indicators.');
        } else if (len > 70) {
            currentScore -= 15;
            findings.push('Too long! Mobile mailboxes will truncate this subject line, hiding key details.');
        }

        // 2. All Caps Check
        if (subject === subject.toUpperCase() && subject.match(/[A-Z]/)) {
            currentScore -= 20;
            findings.push('Screaming Alert: Avoid using all UPPERCASE letters. This triggers spam filters and feels pushy.');
        }

        // 3. Spam Check
        const lower = subject.toLowerCase();
        spamWords.forEach(word => {
            if (lower.includes(word)) {
                currentScore -= 15;
                foundSpam++;
                findings.push(`Spam Word Found: Avoid using "${word}" as it often triggers spam and promotion folders.`);
            }
        });

        // 4. Power / Excitement Words Check
        let foundPower = false;
        powerWords.forEach(word => {
            if (lower.includes(word)) {
                foundPower = true;
            }
        });
        if (foundPower) {
            currentScore += 10;
            findings.push('Great job using high-CTR power words to spark curiosity!');
        } else {
            findings.push('Tip: Try incorporating psychological power words (e.g. "exclusive", "secrets", "limited") to boost curiosity.');
        }

        // 5. Emoji Check
        const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\p{Emoji_Presentation}/gu;
        if (emojiRegex.test(subject)) {
            currentScore += 10;
            findings.push('Emoji detected! Emojis help your emails stand out in crowded client inboxes.');
        } else {
            findings.push('Tip: Add a relevant emoji to visually distinguish your newsletter.');
        }

        const finalScore = Math.max(0, Math.min(100, currentScore));
        setScore(finalScore);
        setAdvices(findings);
        setSpamCount(foundSpam);
    };

    useEffect(() => {
        analyzeSubject();
    }, [subject]);

    const getScoreColor = () => {
        if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
        if (score >= 60) return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
        return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h3 className="text-xl font-semibold text-white">Email Subject Line CTR Tester</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Analyze subject lines for optimal lengths, uppercase limits, emoji enhancements, and spam triggers to optimize open rates.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-6 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Star className="h-4 w-4" /> Input Subject Line
                    </span>

                    <div className="space-y-2">
                        <textarea
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            rows={3}
                            placeholder="Type your email subject here..."
                            className="w-full bg-black/45 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-indigo-500 transition leading-relaxed resize-none font-mono"
                        />
                        <div className="flex justify-between text-[10px] text-neutral-400">
                            <span>Character count: <strong>{subject.length}</strong> (Ideal: 40-60)</span>
                            <span>Spam triggers: <strong>{spamCount}</strong></span>
                        </div>
                    </div>
                </div>

                {/* Returns Summary */}
                <div className="lg:col-span-6 space-y-6">
                    {subject.trim() && (
                        <div className="space-y-5">
                            {/* Score circular badge */}
                            <div className={`border p-5 rounded-2xl flex items-center justify-between gap-4 ${getScoreColor()}`}>
                                <div>
                                    <h4 className="text-[10px] uppercase font-bold tracking-wider opacity-75">Subject Line Score</h4>
                                    <p className="text-4xl font-extrabold mt-1 font-mono">{score}/100</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-bold px-3 py-1 bg-white/10 rounded-full uppercase tracking-wider">
                                        {score >= 80 ? 'Excellent (A)' : score >= 60 ? 'Moderate (B)' : 'Needs Work (F)'}
                                    </span>
                                </div>
                            </div>

                            {/* Feedbacks list */}
                            <div className="space-y-3">
                                <h5 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Analysis Pointers:</h5>
                                <div className="space-y-2">
                                    {advices.map((advice, i) => {
                                        const isSpam = advice.includes('Spam') || advice.includes('caps') || advice.includes('Too long');
                                        return (
                                            <div 
                                                key={i} 
                                                className={`p-3 rounded-xl text-xs flex items-start gap-2.5 leading-relaxed ${
                                                    isSpam 
                                                        ? 'bg-rose-500/10 border border-rose-500/10 text-rose-300' 
                                                        : 'bg-white/5 border border-white/5 text-neutral-300'
                                                }`}
                                            >
                                                {isSpam ? (
                                                    <AlertTriangle className="h-4.5 w-4.5 shrink-0 text-rose-400 mt-0.5" />
                                                ) : (
                                                    <CheckCircle className="h-4.5 w-4.5 shrink-0 text-emerald-400 mt-0.5" />
                                                )}
                                                <span>{advice}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
