import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-ink text-parchment pt-16 pb-8 px-6 border-t-2 border-ink">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-12">

                {/* Brand */}
                <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border-2 border-ink">
                        <Image src="/logo.png" alt="Collab Quest" width={24} height={24} className="object-contain" />
                        <span className="font-display font-extrabold text-lg text-ink">Collab Quest</span>
                    </div>
                    <p className="font-display font-bold text-xl">Where Deadlines Become Quests.</p>
                </div>

                {/* Action / Nav */}
                <div className="flex flex-col items-center md:items-end gap-4">
                    <Link href="/dashboard" className="bg-quest-gold hover:bg-quest-gold-deep text-ink font-display font-bold px-6 py-3 rounded-lg border-2 border-ink transition-colors shadow-hard active:shadow-none active:translate-y-0.5">
                        Start Playing — Free
                    </Link>
                    <p className="font-body text-sm font-medium text-parchment/60 mt-2">No credit card required.</p>
                </div>
            </div>

            <div className="border-t-2 border-parchment/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-body text-xs md:text-sm font-medium text-parchment/60 text-center">
                <p>&copy; {new Date().getFullYear()} Collab Quest. All rights reserved.</p>
                <p>Built for people who'd rather level up than burn out.</p>
            </div>
        </footer>
    );
}