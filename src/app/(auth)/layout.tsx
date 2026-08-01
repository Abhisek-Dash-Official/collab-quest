"use client";

import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Pickaxe } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-parchment text-ink selection:bg-quest-gold selection:text-ink flex flex-col items-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md flex justify-center mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 p-3 bg-white border-2 border-ink rounded-xl shadow-[4px_4px_0px_var(--color-ink)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all"
          aria-label="Return to Collab Quest Home"
        >
          <Pickaxe className="text-puzzle-red" size={24} strokeWidth={2.5} />
          <span className="font-display font-bold text-xl tracking-tight">Collab Quest</span>
        </Link>
      </div>

      {/* Auth Page Content */}
      <main className="w-full max-w-md">
        {children}
      </main>
    </div>
  );
}