"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, Users, Heart, CircleUser } from "lucide-react";
import { mainNavItems } from "@/config/nav";
import { useUserStore } from "@/store/useUserStore";

const IconMap: Record<string, React.ElementType> = {
    LayoutDashboard, User, Users, Heart
};

export default function BottomNav() {
    const pathname = usePathname();
    const { getAvatarUrl } = useUserStore();
    const avatarUrl = getAvatarUrl();

    return (
        <nav className="md:hidden fixed bottom-0 w-full bg-parchment border-t-2 border-ink z-40 pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center justify-around h-16 px-2">
                {mainNavItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = IconMap[item.icon];

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center justify-center w-16 h-full gap-1"
                        >
                            <div className={`transition-all ${isActive ? "text-quest-gold-deep scale-110" : "text-ink/60"}`}>
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className={`font-body text-[10px] ${isActive ? "font-bold text-ink" : "font-medium text-ink/60"}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}

                {/* Profile Tab */}
                <Link href="/profile" className="flex flex-col items-center justify-center w-16 h-full gap-1">
                    <div className={`w-6 h-6 rounded-full border-2 ${pathname.startsWith('/profile') ? "border-quest-gold-deep scale-110" : "border-ink/60"} overflow-hidden`}>
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <CircleUser size={20} className="m-auto text-ink/60" />
                        )}
                    </div>
                    <span className={`font-body text-[10px] ${pathname.startsWith('/profile') ? "font-bold text-ink" : "font-medium text-ink/60"}`}>
                        Profile
                    </span>
                </Link>
            </div>
        </nav>
    );
}