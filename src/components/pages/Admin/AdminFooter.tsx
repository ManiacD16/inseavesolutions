export default function AdminFooter({ isDark }: { isDark: boolean }) {
    return (
        <footer className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} border-t p-4 mt-auto transition-colors duration-300`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
                <p>&copy; {new Date().getFullYear()} WebnexFusion Admin Panel. All rights reserved.</p>
                <div className="flex gap-4">
                    <span className="hover:text-neutral-300 cursor-pointer transition">Support</span>
                    <span className="hover:text-neutral-300 cursor-pointer transition">Terms</span>
                    <span className="hover:text-neutral-300 cursor-pointer transition">Privacy</span>
                </div>
            </div>
        </footer>
    );
}
