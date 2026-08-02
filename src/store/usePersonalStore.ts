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
  weightage: number; // 1 (Low) to 5 (Critical)
  status: 'active' | 'completed';
  subtasks: IPersonalSubtask[];
  created_at: string;
}

export type FilterOption = 'all' | 'active' | 'completed';
export type SortOption = 'deadline' | 'weightage' | 'created_at';

interface PersonalStore {
  tasks: IPersonalTask[];
  
  addTask: (task: Omit<IPersonalTask, 'id' | 'created_at' | 'status' | 'subtasks'>) => void;
  updateTask: (id: string, updates: Partial<IPersonalTask>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;

  addSubtask: (taskId: string, subtask: Omit<IPersonalSubtask, 'subtask_id' | 'is_completed'>) => void;
  updateSubtask: (taskId: string, subtaskId: string, updates: Partial<IPersonalSubtask>) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  toggleSubtaskStatus: (taskId: string, subtaskId: string) => void;

  getTodaysTasks: () => IPersonalTask[];
  getTasks: (filter?: FilterOption, sort?: SortOption) => IPersonalTask[];
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
            subtasks: [],
            created_at: new Date().toISOString(),
          }
        ]
      })),

      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map(task => 
          task.id === id ? { ...task, ...updates } : task
        )
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      })),

      toggleTaskStatus: (id) => set((state) => ({
        tasks: state.tasks.map(task => 
          task.id === id 
            ? { ...task, status: task.status === 'active' ? 'completed' : 'active' } 
            : task
        )
      })),

      addSubtask: (taskId, subtaskData) => set((state) => ({
        tasks: state.tasks.map(task => {
          if (task.id !== taskId) return task;
          return {
            ...task,
            subtasks: [
              ...task.subtasks,
              {
                ...subtaskData,
                subtask_id: crypto.randomUUID(),
                is_completed: false
              }
            ].sort((a, b) => a.order - b.order)
          };
        })
      })),

      updateSubtask: (taskId, subtaskId, updates) => set((state) => ({
        tasks: state.tasks.map(task => {
          if (task.id !== taskId) return task;
          return {
            ...task,
            subtasks: task.subtasks.map(sub => 
              sub.subtask_id === subtaskId ? { ...sub, ...updates } : sub
            ).sort((a, b) => a.order - b.order)
          };
        })
      })),

      deleteSubtask: (taskId, subtaskId) => set((state) => ({
        tasks: state.tasks.map(task => {
          if (task.id !== taskId) return task;
          return {
            ...task,
            subtasks: task.subtasks.filter(sub => sub.subtask_id !== subtaskId)
          };
        })
      })),

      toggleSubtaskStatus: (taskId, subtaskId) => set((state) => ({
        tasks: state.tasks.map(task => {
          if (task.id !== taskId) return task;
          return {
            ...task,
            subtasks: task.subtasks.map(sub => 
              sub.subtask_id === subtaskId 
                ? { ...sub, is_completed: !sub.is_completed } 
                : sub
            )
          };
        })
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
      },

      getTasks: (filter = 'all', sort = 'created_at') => {
        let filteredTasks = [...get().tasks];

        if (filter !== 'all') {
          filteredTasks = filteredTasks.filter(task => task.status === filter);
        }

        filteredTasks.sort((a, b) => {
          if (sort === 'deadline') {
            if (!a.end_time) return 1;
            if (!b.end_time) return -1;
            return new Date(a.end_time).getTime() - new Date(b.end_time).getTime();
          }
          if (sort === 'weightage') {
            return b.weightage - a.weightage;
          }
          if (sort === 'created_at') {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          }
          return 0;
        });

        return filteredTasks;
      }
    }),
    {
      name: 'collab-quest-personal-storage',
    }
  )
);