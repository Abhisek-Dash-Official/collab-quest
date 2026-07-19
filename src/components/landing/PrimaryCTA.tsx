import Link from 'next/link';

export default function PrimaryCTA({ text, href = "/dashboard" }: { text: string, href?: string }) {
    return (
        <Link href={href} className="group relative inline-flex justify-center items-center font-display font-bold text-lg md:text-xl text-ink">
            {/* Main Button Body */}
            <div className="relative z-10 px-6 py-4 md:px-8 bg-quest-gold group-hover:bg-quest-gold-deep transition-colors rounded-3xl border-2 border-ink shadow-hard active:shadow-none active:translate-y-1">
                {text}
            </div>
            {/* Puzzle Notch (Bottom Center Tab) */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-quest-gold group-hover:bg-quest-gold-deep transition-colors border-2 border-ink rounded-full z-0 group-active:translate-y-1"></div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-1 bg-quest-gold group-hover:bg-quest-gold-deep transition-colors z-20 group-active:translate-y-1 group-active:-bottom-1"></div>
        </Link>
    );
}