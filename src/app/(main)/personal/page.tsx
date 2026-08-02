import type { Metadata } from "next";
import PersonalWorkspace from "@/components/personal/PersonalWorkspace";

export const metadata: Metadata = {
    title: "Personal Workspace | Collab Quest",
    description: "Manage your solo quests and personal goals.",
};

export default function PersonalPage() {
    return (
        <main className="min-h-screen bg-parchment text-ink selection:bg-sync-teal selection:text-white pb-24 px-4 sm:px-6 md:px-8 py-8">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
                <PersonalWorkspace />
            </div>
        </main>
    );
}