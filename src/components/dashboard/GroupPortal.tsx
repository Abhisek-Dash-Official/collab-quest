import Link from "next/link";
import { Clock, AlertCircle, Users } from "lucide-react";
import HudBrackets from "./HudBrackets";

interface GroupPortalProps {
    isGroupLoading: boolean;
    groupError: boolean;
    groupTasks: any[];
}

export default function GroupPortal({ isGroupLoading, groupError, groupTasks }: GroupPortalProps) {
    const groupTasksPreview = groupTasks.slice(0, 3);

    return (
        <Link
            href="/groups"
            className="relative group flex flex-col bg-white border-2 border-ink shadow-[6px_6px_0px_var(--color-ink)] hover:translate-y-0.5 hover:shadow-[4px_4px_0px_var(--color-ink)] transition-all p-6 sm:p-8 min-h-100 overflow-hidden"
        >
            <HudBrackets colorClass="border-puzzle-red opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="absolute -bottom-12 -right-12 text-puzzle-red opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none transform group-hover:scale-110 duration-500">
                <Users size={280} strokeWidth={4} />
            </div>

            <div className="mb-8 relative z-10">
                <span className="font-mono font-bold text-xs uppercase text-puzzle-red bg-puzzle-red/10 px-2 py-1 rounded border-2 border-puzzle-red/20 mb-3 inline-block">
                    GUILD
                </span>
                <h2 className="text-3xl font-display font-extrabold mb-1">Group Workspace</h2>
                <p className="font-mono font-bold text-sm text-ink/60">
                    {isGroupLoading ? "Connecting to network..." : groupError ? "Status unavailable" : groupTasks.length === 0 ? "No group quests today" : `${groupTasks.length} quest(s) today`}
                </p>
            </div>

            <div className="flex-1 flex flex-col gap-3 mb-8 relative z-10">
                {isGroupLoading ? (
                    Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-16 bg-cloud/40 animate-pulse rounded-xl" />)
                ) : groupError ? (
                    <div className="p-4 bg-puzzle-red/10 border-2 border-puzzle-red rounded-xl flex items-center gap-2">
                        <AlertCircle size={16} className="text-puzzle-red" />
                        <span className="font-mono font-bold text-xs text-puzzle-red">Couldn't load group quests</span>
                    </div>
                ) : groupTasksPreview.length > 0 ? (
                    groupTasksPreview.map((task, idx) => {
                        const groupName = task.group_id?.group_name || "Unknown Group";
                        const typeLabel = task.task_type === 'ALL' ? "Everyone" : task.task_type === 'ASSIGNED' ? "Assigned" : "Any";

                        return (
                            <div key={task._id || idx} className="p-3.5 bg-parchment/80 border-2 border-ink/20 rounded-xl group-hover:border-ink/50 group-hover:bg-parchment transition-colors">
                                <div className="flex justify-between items-start gap-2 mb-1.5">
                                    <p className="font-body font-bold text-sm truncate">{task.title}</p>
                                    <span className="shrink-0 font-mono text-[9px] font-bold uppercase bg-white px-1.5 py-0.5 rounded border-2 border-ink/20 text-puzzle-red">
                                        {typeLabel}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-ink/60 uppercase">
                                    <span className="truncate max-w-35">{groupName}</span>
                                    {task.deadline && (
                                        <div className="flex items-center gap-1">
                                            <span>•</span>
                                            <Clock size={10} />
                                            {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(task.deadline))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="flex-1 flex items-center justify-center border-2 border-dashed border-ink/20 rounded-xl bg-cloud/10">
                        <p className="font-body font-bold text-sm text-ink/40">No active group quests.</p>
                    </div>
                )}
            </div>

            <div className="mt-auto relative z-10">
                <span className="font-body font-bold text-puzzle-red group-hover:underline underline-offset-4 flex items-center gap-2">
                    Enter Group Workspace <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
            </div>
        </Link>
    );
}