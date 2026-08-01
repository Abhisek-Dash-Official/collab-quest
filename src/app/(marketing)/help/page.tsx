import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, HelpCircle, MessageSquare, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";

export const metadata: Metadata = {
    title: "Help Center | Collab Quest",
    description: "Need a hand? Find guides, FAQs, and support for your quests.",
};

export default function HelpPage() {
    return (
        <main className="min-h-screen bg-parchment text-ink selection:bg-quest-gold selection:text-ink pb-24">
            {/* HERO SECTION */}
            <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 mb-6 bg-cloud border-2 border-ink rounded-full text-sm font-bold font-body tracking-wider uppercase shadow-[3px_3px_0px_var(--color-ink)]">
                    The Adventurer's Guide
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] mb-6">
                    Stuck on a Quest?
                </h1>
                <p className="text-lg md:text-xl font-body leading-relaxed max-w-2xl mx-auto font-medium text-ink/80">
                    Whether you're fighting a bug, looking for game mechanics, or just lost in the menus — we've got your back.
                </p>
            </section>

            <section className="px-6 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                    {/* FAQ Card */}
                    <Link href="/faq" className="group flex flex-col justify-between p-8 bg-white border-2 border-ink rounded-3xl shadow-[8px_8px_0px_var(--color-ink)] hover:translate-y-1 hover:shadow-[4px_4px_0px_var(--color-ink)] transition-all">
                        <div>
                            <div className="w-14 h-14 bg-quest-gold border-2 border-ink rounded-2xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_var(--color-ink)] group-hover:-rotate-6 transition-transform">
                                <HelpCircle size={28} className="text-ink" />
                            </div>
                            <h2 className="text-2xl font-display font-extrabold mb-3">Frequently Asked Questions</h2>
                            <p className="font-body font-medium text-ink/70 mb-6">
                                Quick answers to common questions about accounts, scoring, and how the platform works.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 font-body font-bold text-sm text-sync-teal">
                            <span>Read the FAQ</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* Contact Card */}
                    <Link href="/contact" className="group flex flex-col justify-between p-8 bg-white border-2 border-ink rounded-3xl shadow-[8px_8px_0px_var(--color-ink)] hover:translate-y-1 hover:shadow-[4px_4px_0px_var(--color-ink)] transition-all">
                        <div>
                            <div className="w-14 h-14 bg-puzzle-red border-2 border-ink rounded-2xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_var(--color-ink)] group-hover:rotate-6 transition-transform">
                                <MessageSquare size={28} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-display font-extrabold mb-3">Contact Support</h2>
                            <p className="font-body font-medium text-ink/70 mb-6">
                                Found a nasty bug or have a brilliant feature idea? Send a direct message to the devs.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 font-body font-bold text-sm text-puzzle-red">
                            <span>Send a message</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* Game Manual / Docs Card */}
                    <Link href="/manual" className="group flex flex-col justify-between p-8 bg-white border-2 border-ink rounded-3xl shadow-[8px_8px_0px_var(--color-ink)] hover:translate-y-1 hover:shadow-[4px_4px_0px_var(--color-ink)] transition-all">
                        <div>
                            <div className="w-14 h-14 bg-sync-teal border-2 border-ink rounded-2xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_var(--color-ink)] group-hover:-rotate-6 transition-transform">
                                <BookOpen size={28} className="text-ink" />
                            </div>
                            <h2 className="text-2xl font-display font-extrabold mb-3">Game Manual</h2>
                            <p className="font-body font-medium text-ink/70 mb-6">
                                Learn the core mechanics. How to create groups, manage tasks, and level up your character.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 font-body font-bold text-sm text-sync-teal">
                            <span>Read the manual</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    {/* GitHub / Open Source Card */}
                    <Link
                        href="https://github.com/Abhisek-Dash-Official/collab-quest"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col justify-between p-8 bg-white border-2 border-ink rounded-3xl shadow-[8px_8px_0px_var(--color-ink)] hover:translate-y-1 hover:shadow-[4px_4px_0px_var(--color-ink)] transition-all"
                    >
                        <div>
                            <div className="w-14 h-14 bg-cloud border-2 border-ink rounded-2xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_var(--color-ink)] group-hover:rotate-6 transition-transform">
                                <GithubIcon size={28} className="text-ink" />
                            </div>
                            <h2 className="text-2xl font-display font-extrabold mb-3">The Code Forge</h2>
                            <p className="font-body font-medium text-ink/70 mb-6">
                                We build in the open. Check out the source code, report bugs directly, or contribute to the quest on GitHub.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 font-body font-bold text-sm text-ink">
                            <span>View Repository</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                </div>
            </section>
        </main>
    );
}