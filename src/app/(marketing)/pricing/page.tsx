import { Zap, Lock } from "lucide-react";
import PricingCard from "@/components/pricing/PricingCard";

export const metadata = {
    title: "Pricing | Collab Quest",
    description: "Choose your power level. Collab Quest pricing for solo players and teams.",
};

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-parchment py-16 md:py-24 px-4 sm:px-6">

            {/* Hero Section */}
            <header className="max-w-4xl mx-auto text-center mb-12">
                <span className="inline-block bg-white border-2 border-ink font-bricolage font-bold text-sm uppercase tracking-wider py-1 px-3 rounded-full mb-6 shadow-[2px_2px_0px_var(--color-ink)]">
                    Pricing
                </span>
                <h1 className="font-bricolage text-5xl md:text-6xl font-extrabold text-ink tracking-tight mb-6">
                    Choose Your Power Level
                </h1>
                <p className="font-manrope text-xl text-ink font-medium max-w-2xl mx-auto">
                    Free gets you organized. Pro and Ultra Pro get you AI superpowers, bigger limits, and serious bragging rights.
                </p>
            </header>

            {/* Anticipation Banner */}
            <div className="max-w-6xl mx-auto mb-16">
                <div className="bg-sync-teal/10 border-2 border-sync-teal rounded-2xl p-4 text-center">
                    <p className="font-bricolage font-bold text-ink text-lg flex items-center justify-center gap-2">
                        <Zap className="w-6 h-6 shrink-0 text-quest-gold-deep fill-current" />
                        Pro and Ultra Pro are almost here. Keep an eye on your Dashboard notifications for the official launch drop!
                    </p>
                </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6 mb-24 items-stretch">

                {/* Free Tier */}
                <PricingCard
                    tier="free"
                    badge="Available Now"
                    kicker="Where every quest begins"
                    price="$0"
                    interval="forever"
                    features={[
                        { text: "Up to 5 Groups" },
                        { text: "Standard Nudge limits" },
                        { text: "Standard task limits" },
                        { text: "No AI features", isMissing: true },
                    ]}
                    ctaLabel="Start Free"
                />

                {/* Pro Tier */}
                <PricingCard
                    tier="pro"
                    badge={<><Lock className="w-3.5 h-3.5 shrink-0" /> Coming Soon</>}
                    badgeAccent="bg-[var(--color-cloud)]"
                    kicker="Your first level-up"
                    price="$1"
                    interval="month"
                    valueLine="Less than the cost of one coffee."
                    featuresHeader="Everything in Free, plus:"
                    features={[
                        { text: "AI task generation" },
                        { text: "AI conversation chat access" },
                        { text: "+50% more Nudges per day" },
                        { text: "+50% more tasks per week" },
                        { text: "Create up to 10 Groups" },
                        { text: "Exclusive \"Premium\" badge on your profile" },
                    ]}
                    ctaLabel="Notify Me When Pro Launches"
                />

                {/* Ultra Pro Tier */}
                <PricingCard
                    tier="ultra"
                    badge={<><Lock className="w-3.5 h-3.5 shrink-0" /> Coming Soon</>}
                    badgeAccent="bg-[var(--color-parchment)]"
                    kicker="Max level. Full send."
                    price="$5"
                    interval="month"
                    valueLine="Just $4 more than Pro — for double the power."
                    featuresHeader="Everything in Pro, plus:"
                    features={[
                        { text: "Higher limits on AI task generation & AI chat" },
                        { text: "200% Nudges — double the Free tier limit" },
                        { text: "200% Tasks — double the Free tier limit" },
                        { text: "Exclusive \"Ultra Pro\" badge" },
                        { text: "+25% XP bonus on every task completed on time", isHighlighted: true },
                    ]}
                    ctaLabel="Get Early Access to Ultra Pro"
                />
            </div>

            {/* Pricing FAQ Strip */}
            <section className="max-w-3xl mx-auto mt-24 border-t-4 border-ink pt-16">
                <h2 className="font-bricolage text-3xl font-bold text-ink text-center mb-10">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-8">

                    <div className="bg-white border-2 border-ink shadow-[4px_4px_0px_var(--color-ink)] rounded-2xl p-6">
                        <h3 className="font-bricolage font-bold text-xl text-ink mb-3">
                            When do Pro and Ultra Pro launch?
                        </h3>
                        <p className="font-manrope text-ink font-medium">
                            Soon! We are finalizing the AI features. Keep an eye on your Dashboard for the official announcement.
                        </p>
                    </div>

                    <div className="bg-white border-2 border-ink shadow-[4px_4px_0px_var(--color-ink)] rounded-2xl p-6">
                        <h3 className="font-bricolage font-bold text-xl text-ink mb-3">
                            Can I cancel anytime?
                        </h3>
                        <p className="font-manrope text-ink font-medium">
                            Yes. Once paid plans are live, you'll be able to manage or cancel your subscription at any time right from your Account Settings with just two taps.
                        </p>
                    </div>

                    <div className="bg-white border-2 border-ink shadow-[4px_4px_0px_var(--color-ink)] rounded-2xl p-6">
                        <h3 className="font-bricolage font-bold text-xl text-ink mb-3">
                            What happens if I stay on Free?
                        </h3>
                        <p className="font-manrope text-ink font-medium">
                            Nothing — Free is free forever. No countdown, no forced upgrade. You can keep leveling up and earning XP just like always.
                        </p>
                    </div>

                </div>
            </section>

        </main>
    );
}