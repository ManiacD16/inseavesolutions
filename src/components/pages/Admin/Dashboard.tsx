import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Settings,
    LogOut,
    X,
    User,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";

export default function AdminDashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDark, setIsDark] = useState(false); // Default Light Mode
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();
    // Removed local blog state

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin/login');
        }
    }, [isAuthenticated, navigate]);

    // Removed fetchBlogs effect logic

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
        { icon: FileText, label: "Blogs", path: "/admin/blogs" }, // Updated Path
        { icon: MessageSquare, label: "Contacts", path: "/admin/contacts" },
        { icon: Settings, label: "Settings", path: "/admin/settings" },
    ];

    if (!isAuthenticated) return null;

    // Determine title based on path
    const getPageTitle = () => {
        if (location.pathname === '/admin') return 'Dashboard';
        if (location.pathname.startsWith('/admin/contacts')) return 'Contacts';
        if (location.pathname.startsWith('/admin/settings')) return 'Settings';
        if (location.pathname.startsWith('/admin/blogs')) return 'Blog Management';
        return 'Admin Panel';
    };

    // Helper to check active state more accurately
    const isLinkActive = (path: string) => {
        if (path === '/admin') {
            return location.pathname === '/admin';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className={`min-h-screen flex font-sans transition-colors duration-300 ${isDark ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'}`}>
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 border-r transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:relative lg:translate-x-0 flex flex-col ${isDark ? 'bg-[#0B1120] border-white/10' : 'bg-white border-slate-200'}`}
            >
                <div className={`h-16 flex items-center px-6 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">W</div>
                        <span className={`font-bold text-xl tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Admin</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className={`ml-auto lg:hidden ${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-slate-900'}`}>
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-4">
                    <div className={`flex items-center gap-3 p-3 rounded-xl mb-6 border ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 overflow-hidden ring-2 ring-indigo-500/20">
                            {user?.profile_pic ? (
                                <img src={user.profile_pic} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <User className="h-5 w-5" />
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <div className={`font-medium text-sm truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{user?.name || user?.username}</div>
                            <div className="text-xs text-neutral-500 truncate">{user?.email || "admin@example.com"}</div>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const active = isLinkActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${active
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                        : isDark
                                            ? "text-neutral-400 hover:bg-white/5 hover:text-white"
                                            : "text-neutral-600 hover:bg-slate-100 hover:text-slate-900"
                                        }`}
                                >
                                    <item.icon className={`h-5 w-5 ${active
                                        ? "text-white"
                                        : isDark ? "text-neutral-500 group-hover:text-white" : "text-neutral-500 group-hover:text-slate-900"
                                        }`} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className={`mt-auto p-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
                {/* Header */}
                <AdminHeader
                    onMenuClick={() => setIsSidebarOpen(true)}
                    title={getPageTitle()}
                    isDark={isDark}
                    toggleTheme={() => setIsDark(!isDark)}
                />

                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet context={{ isDark }} />
                    </div>
                </main>

                <AdminFooter isDark={isDark} />
            </div>
        </div>
    );
}
