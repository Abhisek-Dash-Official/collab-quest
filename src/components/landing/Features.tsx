import {
    Gamepad2, Hand, LayoutDashboard,
    Trophy, TrendingUp, Medal, Bell, ShieldBan, Lock, Globe,
    Crown, Zap, Gauge, Hourglass, Waves, Flame, Sword, Target, Ghost
} from 'lucide-react';

export default function Features() {
    const badges = [
        { icon: <Crown size={24} strokeWidth={2.5} />, name: 'MVP', desc: 'Highest task completion and XP in your group for the month.' },
        { icon: <Zap size={24} strokeWidth={2.5} />, name: 'Speedster', desc: 'Be the first to finish 20%+ of your assigned tasks.' },
        { icon: <Gauge size={24} strokeWidth={2.5} />, name: 'Fast-Worker', desc: 'Finish 30%+ of your tasks in under half the allotted time.' },
        { icon: <Hourglass size={24} strokeWidth={2.5} />, name: 'Time-Traveler', desc: 'Pre-emptively complete at least 5 tasks before they even start.' },
        { icon: <Waves size={24} strokeWidth={2.5} />, name: 'Deadline-Surfer', desc: 'Thrive under pressure. Finish 25%+ of your tasks in the final 10% of their countdown.' },
        { icon: <Flame size={24} strokeWidth={2.5} />, name: 'Unstoppable', desc: 'Maintain an active Fire Streak for 7 days in a row.' },
        { icon: <Sword size={24} strokeWidth={2.5} />, name: 'Nudge-Ninja', desc: 'Hold the title for the most Nudges sent in your group.' },
        { icon: <Target size={24} strokeWidth={2.5} />, name: 'Most-Wanted', desc: 'The most nudged teammate. Time to check that to-do list.' },
        { icon: <Ghost size={24} strokeWidth={2.5} />, name: 'The NPC', desc: 'Badge of Shame: Fail to complete 75% of your assigned tasks.' }
    ];

    return (
        <section id="features" className="py-16 md:py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-20">
                    <span className="font-display font-bold text-sync-teal text-base md:text-lg mb-4 block">How Collab Quest Works</span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink max-w-2xl mx-auto leading-tight">
                        Three Mechanics. One Ridiculously Motivating App.
                    </h2>
                </div>

                {/* Feature 1: Gamification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
                    <div className="order-2 md:order-1 bg-white border-2 border-ink rounded-3xl p-8 shadow-hard-lg aspect-square md:max-h-112.5 flex items-center justify-center relative">
                        <Gamepad2 size={100} strokeWidth={1.5} className="text-quest-gold md:w-30 md:h-30" />
                        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-quest-gold-deep border-2 border-ink rounded-lg p-2 md:p-3 font-mono-stat font-bold text-base md:text-lg rotate-12 shadow-hard">+150 XP</div>
                    </div>
                    <div className="order-1 md:order-2 flex flex-col items-start">
                        <span className="inline-block px-4 py-1 border-2 border-ink rounded-full font-body font-bold text-xs md:text-sm bg-quest-gold mb-4 md:mb-6">Level Up, For Real</span>
                        <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl mb-3 md:mb-4">Every Task Completed Earns XP</h3>
                        <p className="font-body font-medium text-base md:text-lg text-ink/90 mb-6 md:mb-8 leading-relaxed">
                            Collab Quest runs on a dynamic leveling engine. Finish tasks, earn XP, climb through tiers, and watch your name rise on the monthly leaderboard. Keep your Fire Streak alive by completing tasks daily.
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-3 font-body font-bold text-xs md:text-sm">
                            <span className="bg-parchment border-2 border-ink rounded-lg px-3 py-2 flex items-center gap-1.5"><Trophy size={14} strokeWidth={2.5} /> Leaderboards</span>
                            <span className="bg-parchment border-2 border-ink rounded-lg px-3 py-2 flex items-center gap-1.5"><TrendingUp size={14} strokeWidth={2.5} /> Dynamic XP</span>
                            <span className="bg-parchment border-2 border-ink rounded-lg px-3 py-2 flex items-center gap-1.5"><Medal size={14} strokeWidth={2.5} /> Badges</span>
                        </div>
                    </div>
                </div>

                {/* Feature 2: Accountability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
                    <div className="flex flex-col items-start">
                        <span className="inline-block px-4 py-1 border-2 border-ink rounded-full font-body font-bold text-xs md:text-sm bg-puzzle-red text-white mb-4 md:mb-6">Accountability</span>
                        <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl mb-3 md:mb-4">Nudges: The Peer Pressure You Want</h3>
                        <p className="font-body font-medium text-base md:text-lg text-ink/90 mb-6 md:mb-8 leading-relaxed">
                            Teammate gone quiet? Send a Nudge — a friendly push notification that says 'hey, we're waiting on you.' Become a Nudge-Ninja, but don't end up as the Most-Wanted. Built-in limits keep it a nudge, never a nag.
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-3 font-body font-bold text-xs md:text-sm">
                            <span className="bg-parchment border-2 border-ink rounded-lg px-3 py-2 flex items-center gap-1.5"><Bell size={14} strokeWidth={2.5} /> One-Tap Nudge</span>
                            <span className="bg-parchment border-2 border-ink rounded-lg px-3 py-2 flex items-center gap-1.5"><ShieldBan size={14} strokeWidth={2.5} /> Anti-Spam</span>
                        </div>
                    </div>
                    <div className="bg-white border-2 border-ink rounded-3xl p-8 shadow-hard-lg aspect-square md:max-h-112.5 flex items-center justify-center relative">
                        <Hand size={100} strokeWidth={1.5} className="text-puzzle-red md:w-30 md:h-30" />
                        <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-ink text-white border-2 border-ink rounded-lg p-2 md:p-3 font-body font-bold text-xs md:text-sm -rotate-6 shadow-hard">You've been Nudged!</div>
                    </div>
                </div>

                {/* Feature 3: Workspaces */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
                    <div className="order-2 md:order-1 bg-white border-2 border-ink rounded-3xl p-8 shadow-hard-lg aspect-square md:max-h-112.5 flex items-center justify-center relative">
                        <LayoutDashboard size={100} strokeWidth={1.5} className="text-sync-teal md:w-30 md:h-30" />
                        <div className="absolute bottom-10 left-6 md:bottom-12 md:left-8 bg-sync-teal border-2 border-ink rounded-lg p-2 md:p-3 font-body font-bold text-xs md:text-sm rotate-6 shadow-hard">Synced 0.2s ago</div>
                    </div>
                    <div className="order-1 md:order-2 flex flex-col items-start">
                        <span className="inline-block px-4 py-1 border-2 border-ink rounded-full font-body font-bold text-xs md:text-sm bg-sync-teal mb-4 md:mb-6">Your Turf, Your Rules</span>
                        <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl mb-3 md:mb-4">Solo Grind or Squad Goals</h3>
                        <p className="font-body font-medium text-base md:text-lg text-ink/90 mb-6 md:mb-8 leading-relaxed">
                            Switch seamlessly between your Personal Workspace (works completely offline) and Group Workspaces (real-time team sync). No lag, no chaos.
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-3 font-body font-bold text-xs md:text-sm">
                            <span className="bg-parchment border-2 border-ink rounded-lg px-3 py-2 flex items-center gap-1.5"><Lock size={14} strokeWidth={2.5} /> Personal: Offline</span>
                            <span className="bg-parchment border-2 border-ink rounded-lg px-3 py-2 flex items-center gap-1.5"><Globe size={14} strokeWidth={2.5} /> Group: Sync</span>
                        </div>
                    </div>
                </div>

                {/* Badge Strip (Scrollable on mobile) */}
                <div className="mt-16 md:mt-32 pt-12 md:pt-16 border-t-2 border-ink text-center">
                    <h3 className="font-display font-extrabold text-2xl md:text-3xl mb-2">Achievements Are Waiting</h3>
                    <p className="font-body font-medium text-sm md:text-base text-ink/80 mb-8 md:mb-12">A few favorites you'll unlock along the way:</p>

                    <div className="flex overflow-x-auto pb-8 gap-4 md:gap-6 snap-x hide-scrollbar px-2">
                        {badges.map((badge, idx) => (
                            <div key={idx} className="shrink-0 w-65 md:w-72 bg-white border-2 border-ink rounded-2xl p-5 md:p-6 shadow-hard snap-center text-left hover:-translate-y-1 transition-transform">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-cloud border-2 border-ink rounded-full flex items-center justify-center mb-4 shadow-[2px_2px_0_var(--color-ink)] text-ink">
                                    {badge.icon}
                                </div>
                                <h4 className="font-display font-bold text-lg md:text-xl mb-1 md:mb-2">{badge.name}</h4>
                                <p className="font-body text-xs md:text-sm font-medium text-ink/80">{badge.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}