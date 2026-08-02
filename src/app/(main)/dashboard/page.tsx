import type { Metadata } from "next";
import DashboardHud from "@/components/dashboard/DashboardHud";

export const metadata: Metadata = {
    title: "Command Center | Collab Quest",
    description: "Your active quests and current progress.",
};

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-parchment text-ink selection:bg-quest-gold selection:text-ink pb-24 px-4 sm:px-6 md:px-8 py-8">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
                <DashboardHud />
            </div>
        </main>
    );
}