"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

interface WaitlistButtonProps {
    label: string;
    variant: "pro" | "ultra";
}

export default function WaitlistButton({ label, variant }: WaitlistButtonProps) {
    const [status, setStatus] = useState<"idle" | "acknowledged">("idle");

    const isUltra = variant === "ultra";

    const handleClick = () => {
        setStatus("acknowledged");
    };

    const baseBtnStyles = "w-full flex items-center justify-center gap-2 font-bricolage font-bold text-lg py-3 px-6 transition-all focus:outline-none focus-visible:ring-4";

    const proBtnStyles = "bg-white border-2 border-[var(--color-ink)] text-[var(--color-ink)] shadow-[4px_4px_0px_var(--color-ink)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_var(--color-ink)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none focus-visible:ring-[var(--color-sync-teal)]";

    const ultraBtnStyles = "bg-[var(--color-quest-gold)] border-2 border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-quest-gold-deep)] focus-visible:ring-[var(--color-ink)] transition-colors [clip-path:polygon(0_0,100%_0,100%_calc(100%-16px),calc(100%-16px)_100%,0_100%)] pb-4";

    if (status === "acknowledged") {
        return (
            <button
                disabled
                className={`${baseBtnStyles} bg-cloud border-2 border-ink text-ink cursor-default`}
            >
                Noted! We'll alert your Dashboard <Bell className="w-5 h-5 shrink-0" />
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            className={`${baseBtnStyles} ${isUltra ? ultraBtnStyles : proBtnStyles}`}
        >
            {label}
        </button>
    );
}