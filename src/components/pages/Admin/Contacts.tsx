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
            if (!response.ok) throw new Error('Failed to fetch contacts');
            const data = await response.json();
            // Add mock status for now
            const dataWithStatus = data.map((contact: any) => ({
                ...contact,
                status: 'new'
            }));
            setContacts(dataWithStatus);
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
                {contacts.map((contact) => (
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
