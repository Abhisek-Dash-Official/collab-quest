import Link from "next/link";
import { Check, X, Flame, Star } from "lucide-react";
import WaitlistButton from "./WaitlistButton";

type PricingFeature = {
    text: string;
    isMissing?: boolean;
    isHighlighted?: boolean;
};

interface PricingCardProps {
    tier: "free" | "pro" | "ultra";
    badge?: React.ReactNode;
    badgeAccent?: string;
    kicker: string;
    price: string;
    interval?: string;
    valueLine?: string;
    featuresHeader?: string;
    features: PricingFeature[];
    ctaLabel: string;
}

export default function PricingCard({
    tier,
    badge,
    badgeAccent,
    kicker,
    price,
    interval,
    valueLine,
    featuresHeader,
    features,
    ctaLabel,
}: PricingCardProps) {
    const isFree = tier === "free";
    const isPro = tier === "pro";
    const isUltra = tier === "ultra";

    const cardBase = "relative flex flex-col p-6 md:p-8 transition-all duration-300";
    const freeStyles = "bg-[var(--color-cloud)] border border-[var(--color-ink)]/20 shadow-sm rounded-[24px]";
    const proStyles = "bg-white border-2 border-[var(--color-ink)] shadow-[6px_6px_0px_var(--color-ink)] rounded-[24px]";
    const ultraStyles = "bg-white border-[3px] border-[var(--color-quest-gold)] shadow-[8px_8px_0px_var(--color-quest-gold)] rounded-[24px] lg:scale-105 lg:-mt-6 z-10";

    return (
        <div className={`${cardBase} ${isFree ? freeStyles : isPro ? proStyles : ultraStyles}`}>

            {/* Badges */}
            <div className="flex justify-between items-start mb-6">
                {badge && (
                    <span className={`inline-flex items-center gap-1.5 font-bricolage font-bold text-xs uppercase tracking-wider py-1 px-3 rounded-full border-2 border-ink ${badgeAccent ? badgeAccent : 'bg-white'}`}>
                        {badge}
                    </span>
                )}
                {isUltra && (
                    <span className="inline-flex items-center gap-1.5 bg-quest-gold border-2 border-ink font-bricolage font-bold text-xs uppercase tracking-wider py-1 px-3 rounded-full shadow-[2px_2px_0px_var(--color-ink)] rotate-2">
                        <Star className="w-3.5 h-3.5 fill-current shrink-0" /> Best Value
                    </span>
                )}
            </div>

            {/* Header Info */}
            <div className="mb-6">
                <h3 className="font-bricolage font-bold text-xl text-ink mb-2">
                    {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </h3>
                <p className="font-manrope text-sm text-ink/70 font-medium h-5">
                    {kicker}
                </p>
            </div>

            {/* Pricing */}
            <div className="mb-2 flex items-baseline gap-2">
                <span className={`font-mono font-bold text-ink ${isUltra ? 'text-6xl' : 'text-5xl'}`}>
                    {price}
                </span>
                {interval && (
                    <span className="font-manrope text-ink/70 font-medium">
                        /{interval}
                    </span>
                )}
            </div>

            {/* Value Anchor Line */}
            <div className="min-h-6 mb-8">
                {valueLine && (
                    <p className="font-manrope text-sm font-bold text-ink">
                        {valueLine}
                    </p>
                )}
            </div>

            {/* Features List */}
            <div className="grow flex flex-col gap-4 mb-8">
                {featuresHeader && (
                    <p className="font-bricolage font-bold text-sm text-ink border-b-2 border-ink/10 pb-2">
                        {featuresHeader}
                    </p>
                )}
                <ul className="space-y-4">
                    {features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            {feat.isMissing ? (
                                <X className="w-5 h-5 shrink-0 text-gray-400 mt-0.5" aria-hidden="true" />
                            ) : feat.isHighlighted ? (
                                <Flame className="w-5 h-5 shrink-0 text-quest-gold-deep mt-0.5" aria-hidden="true" />
                            ) : (
                                <Check className="w-5 h-5 shrink-0 text-sync-teal mt-0.5" aria-hidden="true" />
                            )}

                            {feat.isMissing ? (
                                <span className="font-manrope text-gray-500 line-through opacity-70">
                                    <span className="sr-only">Not included: </span>{feat.text}
                                </span>
                            ) : feat.isHighlighted ? (
                                <span className="font-manrope font-bold text-ink bg-quest-gold/20 border border-quest-gold px-2 py-1 rounded-md inline-block">
                                    {feat.text}
                                </span>
                            ) : (
                                <span className="font-manrope text-ink font-medium">
                                    {feat.text}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* CTAs */}
            <div className="mt-auto pt-4">
                {isFree ? (
                    <Link
                        href="/signup"
                        className="block text-center w-full bg-white border-2 border-ink font-bricolage font-bold text-lg text-ink py-3 px-6 rounded-xl hover:bg-cloud transition-colors focus-visible:ring-4 focus-visible:ring-ink"
                    >
                        {ctaLabel}
                    </Link>
                ) : (
                    <WaitlistButton label={ctaLabel} variant={isPro ? "pro" : "ultra"} />
                )}
            </div>
        </div>
    );
}