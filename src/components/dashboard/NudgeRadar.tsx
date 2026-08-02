import { useEffect } from "react";
import { useNotificationStore } from "@/store/useNotificationStore";
import { Activity, BellRing, Radio } from "lucide-react";

export default function NudgeRadar() {
    const { notifications, isLoading, error, fetchNotifications } = useNotificationStore();

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    return (
        <div className="w-full bg-white border-2 border-ink shadow-[6px_6px_0px_var(--color-ink)] p-5 sm:p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">

            {/* Header Section */}
            <div className="flex items-center gap-3 shrink-0">
                <div className="w-12 h-12 bg-quest-gold border-2 border-ink rounded-xl flex items-center justify-center shadow-[2px_2px_0px_var(--color-ink)]">
                    <Radio size={24} className="text-ink animate-pulse" />
                </div>
                <div>
                    <h3 className="text-xl font-display font-extrabold uppercase tracking-wider text-ink">
                        Activity Radar
                    </h3>
                    <p className="font-mono text-xs font-bold text-ink/60">Live network nudges</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 w-full bg-parchment border-2 border-ink border-dashed p-4 rounded-xl flex flex-col sm:flex-row items-center gap-4 overflow-x-auto custom-scrollbar">
                {isLoading ? (
                    <div className="text-ink/50 text-sm animate-pulse flex items-center gap-2 font-mono font-bold mx-auto">
                        <Activity size={16} /> Scanning network...
                    </div>
                ) : error ? (
                    <div className="text-puzzle-red text-sm font-mono font-bold mx-auto">⚠️ Signal lost.</div>
                ) : notifications.length > 0 ? (
                    notifications.map((nudge) => (
                        <div
                            key={nudge.id}
                            className={`shrink-0 flex items-center gap-3 p-2.5 pr-4 rounded-lg border-2 transition-colors ${nudge.is_read
                                ? "bg-white border-ink/20 opacity-70"
                                : "bg-quest-gold/20 border-quest-gold shadow-[2px_2px_0px_var(--color-quest-gold)]"
                                }`}
                        >
                            <BellRing size={16} className={nudge.is_read ? "text-ink/50" : "text-ink"} />
                            <div className="font-mono text-xs text-ink">
                                <p>
                                    Nudged on <span className="font-bold">'{nudge.task_title}'</span>
                                </p>
                                <p className="text-[10px] opacity-70 uppercase">{nudge.group_name}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-ink/50 text-sm flex items-center gap-2 mx-auto font-mono font-bold">
                        <Radio size={16} />
                        <p>Radar clear. No incoming nudges.</p>
                    </div>
                )}
            </div>
        </div>
    );
}