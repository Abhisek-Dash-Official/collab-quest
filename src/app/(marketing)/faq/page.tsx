import Link from "next/link";
import FaqAccordion from "@/components/faq/FaqAccordion";
import FAQ_DATA from "@/config/faq"

export const metadata = {
    title: "FAQ | Collab Quest",
    description: "Frequently asked questions about Collab Quest, gamification, and getting started.",
};

export default function FaqPage() {
    return (
        <main className="min-h-screen bg-parchment py-16 md:py-24 px-6">
            {/* Intro Section */}
            <header className="max-w-3xl mx-auto text-center mb-16">
                <span className="inline-block bg-cloud border-2 border-ink font-bricolage font-bold text-sm uppercase tracking-wider py-1 px-3 rounded-full mb-4 shadow-[2px_2px_0px_var(--color-ink)]">
                    Need Help?
                </span>
                <h1 className="font-bricolage text-4xl md:text-5xl font-extrabold text-ink mb-4">
                    Frequently Asked Questions
                </h1>
                <p className="font-manrope text-lg text-ink max-w-xl mx-auto font-medium">
                    Can't find what you're looking for? Contact us — we read everything.
                </p>
            </header>

            {/* Interactive Accordion */}
            <FaqAccordion categories={FAQ_DATA} />

            {/* Closing CTA */}
            <section className="max-w-3xl mx-auto mt-20">
                <div className="bg-quest-gold border-2 border-ink rounded-3xl shadow-[6px_6px_0px_var(--color-ink)] p-8 md:p-12 text-center">
                    <h2 className="font-bricolage text-2xl md:text-3xl font-bold text-ink mb-4">
                        Still have questions?
                    </h2>
                    <p className="font-manrope text-ink mb-8 max-w-md mx-auto">
                        Whether you found a bug, have a feature request, or just want to say hi, we're ready to help you level up.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-white border-2 border-ink font-bricolage font-bold text-ink py-3 px-8 rounded-full shadow-[4px_4px_0px_var(--color-ink)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_var(--color-ink)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>
        </main>
    );
}