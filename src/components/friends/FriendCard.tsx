"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateLevel } from "@/lib/gamification";
import { useUserStore } from "@/store/useUserStore";
import { ThumbsUp } from "lucide-react";

interface Friend {
    uid: string;
    username: string;
    avatar_id: string;
    xp: number;
    last_active_at: string;
    respect_likes: number;
}

interface FriendCardProps {
    friend: Friend;
    actionButton?: React.ReactNode;
}

function getRelativeTime(dateString: string): string {
    if (!dateString) return "a while ago";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
}

export default function FriendCard({ friend, actionButton }: FriendCardProps) {
    const { user } = useUserStore();
    const friendLevel = calculateLevel(friend.xp);
    const myLevel = user?.xp ? calculateLevel(user.xp) : 0;
    const levelDiff = friendLevel - myLevel;

    const [localRespect, setLocalRespect] = useState(friend.respect_likes || 0);
    const [isLiking, setIsLiking] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);

    const handleGiveRespect = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLiking || hasLiked || friend.uid === user?.uid) return;

        setIsLiking(true);
        setLocalRespect(prev => prev + 1);
        setHasLiked(true);

        try {
            const res = await fetch("/api/users/respect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ targetUid: friend.uid })
            });

            if (!res.ok) {
                setLocalRespect(prev => prev - 1);
                setHasLiked(false);
            }
        } catch (err) {
            setLocalRespect(prev => prev - 1);
            setHasLiked(false);
        } finally {
            setIsLiking(false);
        }
    };

    const getPresence = () => {
        if (!friend.last_active_at) return { status: 'offline', text: 'Last seen a while ago', color: 'bg-ink/30', ring: '' };

        const diffMins = (Date.now() - new Date(friend.last_active_at).getTime()) / 60000;
        if (diffMins < 5) return { status: 'online', text: 'Online now', color: 'bg-[#4ADE80]', ring: 'shadow-[0_0_8px_#4ADE80]' };
        if (diffMins < 60) return { status: 'away', text: 'Active recently', color: 'bg-quest-gold', ring: '' };

        return { status: 'offline', text: `Last seen ${getRelativeTime(friend.last_active_at)}`, color: 'bg-ink/30', ring: '' };
    };

    const presence = getPresence();
    const isOnline = presence.status === 'online';

    let tierClasses = "border-2 border-ink";
    if (friendLevel >= 25) {
        tierClasses = "border-4 border-quest-gold shadow-[0_0_12px_var(--color-quest-gold)]";
    } else if (friendLevel >= 10) {
        tierClasses = "border-4 border-cloud bg-cloud/10 ring-1 ring-inset ring-white";
    }

    let comparisonText = "Same level as you";
    if (levelDiff > 0) comparisonText = `${levelDiff} level${levelDiff > 1 ? 's' : ''} ahead of you`;
    if (levelDiff < 0) comparisonText = `${Math.abs(levelDiff)} level${Math.abs(levelDiff) > 1 ? 's' : ''} behind you`;

    return (
        <div className="relative group bg-white border-2 border-ink rounded-xl shadow-[4px_4px_0px_var(--color-ink)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--color-ink)] transition-all">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-ink rounded-tl-xl m-1 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-ink rounded-br-xl m-1 pointer-events-none" />

            <Link href={`/profile/${friend.uid}`} className="block p-5">
                <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                        <div className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-parchment ${tierClasses} ${!isOnline && 'opacity-80'}`}>
                            <span className="font-display font-bold text-2xl text-ink/40 select-none">
                                {friend.username.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${presence.color} ${presence.ring}`} title={presence.text} />
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="font-body font-bold text-lg text-ink truncate group-hover:text-sync-teal transition-colors">
                                {friend.username}
                            </h3>

                            <button
                                onClick={handleGiveRespect}
                                disabled={isLiking || hasLiked || friend.uid === user?.uid}
                                className={`shrink-0 flex items-center gap-1.5 border rounded-full px-2 py-0.5 transition-all ${hasLiked ? 'bg-sync-teal/10 border-sync-teal/30 text-sync-teal' : 'bg-parchment border-ink/20 hover:bg-cloud/30 hover:border-ink/40 text-ink'}`}
                                title="Give Respect"
                            >
                                <ThumbsUp size={12} className={hasLiked ? "fill-sync-teal" : ""} />
                                <span className="font-mono font-bold text-xs">{localRespect}</span>
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="font-mono font-bold text-xs bg-ink text-white px-2 py-0.5 rounded">
                                Lvl {friendLevel}
                            </span>
                            <span className="font-body text-xs text-ink/50 flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-ink/20 rounded-full" />
                                {presence.text}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="pt-3 mt-4 border-t border-ink/10 flex justify-between items-center">
                    <p className="font-mono text-[10px] font-bold text-ink/40 uppercase tracking-wide">
                        {comparisonText}
                    </p>
                </div>
            </Link>

            {actionButton && (
                <div className="absolute bottom-4 right-4 z-10" onClick={(e) => e.preventDefault()}>
                    {actionButton}
                </div>
            )}
        </div>
    );
}