"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Section = { id: string; heading: string; body: string };

export default function MobileTOC({ sections }: { sections: Section[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="lg:hidden mb-12 border-2 border-ink rounded-2xl bg-white overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-toc-list"
                className="w-full flex items-center justify-between p-4 font-bricolage font-bold text-ink hover:bg-cloud transition-colors"
            >
                <span>Jump to a section</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <div
                id="mobile-toc-list"
                className={`border-t-2 border-ink transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}
            >
                <ul className="p-4 flex flex-col gap-3">
                    {sections.map((section, index) => (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                onClick={() => setIsOpen(false)}
                                className="text-ink font-manrope font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded"
                            >
                                {index + 1}. {section.heading}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}