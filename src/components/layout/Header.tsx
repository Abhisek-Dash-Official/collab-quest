"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { siteLogo, siteName } from "@/config/site";
import { mainNavItems } from "@/config/nav";

export default function Header() {
    const { user, isAuthenticated, logout, getAvatarUrl, getLevel } = useUserStore();
    const router = useRouter();
    const pathname = usePathname();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsDropdownOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    const initial = user?.username?.charAt(0).toUpperCase() || "U";
    const avatarUrl = getAvatarUrl();
    const displayLevel = getLevel(); // <-- Store se level fetch kiya

    return (
        <header className="sticky top-0 z-50 w-full h-16 bg-parchment border-b-2 border-ink flex items-center justify-between px-4 sm:px-6 lg:px-8">

            {/* Left: Logo */}
            <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2" aria-label={`${siteName} Home`}>
                <img src={siteLogo} alt={siteName} className="w-6 h-6 object-contain" />
                <span className="font-display font-bold text-lg text-ink">{siteName}</span>
            </Link>

            {/* Center: Desktop Nav Links */}
            {isAuthenticated && (
                <nav className="hidden md:flex items-center gap-6 font-body font-bold text-sm text-ink">
                    {mainNavItems.map((item) => (
                        <Link key={item.href} href={item.href} className="hover:text-quest-gold-deep transition-colors">
                            {item.label}
                        </Link>
                    ))}
                </nav>
            )}

            {/* Right: Avatar */}
            <div className="flex items-center gap-3 sm:gap-4">
                {isAuthenticated ? (
                    <>
                        {/* Level */}
                        <div className="flex h-8 px-2 sm:px-3 bg-white border-2 border-ink rounded-full items-center gap-1 sm:gap-2 shadow-[2px_2px_0px_var(--color-ink)]">
                            <span className="font-display font-bold text-[10px] sm:text-xs text-quest-gold-deep">LVL</span>
                            <span className="font-stat font-bold text-xs sm:text-sm text-ink">{displayLevel}</span>
                        </div>

                        {/* Notification Bell */}
                        <Link href="/notification" className="hidden sm:block p-1.5 text-ink hover:text-quest-gold-deep transition-colors" aria-label="Notifications">
                            <Bell size={20} strokeWidth={2} />
                        </Link>

                        {/* Avatar Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-9 h-9 rounded-full border-2 border-ink bg-cloud flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-quest-gold"
                            >
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt={user?.username || "Avatar"} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="font-display font-bold text-ink text-sm">{initial}</span>
                                )}
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-ink rounded-xl shadow-[4px_4px_0px_var(--color-ink)] py-2 font-body font-bold text-sm z-50 flex flex-col">
                                    <Link href="/notification" className="px-4 py-2 text-ink hover:bg-cloud/30 sm:hidden">Notifications</Link>
                                    <Link href="/profile" className="px-4 py-2 text-ink hover:bg-cloud/30">Profile</Link>
                                    <Link href="/settings" className="px-4 py-2 text-ink hover:bg-cloud/30">Settings</Link>
                                    <button onClick={handleLogout} className="text-left px-4 py-2 text-puzzle-red hover:bg-cloud/30 border-t-2 border-ink/10 mt-1 pt-2">
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    // Logged Out State
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Link href="/login" className="px-4 py-2 bg-white border-2 border-ink rounded-lg font-body font-bold text-sm shadow-[2px_2px_0px_var(--color-ink)] hover:translate-y-px hover:shadow-[1px_1px_0px_var(--color-ink)] transition-all flex items-center justify-center">
                            Log In
                        </Link>

                        <Link href="/signup" className="hidden sm:flex px-4 py-2 bg-quest-gold border-2 border-ink rounded-lg font-body font-bold text-sm shadow-[2px_2px_0px_var(--color-ink)] hover:translate-y-px hover:shadow-[1px_1px_0px_var(--color-ink)] transition-all items-center justify-center">
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}