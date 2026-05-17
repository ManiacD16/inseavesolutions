import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, CheckCircle, ArrowLeft, KeyRound, User } from 'lucide-react';
import API_BASE_URL from '../../../config/api';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Username/Email, 2: OTP, 3: New Password
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [registeredEmail, setRegisteredEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usernameOrEmail })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || data.error || 'Failed to send OTP');
            
            const targetEmail = data.data?.email || usernameOrEmail;
            setRegisteredEmail(targetEmail);
            setMessage({ type: 'success', text: `OTP has been successfully sent to ${targetEmail}` });
            setStep(2);
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usernameOrEmail, otp })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || data.error || 'Invalid OTP');
            setMessage({ type: 'success', text: 'OTP verified. Please set your new password.' });
            setStep(3);
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: "Passwords don't match" });
            return;
        }
        setLoading(true);
        setMessage(null);
        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usernameOrEmail, otp, newPassword })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || data.error || 'Failed to reset password');
            setMessage({ type: 'success', text: 'Password reset successfully! Redirecting to login...' });
            setTimeout(() => navigate('/admin/login'), 2500);
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-500">
                        {step === 1 && <User className="h-8 w-8" />}
                        {step === 2 && <KeyRound className="h-8 w-8" />}
                        {step === 3 && <Lock className="h-8 w-8" />}
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                        {step === 1 && 'Forgot Password?'}
                        {step === 2 && 'Verify OTP'}
                        {step === 3 && 'Reset Password'}
                    </h2>
                    <p className="text-neutral-400 mt-2 text-sm">
                        {step === 1 && 'Enter your admin username or registered email to receive an OTP.'}
                        {step === 2 && `Enter the 6-digit OTP sent to ${registeredEmail}`}
                        {step === 3 && 'Create a new secure password for your account.'}
                    </p>
                </div>

                {message && (
                    <div className={`px-4 py-3 rounded-lg mb-6 text-sm ${message.type === 'error' ? 'bg-red-500/10 text-red-300 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'}`}>
                        {message.text}
                    </div>
                )}

                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-6">
                        <div className="space-y-2">
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                                <input
                                    type="text"
                                    value={usernameOrEmail}
                                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white placeholder:text-neutral-600"
                                    placeholder="Username or Email"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? 'Sending OTP...' : <>Send OTP <ArrowRight className="h-4 w-4" /></>}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div className="space-y-2">
                            <div className="relative">
                                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white tracking-widest text-center text-xl placeholder:text-neutral-600"
                                    placeholder="000000"
                                    maxLength={6}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                        >
                            {loading ? 'Verifying OTP...' : 'Verify OTP'}
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white placeholder:text-neutral-600"
                                    placeholder="New Password"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition text-white placeholder:text-neutral-600"
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? 'Resetting Password...' : <>Reset Password <CheckCircle className="h-4 w-4" /></>}
                        </button>
                    </form>
                )}

                <div className="mt-8 text-center">
                    <Link to="/admin/login" className="text-neutral-400 hover:text-white transition text-sm flex items-center justify-center gap-2">
                        <ArrowLeft className="h-3 w-3" /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
