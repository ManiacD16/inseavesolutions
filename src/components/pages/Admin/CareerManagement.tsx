import { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
    Search, 
    Trash2, 
    Edit, 
    Mail, 
    Phone, 
    MapPin, 
    Calendar, 
    User, 
    Briefcase,
    ChevronLeft,
    ChevronRight,
    X,
    Save,
    CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import API_BASE_URL from '../../../config/api';
import Loader from '../../Loader';

interface CareerRequest {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    pincode: string;
    profile: string;
    experience_level: string;
    status: string;
    created_at: string;
}

interface AdminContextType {
    isDark: boolean;
}

export default function CareerManagement() {
    const { isDark } = useOutletContext<AdminContextType>();
    const [requests, setRequests] = useState<CareerRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editingRequest, setEditingRequest] = useState<CareerRequest | null>(null);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/careers`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await response.json();
            if (response.ok) {
                setRequests(result.data || []);
            }
        } catch (error) {
            toast.error("Failed to load applications");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this application?")) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/careers/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                toast.success("Deleted successfully");
                setRequests(requests.filter(r => r.id !== id));
            }
        } catch (error) {
            toast.error("Failed to delete");
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingRequest) return;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/careers/${editingRequest.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editingRequest)
            });
            if (response.ok) {
                toast.success("Updated successfully");
                setRequests(requests.map(r => r.id === editingRequest.id ? editingRequest : r));
                setEditingRequest(null);
            }
        } catch (error) {
            toast.error("Failed to update");
        }
    };

    const filteredRequests = useMemo(() => {
        return requests.filter(r => 
            `${r.first_name} ${r.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.profile.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [requests, searchTerm]);

    const paginatedRequests = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredRequests.slice(start, start + itemsPerPage);
    }, [filteredRequests, currentPage]);

    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

    const tableHeaderClass = `px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDark ? 'text-neutral-400 bg-white/5' : 'text-slate-500 bg-slate-50/50'}`;
    const tableRowClass = `transition-colors border-b ${isDark ? 'border-white/5 hover:bg-white/[0.02]' : 'border-slate-100 hover:bg-slate-50/50'}`;

    return (
        <div className="space-y-6">
            {loading && <Loader />}
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Career Applications</h1>
                    <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Manage all job applications received through the website.</p>
                </div>
                
                <div className="relative group">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${isDark ? 'text-neutral-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-600'}`} />
                    <input
                        type="text"
                        placeholder="Search by name, email or profile..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`pl-10 pr-4 py-2.5 w-full md:w-80 rounded-xl outline-none transition font-medium text-sm ${
                            isDark 
                            ? 'bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder:text-neutral-600' 
                            : 'bg-white border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-slate-900 shadow-sm'
                        }`}
                    />
                </div>
            </div>

            <div className={`overflow-hidden rounded-2xl border ${isDark ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className={tableHeaderClass}>Applicant</th>
                                <th className={tableHeaderClass}>Profile & Experience</th>
                                <th className={tableHeaderClass}>Contact Info</th>
                                <th className={tableHeaderClass}>Status</th>
                                <th className={tableHeaderClass}>Applied Date</th>
                                <th className={tableHeaderClass}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
                            {paginatedRequests.map((req) => (
                                <tr key={req.id} className={tableRowClass}>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm ${isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                                                {req.first_name[0]}{req.last_name[0]}
                                            </div>
                                            <div>
                                                <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{req.first_name} {req.last_name}</div>
                                                <div className={`text-xs flex items-center gap-1 mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                                                    <MapPin className="h-3 w-3" /> {req.pincode}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="space-y-1">
                                            <div className={`text-sm font-semibold flex items-center gap-1.5 ${isDark ? 'text-neutral-200' : 'text-slate-700'}`}>
                                                <Briefcase className="h-3.5 w-3.5 text-indigo-400" /> {req.profile || 'N/A'}
                                            </div>
                                            <div className={`text-xs inline-flex px-2 py-0.5 rounded-full font-medium ${req.experience_level === 'Experience' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                                {req.experience_level}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="space-y-1.5 text-sm">
                                            <div className={`flex items-center gap-2 ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                                                <Mail className="h-3.5 w-3.5 text-neutral-500" /> {req.email}
                                            </div>
                                            <div className={`flex items-center gap-2 ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                                                <Phone className="h-3.5 w-3.5 text-neutral-500" /> {req.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                                            req.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-500' :
                                            req.status === 'Rejected' ? 'bg-red-500/10 text-red-500' :
                                            req.status === 'Reviewed' ? 'bg-indigo-500/10 text-indigo-500' :
                                            'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={`text-sm flex items-center gap-2 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                                            <Calendar className="h-4 w-4" />
                                            {new Date(req.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => setEditingRequest(req)}
                                                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-indigo-500/20 text-neutral-400 hover:text-indigo-400' : 'hover:bg-indigo-50 text-slate-400 hover:text-indigo-600'}`}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(req.id)}
                                                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-red-500/20 text-neutral-400 hover:text-red-400' : 'hover:bg-red-50 text-slate-400 hover:text-red-600'}`}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredRequests.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className={`p-4 rounded-full ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                                                <Briefcase className={`h-8 w-8 ${isDark ? 'text-neutral-600' : 'text-slate-300'}`} />
                                            </div>
                                            <p className={`text-lg font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>No applications found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className={`px-6 py-4 flex items-center justify-between border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                        <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                            Showing <span className="font-bold text-indigo-500">{(currentPage-1)*itemsPerPage + 1}</span> to <span className="font-bold text-indigo-500">{Math.min(currentPage*itemsPerPage, filteredRequests.length)}</span> of <span className="font-bold text-indigo-500">{filteredRequests.length}</span>
                        </p>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(1, p-1))}
                                disabled={currentPage === 1}
                                className={`p-2 rounded-lg transition disabled:opacity-50 ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="text-sm font-bold px-3">Page {currentPage} of {totalPages}</span>
                            <button 
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))}
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-lg transition disabled:opacity-50 ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editingRequest && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingRequest(null)}></div>
                    <div className={`relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 ${isDark ? 'bg-[#0F172A] border border-white/10' : 'bg-white border-slate-200'}`}>
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Edit className="w-5 h-5 text-indigo-500" /> Edit Application
                            </h3>
                            <button onClick={() => setEditingRequest(null)} className="p-2 hover:bg-white/5 rounded-xl transition">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleUpdate} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-neutral-500 ml-1">FIRST NAME</label>
                                    <input 
                                        type="text" value={editingRequest.first_name} 
                                        onChange={e => setEditingRequest({...editingRequest, first_name: e.target.value})}
                                        className={`w-full px-4 py-3 rounded-xl outline-none border transition ${isDark ? 'bg-white/5 border-white/10 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-600'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-neutral-500 ml-1">LAST NAME</label>
                                    <input 
                                        type="text" value={editingRequest.last_name} 
                                        onChange={e => setEditingRequest({...editingRequest, last_name: e.target.value})}
                                        className={`w-full px-4 py-3 rounded-xl outline-none border transition ${isDark ? 'bg-white/5 border-white/10 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-600'}`}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-neutral-500 ml-1">STATUS</label>
                                    <select 
                                        value={editingRequest.status}
                                        onChange={e => setEditingRequest({...editingRequest, status: e.target.value})}
                                        className={`w-full px-4 py-3 rounded-xl outline-none border transition ${isDark ? 'bg-white/5 border-white/10 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-600'}`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Reviewed">Reviewed</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-neutral-500 ml-1">EXPERIENCE LEVEL</label>
                                    <select 
                                        value={editingRequest.experience_level}
                                        onChange={e => setEditingRequest({...editingRequest, experience_level: e.target.value})}
                                        className={`w-full px-4 py-3 rounded-xl outline-none border transition ${isDark ? 'bg-white/5 border-white/10 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-600'}`}
                                    >
                                        <option value="Fresher">Fresher</option>
                                        <option value="Experience">Experience</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-500 ml-1">PROFILE BIO</label>
                                <textarea 
                                    value={editingRequest.profile}
                                    onChange={e => setEditingRequest({...editingRequest, profile: e.target.value})}
                                    rows={3}
                                    className={`w-full px-4 py-3 rounded-xl outline-none border transition resize-none ${isDark ? 'bg-white/5 border-white/10 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-600'}`}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setEditingRequest(null)} className="px-6 py-3 rounded-xl font-bold text-neutral-500 hover:bg-white/5 transition">Cancel</button>
                                <button type="submit" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center gap-2 shadow-lg shadow-indigo-600/20">
                                    <Save className="w-4 h-4" /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
