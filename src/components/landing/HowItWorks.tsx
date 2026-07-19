export default function HowItWorks() {
    const steps = [
        {
            num: "01",
            title: "Create Your Character",
            desc: "Sign up in seconds and set up your profile. Pick your workspace: Personal for solo missions, Group to assemble your team."
        },
        {
            num: "02",
            title: "Choose Your Quest",
            desc: "Add tasks, set deadlines, and organize projects. Assign work to teammates, or keep it all to yourself."
        },
        {
            num: "03",
            title: "Nudge & Collaborate",
            desc: "Waiting on a teammate? Send a Nudge. Watch tasks move from 'To-Do' to 'Done' in real time."
        },
        {
            num: "04",
            title: "Level Up & Claim Glory",
            desc: "Complete tasks to earn XP, climb your tier, and unlock badges. Check the leaderboard to see how you stack up."
        }
    ];

    return (
        <section id="how-it-works" className="py-16 md:py-24 px-6 bg-cloud border-y-2 border-ink">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-center mb-12 md:mb-20">How It Works</h2>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6.75 md:left-9.75 top-4 bottom-4 w-1 bg-ink"></div>

                    <div className="flex flex-col gap-8 md:gap-12">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative flex items-start gap-4 md:gap-8 z-10">
                                <div className="w-14 h-14 md:w-20 md:h-20 shrink-0 bg-quest-gold border-2 border-ink rounded-full shadow-[2px_2px_0_var(--color-ink)] md:shadow-[4px_4px_0_var(--color-ink)] flex items-center justify-center font-mono font-bold text-lg md:text-2xl text-ink">
                                    {step.num}
                                </div>
                                <div className="mt-1 md:mt-2 bg-white border-2 border-ink rounded-2xl p-4 md:p-6 shadow-hard flex-1 hover:-translate-y-1 transition-transform">
                                    <h3 className="font-display font-bold text-xl md:text-2xl mb-2">{step.title}</h3>
                                    <p className="font-body font-medium text-ink/80 text-sm md:text-lg leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}