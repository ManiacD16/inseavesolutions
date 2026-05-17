import { useState } from 'react';
import { Clipboard, RefreshCw, Database } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SqlFormatter() {
    const [sql, setSql] = useState(`select id, name, email from users left join orders on users.id = orders.user_id where orders.amount > 100 group by users.id order by orders.date desc limit 10;`);
    const [formatted, setFormatted] = useState('');

    const keywords = [
        'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 
        'INNER JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'INSERT INTO', 
        'VALUES', 'UPDATE', 'SET', 'DELETE', 'AS', 'IN', 'NOT IN', 'LIKE'
    ];

    const handleFormat = () => {
        if (!sql.trim()) {
            setFormatted('');
            return;
        }

        let query = sql.trim();

        // 1. Capitalize common keywords (case-insensitive replace)
        keywords.forEach(kw => {
            const regex = new RegExp(`\\b${kw}\\b`, 'gi');
            query = query.replace(regex, kw);
        });

        // 2. Format spacing and linebreaks around major keywords
        const linebreakKeywords = [
            'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'LEFT JOIN', 'RIGHT JOIN', 
            'INNER JOIN', 'JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'VALUES', 'SET'
        ];

        linebreakKeywords.forEach(kw => {
            // Find keyword, insert newline before it, unless it's already there
            const regex = new RegExp(`(\\s*)\\b${kw}\\b`, 'g');
            query = query.replace(regex, `\n${kw}`);
        });

        // Clean double newlines and trim each line
        let formattedQuery = query
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n');

        // Indent lines that do not start with a major keyword
        const lines = formattedQuery.split('\n');
        const majorKeywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'GROUP', 'ORDER', 'HAVING', 'LIMIT', 'INSERT', 'UPDATE', 'DELETE', 'SET', 'VALUES'];
        
        formattedQuery = lines.map((line, idx) => {
            if (idx === 0) return line;
            const startsWithMajor = majorKeywords.some(kw => line.startsWith(kw));
            return startsWithMajor ? line : `  ${line}`;
        }).join('\n');

        setFormatted(formattedQuery);
        toast.success('SQL formatted successfully!');
    };

    const handleCopy = () => {
        if (!formatted) return;
        navigator.clipboard.writeText(formatted);
        toast.success('Copied formatted SQL!');
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-white">SQL Query Formatter</h3>
                <p className="text-sm text-neutral-400 mt-1">
                    Indents, aligns, and beautifies raw database queries instantly. Automatically capitalizes major SQL keywords.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* SQL Input Area */}
                <div className="space-y-2 flex flex-col h-[400px]">
                    <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                        <span className="flex items-center gap-1.5"><Database className="h-4 w-4" /> RAW SQL QUERY</span>
                        <button
                            onClick={() => setSql('')}
                            className="text-[10px] text-neutral-500 hover:text-neutral-300 transition"
                        >
                            Clear
                        </button>
                    </div>
                    <textarea
                        value={sql}
                        onChange={(e) => setSql(e.target.value)}
                        placeholder="SELECT * FROM table WHERE column = 'value';"
                        className="flex-1 w-full bg-black/45 border border-white/10 rounded-2xl p-5 text-sm outline-none text-indigo-300 focus:border-indigo-500 transition font-mono leading-relaxed resize-none"
                    />
                    <button
                        onClick={handleFormat}
                        disabled={!sql.trim()}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10"
                    >
                        <RefreshCw className="h-4 w-4" /> Format SQL Query
                    </button>
                </div>

                {/* Formatted Output Area */}
                <div className="space-y-2 flex flex-col h-[400px]">
                    <div className="flex justify-between items-center text-xs font-semibold text-neutral-400">
                        <span>BEAUTIFIED SQL OUTPUT</span>
                        {formatted && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-white transition font-semibold"
                            >
                                <Clipboard className="h-3.5 w-3.5" /> Copy SQL
                            </button>
                        )}
                    </div>
                    <pre className="flex-1 bg-black/35 border border-white/10 rounded-2xl p-5 text-xs text-neutral-300 font-mono select-all break-all overflow-y-auto whitespace-pre-wrap leading-relaxed">
                        {formatted || 'Click "Format SQL Query" to generate formatted query output...'}
                    </pre>
                </div>
            </div>
        </div>
    );
}
