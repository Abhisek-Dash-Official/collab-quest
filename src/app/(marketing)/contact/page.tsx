import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, HelpCircle } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
    title: "Contact Us | Collab Quest",
    description: "Got a question? Send us a nudge. We read everything.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-parchment text-ink selection:bg-quest-gold selection:text-ink pb-24">
            {/* INTRO SECTION */}
            <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
                <span className="inline-block px-4 py-1.5 mb-6 bg-cloud border-2 border-ink rounded-full text-sm font-bold font-body tracking-wider uppercase shadow-[3px_3px_0px_var(--color-ink)]">
                    Get In Touch
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] mb-6">
                    Got a Question? Send Us a Nudge
                </h1>
                <p className="text-lg md:text-xl font-body leading-relaxed max-w-2xl font-medium">
                    Bug to report? Feature you're dying to see? Something else on your mind?
                    We read everything — pick a category and let us know.
                </p>
            </section>

            <section className="px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 border-t-2 border-ink pt-16">

                {/* LEFT COLUMN: INTERACTIVE FORM */}
                <div className="lg:col-span-7 xl:col-span-8">
                    <ContactForm />
                </div>

                {/* RIGHT COLUMN: ALTERNATIVE ROUTES */}
                <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
                    <h2 className="text-2xl font-display font-bold mb-2">Prefer a Different Route?</h2>

                    <a href="mailto:hello@collabquest.app" className="group p-6 bg-white border-2 border-ink rounded-2xl shadow-[6px_6px_0px_var(--color-ink)] hover:translate-y-0.5 hover:shadow-[3px_3px_0px_var(--color-ink)] transition-all flex items-start gap-4">
                        <div className="p-3 bg-sync-teal border-2 border-ink rounded-xl group-hover:rotate-6 transition-transform">
                            <Mail className="text-ink" size={24} />
                        </div>
                        <div>
                            <h3 className="font-display font-bold text-lg">Email us directly</h3>
                            <p className="font-body text-sm font-medium mt-1">hello@collabquest.app</p>
                        </div>
                    </a>

                    <Link href="/discord" className="group p-6 bg-white border-2 border-ink rounded-2xl shadow-[6px_6px_0px_var(--color-ink)] hover:translate-y-0.5 hover:shadow-[3px_3px_0px_var(--color-ink)] transition-all flex items-start gap-4">
                        <div className="p-3 bg-quest-gold border-2 border-ink rounded-xl group-hover:-rotate-6 transition-transform">
                            <MessageCircle className="text-ink" size={24} />
                        </div>
                        <div>
                            <h3 className="font-display font-bold text-lg">Join the Community</h3>
                            <p className="font-body text-sm font-medium mt-1">Fastest way to get help — our team and other players hang out there.</p>
                        </div>
                    </Link>

                    <Link href="/help" className="group p-6 bg-cloud/50 border-2 border-ink rounded-2xl border-dashed hover:bg-cloud transition-colors flex items-center gap-3">
                        <HelpCircle size={20} className="text-ink/70 group-hover:text-ink" />
                        <span className="font-body font-bold text-ink/70 group-hover:text-ink">Check the Help Center first</span>
                    </Link>
                </div>

            </section>
        </main>
    );
}