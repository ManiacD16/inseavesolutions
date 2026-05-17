import { useState } from 'react';
import { Plus, Trash2, Printer, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

interface GstInvoiceItem {
    id: string;
    description: string;
    hsnCode: string;
    quantity: number;
    rate: number;
    gstRate: number; // e.g. 5, 12, 18, 28
}

export default function GstInvoiceGenerator() {
    const [sellerName, setSellerName] = useState('WebnexFusion Solutions');
    const [sellerGstin, setSellerGstin] = useState('09AAAAA1111A1Z1');
    const [sellerAddress, setSellerAddress] = useState('Plot 45, Tech Sector, Noida, UP');
    const [sellerState, setSellerState] = useState('Uttar Pradesh (09)');

    const [buyerName, setBuyerName] = useState('Acme Corporation');
    const [buyerGstin, setBuyerGstin] = useState('29BBBBB2222B2Z2');
    const [buyerAddress, setBuyerAddress] = useState('Sector 62, Bangalore, Karnataka');
    const [buyerState, setBuyerState] = useState('Karnataka (29)');

    const [invoiceNum, setInvoiceNum] = useState('GST-2026-101');
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [supplyType, setSupplyType] = useState<'Intra-State' | 'Inter-State'>('Inter-State');

    const [items, setItems] = useState<GstInvoiceItem[]>([
        { id: '1', description: 'Web Application Development Services', hsnCode: '998311', quantity: 1, rate: 85000, gstRate: 18 },
        { id: '2', description: 'Business Hosting Servers', hsnCode: '998315', quantity: 3, rate: 4500, gstRate: 18 }
    ]);

    const handleAddItem = () => {
        setItems([...items, {
            id: Date.now().toString(),
            description: 'Item Description',
            hsnCode: '9983',
            quantity: 1,
            rate: 1000,
            gstRate: 18
        }]);
        toast.success('GST line item added!');
    };

    const handleRemoveItem = (id: string) => {
        if (items.length <= 1) {
            toast.error('Invoice must contain at least one line item.');
            return;
        }
        setItems(items.filter(item => item.id !== id));
        toast.success('Line item removed.');
    };

    const handleUpdateItem = (id: string, field: keyof GstInvoiceItem, value: any) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const calculateTotals = () => {
        let taxableValue = 0;
        let cgstTotal = 0;
        let sgstTotal = 0;
        let igstTotal = 0;

        items.forEach(item => {
            const amount = item.quantity * item.rate;
            taxableValue += amount;

            const gstAmount = amount * (item.gstRate / 100);
            if (supplyType === 'Intra-State') {
                cgstTotal += gstAmount / 2;
                sgstTotal += gstAmount / 2;
            } else {
                igstTotal += gstAmount;
            }
        });

        const totalTax = cgstTotal + sgstTotal + igstTotal;
        const grandTotal = taxableValue + totalTax;

        return {
            taxableValue: Math.round(taxableValue),
            cgstTotal: Math.round(cgstTotal),
            sgstTotal: Math.round(sgstTotal),
            igstTotal: Math.round(igstTotal),
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

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 print:hidden">
                <div>
                    <h3 className="text-xl font-semibold text-white">GST Tax Invoice Generator</h3>
                    <p className="text-sm text-neutral-400 mt-1">
                        Create GST compliant tax invoices with CGST, SGST, IGST, and HSN codes, and download high-quality printable PDFs.
                    </p>
                </div>
                <button
                    onClick={() => window.print()}
                    className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                    <Printer className="h-4.5 w-4.5" /> Print / Save GST PDF
                </button>
            </div>

            {/* Print styling */}
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #gst-print-sheet, #gst-print-sheet * {
                        visibility: visible;
                    }
                    #gst-print-sheet {
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
                        <FileText className="h-4 w-4" /> GST Invoice Fields
                    </span>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 gap-3">
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
                            <label className="text-[10px] text-neutral-400 font-bold uppercase">Date of Supply</label>
                            <input
                                type="date"
                                value={invoiceDate}
                                onChange={(e) => setInvoiceDate(e.target.value)}
                                className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none font-mono"
                            />
                        </div>
                    </div>

                    {/* Supply Type */}
                    <div className="space-y-1">
                        <label className="text-[10px] text-neutral-400 font-bold uppercase">Supply Type (GST Category)</label>
                        <select
                            value={supplyType}
                            onChange={(e) => setSupplyType(e.target.value as any)}
                            className="w-full bg-black/45 border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                        >
                            <option value="Intra-State">Intra-State (CGST + SGST)</option>
                            <option value="Inter-State">Inter-State (IGST)</option>
                        </select>
                    </div>

                    {/* Seller details */}
                    <div className="space-y-3 border-t border-white/5 pt-3">
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase">Seller Info (B2B Supplier)</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <input
                                type="text"
                                value={sellerName}
                                onChange={(e) => setSellerName(e.target.value)}
                                placeholder="Business Name"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                            <input
                                type="text"
                                value={sellerGstin}
                                onChange={(e) => setSellerGstin(e.target.value)}
                                placeholder="GSTIN"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none font-mono"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <input
                                type="text"
                                value={sellerAddress}
                                onChange={(e) => setSellerAddress(e.target.value)}
                                placeholder="Billing Address"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                            <input
                                type="text"
                                value={sellerState}
                                onChange={(e) => setSellerState(e.target.value)}
                                placeholder="State & Code"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                        </div>
                    </div>

                    {/* Buyer details */}
                    <div className="space-y-3 border-t border-white/5 pt-3">
                        <h4 className="text-[10px] font-bold text-indigo-400 uppercase">Buyer Info (Recipient)</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <input
                                type="text"
                                value={buyerName}
                                onChange={(e) => setBuyerName(e.target.value)}
                                placeholder="Client Name"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                            <input
                                type="text"
                                value={buyerGstin}
                                onChange={(e) => setBuyerGstin(e.target.value)}
                                placeholder="Client GSTIN"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none font-mono"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <input
                                type="text"
                                value={buyerAddress}
                                onChange={(e) => setBuyerAddress(e.target.value)}
                                placeholder="Address"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                            <input
                                type="text"
                                value={buyerState}
                                onChange={(e) => setBuyerState(e.target.value)}
                                placeholder="Client State & Code"
                                className="bg-black/45 border border-white/10 rounded-lg p-2 text-white outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Print Sheet */}
                <div className="lg:col-span-7">
                    <div
                        id="gst-print-sheet"
                        className="bg-white border border-neutral-200 rounded-2xl shadow-xl p-6 text-slate-800 flex flex-col justify-between min-h-[750px] font-sans print:border-none print:shadow-none"
                    >
                        {/* Bill Header */}
                        <div>
                            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-bold tracking-tight text-slate-900">{sellerName}</h2>
                                    <p className="text-[10px] text-slate-500 leading-relaxed">
                                        {sellerAddress}<br />
                                        State: {sellerState} | GSTIN: {sellerGstin}
                                    </p>
                                </div>
                                <div className="text-right space-y-1">
                                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[9px] font-bold uppercase tracking-wider">GST TAX INVOICE</span>
                                    <p className="text-xs font-semibold text-slate-700 mt-2">Invoice: {invoiceNum}</p>
                                    <p className="text-[10px] text-slate-500">Date: {invoiceDate}</p>
                                </div>
                            </div>

                            {/* Bill split info */}
                            <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-200 text-xs">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Details of Receiver:</span>
                                    <h4 className="font-bold text-slate-900">{buyerName}</h4>
                                    <p className="text-[10px] text-slate-500 leading-relaxed">
                                        {buyerAddress}<br />
                                        State: {buyerState}
                                    </p>
                                </div>
                                <div className="text-right space-y-1">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase">Recipient GSTIN:</span>
                                    <p className="text-[10px] font-semibold text-slate-700 font-mono">{buyerGstin}</p>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="py-4 space-y-3">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200 text-[9px] text-slate-400 font-bold uppercase">
                                            <th className="py-2">Description of Service/Goods</th>
                                            <th className="py-2 text-center w-14">HSN</th>
                                            <th className="py-2 text-center w-12">Qty</th>
                                            <th className="py-2 text-right w-20">Rate</th>
                                            <th className="py-2 text-center w-12">GST</th>
                                            <th className="py-2 text-right w-20">Total</th>
                                            <th className="py-2 text-center w-8 print:hidden"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => {
                                            const basic = item.quantity * item.rate;
                                            const tax = basic * (item.gstRate / 100);
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
                                                    <td className="py-2 text-center font-mono">
                                                        <input
                                                            type="text"
                                                            value={item.hsnCode}
                                                            onChange={(e) => handleUpdateItem(item.id, 'hsnCode', e.target.value)}
                                                            className="w-full text-center bg-transparent border-b border-transparent focus:border-slate-300 outline-none font-mono py-1 print:border-none print:py-0"
                                                        />
                                                    </td>
                                                    <td className="py-2 text-center">
                                                        <input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => handleUpdateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                                            className="w-10 text-center bg-transparent border-b border-transparent focus:border-slate-300 outline-none py-1 print:border-none print:py-0"
                                                        />
                                                    </td>
                                                    <td className="py-2 text-right font-mono">
                                                        <input
                                                            type="number"
                                                            value={item.rate}
                                                            onChange={(e) => handleUpdateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                                                            className="w-16 text-right bg-transparent border-b border-transparent focus:border-slate-300 outline-none font-mono py-1 print:border-none print:py-0"
                                                        />
                                                    </td>
                                                    <td className="py-2 text-center font-mono">
                                                        <input
                                                            type="number"
                                                            value={item.gstRate}
                                                            onChange={(e) => handleUpdateItem(item.id, 'gstRate', parseInt(e.target.value) || 0)}
                                                            className="w-8 text-center bg-transparent border-b border-transparent focus:border-slate-300 outline-none py-1 print:border-none print:py-0"
                                                        />
                                                    </td>
                                                    <td className="py-2 text-right font-semibold font-mono">{formatCurrency(basic + tax)}</td>
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
                                    className="py-1 px-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded transition print:hidden"
                                >
                                    + Add GST Item
                                </button>
                            </div>
                        </div>

                        {/* Summary totals */}
                        <div className="border-t border-slate-200 pt-4 mt-auto">
                            <div className="flex justify-between items-start text-xs">
                                <div className="space-y-1 leading-relaxed text-slate-500">
                                    <h5 className="text-[9px] font-bold text-slate-400 uppercase">GST Tax Summary</h5>
                                    {supplyType === 'Intra-State' ? (
                                        <p className="text-[9px]">
                                            CGST Total: {formatCurrency(totals.cgstTotal)}<br />
                                            SGST Total: {formatCurrency(totals.sgstTotal)}
                                        </p>
                                    ) : (
                                        <p className="text-[9px]">
                                            IGST Total (Inter-State): {formatCurrency(totals.igstTotal)}
                                        </p>
                                    )}
                                </div>
                                <div className="w-56 space-y-1.5">
                                    <div className="flex justify-between text-slate-500">
                                        <span>Taxable Subtotal:</span>
                                        <span className="font-mono">{formatCurrency(totals.taxableValue)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500">
                                        <span>Total GST Tax:</span>
                                        <span className="font-mono">{formatCurrency(totals.totalTax)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-slate-800 border-t border-slate-200 pt-2 text-sm">
                                        <span>Grand Total:</span>
                                        <span className="font-mono text-indigo-700">{formatCurrency(totals.grandTotal)}</span>
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
