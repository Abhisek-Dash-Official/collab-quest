import type { Metadata } from "next";
import FriendsWorkspace from "@/components/friends/FriendsWorkspace";

export const metadata: Metadata = {
  title: "Allies | Collab Quest",
  description: "Your party for group quests and friendly rivalry.",
};

export default function FriendsPage() {
  return (
    <main className="min-h-screen bg-parchment text-ink selection:bg-sync-teal selection:text-white pb-24 px-4 sm:px-6 md:px-8 py-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">

        <header>
          <span className="font-mono font-bold text-xs uppercase text-sync-teal bg-sync-teal/10 px-2 py-1 rounded border-2 border-sync-teal/20 mb-3 inline-block">
            Your Allies
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-ink leading-tight mb-2">
            Friends
          </h1>
          <p className="font-body text-ink/70 text-lg">
            Your party for group quests and friendly rivalry.
          </p>
        </header>

        <FriendsWorkspace />

      </div>
    </main>
  );
}