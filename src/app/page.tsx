import { Metadata } from 'next';
import { Bricolage_Grotesque, Manrope, Space_Mono } from 'next/font/google';

import Nav from '@/components/landing/Nav';
import Hero from '@/components/landing/Hero';
import Hook from '@/components/landing/Hook';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import BottomCta from '@/components/landing/BottomCta';
import Footer from '@/components/landing/Footer';

// Font Setup
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['700', '800'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Collab Quest | Productivity, Gamified',
  description: 'Turn your to-do list into your next quest. Collab Quest is the gamified task manager for teams and solo grinders. Earn XP, unlock badges, and get things done.',
  openGraph: {
    title: 'Collab Quest | Productivity, Gamified',
    description: 'Turn your to-do list into your next quest. Earn XP, unlock badges, and get things done.',
    type: 'website',
  }
};

export default function LandingPage() {
  return (
    <div className={`${bricolage.variable} ${manrope.variable} ${spaceMono.variable} min-h-screen font-body flex flex-col`}>
      <Nav />
      <main className="grow">
        <Hero />
        <Hook />
        <Features />
        <HowItWorks />
        <BottomCta />
        <Footer />
      </main>
    </div>
  );
}