"use client";

import { useState, useEffect } from "react";
import GroupSidebar from "@/components/group/GroupSidebar";
import { NotificationToast } from "@/components/ui/NotificationToast";
import { Menu } from "lucide-react";

export default function GroupsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    if (!isMounted) return null;

    return (
        <div className="fixed top-16 left-0 right-0 bottom-0 flex overflow-hidden bg-parchment z-10">

            {!isSidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className="md:hidden absolute top-4 left-4 z-30 p-2 bg-white border-2 border-ink shadow-[2px_2px_0px_var(--color-ink)] hover:bg-sync-teal hover:text-white transition-colors"
                >
                    <Menu className="w-6 h-6" strokeWidth={2.5} />
                </button>
            )}

            <GroupSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <main className="flex-1 overflow-y-auto relative w-full h-full">
                {children}
            </main>

            <NotificationToast />

        </div>
    );
}