import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav"

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-parchment">
            <Header />
            <main className="grow max-w-7xl mx-auto w-full">
                {children}
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
}