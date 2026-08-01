"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Pickaxe } from "lucide-react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const setUser = useUserStore((state) => state.setUser);
    const logout = useUserStore((state) => state.logout);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch("/api/users/me");
                const json = await res.json();

                if (res.ok && json.data) {
                    setUser({
                        uid: json.data.uid,
                        username: json.data.username,
                        email: json.data.email,
                        avatar_id: json.data.avatar_id,
                        xp: json.data.xp,
                    });
                } else {
                    logout();
                }
            } catch (error) {
                console.error("Session check failed:", error);
                logout();
            } finally {
                setIsInitializing(false);
            }
        };

        checkSession();
    }, [setUser, logout]);

    if (isInitializing) {
        return (
            <div className="min-h-screen bg-parchment flex flex-col items-center justify-center selection:bg-quest-gold">
                <div className="relative p-4 bg-puzzle-red border-2 border-ink rounded-2xl shadow-[6px_6px_0px_var(--color-ink)] animate-bounce">
                    <Pickaxe size={40} className="text-white" strokeWidth={2.5} />
                </div>
                <h2 className="mt-6 text-2xl font-display font-extrabold text-ink animate-pulse tracking-tight">
                    Loading Realm...
                </h2>
            </div>
        );
    }

    return <>{children}</>;
}