"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface LevelUpProps {
    level: number;
    show: boolean;
    onClose: () => void;
}

export function LevelUpCelebration({ level, show, onClose }: LevelUpProps) {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);
        if (show) {
            // Auto close after 4 seconds
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show && !isVisible) return null;

    return (
        <div className={`fixed inset-0 z-60 flex items-center justify-center bg-ink/60 backdrop-blur-md p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-quest-gold border-4 border-ink p-8 text-center max-w-sm w-full shadow-[12px_12px_0px_var(--color-ink)] animate-in zoom-in-75 duration-300 spin-in-2 relative">

                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-4 border-ink rounded-full p-3 shadow-[4px_4px_0px_var(--color-ink)]">
                    <Zap className="w-10 h-10 text-quest-gold fill-quest-gold animate-bounce" strokeWidth={2} />
                </div>

                <h2 className="mt-6 font-display text-4xl font-black uppercase text-ink tracking-tight mb-2">
                    Level Up!
                </h2>
                <p className="font-body text-xl font-bold text-ink mb-6">
                    You reached <span className="text-white bg-ink px-2 py-0.5 ml-1">Lvl {level}</span>
                </p>

                <button
                    onClick={() => setIsVisible(false)}
                    className="w-full py-3 font-display font-extrabold text-lg uppercase border-4 border-ink bg-white text-ink hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_var(--color-ink)] transition-all active:translate-y-0 active:translate-x-0 active:shadow-none"
                >
                    Keep Grinding
                </button>
            </div>
        </div>
    );
}