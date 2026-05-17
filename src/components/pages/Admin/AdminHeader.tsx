import { Menu, Bell, LogOut, Sun, Moon, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

interface AdminHeaderProps {
    onMenuClick: () => void;
    title: string;
    isDark: boolean;
    toggleTheme: () => void;
    unreadCount: number;
}

export default function AdminHeader({ onMenuClick, title, isDark, toggleTheme, unreadCount }: AdminHeaderProps) {
    const { user, logout } = useAuth();
    const role = (user as any)?.role || "Administrator";

    return (
        <header className={`${isDark ? 'bg-[#0B1120]/80 border-white/10' : 'bg-white/80 border-slate-200'} backdrop-blur-md border-b p-4 sticky top-0 z-40 transition-colors duration-300`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={onMenuClick} className={`lg:hidden p-2 rounded-lg transition ${isDark ? 'text-white hover:bg-white/10' : 'text-slate-900 hover:bg-slate-100'}`}>
                        <Menu className="h-6 w-6" />
                    </button>
                    <h2 className={`text-xl font-semibold ${isDark ? 'text-white/90' : 'text-slate-800'}`}>{title}</h2>
                </div>

                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-colors ${isDark ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-neutral-500 hover:text-slate-900 hover:bg-slate-100'}`}
                        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>

                    {/* Notifications */}
                    <Link to="/admin/contacts" className={`relative p-2 rounded-lg transition-colors ${isDark ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-neutral-500 hover:text-slate-900 hover:bg-slate-100'}`} title="Notifications">
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border border-[#0B1120] text-[10px] font-bold text-white flex items-center justify-center">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </Link>

                    {/* Logout Button */}
                    <button
                        onClick={logout}
                        className={`p-2 rounded-lg transition-colors ${isDark ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'text-red-500 hover:text-red-600 hover:bg-red-50'}`}
                        title="Logout"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                        <div className="hidden md:block text-right">
                            <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{user?.name || "Admin User"}</div>
                            <div className="text-xs text-neutral-500">{role}</div>
                        </div>
                        <div className="h-9 w-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                            {user?.profile_pic ? (
                                <img src={user.profile_pic} alt="Profile" className="h-full w-full rounded-full object-cover" />
                            ) : (
                                <User className="h-5 w-5" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
