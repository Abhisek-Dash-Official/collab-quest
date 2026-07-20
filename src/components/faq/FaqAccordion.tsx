"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
    id: string;
    q: string;
    a: string;
};

type FaqCategory = {
    title: string;
    items: FaqItem[];
};

export default function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
    const [openItems, setOpenItems] = useState<Record<number, string | null>>({});

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace("#", "");
            if (!hash) return;

            categories.forEach((category, catIndex) => {
                const found = category.items.find((item) => item.id === hash);
                if (found) {
                    setOpenItems((prev) => ({ ...prev, [catIndex]: hash }));
                }
            });
        };

        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [categories]);

    const toggleItem = (catIndex: number, itemId: string) => {
        const isCurrentlyOpen = openItems[catIndex] === itemId;

        if (!isCurrentlyOpen) {
            window.history.pushState(null, "", `#${itemId}`);
        } else {
            window.history.pushState(null, "", window.location.pathname);
        }

        setOpenItems((prev) => ({
            ...prev,
            [catIndex]: isCurrentlyOpen ? null : itemId,
        }));
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-12">
            {categories.map((category, catIndex) => (
                <div key={catIndex} className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bricolage font-bold text-ink">
                        {category.title}
                    </h2>

                    <div className="flex flex-col gap-4">
                        {category.items.map((item) => {
                            const isOpen = openItems[catIndex] === item.id;

                            return (
                                <div
                                    key={item.id}
                                    className="bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_var(--color-ink)] overflow-hidden transition-all duration-200"
                                >
                                    <button
                                        id={`btn-${item.id}`}
                                        aria-expanded={isOpen}
                                        aria-controls={`panel-${item.id}`}
                                        onClick={() => toggleItem(catIndex, item.id)}
                                        className="w-full min-h-11 flex items-center justify-between p-4 md:p-6 text-left bg-white hover:bg-cloud transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-sync-teal"
                                    >
                                        <span className="font-bricolage font-bold text-lg text-ink pr-4">
                                            {item.q}
                                        </span>
                                        <ChevronDown
                                            className={`w-6 h-6 shrink-0 text-ink transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    <div
                                        id={`panel-${item.id}`}
                                        role="region"
                                        aria-labelledby={`btn-${item.id}`}
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="p-4 md:p-6 pt-0 font-manrope text-ink leading-relaxed border-t-2 border-transparent">
                                                {item.a}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}