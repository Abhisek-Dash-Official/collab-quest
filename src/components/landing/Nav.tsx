"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-parchment/90 backdrop-blur-md border-b-2 border-ink">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 cursor-pointer z-50">
                    <Image src="/logo.png" alt="Collab Quest Logo" width={40} height={40} className="object-contain" />
                    <span className="font-display font-extrabold text-xl md:text-2xl text-ink tracking-tight">Collab Quest</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 font-body font-bold">
                    <a href="#features" className="text-ink hover:text-sync-teal transition-colors">Features</a>
                    <a href="#how-it-works" className="text-ink hover:text-sync-teal transition-colors">How It Works</a>
                    <Link href="/dashboard" className="px-6 py-2 bg-white border-2 border-ink rounded-full shadow-[2px_2px_0_var(--color-ink)] hover:shadow-none hover:translate-y-0.5 transition-all font-display font-bold">
                        Start Free
                    </Link>
                </div>

                {/* Mobile Toggle Button */}
                <button
                    type="button"
                    className="md:hidden relative z-60 p-2 -mr-2 text-ink active:scale-95 transition-transform"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={32} strokeWidth={2.5} /> : <Menu size={32} strokeWidth={2.5} />}
                </button>
            </div>

            {/* Mobile Nav Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-parchment border-b-2 border-ink p-6 flex flex-col gap-6 font-body font-bold text-lg shadow-hard-lg z-40">
                    <a href="#features" onClick={() => setIsOpen(false)}>Features</a>
                    <a href="#how-it-works" onClick={() => setIsOpen(false)}>How It Works</a>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)} className="px-6 py-3 bg-white border-2 border-ink rounded-2xl text-center w-full shadow-hard active:shadow-none active:translate-y-1 transition-all">
                        Start Free
                    </Link>
                </div>
            )}
        </nav>
    );
}