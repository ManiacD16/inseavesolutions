import { useState } from 'react';
import { Plus, Trash2, Printer, Clipboard, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
    gstRate: number;
}

export default function InvoiceGenerator() {
    // Seller Info
    const [sellerName, setSellerName] = useState('WebnexFusion Solutions');
    const [sellerEmail, setSellerEmail] = useState('billing@webnexfusion.com');
    const [sellerAddress, setSellerAddress] = useState('Plot 45, Tech Sector, Noida, UP');
    const [sellerGstin, setSellerGstin] = useState('09AAAAA1111A1Z1');

    // Buyer Info
    const [buyerName, setBuyerName] = useState('Acme Corporation');
    const [buyerEmail, setBuyerEmail] = useState('accounts@acme.com');
    const [buyerAddress, setBuyerAddress] = useState('Sector 62, Bangalore, Karnataka');
    const [buyerGstin, setBuyerGstin] = useState('29BBBBB2222B2Z2');

    // Invoice Meta
    const [invoiceNum, setInvoiceNum] = useState('WNF-2026-001');
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [dueDate, setDueDate] = useState(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

    // Items list
    const [items, setItems] = useState<InvoiceItem[]>([
        { id: '1', description: 'Enterprise Website Design Package', quantity: 1, rate: 45000, gstRate: 18 },
        { id: '2', description: 'Cloud VPS Deployment Service', quantity: 2, rate: 5000, gstRate: 18 }
    ]);

    const handleAddItem = () => {
        const newItem: InvoiceItem = {
            id: Date.now().toString(),
            description: 'New Product / Service Description',
            quantity: 1,
            rate: 1000,
            gstRate: 18
        };
        setItems([...items, newItem]);
        toast.success('Line item added!');
    };

    const handleRemoveItem = (id: string) => {
        if (items.length <= 1) {
            toast.error('Invoice must contain at least one item.');
            return;
        }
        setItems(items.filter(item => item.id !== id));
        toast.success('Item removed.');
    };

    const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: any) => {
        setItems(items.map(item => {
            if (item.id === id) {
                return { ...item, [field]: value };
            }
            return item;
        }));
    };

    // Calculations
    const calculateTotals = () => {
        let subtotal = 0;
        let totalTax = 0;

        items.forEach(item => {
            const basicAmount = item.quantity * item.rate;
            const taxAmount = basicAmount * (item.gstRate / 100);
            subtotal += basicAmount;
            totalTax += taxAmount;
        });

        const grandTotal = subtotal + totalTax;

        return {
            subtotal: Math.round(subtotal),
            totalTax: Math.round(totalTax),
            grandTotal: Math.round(grandTotal)
        };
    };

    const totals = calculateTotals();

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 print:hidden">
                <div>
                    <h3 className="text-xl font-semibold text-white">Dynamic Invoice & Bill PDF Generator</h3>
                    <p className="text-sm text-neutral-400 mt-1">
                        Build client invoices, itemize sales tax, calculate totals, and download professional printable bills instantly.
                    </p>
                </div>
                <button
                    onClick={handlePrint}
                    className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10 shrink-0"
                >
                    <Printer className="h-4.5 w-4.5" /> Print / Save as PDF
                </button>
            </div>

            {/* Print Friendly Styling Injection */}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #print-invoice-sheet, #print-invoice-sheet * {
                        visibility: visible;
                    }
                    #print-invoice-sheet {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        background: white !important;
                        color: black !important;
                        padding: 20px !important;
                        box-shadow: none !important;
                        border: none !important;
                    }
                    .print-bg-fix {
                        background-color: #f8fafc !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .text-black-fix {
                        color: black !important;
                    }
                    .text-slate-fix {
                        color: #475569 !important;
                    }
                    .border-slate-fix {
                        border-color: #cbd5e1 !important;
                    }
                }
            `}</style>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:block">
                {/* Editor Panel (5 columns) */}
                <div className="lg:col-span-5 space-y-6 bg-white/5 border border-white/10 rounded-2xl p-5 lg:p-6 print:hidden">
                    <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase flex items-center gap-1.5 border-b border-white/5 pb-3">
                        <FileText className="h-4 w-4" /> Invoice Details Builder
                    </span>

                    {/* Invoice Meta details */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                            <label className="text-[10px] text-neutral-400 font-bold uppercase">Invoice No</label>
                            <input
                                type="text"
                                value={invoiceNum}
                                onChange={(e) => setInvoiceNum(e.target.value)}
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

                    {/* Seller Details */}
                    <div className="space-y-3 border-t border-white/5 pt-4">
                        <h4 className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Seller Details</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[9px] text-neutral-500 font-semibold uppercase">Business Name</label>
                                <input
                                    type="text"
                                    value={sellerName}
                                    onChange={(e) => setSellerName(e.target.value)}
                                    className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] text-neutral-500 font-semibold uppercase">GSTIN Identification</label>
                                <input
                                    type="text"
                                    value={sellerGstin}
                                    onChange={(e) => setSellerGstin(e.target.value)}
                                    className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none font-mono"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[9px] text-neutral-500 font-semibold uppercase">Billing Address</label>
                                <input
                                    type="text"
                                    value={sellerAddress}
                                    onChange={(e) => setSellerAddress(e.target.value)}
                                    className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] text-neutral-500 font-semibold uppercase">Contact Email</label>
                                <input
                                    type="text"
                                    value={sellerEmail}
                                    onChange={(e) => setSellerEmail(e.target.value)}
                                    className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Client Details */}
                    <div className="space-y-3 border-t border-white/5 pt-4">
                        <h4 className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Buyer (Client) Details</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[9px] text-neutral-500 font-semibold uppercase">Client Name</label>
                                <input
                                    type="text"
                                    value={buyerName}
                                    onChange={(e) => setBuyerName(e.target.value)}
                                    className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] text-neutral-500 font-semibold uppercase">Client GSTIN</label>
                                <input
                                    type="text"
                                    value={buyerGstin}
                                    onChange={(e) => setBuyerGstin(e.target.value)}
                                    className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none font-mono"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[9px] text-neutral-500 font-semibold uppercase">Client Address</label>
                                <input
                                    type="text"
                                    value={buyerAddress}
                                    onChange={(e) => setBuyerAddress(e.target.value)}
                                    className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] text-neutral-500 font-semibold uppercase">Client Email</label>
                                <input
                                    type="text"
                                    value={buyerEmail}
                                    onChange={(e) => setBuyerEmail(e.target.value)}
                                    className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Invoice Sheet View (7 columns) */}
                <div className="lg:col-span-7 print:w-full print:m-0">
                    <div 
                        id="print-invoice-sheet" 
                        className="bg-white border border-neutral-200 rounded-2xl shadow-2xl p-8 text-slate-800 flex flex-col justify-between min-h-[750px] font-sans print:border-none print:shadow-none"
                    >
                        {/* Letterhead Header */}
                        <div>
                            <div className="flex justify-between items-start border-b border-slate-200 border-slate-fix pb-6">
                                <div className="space-y-1.5">
                                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 text-black-fix">{sellerName}</h2>
                                    <p className="text-[10px] text-slate-500 text-slate-fix leading-relaxed">
                                        {sellerAddress}<br />
                                        Email: {sellerEmail} | GSTIN: {sellerGstin}
                                    </p>
                                </div>
                                <div className="text-right space-y-1">
                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[9px] font-bold uppercase tracking-wider print-bg-fix">TAX INVOICE</span>
                                    <p className="text-xs font-semibold text-slate-600 text-slate-fix mt-2">Inv #: {invoiceNum}</p>
                                    <p className="text-[10px] text-slate-500 text-slate-fix">Date: {invoiceDate}</p>
                                    <p className="text-[10px] text-slate-500 text-slate-fix">Due Date: {dueDate}</p>
                                </div>
                            </div>

                            {/* Billing details split */}
                            <div className="grid grid-cols-2 gap-4 py-6 border-b border-slate-200 border-slate-fix">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Bill To Client:</span>
                                    <h4 className="text-sm font-bold text-slate-900 text-black-fix">{buyerName}</h4>
                                    <p className="text-[10px] text-slate-500 text-slate-fix leading-relaxed">
                                        {buyerAddress}<br />
                                        Email: {buyerEmail}
                                    </p>
                                </div>
                                <div className="text-right space-y-1">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Client GSTIN:</span>
                                    <p className="text-[10px] font-semibold text-slate-700 text-black-fix font-mono mt-1">{buyerGstin}</p>
                                </div>
                            </div>

                            {/* Dynamic items input editor interface */}
                            <div className="py-6 space-y-4">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider print:hidden">Line Items Editor</h4>
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-200 border-slate-fix text-[10px] text-slate-400 font-bold uppercase">
                                                <th className="py-2.5">Item Description</th>
                                                <th className="py-2.5 text-center w-16">Qty</th>
                                                <th className="py-2.5 text-right w-24">Rate</th>
                                                <th className="py-2.5 text-center w-16">Tax %</th>
                                                <th className="py-2.5 text-right w-24">Total</th>
                                                <th className="py-2.5 text-center w-10 print:hidden">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item) => {
                                                const basic = item.quantity * item.rate;
                                                const gst = basic * (item.gstRate / 100);
                                                return (
                                                    <tr key={item.id} className="border-b border-slate-100 border-slate-fix text-slate-700 text-black-fix">
                                                        <td className="py-2 pr-2">
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
                                                        <td className="py-2 text-center">
                                                            <input
                                                                type="number"
                                                                value={item.gstRate}
                                                                onChange={(e) => handleUpdateItem(item.id, 'gstRate', parseInt(e.target.value) || 0)}
                                                                className="w-10 text-center bg-transparent border-b border-transparent focus:border-slate-300 outline-none font-mono py-1 print:border-none print:py-0"
                                                            />
                                                        </td>
                                                        <td className="py-2 text-right font-semibold font-mono">
                                                            {formatCurrency(basic + gst)}
                                                        </td>
                                                        <td className="py-2 text-center print:hidden">
                                                            <button
                                                                onClick={() => handleRemoveItem(item.id)}
                                                                className="p-1 text-slate-400 hover:text-rose-500 transition"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                <button
                                    onClick={handleAddItem}
                                    className="py-1.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-lg transition inline-flex items-center gap-1 uppercase tracking-wider print:hidden"
                                >
                                    <Plus className="h-3.5 w-3.5" /> Add Product Item
                                </button>
                            </div>
                        </div>

                        {/* Invoice Summary Totals */}
                        <div className="border-t border-slate-200 border-slate-fix pt-6 mt-auto">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Payment Instructions</h5>
                                    <p className="text-[10px] text-slate-500 text-slate-fix leading-relaxed">
                                        Please remit payment within 15 days of invoice date.<br />
                                        Bank: Federal Bank | A/C: 100200300400 | IFSC: FDRL0001234
                                    </p>
                                </div>
                                <div className="w-64 space-y-2 text-xs">
                                    <div className="flex justify-between text-slate-500 text-slate-fix">
                                        <span>Taxable Subtotal:</span>
                                        <span className="font-mono">{formatCurrency(totals.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 text-slate-fix">
                                        <span>Tax Liability (GST):</span>
                                        <span className="font-mono">{formatCurrency(totals.totalTax)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-800 text-black-fix font-bold border-t border-slate-200 border-slate-fix pt-2.5 text-sm">
                                        <span>Grand Total:</span>
                                        <span className="font-mono text-indigo-700 text-black-fix">{formatCurrency(totals.grandTotal)}</span>
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
