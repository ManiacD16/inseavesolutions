import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Save, Lock, User, Upload, Eye, EyeOff } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import API_BASE_URL from "../../../config/api";

interface AdminContextType {
    isDark: boolean;
}

export default function Settings() {
    const { user, updateUser } = useAuth();
    const { isDark } = useOutletContext<AdminContextType>();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Profile Form State
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [profilePic, setProfilePic] = useState(user?.profile_pic || "");

    // Password Form State
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, email, profile_pic: profilePic }),
            });

            if (!response.ok) throw new Error('Failed to update profile');
            const updatedUser = await response.json();

            updateUser(updatedUser);
            setMessage({ type: 'success', text: 'Profile updated successfully' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Update failed' });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/auth/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update password');
            }

            setMessage({ type: 'success', text: 'Password updated successfully. Email notification sent.' });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            // Check if error is Error object otherwise use generic
            const errMsg = error instanceof Error ? error.message : "Password update failed";
            setMessage({ type: 'error', text: errMsg });
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = `w-full px-4 py-2 rounded-lg outline-none transition ${isDark
        ? 'bg-white/5 border border-white/10 focus:border-indigo-500 text-white'
        : 'bg-white border border-slate-200 focus:border-indigo-600 text-slate-900'
        }`;

    const labelClasses = `text-sm font-medium mb-1 block ${isDark ? 'text-neutral-300' : 'text-slate-700'}`;
    const cardClasses = `rounded-xl p-6 sm:p-8 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`;
    const headingClasses = `text-xl font-semibold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>Account Settings</h1>

            {message && (
                <div className={`p-4 rounded-lg border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                    {message.text}
                </div>
            )}

            {/* Profile Settings */}
            <div className={cardClasses}>
                <h2 className={headingClasses}>
                    <User className="h-5 w-5 text-indigo-400" />
                    Profile Information
                </h2>

                <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="flex items-center gap-6 mb-6">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center overflow-hidden border ${isDark ? 'bg-white/10 border-white/20' : 'bg-slate-100 border-slate-200'}`}>
                            {profilePic ? (
                                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="h-8 w-8 text-neutral-500" />
                            )}
                        </div>
                        <div className="flex-1">
                            <label className={labelClasses}>Profile Picture URL</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={profilePic}
                                    onChange={(e) => setProfilePic(e.target.value)}
                                    className={`flex-1 ${inputClasses}`}
                                    placeholder="https://..."
                                />
                                <label className={`cursor-pointer px-4 py-2 rounded-lg transition flex items-center gap-2 ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}>
                                    <Upload className="h-4 w-4" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            const formData = new FormData();
                                            formData.append('image', file);
                                            try {
                                                const res = await fetch(`${API_BASE_URL}/api/upload`, { method: 'POST', body: formData });
                                                if (res.ok) {
                                                    const data = await res.json();
                                                    setProfilePic(data.imageUrl);
                                                }
                                            } catch (err) { console.error(err); }
                                        }}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClasses}>Display Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition font-medium flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        Save Profile
                    </button>
                </form>
            </div>

            {/* Security Settings */}
            <div className={cardClasses}>
                <h2 className={headingClasses}>
                    <Lock className="h-5 w-5 text-indigo-400" />
                    Security & Password
                </h2>

                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                    <div>
                        <label className={labelClasses}>Current Password</label>
                        <div className="relative">
                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className={inputClasses}
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition"
                            >
                                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className={labelClasses}>New Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className={inputClasses}
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition"
                            >
                                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className={labelClasses}>Confirm New Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={inputClasses}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition"
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition font-medium flex items-center gap-2 disabled:opacity-50 mt-4 shadow-lg shadow-red-500/20"
                    >
                        <Lock className="h-4 w-4" />
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
}
