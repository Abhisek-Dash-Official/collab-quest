import type { Metadata } from "next";
import Link from "next/link";
import TEAM_MEMBERS from "@/config/team"

export const metadata: Metadata = {
    title: "About Us | Collab Quest",
    description:
        "Collab Quest started because we loved productivity systems but hated how lifeless most of them felt.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-parchment text-ink selection:bg-quest-gold selection:text-ink">
            {/* HERO / MISSION STATEMENT */}
            <section className="relative px-6 py-24 md:py-32 lg:py-40 max-w-5xl mx-auto text-center">
                <span className="inline-block px-4 py-1.5 mb-6 bg-cloud border-2 border-ink rounded-full text-sm font-bold font-body tracking-wider uppercase shadow-[3px_3px_0px_var(--color-ink)]">
                    About Collab Quest
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] mb-8">
                    We Got Tired of To-Do Lists Feeling Like Homework
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl font-body leading-relaxed max-w-3xl mx-auto font-medium">
                    Collab Quest started because we loved productivity systems but hated how
                    lifeless most of them felt. So we built the tool we actually wanted to
                    use — one where finishing your work feels like winning, not just
                    surviving the week.
                </p>
            </section>

            {/* TEAM SECTION */}
            <section className="px-6 py-20 bg-cloud border-y-2 border-ink">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 mb-4 bg-quest-gold border-2 border-ink rounded-full text-sm font-bold font-body tracking-wider uppercase shadow-[3px_3px_0px_var(--color-ink)]">
                            The Team
                        </span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold">
                            Turning static to-do lists into dynamic, gamified quests.
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-x-12 gap-y-16 max-w-4xl mx-auto">
                        {TEAM_MEMBERS.map((member) => (
                            <article key={member.id} className="flex flex-col items-center text-center">
                                <div className={`relative mb-6 ${member.rotationClass} transition-transform hover:rotate-0 duration-300`}>
                                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl border-2 border-ink overflow-hidden bg-parchment shadow-[6px_6px_0px_var(--color-ink)]">
                                        <img
                                            src={member.photoUrl}
                                            alt={`${member.name}`}
                                            className="w-full h-full object-cover grayscale-20 hover:grayscale-0 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Info & Badge */}
                                <h3 className="text-2xl font-display font-bold mb-1">
                                    {member.name}
                                </h3>
                                <p className="font-body font-bold text-ink/70 mb-3">
                                    {member.role}
                                </p>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 bg-parchment border-2 border-ink rounded-full shadow-[2px_2px_0px_var(--color-ink)]">
                                    <member.BadgeIcon size={14} className="text-puzzle-red" strokeWidth={3} />
                                    <span className="text-xs font-bold font-body">
                                        {member.badgeText}
                                    </span>
                                </div>
                                <p className="font-body text-base max-w-62.5">
                                    {member.bio}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* VALUES SECTION */}
            <section className="px-6 py-24 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 mb-4 bg-sync-teal border-2 border-ink rounded-full text-sm font-bold font-body tracking-wider uppercase shadow-[3px_3px_0px_var(--color-ink)]">
                        What We Believe
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold">
                        Three Rules We Actually Follow
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <article className="p-8 bg-white border-2 border-ink rounded-3xl shadow-[8px_8px_0px_var(--color-ink)]">
                        <h3 className="text-2xl font-display font-bold mb-4 text-puzzle-red">
                            Progress Over Perfection
                        </h3>
                        <p className="font-body text-lg font-medium">
                            A finished task beats a perfect plan that never shipped.
                        </p>
                    </article>

                    <article className="p-8 bg-white border-2 border-ink rounded-3xl shadow-[8px_8px_0px_var(--color-ink)]">
                        <h3 className="text-2xl font-display font-bold mb-4 text-sync-teal">
                            Teams Win Together
                        </h3>
                        <p className="font-body text-lg font-medium">
                            Nobody levels up alone. Every feature we build assumes you&apos;re
                            playing with other people.
                        </p>
                    </article>

                    <article className="p-8 bg-white border-2 border-ink rounded-3xl shadow-[8px_8px_0px_var(--color-ink)]">
                        <h3 className="text-2xl font-display font-bold mb-4 text-quest-gold-deep">
                            Fun Is a Feature, Not a Bug
                        </h3>
                        <p className="font-body text-lg font-medium">
                            If a tool feels like a chore to open, it&apos;s already failed at
                            its job.
                        </p>
                    </article>
                </div>
            </section>

            {/* CLOSING CTA */}
            <section className="px-6 py-24 mb-12">
                <div className="max-w-4xl mx-auto p-10 md:p-16 bg-quest-gold border-2 border-ink rounded-3xl shadow-[12px_12px_0px_var(--color-ink)] text-center">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                        Want to Build With Us?
                    </h2>
                    <p className="text-lg md:text-xl font-body font-medium max-w-2xl mx-auto mb-10">
                        We&apos;re always up for hearing from people who care about the same
                        thing we do — making shared work not feel like a grind.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-8 py-4 bg-puzzle-red text-white border-2 border-ink rounded-2xl font-body font-bold text-lg shadow-[4px_4px_0px_var(--color-ink)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all"
                    >
                        Get in Touch
                    </Link>
                </div>
            </section>
        </main>
    );
}