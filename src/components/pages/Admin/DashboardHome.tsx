import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { FileText, MessageSquare } from "lucide-react";
import { useOutletContext } from "react-router-dom";

interface AdminContextType {
    isDark: boolean;
}

export default function DashboardHome() {
    const { isAuthenticated } = useAuth();
    const { isDark } = useOutletContext<AdminContextType>();
    const [stats, setStats] = useState({
        totalBlogs: 0,
        totalContacts: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch Blogs Count
                const blogsRes = await fetch('/api/blogs');
                const blogsData = blogsRes.ok ? await blogsRes.json() : [];

                // Fetch Contacts Count (needs auth)
                const token = localStorage.getItem('token');
                const contactsRes = await fetch('/api/contact', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const contactsData = contactsRes.ok ? await contactsRes.json() : [];

                setStats({
                    totalBlogs: Array.isArray(blogsData) ? blogsData.length : 0,
                    totalContacts: Array.isArray(contactsData) ? contactsData.length : 0
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchStats();
        }
    }, [isAuthenticated]);

    if (loading) {
        return <div className="text-white p-8">Loading dashboard...</div>;
    }

    // Calculate max value for chart scaling
    const maxValue = Math.max(stats.totalBlogs, stats.totalContacts, 10); // Minimum 10 for scale

    return (
        <div className="space-y-8">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`border p-6 rounded-xl shadow-lg flex items-center justify-between transition-colors ${isDark ? 'bg-[#0B1120] border-white/10' : 'bg-white border-slate-200'}`}>
                    <div>
                        <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Total Blogs</p>
                        <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.totalBlogs}</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400">
                        <FileText className="h-6 w-6" />
                    </div>
                </div>

                <div className={`border p-6 rounded-xl shadow-lg flex items-center justify-between transition-colors ${isDark ? 'bg-[#0B1120] border-white/10' : 'bg-white border-slate-200'}`}>
                    <div>
                        <p className={`text-sm font-medium uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Total Contacts</p>
                        <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.totalContacts}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                        <MessageSquare className="h-6 w-6" />
                    </div>
                </div>
            </div>

            {/* Simple Bar Chart Visualization */}
            <div className={`border p-8 rounded-xl shadow-lg transition-colors ${isDark ? 'bg-[#0B1120] border-white/10' : 'bg-white border-slate-200'}`}>
                <h3 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-slate-800'}`}>Activity Overview</h3>

                <div className="space-y-6">
                    {/* Blogs Bar */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>Blogs Published</span>
                            <span className="text-neutral-400">{stats.totalBlogs}</span>
                        </div>
                        <div className={`w-full rounded-full h-4 overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                            <div
                                className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${(stats.totalBlogs / maxValue) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Contacts Bar */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>Contact Inquiries</span>
                            <span className="text-neutral-400">{stats.totalContacts}</span>
                        </div>
                        <div className={`w-full rounded-full h-4 overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                            <div
                                className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${(stats.totalContacts / maxValue) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-neutral-500">
                    Data reflects total counts of content and user interactions.
                </div>
            </div>
        </div>
    );
}
