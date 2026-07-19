import { Zap, Lock, RefreshCw, CheckCircle, ShieldAlert, Trophy } from 'lucide-react';
import PrimaryCTA from './PrimaryCTA';

export default function Hero() {
    return (
        <section className="relative pt-12 md:pt-20 pb-16 md:pb-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="relative z-10 flex flex-col items-start gap-6">
                    <span className="inline-block px-4 py-1 border-2 border-ink rounded-full font-body font-extrabold text-xs md:text-sm uppercase tracking-wider bg-white shadow-[2px_2px_0_var(--color-ink)]">
                        Productivity, Gamified.
                    </span>
                    <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[1.1] text-ink wrap-break-word">
                        Turn Your To-Do List Into Your Next Quest
                    </h1>
                    <p className="font-body text-base md:text-lg lg:text-xl text-ink font-medium max-w-lg leading-relaxed">
                        Collab Quest is the gamified task manager for teams, study groups, and solo grinders. Earn XP, unlock badges, and finally get your team to finish what they started — no nagging required.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 w-full sm:w-auto pb-4">
                        <PrimaryCTA text="Start Your Quest — Free" href="/dashboard" />
                        <a href="#how-it-works" className="font-body font-bold text-ink hover:text-sync-teal transition-colors underline decoration-2 underline-offset-4 mt-2 sm:mt-0">
                            See How It Works &darr;
                        </a>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs md:text-sm font-body font-bold text-ink/80 mt-4">
                        <span className="flex items-center gap-2"><Zap size={16} className="text-quest-gold-deep" /> Free forever</span>
                        <span className="items-center gap-2 hidden sm:flex">&middot;</span>
                        <span className="flex items-center gap-2"><Lock size={16} className="text-sync-teal" /> No credit card</span>
                        <span className="items-center gap-2 hidden sm:flex">&middot;</span>
                        <span className="flex items-center gap-2"><RefreshCw size={16} className="text-puzzle-red" /> Syncs everywhere</span>
                    </div>
                </div>

                <div className="relative z-10 w-full min-h-87.5 md:h-125 flex items-center justify-center mt-10 lg:mt-0 scale-90 sm:scale-100">
                    {/* Main Browser Frame */}
                    <div className="absolute w-full max-w-[320px] sm:max-w-100 md:max-w-112.5 h-75 md:h-95 bg-cloud border-2 border-ink rounded-2xl shadow-hard-lg overflow-hidden flex flex-col z-10 transform md:rotate-2">
                        <div className="h-8 md:h-10 border-b-2 border-ink bg-white flex items-center px-4 gap-2">
                            <div className="w-2.5 h-2.5 rounded-full border-2 border-ink bg-puzzle-red"></div>
                            <div className="w-2.5 h-2.5 rounded-full border-2 border-ink bg-quest-gold"></div>
                            <div className="w-2.5 h-2.5 rounded-full border-2 border-ink bg-sync-teal"></div>
                        </div>
                        <div className="flex-1 p-4 md:p-6 relative bg-parchment">
                            <div className="w-full bg-white border-2 border-ink rounded-xl p-3 md:p-4 shadow-hard mb-4 transform -rotate-1">
                                <div className="flex items-center justify-between border-b-2 border-ink pb-2 mb-2">
                                    <span className="font-display font-bold text-base md:text-lg">Group Workspace</span>
                                    <span className="font-mono font-bold text-sm text-quest-gold-deep">Level 12</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle size={20} className="text-sync-teal" strokeWidth={2.5} />
                                    <div className="h-3 md:h-4 w-3/4 bg-cloud rounded-full border border-ink/20"></div>
                                </div>
                            </div>
                            <div className="w-[90%] bg-white border-2 border-ink rounded-xl p-3 md:p-4 shadow-hard transform rotate-2 translate-x-4 md:translate-x-8">
                                <div className="flex items-center gap-3">
                                    <ShieldAlert size={20} className="text-puzzle-red" strokeWidth={2.5} />
                                    <div className="h-3 md:h-4 w-1/2 bg-cloud rounded-full border border-ink/20"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating UI Chips */}
                    <div className="absolute -top-4 right-0 md:top-10 md:-right-8 bg-quest-gold border-2 border-ink rounded-full px-4 md:px-6 py-2 shadow-hard z-30 transform rotate-6 animate-bounce" style={{ animationDuration: '3s' }}>
                        <span className="font-mono font-bold text-lg md:text-xl text-ink">+50 XP</span>
                    </div>

                    <div className="absolute -bottom-6 left-0 md:bottom-16 md:-left-12 bg-white border-2 border-ink rounded-xl md:rounded-2xl p-2 md:p-3 shadow-hard z-30 transform -rotate-6 flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-sync-teal border-2 border-ink rounded-full flex items-center justify-center text-ink">
                            <Trophy size={20} strokeWidth={2.5} fill="#fef08a" />
                        </div>                        <div>
                            <p className="font-body font-bold text-xs md:text-sm">Badge Unlocked!</p>
                            <p className="font-display font-bold text-sm md:text-base text-ink leading-tight">Team Player</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}