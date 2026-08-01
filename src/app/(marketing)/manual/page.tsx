import type { Metadata } from "next";
import {
    Trophy, Zap, FastForward, Clock, Flame,
    Swords, ShieldAlert, Target, Medal, Ghost, Bell
} from "lucide-react";

export const metadata: Metadata = {
    title: "Game Manual | Collab Quest",
    description: "Learn the rules, XP formulas, and how to unlock badges.",
};

export default function GameManualPage() {
    return (
        <main className="min-h-screen bg-parchment text-ink selection:bg-quest-gold selection:text-ink pb-24">
            {/* HERO SECTION */}
            <section className="px-6 py-16 md:py-24 max-w-4xl mx-auto text-center border-b-2 border-ink">
                <span className="inline-block px-4 py-1.5 mb-6 bg-cloud border-2 border-ink rounded-full text-sm font-bold font-body tracking-wider uppercase shadow-[3px_3px_0px_var(--color-ink)]">
                    Official Documentation
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] mb-6">
                    The Game Manual
                </h1>
                <p className="text-lg md:text-xl font-body leading-relaxed max-w-2xl mx-auto font-medium text-ink/80">
                    Everything you need to know about earning XP, climbing the leaderboard, and unlocking legendary badges.
                </p>
            </section>

            <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-16">

                {/* SECTION 1: THE XP SYSTEM */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-quest-gold border-2 border-ink rounded-xl flex items-center justify-center shadow-[4px_4px_0px_var(--color-ink)]">
                            <Zap size={24} className="text-ink" />
                        </div>
                        <h2 className="text-3xl font-display font-extrabold">1. The XP System</h2>
                    </div>

                    <div className="bg-white border-2 border-ink rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_var(--color-ink)] flex flex-col gap-8">
                        <div>
                            <h3 className="text-xl font-display font-bold mb-2">Base XP</h3>
                            <p className="font-body font-medium mb-3">Every task has a weightage (1 to 5) representing its difficulty. The higher the weightage, the more you earn.</p>
                            <code className="inline-block bg-cloud/50 border-2 border-ink px-3 py-1.5 rounded-lg font-bold text-sm">
                                Base XP = Weightage x 10
                            </code>
                        </div>

                        <div>
                            <h3 className="text-xl font-display font-bold mb-2">The Speedster Bonus (Completion Order)</h3>
                            <p className="font-body font-medium mb-4">Finishing first pays off. The bonus scales based on your group size, but the last-place finisher always gets standard Base XP.</p>
                            {/* Responsive Table Wrapper */}
                            <div className="overflow-x-auto custom-scrollbar rounded-xl border-2 border-ink">
                                <table className="w-full text-left border-collapse min-w-150">
                                    <thead>
                                        <tr className="bg-cloud">
                                            <th className="p-4 font-display font-bold border-b-2 border-r-2 border-ink">Group Size</th>
                                            <th className="p-4 font-display font-bold border-b-2 border-r-2 border-ink">1st Place</th>
                                            <th className="p-4 font-display font-bold border-b-2 border-r-2 border-ink">2nd Place</th>
                                            <th className="p-4 font-display font-bold border-b-2 border-r-2 border-ink">3rd Place</th>
                                            <th className="p-4 font-display font-bold border-b-2 border-ink">4th / 5th Place</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-body font-medium bg-parchment">
                                        <tr>
                                            <td className="p-4 border-b-2 border-r-2 border-ink font-bold">2 Users</td>
                                            <td className="p-4 border-b-2 border-r-2 border-ink text-[#3DDC97] font-bold">+08%</td>
                                            <td className="p-4 border-b-2 border-r-2 border-ink text-ink/50">+0% (Base)</td>
                                            <td className="p-4 border-b-2 border-r-2 border-ink text-ink/50">-</td>
                                            <td className="p-4 border-b-2 border-ink text-ink/50">-</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border-b-2 border-r-2 border-ink font-bold">3 Users</td>
                                            <td className="p-4 border-b-2 border-r-2 border-ink text-[#3DDC97] font-bold">+20%</td>
                                            <td className="p-4 border-b-2 border-r-2 border-ink text-sync-teal font-bold">+10%</td>
                                            <td className="p-4 border-b-2 border-r-2 border-ink text-ink/50">+0% (Base)</td>
                                            <td className="p-4 border-b-2 border-ink text-ink/50">-</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border-r-2 border-ink font-bold">5 Users</td>
                                            <td className="p-4 border-r-2 border-ink text-[#3DDC97] font-bold">+25%</td>
                                            <td className="p-4 border-r-2 border-ink text-sync-teal font-bold">+15%</td>
                                            <td className="p-4 border-r-2 border-ink text-sync-teal font-bold">+10%</td>
                                            <td className="p-4 text-ink/50">+0% (Base)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 bg-sync-teal/10 border-2 border-sync-teal rounded-2xl flex flex-col items-start justify-between">
                                <div>
                                    <h4 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
                                        <FastForward size={20} className="text-sync-teal" /> Early Bird Bonus
                                    </h4>
                                    <p className="font-body text-sm font-medium mb-4">Complete a task using less than 50% of the allotted time.</p>
                                </div>
                                <span className="font-bold text-sync-teal bg-white px-3 py-1.5 rounded-lg border-2 border-sync-teal text-sm shadow-[2px_2px_0px_var(--color-sync-teal)]">
                                    +15% Base XP
                                </span>
                            </div>
                            <div className="p-5 bg-puzzle-red/10 border-2 border-puzzle-red rounded-2xl flex flex-col items-start justify-between">
                                <div>
                                    <h4 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
                                        <Clock size={20} className="text-puzzle-red" /> Time Traveler
                                    </h4>
                                    <p className="font-body text-sm font-medium mb-4">Complete a task <i>before</i> it was officially scheduled to begin.</p>
                                </div>
                                <span className="font-bold text-puzzle-red bg-white px-3 py-1.5 rounded-lg border-2 border-puzzle-red text-sm shadow-[2px_2px_0px_var(--color-puzzle-red)]">
                                    +30% Base XP
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: BADGES & ACHIEVEMENTS */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-sync-teal border-2 border-ink rounded-xl flex items-center justify-center shadow-[4px_4px_0px_var(--color-ink)]">
                            <Medal size={24} className="text-ink" />
                        </div>
                        <h2 className="text-3xl font-display font-extrabold">2. Badge Logic</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <BadgeCard icon={Trophy} title="MVP" color="bg-quest-gold" desc="Highest task completion count & XP gained in your group at the end of the month." />
                        <BadgeCard icon={Zap} title="Speedster" color="bg-white" desc="Over 20% of your assigned tasks are first-finishes (Min 5 tasks)." />
                        <BadgeCard icon={Target} title="Fast-Worker" color="bg-white" desc="Over 30% of assigned tasks completed using less than half the allotted time." />
                        <BadgeCard icon={Clock} title="Time-Traveler" color="bg-cloud" desc="Pre-emptively completed at least 5 tasks before their start time." />
                        <BadgeCard icon={Flame} title="Unstoppable" color="bg-puzzle-red" iconColor="text-white" desc="Maintain a Fire Streak for 7 or more consecutive days." />
                        <BadgeCard icon={Swords} title="Nudge-Ninja" color="bg-sync-teal" desc="The single user with the highest total nudges sent in the group (Min 5)." />
                        <BadgeCard icon={Bell} title="Most-Wanted" color="bg-white" desc="The single user with the highest total nudges received in the group." />
                        <BadgeCard icon={Ghost} title="The NPC" color="bg-ink" textColor="text-white" iconColor="text-white" desc="Badge of Shame: Failed to complete 75% or more of assigned tasks." dashed />
                    </div>
                </section>

                {/* SECTION 3: LEVELING & LEADERBOARD */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-cloud border-2 border-ink rounded-xl flex items-center justify-center shadow-[4px_4px_0px_var(--color-ink)]">
                            <ShieldAlert size={24} className="text-ink" />
                        </div>
                        <h2 className="text-3xl font-display font-extrabold">3. Progression & Ranking</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Level Curve */}
                        <div className="bg-white border-2 border-ink rounded-3xl p-6 shadow-[8px_8px_0px_var(--color-ink)] h-full">
                            <h3 className="text-xl font-display font-bold mb-4 border-b-2 border-ink pb-2">Leveling Up</h3>
                            <p className="font-body text-sm font-medium mb-4 text-ink/80">Progression follows an exponential curve. It's easy to start, hard to master.</p>
                            <ul className="space-y-2 font-body font-bold text-sm">
                                <li className="flex justify-between p-2 hover:bg-parchment rounded-lg transition-colors"><span>Level 1</span> <span>0 XP</span></li>
                                <li className="flex justify-between p-2 hover:bg-parchment rounded-lg transition-colors"><span>Level 2</span> <span>~85 XP</span></li>
                                <li className="flex justify-between p-2 hover:bg-parchment rounded-lg transition-colors"><span>Level 3</span> <span>~155 XP</span></li>
                                <li className="flex justify-between p-2 hover:bg-parchment rounded-lg transition-colors"><span>Level 4</span> <span>~240 XP</span></li>
                                <li className="flex justify-between p-2 bg-quest-gold/10 text-quest-gold rounded-lg border border-quest-gold/20"><span>Level 5</span> <span>~335 XP</span></li>
                            </ul>
                        </div>

                        {/* Leaderboard Logic */}
                        <div className="bg-white border-2 border-ink rounded-3xl p-6 shadow-[8px_8px_0px_var(--color-ink)] h-full">
                            <h3 className="text-xl font-display font-bold mb-4 border-b-2 border-ink pb-2">Leaderboard Tie-Breakers</h3>
                            <p className="font-body text-sm font-medium mb-4 text-ink/80">When two players have the exact same XP, the algorithm breaks the tie in this order:</p>
                            <ol className="list-decimal list-inside space-y-3 font-body font-bold text-sm">
                                <li className="p-2 rounded-lg hover:bg-parchment transition-colors"><span className="text-puzzle-red">Volume:</span> Higher task completion count wins.</li>
                                <li className="p-2 rounded-lg hover:bg-parchment transition-colors"><span className="text-sync-teal">Speed:</span> Higher "first-finishes" count wins.</li>
                                <li className="p-2 rounded-lg hover:bg-parchment transition-colors"><span className="text-quest-gold">Consistency:</span> Higher active Fire Streak wins.</li>
                            </ol>
                            <div className="mt-6 p-4 bg-parchment border-2 border-ink rounded-xl text-xs font-bold font-body leading-relaxed flex items-start gap-2">
                                <span className="text-lg leading-none">💡</span>
                                <p>Ranks and metrics reset on the 1st of every month to keep the leaderboard competitive.</p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}

// Reusable UI Component for Badges
function BadgeCard({ icon: Icon, title, color, desc, dashed = false, textColor = "text-ink", iconColor = "text-ink" }: any) {
    return (
        <div className={`p-5 rounded-2xl border-2 ${dashed ? 'border-dashed border-ink/40' : 'border-ink shadow-[4px_4px_0px_var(--color-ink)]'} ${color} flex gap-4 items-start h-full hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--color-ink)] transition-all`}>
            <div className={`shrink-0 p-2.5 rounded-xl border-2 border-ink bg-white/30 backdrop-blur-sm ${iconColor}`}>
                <Icon size={24} />
            </div>
            <div>
                <h4 className={`font-display font-bold text-lg mb-1.5 ${textColor}`}>{title}</h4>
                <p className={`font-body text-sm font-medium ${textColor} opacity-90 leading-snug`}>{desc}</p>
            </div>
        </div>
    );
}