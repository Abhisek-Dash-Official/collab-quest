"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface AlertDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    isDanger?: boolean;
}

export function AlertDialog({
    isOpen, onClose, onConfirm, title, description, confirmText = "Confirm", cancelText = "Cancel", isDanger = false
}: AlertDialogProps) {

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4">
            <div
                className="bg-parchment border-2 border-ink p-6 max-w-sm w-full shadow-[8px_8px_0px_var(--color-ink)] relative animate-in fade-in zoom-in duration-200"
                role="dialog"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-1 hover:bg-cloud/50 border-2 border-transparent hover:border-ink transition-colors"
                >
                    <X className="w-5 h-5 text-ink" strokeWidth={3} />
                </button>

                <h2 className="font-display text-xl font-black uppercase text-ink mb-2 pr-6">{title}</h2>
                <p className="font-body text-ink/80 font-bold mb-6 leading-relaxed">{description}</p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 font-display font-bold uppercase border-2 border-ink bg-cloud text-ink hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_var(--color-ink)] transition-all"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className={`px-4 py-2 font-display font-bold uppercase border-2 border-ink text-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_var(--color-ink)] transition-all ${isDanger ? 'bg-puzzle-red' : 'bg-sync-teal'}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}