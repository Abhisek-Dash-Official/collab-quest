import MobileTOC from "./MobileTOC";

type Section = {
    id: string;
    heading: string;
    body: string;
};

interface LegalPageLayoutProps {
    title: string;
    lastUpdated: string;
    sections: Section[];
}

export default function LegalPageLayout({ title, lastUpdated, sections }: LegalPageLayoutProps) {
    return (
        <main className="min-h-screen bg-parchment py-12 md:py-24 px-6 text-ink">

            <article className="max-w-5xl mx-auto">
                <header className="mb-12 lg:mb-16">
                    <h1 className="font-bricolage text-4xl md:text-5xl font-semibold mb-4">
                        {title}
                    </h1>
                    <p className="font-manrope text-lg text-gray-600 font-medium">
                        Last updated: {lastUpdated}
                    </p>
                </header>

                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Mobile TOC */}
                    <div className="w-full lg:hidden">
                        <MobileTOC sections={sections} />
                    </div>

                    {/* Desktop Sticky Sidebar */}
                    <aside className="hidden lg:block w-72 shrink-0 sticky top-24">
                        <nav aria-label="Table of Contents">
                            <h2 className="font-bricolage font-bold text-lg border-b-2 border-ink pb-2 mb-4">
                                Table of Contents
                            </h2>
                            <ul className="flex flex-col gap-3">
                                {sections.map((section, index) => (
                                    <li key={section.id}>
                                        <a
                                            href={`#${section.id}`}
                                            className="font-manrope font-medium text-gray-700 hover:text-ink hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded"
                                        >
                                            {index + 1}. {section.heading}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <div className="w-full max-w-[70ch] flex flex-col gap-12">
                        {sections.map((section, index) => (
                            <section key={section.id} id={section.id} className="scroll-mt-24">
                                <h2 className="font-bricolage text-2xl font-semibold mb-4">
                                    {index + 1}. {section.heading}
                                </h2>
                                <div className="font-manrope text-lg leading-relaxed whitespace-pre-wrap">
                                    {section.body}
                                </div>
                            </section>
                        ))}
                    </div>

                </div>
            </article>
        </main>
    );
}