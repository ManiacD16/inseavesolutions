import { Loader2 } from 'lucide-react';

interface LoaderProps {
    size?: number;
    className?: string;
    fullScreen?: boolean;
}

export default function Loader({ size = 24, className = '', fullScreen = false }: LoaderProps) {
    const content = (
        <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
            <Loader2 className="animate-spin text-indigo-500" size={size} />
            {fullScreen && <span className="text-sm font-medium text-neutral-400">Loading...</span>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/80 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    return content;
}
