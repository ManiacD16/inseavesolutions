import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    User,
    Plus
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();
    const [blogs, setBlogs] = useState([]);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin/login');
        }
    }, [isAuthenticated, navigate]);

    // Fetch blogs for dashboard overview (if on main dashboard)
    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/blogs');
            if (response.ok) {
                const data = await response.json();
                setBlogs(data);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        if (location.pathname === '/admin') {
            fetchBlogs();
        }
    }, [location.pathname]);


    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
        { icon: FileText, label: "Blogs", path: "/admin" }, // Currently dashboard IS list, can separate later if needed
        { icon: MessageSquare, label: "Contacts", path: "/admin/contacts" },
        { icon: Settings, label: "Settings", path: "/admin/settings" },
    ];

    /* 
       If we are at root /admin, we show the blog list (Dashboard Overview).
       If we are at sub-routes, Outlet renders them.
       BUT: In App.tsx I need to structure routes properly.
       Let's assume this component is likely a Layout component now?
       Actually user asked for "Dashboard" to appear after login.
       So let's make this the Layout AND Dashboard View for now, or split.
       Best approach: Make this the Layout, and have child routes.
       
       Refactoring Plan for this file:
       1. Sidebar + Header
       2. Content Area -> Outlet
       
       But currently App.tsx has:
       /admin -> AdminDashboard
       /admin/blogs/new -> BlogEditor
       etc.
       
       I will refactor AdminDashboard to be a Layout-like component that renders children, 
       but since React Router v6 used in App.tsx defines routes flatly or nested, 
       I'll adjust App.tsx to nest admin routes or just use this as a wrapper.
       
       For simplicity in single file modification context:
       I will render Sidebar here. If the path is exactly /admin, I render the Dashboard Stats/Blog List.
       If path is different (handled by Router but wrapped?), 
       Actually, if I want a persistent sidebar, I should use a Layout Route in App.tsx.
       
       However, to keep changes scoped:
       I will make AdminDashboard the "Main Screen" you land on.
       The "Sidebar" will be present.
       Navigating to /admin/contacts will render Contacts component.
       
       WAIT. If I want the sidebar to persist on /admin/blogs/new, I need a Layout component.
       Let's create `AdminLayout.tsx` instead? 
       The user has `AdminDashboard.tsx` linked to `/admin`.
       I'll Rename `AdminDashboard.tsx` content to be the Layout + Dashboard Index.
    */

    if (!isAuthenticated) return null;

    const isMainDashboard = location.pathname === '/admin';

    return (
        <div className="min-h-screen bg-[#020617] text-white flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:relative lg:translate-x-0`}
            >
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {/* Logo placeholder */}
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">W</div>
                        <span className="font-bold text-xl">Admin</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-neutral-400">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        < div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 overflow-hidden">
                            {user?.profile_pic ? (
                                <img src={user.profile_pic} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                <User className="h-5 w-5" />
                            )}
                        </div>
                        <div>
                            <div className="font-medium text-sm">{user?.name || user?.username}</div>
                            <div className="text-xs text-neutral-400">{user?.email || "Admin User"}</div>
                        </div>
                    </div>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${location.pathname === item.path
                                    ? "bg-indigo-600 text-white"
                                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    ))}
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition mt-8"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="lg:hidden p-4 border-b border-white/10 flex items-center justify-between bg-[#020617]">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-white">
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="font-bold">Admin Panel</span>
                </header>

                <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                    {isMainDashboard ? (
                        // Dashboard Index Content (Blog List)
                        <div className="max-w-6xl mx-auto">
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-3xl font-bold">Blog Management</h1>
                                <Link
                                    to="/admin/blogs/new"
                                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                                >
                                    <Plus className="h-4 w-4" />
                                    Create New Blog
                                </Link>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-white/5 border-b border-white/10 text-neutral-300">
                                                <th className="p-4 font-medium">Title</th>
                                                <th className="p-4 font-medium">Date Created</th>
                                                <th className="p-4 font-medium text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {blogs.length === 0 ? (
                                                <tr>
                                                    <td colSpan={3} className="p-8 text-center text-neutral-400">
                                                        No blogs found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                blogs.map((blog: any) => (
                                                    <tr key={blog.id} className="border-b border-white/10 hover:bg-white/5 transition">
                                                        <td className="p-4 font-medium">
                                                            <div className="flex flex-col">
                                                                <span className="text-white">{blog.title}</span>
                                                                <span className="text-xs text-neutral-500">/{blog.slug}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 text-neutral-400 text-sm">
                                                            {new Date(blog.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="p-4 text-right space-x-2">
                                                            <Link to={`/admin/blogs/edit/${blog.id}`} className="text-indigo-400 hover:text-indigo-300">Edit</Link>
                                                            {/* Add Delete logic back if needed or create separate component */}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </main>
            </div>
        </div>
    );
}
