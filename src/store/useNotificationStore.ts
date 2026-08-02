import { create } from 'zustand';

export interface INudgeNotification {
  id: string;
  task_title: string;
  group_name: string;
  is_read: boolean;
  nudged_at: string;
}

interface NotificationStore {
  notifications: INudgeNotification[];
  isLoading: boolean;
  error: boolean;
  fetchNotifications: () => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  isLoading: true,
  error: false,
  fetchNotifications: async () => {
    set({ isLoading: true, error: false });
    try {
      const res = await fetch('/api/users/notifications', { credentials: 'include' });
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      set({ notifications: json.data || [], isLoading: false });
    } catch (err) {
      set({ error: true, isLoading: false });
    }
  }
}));