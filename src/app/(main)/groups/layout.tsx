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

            <GroupSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col w-full h-full overflow-hidden relative">

                <div className="md:hidden flex items-center p-3 border-b-4 border-ink bg-white shrink-0 z-20">
                    <button
                        onClick={toggleSidebar}
                        className="p-1.5 bg-cloud border-2 border-ink shadow-[2px_2px_0px_var(--color-ink)] hover:bg-sync-teal hover:text-white transition-colors"
                    >
                        <Menu className="w-6 h-6" strokeWidth={2.5} />
                    </button>
                    <span className="ml-3 font-display font-black text-lg uppercase text-ink tracking-wide">
                        Navigation
                    </span>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto w-full">
                    {children}
                </main>

                <NotificationToast />

            </div>
        </div>
    );
}