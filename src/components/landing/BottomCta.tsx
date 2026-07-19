import { Zap, Lock, Rocket } from 'lucide-react';
import PrimaryCTA from './PrimaryCTA';

export default function BottomCta() {
    return (
        <section className="py-20 md:py-32 px-6 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <span className="font-display font-bold text-puzzle-red text-base md:text-lg mb-4 block">Ready When You Are</span>
                <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mb-4 md:mb-6 leading-tight">
                    Your Next Level Starts Here
                </h2>
                <p className="font-body font-medium text-lg md:text-xl text-ink/80 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
                    Join Collab Quest today. Free to start, no credit card, and your first Quest takes less than 2 minutes to set up.
                </p>

                <div className="flex justify-center mb-8">
                    <PrimaryCTA text="Start Your Quest — Free" href="/dashboard" />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs md:text-sm font-body font-bold text-ink">
                    <span className="flex items-center gap-2"><Zap size={16} className="text-quest-gold-deep" /> Free forever</span>
                    <span className="items-center gap-2 hidden sm:flex">&middot;</span>
                    <span className="flex items-center gap-2"><Lock size={16} className="text-sync-teal" /> No credit card</span>
                    <span className="items-center gap-2 hidden sm:flex">&middot;</span>
                    <span className="flex items-center gap-2"><Rocket size={16} className="text-puzzle-red" /> 2-minute setup</span>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-4 left-4 md:top-10 md:left-10 w-16 h-16 md:w-24 md:h-24 bg-sync-teal rounded-full border-2 border-ink opacity-20 pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-24 h-24 md:w-32 md:h-32 bg-quest-gold rounded-full border-2 border-ink opacity-20 pointer-events-none"></div>
        </section>
    );
}