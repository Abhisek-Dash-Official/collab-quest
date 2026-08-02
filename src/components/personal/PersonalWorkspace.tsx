"use client";

import { useState, useEffect } from "react";
import { usePersonalStore, FilterOption, SortOption } from "@/store/usePersonalStore";
import { Plus, ListTodo, Calendar } from "lucide-react";
import TaskCard from "./TaskCard";
import TaskFormModal from "./TaskFormModal";

export default function PersonalWorkspace() {
    const { getTasks, getTodaysTasks } = usePersonalStore();
    const [isHydrated, setIsHydrated] = useState(false);

    const [activeTab, setActiveTab] = useState<FilterOption>('all');
    const [activeSort, setActiveSort] = useState<SortOption>('created_at');
    const [showTodayOnly, setShowTodayOnly] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    let displayTasks = isHydrated ? getTasks(activeTab, activeSort) : [];
    if (showTodayOnly && isHydrated) {
        displayTasks = getTodaysTasks();
    }

    const openNewTaskModal = () => {
        setEditingTaskId(null);
        setIsModalOpen(true);
    };

    return (
        <>
            {/* HEADER & TOOLBAR */}
            <section className="flex flex-col gap-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <span className="font-mono font-bold text-xs uppercase text-sync-teal bg-sync-teal/10 px-2 py-1 rounded border-2 border-sync-teal/20 mb-3 inline-block">
                            SOLO
                        </span>
                        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-ink leading-tight">
                            Personal Workspace
                        </h1>
                    </div>

                    {/* Desktop Add Button */}
                    <button
                        onClick={openNewTaskModal}
                        className="hidden md:flex items-center gap-2 bg-sync-teal text-white border-2 border-ink shadow-[4px_4px_0px_var(--color-ink)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all px-6 py-3 font-body font-bold text-lg rounded-xl"
                    >
                        <Plus size={20} strokeWidth={3} />
                        New Quest
                    </button>
                </div>

                {/* CONTROLS (Tabs & Filters) */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border-2 border-ink shadow-[4px_4px_0px_var(--color-ink)] p-2 rounded-xl">
                    <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto custom-scrollbar pb-1 sm:pb-0">
                        {(['all', 'active', 'completed'] as FilterOption[]).map(tab => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setShowTodayOnly(false); }}
                                className={`px-4 py-2 font-mono font-bold text-sm capitalize rounded-lg transition-colors border-2 ${activeTab === tab && !showTodayOnly
                                    ? "bg-sync-teal/10 border-sync-teal text-sync-teal"
                                    : "bg-transparent border-transparent text-ink/60 hover:bg-cloud/50 hover:text-ink"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                        <div className="w-px h-6 bg-ink/20 mx-2 hidden sm:block" />
                        <button
                            onClick={() => { setShowTodayOnly(true); setActiveTab('all'); }}
                            className={`flex items-center gap-1 px-4 py-2 font-mono font-bold text-sm rounded-lg transition-colors border-2 ${showTodayOnly
                                ? "bg-quest-gold/20 border-quest-gold text-ink"
                                : "bg-transparent border-transparent text-ink/60 hover:bg-cloud/50 hover:text-ink"
                                }`}
                        >
                            <Calendar size={14} />
                            Today
                        </button>
                    </div>

                    <div className="flex items-center gap-2 px-2 w-full sm:w-auto">
                        <span className="font-mono text-xs font-bold text-ink/50 uppercase">Sort:</span>
                        <select
                            value={activeSort}
                            onChange={(e) => setActiveSort(e.target.value as SortOption)}
                            className="bg-transparent font-mono font-bold text-sm text-ink outline-none cursor-pointer"
                        >
                            <option value="created_at">Newest First</option>
                            <option value="deadline">Deadline</option>
                            <option value="weightage">Priority</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* TASK LIST */}
            <section className="flex flex-col gap-4 mt-2">
                {!isHydrated ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-24 bg-cloud/40 animate-pulse rounded-xl border-2 border-transparent" />
                    ))
                ) : displayTasks.length > 0 ? (
                    displayTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={() => { setEditingTaskId(task.id); setIsModalOpen(true); }}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-ink/20 rounded-xl p-12 text-center">
                        <div className="w-16 h-16 bg-cloud rounded-full flex items-center justify-center mb-4 text-ink/30">
                            <ListTodo size={32} />
                        </div>
                        <h3 className="font-display font-bold text-xl mb-2">No quests found</h3>
                        <p className="font-body text-sm text-ink/60 max-w-sm mb-6">
                            {showTodayOnly ? "Your schedule is clear for today!" : "Your quest log is empty. Ready to start your first one?"}
                        </p>
                        <button
                            onClick={openNewTaskModal}
                            className="text-sync-teal font-bold font-mono uppercase text-sm hover:underline underline-offset-4"
                        >
                            + Add a Quest
                        </button>
                    </div>
                )}
            </section>

            {/* MOBILE FAB */}
            <button
                onClick={openNewTaskModal}
                className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-sync-teal text-white border-2 border-ink rounded-full flex items-center justify-center shadow-[4px_4px_0px_var(--color-ink)] active:translate-y-1 active:shadow-[0px_0px_0px_var(--color-ink)] transition-all z-40"
                aria-label="New Quest"
            >
                <Plus size={24} strokeWidth={3} />
            </button>

            {/* MODAL */}
            {isModalOpen && (
                <TaskFormModal
                    taskId={editingTaskId}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}