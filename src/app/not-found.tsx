import Link from 'next/link';
import { SearchX, Award } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] bg-parchment flex flex-col items-center justify-center p-6 text-ink">
            <div className="max-w-2xl w-full flex flex-col items-center text-center">

                <div className="w-24 h-24 bg-parchment border-4 border-dashed border-ink/40 rounded-2xl flex items-center justify-center mb-10 transform rotate-6">
                    <SearchX size={40} className="text-ink/40" strokeWidth={2.5} />
                </div>

                <span className="font-mono font-bold text-puzzle-red text-xl mb-4 tracking-widest block">
                    404
                </span>

                <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-6 leading-tight">
                    This Quest Hasn't Been Written Yet
                </h1>

                <p className="font-body font-medium text-lg text-ink/80 max-w-lg mb-10 leading-relaxed">
                    The page you're looking for wandered off the map — archived, renamed, or it never existed. Either way, let's get you back to base camp.
                </p>

                <div className="inline-flex items-center gap-3 bg-cloud border-2 border-ink rounded-xl px-5 py-3 mb-12 shadow-[2px_2px_0_var(--color-ink)] transform -rotate-1 hover:rotate-0 transition-transform cursor-default">
                    <Award size={24} strokeWidth={2.5} className="text-ink" />
                    <span className="font-body font-bold text-sm tracking-wide">Secret Achievement Unlocked: 404 Explorer</span>
                </div>

                <Link
                    href="/"
                    className="inline-flex justify-center items-center font-display font-bold text-lg px-8 py-4 bg-white hover:bg-cloud transition-colors rounded-2xl border-2 border-ink shadow-hard active:shadow-none active:translate-y-1"
                >
                    Back to Base Camp
                </Link>

            </div>
        </div>
    );
}