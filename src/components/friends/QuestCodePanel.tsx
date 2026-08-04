"use client";

import { useState } from "react";
import { Copy, Check, Plus, AlertCircle } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

interface QuestCodePanelProps {
    onAddAlly: (code: string) => Promise<void>;
    isAdding: boolean;
    addError: string | null;
}

export default function QuestCodePanel({ onAddAlly, isAdding, addError }: QuestCodePanelProps) {
    const { user } = useUserStore();
    const [copied, setCopied] = useState(false);
    const [inputCode, setInputCode] = useState("");

    const handleCopy = async () => {
        if (!user?.uid) return;
        await navigator.clipboard.writeText(user.uid);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputCode.trim()) return;
        await onAddAlly(inputCode.trim());
        setInputCode("");
    };

    return (
        <section className="bg-white border-2 border-ink rounded-xl shadow-[4px_4px_0px_var(--color-ink)] p-5 md:p-6 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            {/* Read-only Code Block */}
            <div className="w-full md:w-1/2 flex flex-col gap-2">
                <h2 className="font-display font-bold text-xl">Add an Ally</h2>
                <label className="font-mono text-xs font-bold text-ink/60 uppercase">Your Quest Code</label>
                <div className="flex items-center gap-2">
                    <div className="flex-1 bg-cloud/20 border-2 border-ink rounded-lg px-4 py-3 font-mono font-bold text-ink truncate select-all">
                        {user?.uid || "Loading..."}
                    </div>
                    <button
                        onClick={handleCopy}
                        className="shrink-0 w-12 h-12 flex items-center justify-center bg-white border-2 border-ink rounded-lg hover:bg-cloud/30 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_var(--color-ink)] transition-all"
                        aria-label="Copy Quest Code"
                    >
                        <span aria-live="polite" className="sr-only">{copied ? "Copied!" : ""}</span>
                        {copied ? <Check size={20} className="text-sync-teal" /> : <Copy size={20} />}
                    </button>
                </div>
            </div>

            <div className="hidden md:block w-px h-24 bg-ink/10" />

            {/* Input Block */}
            <div className="w-full md:w-1/2 flex flex-col gap-2">
                <div className="h-7" />
                <label htmlFor="friend-code" className="font-mono text-xs font-bold text-ink/60 uppercase">
                    Got a friend's Quest Code?
                </label>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <input
                            id="friend-code"
                            type="text"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            placeholder="Paste Quest Code here"
                            className="flex-1 bg-white border-2 border-ink rounded-lg px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sync-teal focus:border-transparent transition-all"
                        />
                        <button
                            type="submit"
                            disabled={isAdding || !inputCode.trim()}
                            className="shrink-0 flex items-center gap-2 bg-white text-sync-teal border-2 border-ink rounded-lg px-5 py-3 font-body font-bold hover:bg-cloud/20 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_var(--color-ink)] transition-all disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {isAdding ? "Adding..." : <><Plus size={18} strokeWidth={3} /> Add Ally</>}
                        </button>
                    </div>
                    {addError && (
                        <div className="flex items-center gap-1.5 text-puzzle-red text-sm font-body font-bold animate-in fade-in slide-in-from-top-1">
                            <AlertCircle size={14} />
                            {addError}
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}