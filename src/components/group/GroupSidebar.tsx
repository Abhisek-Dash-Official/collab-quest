"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGroupStore } from "@/store/useGroupStore";
import { Compass, Users, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export default function GroupSidebar({ isOpen, toggleSidebar }: SidebarProps) {
    const pathname = usePathname();
    const { userGroups, setUserGroups } = useGroupStore();

    useEffect(() => {
        const fetchUserGroups = async () => {
            try {
                const resMe = await fetch("/api/users/me");
                if (!resMe.ok) return;
                const dataMe = await resMe.json();

                if (dataMe.success && dataMe.data.uid) {
                    const resGroups = await fetch(`/api/users/profile/${dataMe.data.uid}/groups`);
                    const dataGroups = await resGroups.json();
                    if (dataGroups.success) setUserGroups(dataGroups.data);
                }
            } catch (err) {
                console.error("Failed to fetch sidebar groups", err);
            }
        };
        fetchUserGroups();
    }, [setUserGroups]);

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside
                className={`absolute md:relative h-full bg-parchment border-r-4 border-ink flex flex-col transition-all duration-300 ease-out z-50 overflow-hidden shrink-0
                ${isOpen ? "w-64 translate-x-0" : "w-20 -translate-x-full md:translate-x-0 absolute md:relative"}
                `}
            >
                {/* Sidebar Header & Toggle */}
                <div className="h-16 border-b-4 border-ink flex items-center justify-between px-4 shrink-0 bg-sync-teal text-white">
                    <div className={`flex items-center gap-3 overflow-hidden ${!isOpen && 'md:hidden'}`}>
                        <Users className="w-6 h-6 shrink-0" strokeWidth={2.5} />
                        <span className="font-display font-black tracking-wide whitespace-nowrap uppercase">My Groups</span>
                    </div>

                    <button
                        onClick={toggleSidebar}
                        className={`p-1.5 hover:bg-ink/20 rounded border-2 border-transparent hover:border-white transition-colors ${!isOpen ? 'hidden md:flex' : 'flex'}`}
                        aria-label="Toggle Sidebar"
                    >
                        {isOpen ? (
                            <>
                                <X className="w-6 h-6 md:hidden" strokeWidth={3} />
                                <ChevronLeft className="w-5 h-5 hidden md:block" strokeWidth={3} />
                            </>
                        ) : (
                            < ChevronRight className="w-6 h-6 ml-1 hidden md:block" strokeWidth={3} />
                        )}
                    </button>
                </div>

                {/* Group List Area */}
                <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
                    {userGroups.map((group) => {
                        const isActive = pathname === `/groups/${group._id}`;
                        return (
                            <Link
                                key={group._id}
                                href={`/groups/${group._id}`}
                                onClick={() => { if (window.innerWidth < 768) toggleSidebar(); }}
                                className={`flex items-center gap-3 p-2 rounded-none border-2 transition-all ${isActive
                                    ? "bg-quest-gold border-ink shadow-[3px_3px_0px_var(--color-ink)]"
                                    : "border-transparent hover:border-ink/20 hover:bg-ink/5"
                                    }`}
                                title={group.group_name}
                            >

                                <div className="w-10 h-10 shrink-0 bg-cloud border-2 border-ink flex items-center justify-center relative overflow-hidden">
                                    {group.group_icon_id && group.group_icon_id !== "" ? (
                                        <Image
                                            src={`/group_icons/group_icon_${group.group_icon_id}.png`}
                                            alt="Icon"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <span className="font-display font-black text-ink text-lg uppercase">
                                            {group.group_name.charAt(0)}
                                        </span>
                                    )}
                                </div>

                                {isOpen && (
                                    <span className={`font-body font-bold text-sm truncate whitespace-nowrap ${isActive ? "text-ink" : "text-ink/70"}`}>
                                        {group.group_name}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Footer Link back to Hub */}
                <div className="p-3 border-t-4 border-ink bg-white">
                    <Link
                        href="/groups"
                        onClick={() => { if (window.innerWidth < 768) toggleSidebar(); }}
                        className={`flex items-center gap-3 p-2 rounded-none border-2 transition-all ${pathname === "/groups"
                            ? "border-sync-teal text-sync-teal bg-sync-teal/10"
                            : "border-ink bg-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[3px_3px_0px_var(--color-ink)]"
                            }`}
                        title="Group Hub"
                    >
                        <Compass className="w-7 h-7 shrink-0" strokeWidth={2.5} />
                        {isOpen && <span className="font-display font-bold text-sm uppercase whitespace-nowrap tracking-tight">Group Hub</span>}
                    </Link>
                </div>
            </aside>
        </>
    );
}