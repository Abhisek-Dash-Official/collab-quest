import { ListX, BellOff, Ghost } from 'lucide-react';

export default function Hook() {
    return (
        <section className="py-16 md:py-24 px-6 bg-cloud border-y-2 border-ink relative">
            <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
                <span className="font-display font-bold text-puzzle-red text-base md:text-lg mb-4 block">Let's Be Honest</span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink max-w-2xl mb-6 leading-tight">
                    Your To-Do List Is Boring You Into Procrastination
                </h2>
                <p className="font-body font-medium text-base md:text-lg max-w-3xl mb-12 md:mb-16">
                    Sticky notes you ignore. Reminders you swipe away without reading. Group projects where three people carry the work and eight people 'forgot.' Sound familiar?
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full text-left">
                    {/* Card 1 */}
                    <div className="bg-white border-2 border-ink rounded-2xl p-6 md:p-8 shadow-hard hover:shadow-hard-lg transition-shadow">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-parchment border-2 border-ink rounded-full flex items-center justify-center mb-6">
                            <ListX size={24} strokeWidth={2.5} className="text-ink" />
                        </div>
                        <h3 className="font-display font-bold text-xl md:text-2xl mb-3">Endless Lists</h3>
                        <p className="font-body font-medium text-ink/80 text-sm md:text-base">Tasks pile up. Motivation doesn't.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border-2 border-ink rounded-2xl p-6 md:p-8 shadow-hard hover:shadow-hard-lg transition-shadow">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-parchment border-2 border-ink rounded-full flex items-center justify-center mb-6">
                            <BellOff size={24} strokeWidth={2.5} className="text-ink" />
                        </div>
                        <h3 className="font-display font-bold text-xl md:text-2xl mb-3">Ignored Reminders</h3>
                        <p className="font-body font-medium text-ink/80 text-sm md:text-base">You've trained yourself to dismiss every notification on sight.</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border-2 border-ink rounded-2xl p-6 md:p-8 shadow-hard hover:shadow-hard-lg transition-shadow">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-parchment border-2 border-ink rounded-full flex items-center justify-center mb-6">
                            <Ghost size={24} strokeWidth={2.5} className="text-ink" />
                        </div>
                        <h3 className="font-display font-bold text-xl md:text-2xl mb-3">Task Ghosting</h3>
                        <p className="font-body font-medium text-ink/80 text-sm md:text-base">Teammates go quiet. Deadlines slip. Nobody's accountable.</p>
                    </div>
                </div>

                <div className="mt-12 md:mt-16 inline-block bg-quest-gold border-2 border-ink rounded-xl px-6 py-4 shadow-hard transform md:rotate-1">
                    <p className="font-display font-bold text-lg md:text-xl text-ink">
                        It's not you. It's your tools. Collab Quest turns 'I'll do it later' into 'I need that XP.'
                    </p>
                </div>
            </div>
        </section>
    );
}