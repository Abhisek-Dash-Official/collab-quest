"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { usePersonalStore } from "@/store/usePersonalStore";
import StatusStrip from "./StatusStrip";
import PersonalPortal from "./PersonalPortal";
import GroupPortal from "./GroupPortal";
import NudgeRadar from "./NudgeRadar";

export default function DashboardHud() {
    const { user, getLevel, getAvatarUrl } = useUserStore();
    const { getTodaysTasks } = usePersonalStore();

    const [isHydrated, setIsHydrated] = useState(false);
    const [groupTasks, setGroupTasks] = useState<any[]>([]);
    const [isGroupLoading, setIsGroupLoading] = useState(true);
    const [groupError, setGroupError] = useState(false);

    const todayString = new Intl.DateTimeFormat('en-US', {
        weekday: 'long', month: 'long', day: 'numeric'
    }).format(new Date());

    useEffect(() => {
        setIsHydrated(true);
        const fetchGroupTasks = async () => {
            try {
                const res = await fetch("/api/tasks/today", { credentials: "include" });
                if (!res.ok) throw new Error("Failed to fetch");
                const json = await res.json();
                setGroupTasks(json.data || []);
            } catch (err) {
                setGroupError(true);
            } finally {
                setIsGroupLoading(false);
            }
        };
        fetchGroupTasks();
    }, []);

    const xp = user?.xp || 0;
    const currentLevel = getLevel();
    const avatarUrl = getAvatarUrl() || "/avatars/avatar-0.png";

    const xpAtCurrentLevel = currentLevel === 0 ? 0 : Math.floor(30 * Math.pow(currentLevel, 1.5));
    const xpAtNextLevel = Math.floor(30 * Math.pow(currentLevel + 1, 1.5));
    const remainingXp = xpAtNextLevel - xp;

    const progressFraction = Math.max(0, Math.min(1, (xp - xpAtCurrentLevel) / (xpAtNextLevel - xpAtCurrentLevel)));
    const progressPercent = `${(progressFraction * 100).toFixed(1)}%`;

    return (
        <>
            {/* Status Strip (Top) */}
            <StatusStrip
                username={user?.username}
                avatarUrl={avatarUrl}
                xp={xp}
                currentLevel={currentLevel}
                xpAtNextLevel={xpAtNextLevel}
                remainingXp={remainingXp}
                progressPercent={progressPercent}
                todayString={todayString}
            />

            {/* Portals (Middle - Wide 2 Columns) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
                <PersonalPortal
                    isHydrated={isHydrated}
                    personalTasks={isHydrated ? getTodaysTasks() : []}
                />
                <GroupPortal
                    isGroupLoading={isGroupLoading}
                    groupError={groupError}
                    groupTasks={groupTasks}
                />
            </section>

            {/* Nudge Radar (Bottom - Full Width) */}
            <section className="w-full">
                <NudgeRadar />
            </section>
        </>
    );
}