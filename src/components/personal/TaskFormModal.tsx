"use client";

import { useState, useEffect } from "react";
import { usePersonalStore } from "@/store/usePersonalStore";
import { X, Save } from "lucide-react";

interface ModalProps {
    taskId: string | null;
    onClose: () => void;
}

export default function TaskFormModal({ taskId, onClose }: ModalProps) {
    const { tasks, addTask, updateTask } = usePersonalStore();

    const getDefaultEndTime = () => {
        const today = new Date();
        today.setHours(23, 59, 0, 0);
        const tzOffset = today.getTimezoneOffset() * 60000;
        return new Date(today.getTime() - tzOffset).toISOString().slice(0, 16);
    };

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [weightage, setWeightage] = useState(3);
    const [endTime, setEndTime] = useState(taskId ? "" : getDefaultEndTime());

    useEffect(() => {
        if (taskId) {
            const existing = tasks.find(t => t.id === taskId);
            if (existing) {
                setTitle(existing.title);
                setDesc(existing.desc || "");
                setWeightage(existing.weightage);
                if (existing.end_time) {
                    const date = new Date(existing.end_time);
                    const tzOffset = date.getTimezoneOffset() * 60000;
                    const localISOTime = (new Date(date.getTime() - tzOffset)).toISOString().slice(0, 16);
                    setEndTime(localISOTime);
                } else {
                    setEndTime("");
                }
            }
        }
    }, [taskId, tasks]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const payload = {
            title: title.trim(),
            desc: desc.trim() || undefined,
            weightage,
            end_time: endTime ? new Date(endTime).toISOString() : undefined,
        };

        if (taskId) {
            updateTask(taskId, payload);
        } else {
            addTask(payload);
        }

        onClose();
    };

    const getPriorityLabel = (val: number) => {
        switch (val) {
            case 1: return "Chill";
            case 2: return "Low";
            case 3: return "Normal";
            case 4: return "High";
            case 5: return "Critical";
            default: return "";
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink/40 backdrop-blur-sm">
            <div className="w-full max-w-xl bg-white border-t-2 sm:border-2 border-ink rounded-t-2xl sm:rounded-2xl shadow-[0_-8px_0px_rgba(0,0,0,0.1)] sm:shadow-[8px_8px_0px_var(--color-ink)] flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 border-ink bg-parchment rounded-t-2xl sm:rounded-t-[14px]">
                    <h2 className="font-display font-extrabold text-2xl text-ink">
                        {taskId ? "Edit Quest" : "New Quest"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-cloud rounded-lg transition-colors border-2 border-transparent hover:border-ink"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="flex flex-col p-4 sm:p-6 overflow-y-auto custom-scrollbar gap-5">

                    <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-xs font-bold text-ink uppercase">Quest Title *</label>
                        <input
                            autoFocus
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="E.g., Finish Math Assignment"
                            className="w-full bg-cloud/30 border-2 border-ink rounded-xl px-4 py-3 font-body font-bold text-ink focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_var(--color-ink)] transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-xs font-bold text-ink uppercase">Description</label>
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Any extra details..."
                            rows={3}
                            className="w-full bg-cloud/30 border-2 border-ink rounded-xl px-4 py-3 font-body text-sm text-ink focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_var(--color-ink)] transition-all resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {/* End Time Input */}
                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs font-bold text-ink uppercase">Deadline (Optional)</label>
                            <input
                                type="datetime-local"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full bg-cloud/30 border-2 border-ink rounded-xl px-3 py-3 font-mono text-sm font-bold text-ink focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_var(--color-ink)] transition-all"
                            />
                        </div>

                        {/* Priority UI */}
                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs font-bold text-ink uppercase">
                                Priority <span className="text-ink/50 lowercase ml-1">({getPriorityLabel(weightage)})</span>
                            </label>
                            <div className="flex items-center gap-1.5 w-full">
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setWeightage(val)}
                                        className={`flex-1 py-2.5 rounded-lg font-mono font-bold text-sm border-2 transition-all duration-200 ${weightage === val
                                            ? 'bg-quest-gold border-ink shadow-[2px_2px_0px_var(--color-ink)] text-ink -translate-y-0.5'
                                            : 'bg-cloud/30 border-transparent text-ink/50 hover:bg-cloud/60'
                                            }`}
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>

                </form>

                {/* Save Button */}
                <div className="p-4 sm:p-6 border-t-2 border-ink bg-parchment mt-auto rounded-b-none sm:rounded-b-[14px]">
                    <button
                        onClick={handleSubmit}
                        className="w-full flex items-center justify-center gap-2 bg-sync-teal text-white border-2 border-ink shadow-[4px_4px_0px_var(--color-ink)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--color-ink)] active:translate-y-1 active:shadow-[0px_0px_0px_var(--color-ink)] transition-all px-6 py-3.5 font-body font-bold text-lg rounded-xl"
                    >
                        <Save size={20} />
                        {taskId ? "Update Quest" : "Save Quest"}
                    </button>
                </div>

            </div>
        </div>
    );
}