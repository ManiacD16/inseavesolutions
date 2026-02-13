import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { FileText, MessageSquare, Users, TrendingUp } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminContextType {
    isDark: boolean;
}

export default function DashboardHome() {
    const { isAuthenticated } = useAuth();
    const { isDark } = useOutletContext<AdminContextType>();
    const [stats, setStats] = useState({
        totalBlogs: 0,
        totalContacts: 0,
        visitors: {
            today: 0,
            yesterday: 0,
            month: 0,
            allTime: 0,
            graph: [] as any[]
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch Blogs Count
                const blogsRes = await fetch('/api/blogs');
                const blogsData = blogsRes.ok ? await blogsRes.json() : [];

                // Fetch Contacts Count
                const token = localStorage.getItem('token');
                const contactsRes = await fetch('/api/contact', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const contactsData = contactsRes.ok ? await contactsRes.json() : [];

                // Fetch Analytics
                const analyticsRes = await fetch('/api/analytics', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const analyticsData = analyticsRes.ok ? await analyticsRes.json() : {
                    today: 0, yesterday: 0, month: 0, allTime: 0, graph: []
                };

                setStats({
                    totalBlogs: Array.isArray(blogsData) ? blogsData.length : 0,
                    totalContacts: Array.isArray(contactsData) ? contactsData.length : 0,
                    visitors: analyticsData
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
        return <div className={`p-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>Loading dashboard...</div>;
    }

    return (
        <div className="space-y-8">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Visitors Today */}
                <div className={`border p-6 rounded-xl shadow-lg flex items-center justify-between transition-colors ${isDark ? 'bg-[#0B1120] border-white/10' : 'bg-white border-slate-200'}`}>
                    <div>
                        <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Visitors Today</p>
                        <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.visitors.today}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                        <Users className="h-6 w-6" />
                    </div>
                </div>

                {/* Visitors Yesterday */}
                <div className={`border p-6 rounded-xl shadow-lg flex items-center justify-between transition-colors ${isDark ? 'bg-[#0B1120] border-white/10' : 'bg-white border-slate-200'}`}>
                    <div>
                        <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Yesterday</p>
                        <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.visitors.yesterday}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400">
                        <Users className="h-6 w-6" />
                    </div>
                </div>

                {/* Total Blogs */}
                <div className={`border p-6 rounded-xl shadow-lg flex items-center justify-between transition-colors ${isDark ? 'bg-[#0B1120] border-white/10' : 'bg-white border-slate-200'}`}>
                    <div>
                        <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Total Blogs</p>
                        <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.totalBlogs}</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400">
                        <FileText className="h-6 w-6" />
                    </div>
                </div>

                {/* Total Contacts */}
                <div className={`border p-6 rounded-xl shadow-lg flex items-center justify-between transition-colors ${isDark ? 'bg-[#0B1120] border-white/10' : 'bg-white border-slate-200'}`}>
                    <div>
                        <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Total Contacts</p>
                        <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.totalContacts}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                        <MessageSquare className="h-6 w-6" />
                    </div>
                </div>
            </div>

            {/* Analytics Graph */}
            <div className={`border p-8 rounded-xl shadow-lg transition-colors ${isDark ? 'bg-[#0B1120] border-white/10' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between mb-8">
                    <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        <TrendingUp className="h-5 w-5 text-indigo-500" />
                        Visitor Growth (Last 7 Days)
                    </h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                        Total Visitors: {stats.visitors.allTime}
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.visitors.graph}>
                            <defs>
                                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} vertical={false} />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: isDark ? '#9ca3af' : '#64748b', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                dy={10}
                            />
                            <YAxis
                                tick={{ fill: isDark ? '#9ca3af' : '#64748b', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                dx={-10}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                                    borderRadius: '8px',
                                    color: isDark ? '#ffffff' : '#0f172a'
                                }}
                                itemStyle={{ color: '#6366f1' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="#6366f1"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorVisitors)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
