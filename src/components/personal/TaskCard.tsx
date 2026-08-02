"use client";

import { useState } from "react";
import { IPersonalTask, usePersonalStore } from "@/store/usePersonalStore";
import { Check, Clock, ChevronDown, ChevronUp, Edit2, Trash2, Plus } from "lucide-react";

export default function TaskCard({ task, onEdit }: { task: IPersonalTask, onEdit: () => void }) {
    const { toggleTaskStatus, deleteTask, toggleSubtaskStatus, addSubtask, deleteSubtask } = usePersonalStore();
    const [isExpanded, setIsExpanded] = useState(false);
    const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

    const isCompleted = task.status === 'completed';
    const isOverdue = task.end_time && task.status === 'active' ? new Date(task.end_time) < new Date() : false;

    const completedSubtasks = task.subtasks.filter(st => st.is_completed).length;

    const getPriorityConfig = (val: number) => {
        switch (val) {
            case 1: return { label: "Chill", classes: "bg-cloud/50 text-ink/70 border-ink/20" };
            case 2: return { label: "Low", classes: "bg-cloud text-ink border-ink/40" };
            case 3: return { label: "Normal", classes: "bg-white text-ink border-ink/40" };
            case 4: return { label: "High", classes: "bg-quest-gold text-ink border-ink" };
            case 5: return { label: "Critical", classes: "bg-puzzle-red text-white border-puzzle-red" };
            default: return { label: "Normal", classes: "bg-white text-ink border-ink/40" };
        }
    };

    const priority = getPriorityConfig(task.weightage);

    const handleAddSubtask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSubtaskTitle.trim()) return;
        addSubtask(task.id, { title: newSubtaskTitle.trim(), order: task.subtasks.length + 1 });
        setNewSubtaskTitle("");
    };

    return (
        <div className={`relative bg-white border-2 border-ink rounded-xl transition-all duration-300 ${isCompleted ? 'opacity-70 bg-cloud/20' : 'shadow-[4px_4px_0px_var(--color-ink)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--color-ink)]'}`}>

            {/* MAIN CARD ROW */}
            <div
                className="p-4 sm:p-5 flex items-start gap-3 sm:gap-4 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {/* Complete Checkbox */}
                <button
                    onClick={(e) => { e.stopPropagation(); toggleTaskStatus(task.id); }}
                    className={`shrink-0 w-6 h-6 mt-0.5 border-2 border-ink rounded transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-sync-teal focus:ring-offset-2 ${isCompleted ? 'bg-sync-teal border-sync-teal text-white' : 'bg-white hover:bg-sync-teal/20'}`}
                >
                    {isCompleted && <Check size={14} strokeWidth={4} />}
                </button>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                        <h3 className={`font-body font-bold text-lg truncate ${isCompleted ? 'line-through text-ink/50' : 'text-ink'}`}>
                            {task.title}
                        </h3>

                        {/* Badges / Metadata */}
                        <div className="flex items-center gap-3 shrink-0">
                            <span className={`font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded border-2 ${priority.classes} ${isCompleted ? 'opacity-50' : ''}`}>
                                {priority.label}
                            </span>

                            {task.subtasks.length > 0 && (
                                <span className="font-mono text-[10px] font-bold bg-cloud px-1.5 py-0.5 rounded border border-ink/20">
                                    {completedSubtasks}/{task.subtasks.length}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono font-bold uppercase">
                        {task.end_time && (
                            <div className={`flex items-center gap-1 ${isOverdue ? 'text-puzzle-red' : 'text-ink/50'}`}>
                                <Clock size={12} />
                                {isOverdue ? "Overdue" : new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(task.end_time))}
                            </div>
                        )}
                        {!task.end_time && <span className="text-ink/30">No deadline</span>}
                    </div>
                </div>

                {/* Expand Icon */}
                <div className="shrink-0 mt-1 text-ink/40">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </div>

            {/* EXPANDED DETAILS */}
            {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-2 border-t-2 border-ink/10 bg-parchment/50 rounded-b-xl cursor-default">
                    {task.desc && (
                        <p className="font-body text-sm text-ink/80 mb-4 whitespace-pre-wrap">{task.desc}</p>
                    )}

                    {/* Subtasks Section */}
                    <div className="mb-6 flex flex-col gap-2">
                        <h4 className="font-mono text-xs font-bold text-ink/50 uppercase mb-1">Checklist</h4>

                        {task.subtasks.map(sub => (
                            <div key={sub.subtask_id} className="flex items-center gap-3 group">
                                <button
                                    onClick={() => toggleSubtaskStatus(task.id, sub.subtask_id)}
                                    className={`w-4 h-4 rounded border-2 border-ink flex items-center justify-center transition-colors ${sub.is_completed ? 'bg-ink text-white' : 'bg-white'}`}
                                >
                                    {sub.is_completed && <Check size={10} strokeWidth={4} />}
                                </button>
                                <span className={`font-body text-sm flex-1 ${sub.is_completed ? 'line-through text-ink/40' : 'text-ink'}`}>
                                    {sub.title}
                                </span>

                                <button
                                    onClick={() => deleteSubtask(task.id, sub.subtask_id)}
                                    className="text-puzzle-red/70 hover:text-puzzle-red hover:bg-puzzle-red/10 p-1.5 rounded transition-all sm:opacity-0 sm:group-hover:opacity-100"
                                    aria-label="Delete subtask"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}

                        {/* Quick Add Subtask */}
                        <form onSubmit={handleAddSubtask} className="flex items-center gap-2 mt-1">
                            <Plus size={14} className="text-ink/40 ml-0.5" />
                            <input
                                type="text"
                                placeholder="Add subtask..."
                                value={newSubtaskTitle}
                                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                                className="flex-1 bg-transparent border-none text-sm font-body focus:outline-none placeholder:text-ink/40"
                            />
                        </form>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t-2 border-ink/10">
                        <button
                            onClick={onEdit}
                            className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold uppercase border-2 border-ink rounded hover:bg-cloud transition-colors"
                        >
                            <Edit2 size={12} /> Edit
                        </button>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold uppercase border-2 border-puzzle-red text-puzzle-red rounded hover:bg-puzzle-red hover:text-white transition-colors"
                        >
                            <Trash2 size={12} /> Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}