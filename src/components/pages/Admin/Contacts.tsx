import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Mail, Calendar } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import API_BASE_URL from "../../../config/api";

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
    status: 'new' | 'replied';
}

interface AdminContextType {
    isDark: boolean;
}

export default function Contacts() {
    const { token } = useAuth();
    const { isDark } = useOutletContext<AdminContextType>();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            const fetchedContacts = result.data || [];
            
            const dataWithStatus = fetchedContacts.map((contact: any) => ({
                ...contact,
                status: (contact.is_read == 0 || contact.is_read == null) ? 'new' : 'replied'
            }));
            setContacts(dataWithStatus);

            // If there are unread messages, mark them as read in the background
            const hasUnread = dataWithStatus.some((c: any) => c.status === 'new');
            if (hasUnread) {
                fetch(`${API_BASE_URL}/api/contact.php`, {
                    method: 'PUT',
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                }).catch(console.error);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className={`p-8 text-center ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Loading messages...</div>;
    if (error) return <div className="p-8 text-center text-red-400">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Messages</h2>
            </div>

            <div className="space-y-4">
                {contacts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((contact) => (
                    <div key={contact.id} className={`border rounded-xl p-6 transition-all hover:shadow-lg ${isDark ? 'bg-[#0B1120] border-white/10' : 'bg-white border-slate-200'}`}>
                        <div className="flex flex-col lg:flex-row gap-6">
                            {/* Sender Info */}
                            <div className="lg:w-1/3 space-y-3">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-semibold text-lg">
                                        {contact.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{contact.name}</div>
                                        <div className="text-xs text-neutral-500 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(contact.created_at).toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className={`flex items-center gap-2 ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                                        <Mail className="h-4 w-4 text-neutral-500" />
                                        <a href={`mailto:${contact.email}`} className="hover:text-indigo-400 transition-colors">{contact.email}</a>
                                    </div>
                                </div>

                                <div className="pt-3">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${contact.status === 'new' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                                        {contact.status === 'new' ? 'New Message' : 'Replied'}
                                    </span>
                                </div>
                            </div>

                            {/* Message Content */}
                            <div className={`flex-1 lg:pl-6 lg:border-l ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                                <h4 className={`text-sm font-medium mb-2 uppercase tracking-wide text-xs ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>Subject: {contact.subject}</h4>
                                <div className={`text-sm leading-relaxed whitespace-pre-wrap p-4 rounded-lg border ${isDark ? 'bg-white/5 border-white/5 text-neutral-300' : 'bg-slate-50 border-slate-100 text-slate-600'}`}>
                                    {contact.message}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {Math.ceil(contacts.length / itemsPerPage) > 1 && (
                    <div className="flex justify-center items-center gap-2 pt-6">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 text-white disabled:opacity-50' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50'}`}
                        >
                            Previous
                        </button>
                        
                        <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none no-scrollbar">
                            {Array.from({ length: Math.ceil(contacts.length / itemsPerPage) }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${currentPage === page ? 'bg-indigo-600 text-white font-medium' : isDark ? 'hover:bg-white/10 text-neutral-400' : 'hover:bg-slate-200 text-slate-600'}`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(contacts.length / itemsPerPage)))}
                            disabled={currentPage === Math.ceil(contacts.length / itemsPerPage)}
                            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 text-white disabled:opacity-50' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50'}`}
                        >
                            Next
                        </button>
                    </div>
                )}

                {contacts.length === 0 && (
                    <div className={`text-center py-12 border-2 border-dashed rounded-xl ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-white/5 text-neutral-400' : 'bg-slate-100 text-neutral-400'}`}>
                            <Mail className="h-8 w-8" />
                        </div>
                        <h3 className={`text-lg font-medium mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>No messages yet</h3>
                        <p className="text-neutral-500">New contact form submissions will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
