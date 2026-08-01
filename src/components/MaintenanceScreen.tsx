import { Pickaxe } from "lucide-react";

interface Props {
    message?: string;
}

export default function MaintenanceScreen({ message }: Props) {
    return (
        <main className="min-h-screen bg-parchment text-ink flex items-center justify-center p-6 selection:bg-quest-gold selection:text-ink">
            <div className="max-w-2xl w-full bg-cloud border-2 border-ink rounded-3xl shadow-[12px_12px_0px_var(--color-ink)] p-8 md:p-14 text-center relative overflow-hidden transition-all duration-300">

                {/* TOP BADGE */}
                <span className="inline-block px-4 py-1.5 mb-8 bg-quest-gold border-2 border-ink rounded-full text-sm font-bold font-body tracking-wider uppercase shadow-[3px_3px_0px_var(--color-ink)]">
                    System Upgrade
                </span>

                {/* GAMIFIED ICON */}
                <div className="flex justify-center mb-8">
                    <div className="relative p-6 bg-puzzle-red border-2 border-ink rounded-2xl shadow-[6px_6px_0px_var(--color-ink)] animate-bounce hover:rotate-12 transition-transform duration-300">
                        <Pickaxe size={48} className="text-white" strokeWidth={2.5} />
                    </div>
                </div>

                {/* HEADING */}
                <h1 className="text-4xl md:text-6xl font-display font-extrabold leading-[1.1] mb-6">
                    The Realm is Forging New Updates
                </h1>

                {/* MESSAGE */}
                <p className="text-lg md:text-2xl font-body leading-relaxed max-w-lg mx-auto font-medium mb-10">
                    {message || "We're currently squashing bugs and crafting new features. The quest will resume shortly!"}
                </p>

                {/* STATUS INDICATOR */}
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-ink rounded-xl shadow-[4px_4px_0px_var(--color-ink)] font-body font-bold text-ink">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sync-teal opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-sync-teal"></span>
                    </span>
                    Devs are working...
                </div>

            </div>
        </main>
    );
}