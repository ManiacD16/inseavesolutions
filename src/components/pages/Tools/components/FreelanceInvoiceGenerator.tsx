import { useState } from 'react';
import { Plus, Trash2, Printer, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

interface FreelanceItem {
    id: string;
    description: string;
    type: 'Hourly' | 'Fixed';
    hoursOrQty: number;
    rate: number;
}

export default function FreelanceInvoiceGenerator() {
    const [freelancerName, setFreelancerName] = useState('Alex Carter | Full Stack Developer');
    const [freelancerPortfolio, setFreelancerPortfolio] = useState('https://alexcarter.dev');
    const [freelancerEmail, setFreelancerEmail] = useState('hello@alexcarter.dev');
    const [freelancerAddress, setFreelancerAddress] = useState('Siddharth Vihar, Indirapuram, Ghaziabad');

    const [clientName, setClientName] = useState('Startup Labs Inc.');
    const [clientAddress, setClientAddress] = useState('MG Road, Pune, Maharashtra');
    const [clientEmail, setClientEmail] = useState('billing@startuplabs.io');

    const [invoiceId, setInvoiceId] = useState('FL-2026-042');
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [dueDate, setDueDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    const [paymentHandle, setPaymentHandle] = useState('alexcarter@upi');

    const [items, setItems] = useState<FreelanceItem[]>([
        { id: '1', description: 'Next.js Frontend Architecture Setup', type: 'Hourly', hoursOrQty: 25, rate: 1200 },
        { id: '2', description: 'Database Schema Design & Prisma Setup', type: 'Fixed', hoursOrQty: 1, rate: 15000 }
    ]);

    const handleAddItem = () => {
        setItems([...items, {
            id: Date.now().toString(),
            description: 'Development Milestone / Task Description',
            type: 'Hourly',
            hoursOrQty: 10,
            rate: 1000
        }]);
        toast.success('Freelance milestone added!');
    };

    const handleRemoveItem = (id: string) => {
        if (items.length <= 1) {
            toast.error('Invoice must contain at least one task or milestone.');
            return;
        }
        setItems(items.filter(item => item.id !== id));
        toast.success('Milestone removed.');
    };

    const handleUpdateItem = (id: string, field: keyof FreelanceItem, value: any) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const calculateTotal = () => {
        let total = 0;
        items.forEach(item => {
            if (item.type === 'Hourly') {
                total += item.hoursOrQty * item.rate;
            } else {
                total += item.rate;
            }
        });
        return Math.round(total);
    };

    const total = calculateTotal();

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 print:hidden">
                <div>
                    <h3 className="text-xl font-semibold text-white">Freelance Invoice Generator</h3>
                    <p className="text-sm text-neutral-400 mt-1">
                        Draft freelance developer, design, or copywriting invoices. Supports Hourly or Flat Rate milestones, portfolio URLs, and print layouts.
                    </p>
                </div>
                <button
                    onClick={() => window.print()}
                    className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                    <Printer className="h-4.5 w-4.5" /> Print / Save PDF Invoice
                </button>
            </div>

            {/* Print styling override */}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #freelance-print-sheet, #freelance-print-sheet * {
                        visibility: visible;
                    }
                    #freelance-print-sheet {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        background: white !important;
                        color: black !important;
                        padding: 10px !important;
                        box-shadow: none !important;
                        border: none !important;
                    }
                }
            `}</style>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
                {/* Editor Panel */}
                <div className="lg:col-span-5 space-y-5 bg-white/5 border border-white/10 rounded-2xl p-5 print:hidden">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <Briefcase className="h-4 w-4" /> Freelancer Settings
                    </span>

                    {/* Metadata */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                            <label className="text-[10px] text-neutral-400 font-bold uppercase">Invoice ID</label>
                            <input
                                type="text"
                                value={invoiceId}
                                onChange={(e) => setInvoiceId(e.target.value)}
                                className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none font-mono"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] text-neutral-400 font-bold uppercase">Bill Date</label>
                            <input
                                type="date"
                                value={invoiceDate}
                                onChange={(e) => setInvoiceDate(e.target.value)}
                                className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none font-mono"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] text-neutral-400 font-bold uppercase">Due Date</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none font-mono"
                            />
                        </div>
                    </div>

                    {/* Payment Handle */}
                    <div className="space-y-1">
                        <label className="text-[10px] text-neutral-400 font-bold uppercase">Payment details (UPI / PayPal)</label>
                        <input
                            type="text"
                            value={paymentHandle}
                            onChange={(e) => setPaymentHandle(e.target.value)}
                            className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none font-mono"
                        />
                    </div>

                    {/* Freelancer details */}
                    <div className="space-y-3 border-t border-white/5 pt-3">
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase">My Details (Freelancer)</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <input
                                type="text"
                                value={freelancerName}
                                onChange={(e) => setFreelancerName(e.target.value)}
                                placeholder="Name & Title"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                            <input
                                type="text"
                                value={freelancerPortfolio}
                                onChange={(e) => setFreelancerPortfolio(e.target.value)}
                                placeholder="Portfolio Website"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <input
                                type="text"
                                value={freelancerAddress}
                                onChange={(e) => setFreelancerAddress(e.target.value)}
                                placeholder="Mailing Address"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                            <input
                                type="text"
                                value={freelancerEmail}
                                onChange={(e) => setFreelancerEmail(e.target.value)}
                                placeholder="Email"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                        </div>
                    </div>

                    {/* Client Details */}
                    <div className="space-y-3 border-t border-white/5 pt-3">
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase">Client Details</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <input
                                type="text"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                placeholder="Client Company Name"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                            <input
                                type="text"
                                value={clientEmail}
                                onChange={(e) => setClientEmail(e.target.value)}
                                placeholder="Client Email"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                        </div>
                        <div className="space-y-1 text-xs">
                            <input
                                type="text"
                                value={clientAddress}
                                onChange={(e) => setClientAddress(e.target.value)}
                                placeholder="Client Address"
                                className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview Sheet */}
                <div className="lg:col-span-7">
                    <div
                        id="freelance-print-sheet"
                        className="bg-white border border-neutral-200 rounded-2xl shadow-xl p-6 text-slate-800 flex flex-col justify-between min-h-[750px] font-sans print:border-none print:shadow-none"
                    >
                        {/* Header letterhead */}
                        <div>
                            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-bold tracking-tight text-slate-900">{freelancerName}</h2>
                                    <p className="text-[10px] text-slate-500 leading-relaxed">
                                        {freelancerAddress}<br />
                                        Portfolio: {freelancerPortfolio} | Email: {freelancerEmail}
                                    </p>
                                </div>
                                <div className="text-right space-y-1">
                                    <span className="px-2 py-0.5 bg-violet-50 text-violet-700 rounded text-[9px] font-bold uppercase tracking-wider">FREELANCE INVOICE</span>
                                    <p className="text-xs font-semibold text-slate-700 mt-2">Inv #: {invoiceId}</p>
                                    <p className="text-[10px] text-slate-500">Date: {invoiceDate}</p>
                                </div>
                            </div>

                            {/* Billing details */}
                            <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-200 text-xs">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Attention (Client):</span>
                                    <h4 className="font-bold text-slate-900">{clientName}</h4>
                                    <p className="text-[10px] text-slate-500 leading-relaxed">
                                        {clientAddress}<br />
                                        Email: {clientEmail}
                                    </p>
                                </div>
                                <div className="text-right space-y-1">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Payment Due Date:</span>
                                    <p className="text-xs font-bold text-slate-700 mt-1">{dueDate}</p>
                                </div>
                            </div>

                            {/* Milestones list table */}
                            <div className="py-4 space-y-3">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200 text-[9px] text-slate-400 font-bold uppercase">
                                            <th className="py-2">Milestone / Scope Task</th>
                                            <th className="py-2 text-center w-16">Billing</th>
                                            <th className="py-2 text-center w-16">Hours/Qty</th>
                                            <th className="py-2 text-right w-24">Rate</th>
                                            <th className="py-2 text-right w-24">Total</th>
                                            <th className="py-2 text-center w-8 print:hidden"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => {
                                            const totalItem = item.type === 'Hourly' ? item.hoursOrQty * item.rate : item.rate;
                                            return (
                                                <tr key={item.id} className="border-b border-slate-100 text-slate-700 text-xs">
                                                    <td className="py-2 pr-1">
                                                        <input
                                                            type="text"
                                                            value={item.description}
                                                            onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                                                            className="w-full bg-transparent border-b border-transparent focus:border-slate-300 font-medium py-1 outline-none print:border-none print:py-0"
                                                        />
                                                    </td>
                                                    <td className="py-2 text-center">
                                                        <select
                                                            value={item.type}
                                                            onChange={(e) => handleUpdateItem(item.id, 'type', e.target.value as any)}
                                                            className="bg-transparent text-center border-b border-transparent focus:border-slate-300 outline-none print:hidden cursor-pointer py-1"
                                                        >
                                                            <option value="Hourly">Hourly</option>
                                                            <option value="Fixed">Fixed</option>
                                                        </select>
                                                        <span className="hidden print:inline">{item.type}</span>
                                                    </td>
                                                    <td className="py-2 text-center">
                                                        {item.type === 'Hourly' ? (
                                                            <input
                                                                type="number"
                                                                value={item.hoursOrQty}
                                                                onChange={(e) => handleUpdateItem(item.id, 'hoursOrQty', parseFloat(e.target.value) || 0)}
                                                                className="w-12 text-center bg-transparent border-b border-transparent focus:border-slate-300 outline-none font-mono py-1 print:border-none print:py-0"
                                                            />
                                                        ) : (
                                                            <span className="text-slate-400 font-bold font-mono">-</span>
                                                        )}
                                                    </td>
                                                    <td className="py-2 text-right font-mono">
                                                        <input
                                                            type="number"
                                                            value={item.rate}
                                                            onChange={(e) => handleUpdateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                                                            className="w-20 text-right bg-transparent border-b border-transparent focus:border-slate-300 outline-none font-mono py-1 print:border-none print:py-0"
                                                        />
                                                    </td>
                                                    <td className="py-2 text-right font-semibold font-mono">{formatCurrency(totalItem)}</td>
                                                    <td className="py-2 text-center print:hidden">
                                                        <button onClick={() => handleRemoveItem(item.id)} className="text-slate-400 hover:text-rose-500">
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                <button
                                    onClick={handleAddItem}
                                    className="py-1 px-2.5 bg-violet-50 hover:bg-violet-100 text-violet-700 text-[10px] font-bold rounded transition print:hidden"
                                >
                                    + Add Freelance Task
                                </button>
                            </div>
                        </div>

                        {/* Summary totals */}
                        <div className="border-t border-slate-200 pt-4 mt-auto">
                            <div className="flex justify-between items-start text-xs">
                                <div className="space-y-1 text-slate-500">
                                    <h5 className="text-[9px] font-bold text-slate-400 uppercase">Payment Channel</h5>
                                    <p className="text-[10px] text-slate-700 font-semibold font-mono">UPI / Handle: {paymentHandle}</p>
                                </div>
                                <div className="w-56 space-y-1.5 font-bold text-slate-800 text-sm">
                                    <div className="flex justify-between border-t border-slate-200 pt-2">
                                        <span>Amount Due:</span>
                                        <span className="font-mono text-violet-700">{formatCurrency(total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
