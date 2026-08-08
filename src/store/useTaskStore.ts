import { create } from 'zustand';

export interface Subtask {
  sub_id: string;
  title: string;
  short_desc?: string;
  order?: number;
}

export interface Completion {
  uid: string;
  completed_at: string | Date;
  order: number;
  xp_earned: number;
  respect_likes: string[];
}

export interface NudgedUser {
  uid: string;
  nudge_count: number;
  nudged_at: string | Date;
}

export interface TaskItem {
  _id: string;
  group_id: string;
  title: string;
  desc?: string;
  weightage: number;
  status: 'active' | 'completed';
  start_time?: string | Date;
  deadline?: string | Date;
  task_type: 'ALL' | 'ANY' | 'ASSIGNED';
  assigned_users: string[]; // Array of uids
  subtasks: Subtask[];
  completions: Completion[];
  nudged_users: NudgedUser[];
  created_at?: string | Date;
  updated_at?: string | Date;
}

interface TaskState {
  tasks: TaskItem[];
  isLoading: boolean;
  
  setTasks: (tasks: TaskItem[]) => void;
  addTask: (task: TaskItem) => void;
  updateTask: (taskId: string, data: Partial<TaskItem>) => void;
  removeTask: (taskId: string) => void;
  setLoading: (loading: boolean) => void;
  clearTasks: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,

  setTasks: (tasks) => set({ tasks }),
  
  addTask: (task) => set((state) => ({ 
    tasks: [task, ...state.tasks] 
  })),
  
  updateTask: (taskId, data) => set((state) => ({
    tasks: state.tasks.map(t => (t._id === taskId ? { ...t, ...data } : t))
  })),
  
  removeTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter(t => t._id !== taskId)
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  clearTasks: () => set({ tasks: [], isLoading: false })
}));