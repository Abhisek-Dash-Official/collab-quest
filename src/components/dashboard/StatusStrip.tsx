import HudBrackets from "./HudBrackets";

interface StatusStripProps {
    username?: string;
    avatarUrl: string;
    xp: number;
    currentLevel: number;
    xpAtNextLevel: number;
    remainingXp: number;
    progressPercent: string;
    todayString: string;
}

export default function StatusStrip({
    username = "Player One",
    avatarUrl,
    xp,
    currentLevel,
    xpAtNextLevel,
    remainingXp,
    progressPercent,
    todayString
}: StatusStripProps) {

    return (
        <section className="relative w-full bg-white border-2 border-ink shadow-[4px_4px_0px_var(--color-ink)] p-4 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-12 z-10">
            <HudBrackets colorClass="border-quest-gold" />

            {/* Player Profile Section */}
            <div className="flex items-center gap-4 shrink-0">
                <div className="w-16 h-16 bg-cloud border-2 border-ink rounded-xl overflow-hidden shadow-[2px_2px_0px_var(--color-ink)] shrink-0">
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <h2 className="font-display font-extrabold text-2xl text-ink leading-none mb-1.5 truncate max-w-50">
                        {username}
                    </h2>
                    <div className="flex items-center">
                        <span className="font-mono text-xs font-bold uppercase text-ink bg-quest-gold px-2 py-0.5 border-2 border-ink rounded shadow-[2px_2px_0px_var(--color-ink)]">
                            Level {currentLevel}
                        </span>
                    </div>
                </div>
            </div>

            {/* XP Bar Section */}
            <div className="flex-1 w-full flex flex-col gap-1.5 max-w-2xl">
                <div className="flex justify-between items-end">
                    <span className="font-display font-bold uppercase tracking-wider text-sm">XP Progress</span>
                    <span className="font-mono font-bold text-sm text-ink">{xp} / {xpAtNextLevel} XP</span>
                </div>

                <div className="h-4 w-full bg-parchment border-2 border-ink rounded-full overflow-hidden relative">
                    <div
                        className="h-full bg-quest-gold-deep border-r-2 border-ink transition-all duration-1000 ease-out"
                        style={{ width: progressPercent }}
                    />
                </div>

                <p className="font-mono text-[11px] font-bold text-ink/70 uppercase">
                    {remainingXp} XP to reach Level {currentLevel + 1}
                </p>
            </div>

            {/* Date Readout */}
            <div className="lg:text-right shrink-0 hidden md:block">
                <p className="font-mono font-bold text-xs uppercase text-ink bg-cloud/50 px-3 py-2 border-2 border-ink rounded-lg shadow-[2px_2px_0px_var(--color-ink)]">
                    {todayString}
                </p>
            </div>
        </section>
    );
}