import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IPersonalSubtask {
  subtask_id: string;
  title: string;
  short_desc?: string;
  order: number;
  is_completed: boolean;
}

export interface IPersonalTask {
  id: string;
  title: string;
  desc?: string;
  start_time?: string;
  end_time?: string;
  weightage: number;
  status: 'active' | 'completed';
  reminders_before_end: number[]; // Array of minutes (e.g., [15, 60] for 15 mins and 1 hr before)
  subtasks: IPersonalSubtask[];
  created_at: string;
}

interface PersonalStore {
  tasks: IPersonalTask[];
  addTask: (task: Omit<IPersonalTask, 'id' | 'created_at' | 'status'>) => void;
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
  getTodaysTasks: () => IPersonalTask[]; 
}

export const usePersonalStore = create<PersonalStore>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (taskData) => set((state) => ({
        tasks: [
          ...state.tasks,
          {
            ...taskData,
            id: crypto.randomUUID(),
            status: 'active',
            created_at: new Date().toISOString(),
          }
        ]
      })),

      completeTask: (id) => set((state) => ({
        tasks: state.tasks.map(task => 
          task.id === id ? { ...task, status: 'completed' } : task
        )
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      })),

      getTodaysTasks: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return get().tasks.filter(task => {
          if (task.status !== 'active' || !task.end_time) return false;
          const dueDate = new Date(task.end_time);
          return dueDate < tomorrow; 
        });
      }
    }),
    {
      name: 'collab-quest-personal-storage',
    }
  )
);