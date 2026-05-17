import { useState } from 'react';
import { Plus, Trash2, Printer, FileSpreadsheet } from 'lucide-react';
import toast from 'react-hot-toast';

interface QuoteItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
}

export default function QuoteGenerator() {
    const [sellerName, setSellerName] = useState('WebnexFusion Solutions');
    const [sellerContact, setSellerContact] = useState('projects@webnexfusion.com');
    const [sellerAddress, setSellerAddress] = useState('Plot 45, Tech Sector, Noida, UP');

    const [buyerName, setBuyerName] = useState('Global Retail Ventures');
    const [buyerAddress, setBuyerAddress] = useState('Nariman Point, Mumbai, MH');
    const [buyerContact, setBuyerContact] = useState('info@globalretail.com');

    const [quoteNum, setQuoteNum] = useState('EST-2026-894');
    const [quoteDate, setQuoteDate] = useState(new Date().toISOString().split('T')[0]);
    const [validUntil, setValidUntil] = useState('Valid for 30 days');

    const [items, setItems] = useState<QuoteItem[]>([
        { id: '1', description: 'Enterprise E-Commerce Development Suite', quantity: 1, rate: 125000 },
        { id: '2', description: 'Payment Gateway Integration & SSL setup', quantity: 1, rate: 12000 }
    ]);

    const handleAddItem = () => {
        setItems([...items, {
            id: Date.now().toString(),
            description: 'Proposed Deliverable / Phase Scope',
            quantity: 1,
            rate: 5000
        }]);
        toast.success('Scope phase added to quote!');
    };

    const handleRemoveItem = (id: string) => {
        if (items.length <= 1) {
            toast.error('Estimate must contain at least one phase item.');
            return;
        }
        setItems(items.filter(item => item.id !== id));
        toast.success('Scope item removed.');
    };

    const handleUpdateItem = (id: string, field: keyof QuoteItem, value: any) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const calculateTotal = () => {
        let total = 0;
        items.forEach(item => {
            total += item.quantity * item.rate;
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
                    <h3 className="text-xl font-semibold text-white">Price Quote & Project Estimate Generator</h3>
                    <p className="text-sm text-neutral-400 mt-1">
                        Draft professional quotes and project proposals. Includes validity clauses, customizable deliverables, and sign-off sheets.
                    </p>
                </div>
                <button
                    onClick={() => window.print()}
                    className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                    <Printer className="h-4.5 w-4.5" /> Print / Save Quote PDF
                </button>
            </div>

            {/* Print style injection */}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #quote-print-sheet, #quote-print-sheet * {
                        visibility: visible;
                    }
                    #quote-print-sheet {
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
                        <FileSpreadsheet className="h-4 w-4" /> Quote parameters
                    </span>

                    {/* Metadata */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                            <label className="text-[10px] text-neutral-400 font-bold uppercase">Estimate ID</label>
                            <input
                                type="text"
                                value={quoteNum}
                                onChange={(e) => setQuoteNum(e.target.value)}
                                className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none font-mono"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] text-neutral-400 font-bold uppercase">Date</label>
                            <input
                                type="date"
                                value={quoteDate}
                                onChange={(e) => setQuoteDate(e.target.value)}
                                className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none font-mono"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] text-neutral-400 font-bold uppercase">Validity Clause</label>
                            <input
                                type="text"
                                value={validUntil}
                                onChange={(e) => setValidUntil(e.target.value)}
                                className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                            />
                        </div>
                    </div>

                    {/* Seller details */}
                    <div className="space-y-3 border-t border-white/5 pt-3">
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase">Proposing Business Info</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <input
                                type="text"
                                value={sellerName}
                                onChange={(e) => setSellerName(e.target.value)}
                                placeholder="Company Name"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                            <input
                                type="text"
                                value={sellerContact}
                                onChange={(e) => setSellerContact(e.target.value)}
                                placeholder="Email/Phone"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                        </div>
                        <div className="space-y-1 text-xs">
                            <input
                                type="text"
                                value={sellerAddress}
                                onChange={(e) => setSellerAddress(e.target.value)}
                                placeholder="Office Address"
                                className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                        </div>
                    </div>

                    {/* Buyer details */}
                    <div className="space-y-3 border-t border-white/5 pt-3">
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase">Proposed Client Info</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <input
                                type="text"
                                value={buyerName}
                                onChange={(e) => setBuyerName(e.target.value)}
                                placeholder="Client Company"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                            <input
                                type="text"
                                value={buyerContact}
                                onChange={(e) => setBuyerContact(e.target.value)}
                                placeholder="Contact Email"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                        </div>
                        <div className="space-y-1 text-xs">
                            <input
                                type="text"
                                value={buyerAddress}
                                onChange={(e) => setBuyerAddress(e.target.value)}
                                placeholder="Client Address"
                                className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Estimate Sheet Preview */}
                <div className="lg:col-span-7">
                    <div
                        id="quote-print-sheet"
                        className="bg-white border border-neutral-200 rounded-2xl shadow-xl p-6 text-slate-800 flex flex-col justify-between min-h-[750px] font-sans print:border-none print:shadow-none"
                    >
                        {/* Letterhead header */}
                        <div>
                            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-bold tracking-tight text-slate-900">{sellerName}</h2>
                                    <p className="text-[10px] text-slate-500 leading-relaxed">
                                        {sellerAddress}<br />
                                        Contact Email: {sellerContact}
                                    </p>
                                </div>
                                <div className="text-right space-y-1">
                                    <span className="px-2 py-0.5 bg-sky-50 text-sky-700 rounded text-[9px] font-bold uppercase tracking-wider">PROJECT ESTIMATE / QUOTE</span>
                                    <p className="text-xs font-semibold text-slate-700 mt-2">Quote #: {quoteNum}</p>
                                    <p className="text-[10px] text-slate-500">Date: {quoteDate}</p>
                                </div>
                            </div>

                            {/* Client Block */}
                            <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-200 text-xs">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Prepared For:</span>
                                    <h4 className="font-bold text-slate-900">{buyerName}</h4>
                                    <p className="text-[10px] text-slate-500 leading-relaxed">
                                        {buyerAddress}<br />
                                        Email: {buyerContact}
                                    </p>
                                </div>
                                <div className="text-right space-y-1">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Validity Period:</span>
                                    <p className="text-xs font-bold text-slate-700 mt-1">{validUntil}</p>
                                </div>
                            </div>

                            {/* Deliverables phase list */}
                            <div className="py-4 space-y-3">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200 text-[9px] text-slate-400 font-bold uppercase">
                                            <th className="py-2">Proposed Deliverable Phase</th>
                                            <th className="py-2 text-center w-16">Qty</th>
                                            <th className="py-2 text-right w-24">Estimated Rate</th>
                                            <th className="py-2 text-right w-24">Subtotal</th>
                                            <th className="py-2 text-center w-8 print:hidden"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => {
                                            const sub = item.quantity * item.rate;
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
                                                        <input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => handleUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                                            className="w-12 text-center bg-transparent border-b border-transparent focus:border-slate-300 outline-none font-mono py-1 print:border-none print:py-0"
                                                        />
                                                    </td>
                                                    <td className="py-2 text-right font-mono">
                                                        <input
                                                            type="number"
                                                            value={item.rate}
                                                            onChange={(e) => handleUpdateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                                                            className="w-20 text-right bg-transparent border-b border-transparent focus:border-slate-300 outline-none font-mono py-1 print:border-none print:py-0"
                                                        />
                                                    </td>
                                                    <td className="py-2 text-right font-semibold font-mono">{formatCurrency(sub)}</td>
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
                                    className="py-1 px-2.5 bg-sky-50 hover:bg-sky-100 text-sky-700 text-[10px] font-bold rounded transition print:hidden"
                                >
                                    + Add Phase Item
                                </button>
                            </div>
                        </div>

                        {/* Sign-off Acceptances & Grand Total */}
                        <div className="border-t border-slate-200 pt-6 mt-auto space-y-8">
                            {/* Totals */}
                            <div className="flex justify-between items-start text-xs">
                                <div className="max-w-xs text-slate-500 leading-relaxed text-[10px]">
                                    <strong>Scope Policy:</strong> Rates specified represent project milestone targets based on current outline proposals. Custom scope extensions may incur extra billing.
                                </div>
                                <div className="w-56 font-bold text-slate-800 text-sm">
                                    <div className="flex justify-between">
                                        <span>Estimated Total:</span>
                                        <span className="font-mono text-sky-700">{formatCurrency(total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Custom authorized signature sheet! Looks incredibly neat on paper printouts */}
                            <div className="grid grid-cols-2 gap-8 pt-4 text-xs">
                                <div className="space-y-4">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Prepared By (WebnexFusion):</span>
                                    <div className="border-b border-slate-300 w-48 h-8" />
                                    <p className="text-[10px] text-slate-500">Authorized Signature & Title</p>
                                </div>
                                <div className="space-y-4 text-right flex flex-col items-end">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Client Acceptance (Sign-off):</span>
                                    <div className="border-b border-slate-300 w-48 h-8" />
                                    <p className="text-[10px] text-slate-500">Signature Line & Acceptance Date</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
