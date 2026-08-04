"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Users, UserPlus, Copy, Check, Plus, AlertCircle } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { calculateLevel } from "@/lib/gamification";
import FriendCard from "./FriendCard";

interface Friend {
    uid: string;
    username: string;
    avatar_id: string;
    xp: number;
    last_active_at: string;
    respect_likes: number;
}

type SortOption = "online" | "level" | "recent" | "az";
type Tab = "my_friends" | "add_friend";

export default function FriendsWorkspace() {
    const { user } = useUserStore();

    const [activeTab, setActiveTab] = useState<Tab>("my_friends");
    const [friends, setFriends] = useState<Friend[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [successToast, setSuccessToast] = useState(false);

    const [localSearchQuery, setLocalSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("online");

    const [searchUid, setSearchUid] = useState("");
    const [isSearchingUser, setIsSearchingUser] = useState(false);
    const [searchResult, setSearchResult] = useState<Friend | null>(null);
    const [searchError, setSearchError] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const fetchFriends = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/users/friends");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            if (data.success && Array.isArray(data.data)) {
                setFriends(data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    const handleCopyCode = async () => {
        if (!user?.uid) return;
        await navigator.clipboard.writeText(user.uid);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSearchUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchUid.trim()) return;

        setSearchError(null);
        setSearchResult(null);
        setIsSearchingUser(true);

        try {
            const res = await fetch(`/api/users/search?uid=${searchUid.trim()}`);
            const data = await res.json();

            if (!res.ok) {
                if (res.status === 404) throw new Error("That UID doesn't match anyone.");
                throw new Error("Something went wrong while searching.");
            }

            setSearchResult(data.data);
        } catch (err: any) {
            setSearchError(err.message || "Error searching user.");
        } finally {
            setIsSearchingUser(false);
        }
    };

    const handleAddAlly = async (targetUid: string) => {
        if (friends.some(f => f.uid === targetUid)) {
            setSearchError("Already in your friends list!");
            return;
        }

        setIsAdding(true);
        try {
            const res = await fetch("/api/users/friends", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ targetUid })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to add ally");

            setSuccessToast(true);
            setTimeout(() => setSuccessToast(false), 3000);

            setSearchUid("");
            setSearchResult(null);
            await fetchFriends();
            setActiveTab("my_friends");

        } catch (err: any) {
            setSearchError(err.message || "Failed to add ally.");
        } finally {
            setIsAdding(false);
        }
    };

    const processedFriends = useMemo(() => {
        let result = [...friends];

        if (localSearchQuery) {
            const query = localSearchQuery.toLowerCase();
            result = result.filter(f =>
                f.username.toLowerCase().includes(query) ||
                f.uid.toLowerCase().includes(query)
            );
        }

        result.sort((a, b) => {
            if (sortBy === "online") return (b.last_active_at ? 1 : 0) - (a.last_active_at ? 1 : 0);
            if (sortBy === "level") return calculateLevel(b.xp) - calculateLevel(a.xp);
            if (sortBy === "az") return a.username.localeCompare(b.username);
            return 0;
        });

        return result;
    }, [friends, localSearchQuery, sortBy]);

    return (
        <div className="flex flex-col gap-6">
            {successToast && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-sync-teal text-white px-6 py-3 rounded-full border-2 border-ink shadow-[4px_4px_0px_var(--color-ink)] font-body font-bold animate-in fade-in slide-in-from-top-5">
                    Ally Added! 🎉
                </div>
            )}

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b-2 border-ink/10 pb-4">
                <button
                    onClick={() => setActiveTab("my_friends")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono font-bold text-sm uppercase transition-all ${activeTab === "my_friends" ? 'bg-ink text-white' : 'bg-transparent text-ink/50 hover:bg-ink/5 hover:text-ink'}`}
                >
                    <Users size={16} /> My Party
                </button>
                <button
                    onClick={() => setActiveTab("add_friend")}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono font-bold text-sm uppercase transition-all ${activeTab === "add_friend" ? 'bg-sync-teal text-white shadow-[2px_2px_0px_var(--color-ink)] border-2 border-ink' : 'bg-transparent text-ink/50 hover:bg-ink/5 hover:text-ink border-2 border-transparent'}`}
                >
                    <UserPlus size={16} /> Find Ally
                </button>
            </div>

            {/* CONTENT: MY FRIENDS */}
            {activeTab === "my_friends" && (
                <section className="flex flex-col gap-6 animate-in fade-in">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="relative w-full md:w-64">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
                            <input
                                type="text"
                                placeholder="Search party..."
                                value={localSearchQuery}
                                onChange={(e) => setLocalSearchQuery(e.target.value)}
                                className="w-full bg-white border-2 border-ink rounded-lg pl-10 pr-4 py-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-sync-teal shadow-[2px_2px_0px_var(--color-ink)]"
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <span className="font-mono text-xs font-bold text-ink/50 uppercase whitespace-nowrap">Sort:</span>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="bg-transparent font-mono font-bold text-sm text-ink outline-none cursor-pointer">
                                <option value="online">Online First</option>
                                <option value="level">Highest Level</option>
                                <option value="az">A–Z</option>
                            </select>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-cloud/30 animate-pulse rounded-xl border-2 border-transparent" />)}
                        </div>
                    ) : friends.length === 0 ? (
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-ink/20 rounded-xl p-12 text-center">
                            <div className="w-16 h-16 bg-cloud rounded-full flex items-center justify-center mb-4 text-ink/30"><Users size={32} /></div>
                            <p className="font-body text-ink/70">Your party is empty. Go to "Find Ally" to add friends.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {processedFriends.map(friend => <FriendCard key={friend.uid} friend={friend} />)}
                        </div>
                    )}
                </section>
            )}

            {/* CONTENT: ADD FRIEND */}
            {activeTab === "add_friend" && (
                <section className="flex flex-col gap-8 animate-in fade-in max-w-2xl">

                    <div className="bg-parchment/50 border-2 border-ink/10 rounded-xl p-4 flex items-center justify-between gap-4">
                        <div>
                            <p className="font-mono text-xs font-bold text-ink/60 uppercase">Your Quest Code</p>
                            <p className="font-mono font-bold text-ink mt-1 select-all">{user?.uid || "Loading..."}</p>
                        </div>
                        <button onClick={handleCopyCode} className="shrink-0 flex items-center gap-2 bg-white border-2 border-ink rounded-lg px-4 py-2 hover:bg-cloud/30 transition-all font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_var(--color-ink)]">
                            {copied ? <Check size={16} className="text-sync-teal" /> : <Copy size={16} />} {copied ? "Copied" : "Copy"}
                        </button>
                    </div>

                    {/* Search Input */}
                    <div className="flex flex-col gap-2">
                        <label className="font-mono text-xs font-bold text-ink/60 uppercase">Find user by Quest Code</label>
                        <form onSubmit={handleSearchUser} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Paste code here..."
                                value={searchUid}
                                onChange={(e) => setSearchUid(e.target.value)}
                                className="flex-1 bg-white border-2 border-ink rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sync-teal transition-all"
                            />
                            <button
                                type="submit"
                                disabled={isSearchingUser || !searchUid.trim()}
                                className="shrink-0 bg-ink text-white px-6 py-3 rounded-lg font-body font-bold hover:bg-ink/80 transition-all disabled:opacity-50"
                            >
                                {isSearchingUser ? "Searching..." : "Search"}
                            </button>
                        </form>
                        {searchError && (
                            <div className="flex items-center gap-1.5 text-puzzle-red text-sm font-body font-bold mt-2">
                                <AlertCircle size={14} /> {searchError}
                            </div>
                        )}
                    </div>

                    {/* Search Result Box */}
                    {searchResult && (
                        <div className="mt-4 border-t-2 border-ink/10 pt-6 flex flex-col gap-4">
                            <h4 className="font-mono text-xs font-bold text-ink/40 uppercase">Result</h4>

                            <FriendCard
                                friend={searchResult}
                                actionButton={
                                    searchResult.uid === user?.uid ? (
                                        <span className="bg-cloud text-ink/60 px-3 py-1.5 rounded text-xs font-bold font-mono">You</span>
                                    ) : friends.some(f => f.uid === searchResult.uid) ? (
                                        <span className="bg-sync-teal text-white px-3 py-1.5 rounded text-xs font-bold font-mono border-2 border-ink">Allies</span>
                                    ) : (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleAddAlly(searchResult.uid); }}
                                            disabled={isAdding}
                                            className="bg-white text-sync-teal border-2 border-ink hover:bg-sync-teal hover:text-white px-4 py-2 rounded shadow-[2px_2px_0px_var(--color-ink)] hover:translate-y-0.5 hover:shadow-none transition-all flex items-center gap-2 font-mono text-xs font-bold uppercase disabled:opacity-50"
                                        >
                                            {isAdding ? "..." : <><Plus size={14} strokeWidth={3} /> Add</>}
                                        </button>
                                    )
                                }
                            />
                        </div>
                    )}

                </section>
            )}

        </div>
    );
}