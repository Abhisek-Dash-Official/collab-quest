import Link from "next/link";
import { Clock, Target, User } from "lucide-react";
import HudBrackets from "./HudBrackets";

interface PersonalPortalProps {
    isHydrated: boolean;
    personalTasks: any[];
}

export default function PersonalPortal({ isHydrated, personalTasks }: PersonalPortalProps) {
    const personalTasksPreview = personalTasks.slice(0, 3);

    return (
        <Link
            href="/personal"
            className="relative group flex flex-col bg-white border-2 border-ink shadow-[6px_6px_0px_var(--color-ink)] hover:translate-y-0.5 hover:shadow-[4px_4px_0px_var(--color-ink)] transition-all p-6 sm:p-8 min-h-100 overflow-hidden"
        >
            <HudBrackets colorClass="border-sync-teal opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="absolute -bottom-12 -right-12 text-sync-teal opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none transform group-hover:scale-110 duration-500">
                <User size={280} strokeWidth={4} />
            </div>

            <div className="mb-8 relative z-10">
                <span className="font-mono font-bold text-xs uppercase text-sync-teal bg-sync-teal/10 px-2 py-1 rounded border-2 border-sync-teal/20 mb-3 inline-block">
                    SOLO
                </span>
                <h2 className="text-3xl font-display font-extrabold mb-1">Personal Workspace</h2>
                <p className="font-mono font-bold text-sm text-ink/60">
                    {!isHydrated ? "Loading quests..." : personalTasks.length === 0 ? "All clear — nothing due today" : `${personalTasks.length} quest(s) today`}
                </p>
            </div>

            <div className="flex-1 flex flex-col gap-3 mb-8 relative z-10">
                {!isHydrated ? (
                    Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-16 bg-cloud/40 animate-pulse rounded-xl" />)
                ) : personalTasksPreview.length > 0 ? (
                    personalTasksPreview.map(task => {
                        const isOverdue = task.end_time ? new Date(task.end_time) < new Date() : false;
                        return (
                            <div key={task.id} className="flex items-start gap-3 p-3.5 bg-parchment/80 border-2 border-ink/20 rounded-xl group-hover:border-ink/50 group-hover:bg-parchment transition-colors">
                                <div className="shrink-0 mt-0.5 text-sync-teal">
                                    <Target size={18} strokeWidth={3} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-body font-bold text-sm truncate">{task.title}</p>
                                    {task.end_time && (
                                        <div className={`flex items-center gap-1 mt-1 font-mono text-[10px] font-bold uppercase ${isOverdue ? 'text-puzzle-red' : 'text-ink/50'}`}>
                                            <Clock size={10} />
                                            {isOverdue ? "Overdue" : new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(task.end_time))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="flex-1 flex items-center justify-center border-2 border-dashed border-ink/20 rounded-xl bg-cloud/10">
                        <p className="font-body font-bold text-sm text-ink/40">No active personal quests.</p>
                    </div>
                )}
            </div>

            <div className="mt-auto relative z-10">
                <span className="font-body font-bold text-sync-teal group-hover:underline underline-offset-4 flex items-center gap-2">
                    Enter Personal Workspace <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
            </div>
        </Link>
    );
}