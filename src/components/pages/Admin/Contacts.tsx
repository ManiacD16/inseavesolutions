import { useEffect, useState } from "react";
import { Mail, Calendar } from "lucide-react";

interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}

export default function Contacts() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/contact', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setContacts(data);
                }
            } catch (error) {
                console.error("Error fetching contacts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Contact Submissions</h1>

            {loading ? (
                <div>Loading...</div>
            ) : contacts.length === 0 ? (
                <div className="text-center text-neutral-400 py-12 bg-white/5 rounded-xl border border-white/10">
                    No messages received yet.
                </div>
            ) : (
                <div className="grid gap-4">
                    {contacts.map((contact) => (
                        <div key={contact.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-indigo-500/30 transition">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{contact.name}</h3>
                                        <p className="text-sm text-neutral-400">{contact.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-neutral-500 bg-white/5 px-2 py-1 rounded">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(contact.created_at).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="pl-13">
                                <h4 className="text-indigo-300 text-sm font-medium mb-2">{contact.subject}</h4>
                                <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">
                                    {contact.message}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
