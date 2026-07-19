import Link from "next/link";
import { footerLinkGroups } from "@/config/nav";
import { siteLogo, siteName } from "@/config/site";

export default function Footer() {
    return (
        <footer className="bg-parchment border-t-2 border-ink py-12 px-4 sm:px-6 lg:px-8 font-body pb-24 md:pb-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

                <div className="flex flex-col gap-4 md:col-span-1">
                    <Link href="/" className="font-display font-bold text-2xl text-ink tracking-tight flex items-center gap-2">
                        <img src={siteLogo} alt={siteName} className="w-6 h-6 object-contain" />
                        {siteName}
                    </Link>
                    <p className="text-ink/70 font-medium text-sm">
                        Where Deadlines Become Quests.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:col-span-3">
                    {footerLinkGroups.map((group) => (
                        <div key={group.title} className="flex flex-col gap-4">
                            <h3 className="font-bold text-ink tracking-wide">{group.title}</h3>
                            <ul className="flex flex-col gap-3">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm font-medium text-ink/70 hover:text-quest-gold-deep transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t-2 border-ink/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-ink/60 font-medium">
                    &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}