"use client";

import { useState } from "react";
import Link from "next/link";
import { useGroupStore } from "@/store/useGroupStore";
import { Compass, Users, ArrowRight, ShieldAlert, Zap } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GroupsHubPage() {
    const { userGroups } = useGroupStore();
    const router = useRouter();

    const [joinCode, setJoinCode] = useState("");
    const [createName, setCreateName] = useState("");
    const [createPurpose, setCreatePurpose] = useState("");
    const [createIconId, setCreateIconId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Generate Array for icons 0 to 20
    const iconOptions = Array.from({ length: 21 }, (_, i) => i.toString());

    const handleJoinGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!joinCode.trim()) return toast.error("Enter a valid invite code!");

        setIsLoading(true);
        try {
            const res = await fetch("/api/groups/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ invite_code: joinCode.trim() }),
            });
            const data = await res.json();

            if (data.success) {
                toast.success("Join request sent to the Guild Leader!");
                setJoinCode("");
            } else {
                toast.error(data.error || "Failed to join group");
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Create Group
    const handleCreateGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!createName.trim()) return toast.error("Guild Name is required!");

        setIsLoading(true);
        try {
            const res = await fetch("/api/groups/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    group_name: createName.trim(),
                    purpose: createPurpose.trim(),
                    group_icon_id: createIconId,
                    is_private: false,
                }),
            });
            const data = await res.json();

            if (data.success) {
                toast.success("Guild created successfully!");
                router.push(`/groups/${data.data._id}`);
            } else {
                toast.error(data.error || "Failed to create group");
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto flex flex-col xl:flex-row gap-8 pb-24 md:pb-8">

            {/* LEFT COLUMN: Active Guilds */}
            <div className="flex-1 space-y-6 min-w-0">
                <div className="border-b-4 border-ink pb-4">
                    <h1 className="font-display text-4xl md:text-5xl font-black uppercase text-ink flex items-center gap-3">
                        <Compass className="w-10 h-10 md:w-12 md:h-12 text-sync-teal shrink-0" strokeWidth={3} />
                        <span>Guild Hub</span>
                    </h1>
                    <p className="font-body text-ink/70 font-bold text-lg mt-2">
                        Enter an active workspace or forge a new alliance.
                    </p>
                </div>

                {userGroups.length === 0 ? (
                    // Empty State
                    <div className="bg-cloud border-4 border-ink border-dashed p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_var(--color-ink)]">
                        <ShieldAlert className="w-16 h-16 text-ink/40 mb-4" strokeWidth={2} />
                        <h3 className="font-display text-2xl font-black uppercase text-ink">No Guilds Yet</h3>
                        <p className="font-body font-bold text-ink/70 mt-2 max-w-sm">
                            You are currently flying solo. Join a guild using a code or create your own to start collaborating!
                        </p>
                    </div>
                ) : (
                    // Active Guilds Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-2">
                        {userGroups.map((group) => (
                            <Link
                                key={group._id}
                                href={`/groups/${group._id}`}
                                className="group bg-white border-4 border-ink p-4 flex flex-col gap-4 hover:-translate-y-1.5 hover:-translate-x-1.5 hover:shadow-[6px_6px_0px_var(--color-ink)] transition-all overflow-hidden"
                            >
                                <div className="flex items-center gap-4 min-w-0">

                                    {/* Group Icon Render */}
                                    <div className="w-14 h-14 bg-cloud border-2 border-ink flex items-center justify-center shrink-0 relative overflow-hidden">
                                        {group.group_icon_id && group.group_icon_id !== "" ? (
                                            <Image
                                                src={`/group_icons/group_icon_${group.group_icon_id}.png`}
                                                alt="Guild Icon"
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span className="font-display font-black text-ink text-2xl uppercase">
                                                {group.group_name.charAt(0)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-display text-xl font-black uppercase text-ink truncate group-hover:text-sync-teal transition-colors">
                                            {group.group_name}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="bg-quest-gold border-2 border-ink text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 shrink-0">
                                                Active
                                            </span>
                                            {group.is_private && (
                                                <span className="bg-ink text-white text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 shrink-0">
                                                    Private
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t-2 border-ink border-dashed flex items-center justify-between text-ink/70 group-hover:text-ink font-bold text-sm">
                                    <span className="truncate">Enter Workspace</span>
                                    <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN: Join & Create Panels */}
            <div className="w-full xl:w-96 flex flex-col gap-6 shrink-0">

                {/* JOIN PANEL */}
                <div className="bg-white border-4 border-ink p-5 shadow-[4px_4px_0px_var(--color-ink)]">
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="w-6 h-6 text-sync-teal" strokeWidth={3} />
                        <h2 className="font-display text-2xl font-black uppercase text-ink">Join Guild</h2>
                    </div>
                    <form onSubmit={handleJoinGroup} className="flex flex-col gap-3">
                        <div>
                            <label className="font-mono text-xs font-bold uppercase text-ink/70 mb-1 block">Invite Code</label>
                            <input
                                type="text"
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value)}
                                placeholder="e.g. ML-HACKERS-XYZ"
                                className="w-full bg-parchment border-2 border-ink p-2.5 font-bold outline-none focus:bg-white focus:shadow-[2px_2px_0px_var(--color-ink)] transition-all uppercase"
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2 bg-sync-teal border-2 border-ink py-2.5 font-display font-black text-white uppercase tracking-wider hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_var(--color-ink)] active:translate-y-0 active:translate-x-0 active:shadow-none transition-all disabled:opacity-70 disabled:pointer-events-none"
                        >
                            {isLoading ? "Sending Request..." : "Request to Join"}
                        </button>
                    </form>
                </div>

                {/* CREATE PANEL */}
                <div className="bg-cloud border-4 border-ink p-5 shadow-[4px_4px_0px_var(--color-ink)]">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-6 h-6 text-quest-gold fill-quest-gold" strokeWidth={2} />
                        <h2 className="font-display text-2xl font-black uppercase text-ink">Forge New</h2>
                    </div>
                    <form onSubmit={handleCreateGroup} className="flex flex-col gap-3">

                        {/* ICON PICKER (Horizontal Scroll) */}
                        <div>
                            <label className="font-mono text-xs font-bold uppercase text-ink/70 mb-1 block">Guild Icon</label>
                            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar border-2 border-ink bg-white p-2">

                                {/* 1. Dynamic Letter Icon (Default "") */}
                                <button
                                    type="button"
                                    onClick={() => setCreateIconId("")}
                                    className={`w-12 h-12 shrink-0 border-2 transition-all relative overflow-hidden ${createIconId === ""
                                            ? "border-ink shadow-[2px_2px_0px_var(--color-ink)] -translate-y-0.5 bg-sync-teal/20"
                                            : "border-transparent hover:border-ink/50"
                                        }`}
                                >
                                    <div className="w-full h-full flex items-center justify-center font-display font-black text-ink text-xl uppercase bg-parchment">
                                        {createName ? createName.charAt(0) : "A"}
                                    </div>
                                </button>

                                {/* 2. Actual Images Map (0 to 20) */}
                                {iconOptions.map((id) => (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => setCreateIconId(id)}
                                        className={`w-12 h-12 shrink-0 border-2 transition-all relative overflow-hidden ${createIconId === id
                                                ? "border-ink shadow-[2px_2px_0px_var(--color-ink)] -translate-y-0.5 bg-sync-teal/20"
                                                : "border-transparent hover:border-ink/50"
                                            }`}
                                    >
                                        <Image
                                            src={`/group_icons/group_icon_${id}.png`}
                                            alt={`Icon ${id}`}
                                            fill
                                            className="object-cover p-1"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="font-mono text-xs font-bold uppercase text-ink/70 mb-1 block">Guild Name</label>
                            <input
                                type="text"
                                value={createName}
                                onChange={(e) => setCreateName(e.target.value)}
                                placeholder="e.g. Beta Testers"
                                className="w-full bg-white border-2 border-ink p-2.5 font-bold outline-none focus:shadow-[2px_2px_0px_var(--color-ink)] transition-all"
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label className="font-mono text-xs font-bold uppercase text-ink/70 mb-1 block">Purpose (Optional)</label>
                            <textarea
                                value={createPurpose}
                                onChange={(e) => setCreatePurpose(e.target.value)}
                                placeholder="What is this guild's mission?"
                                rows={2}
                                className="w-full bg-white border-2 border-ink p-2.5 font-bold outline-none focus:shadow-[2px_2px_0px_var(--color-ink)] transition-all resize-none"
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2 bg-ink border-2 border-ink py-2.5 font-display font-black text-quest-gold uppercase tracking-wider hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_var(--color-quest-gold)] active:translate-y-0 active:translate-x-0 active:shadow-none transition-all disabled:opacity-70 disabled:pointer-events-none"
                        >
                            {isLoading ? "Forging..." : "Create Guild"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}