import { create } from 'zustand';

export interface User {
  uid: string;
  avatar_id: string; 
  username: string;
  xp: number;
  email?: string; 
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void; 
  logout: () => void;
  getAvatarUrl: () => string | null;
  getLevel: () => number;
}

export const useUserStore = create<UserState>()((set, get) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),
  
  updateUser: (data) => set((state) => ({
    user: state.user ? { ...state.user, ...data } : null
  })),
  
  logout: async () => {
    try {
      await fetch("/api/users/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },

  // Avatar image url generator
  getAvatarUrl: () => {
    const user = get().user;
    if (!user || !user.avatar_id) return `/avatars/avatar-0.png`;
    return `/avatars/avatar-${user.avatar_id}.png`;
  },

  // Level Calculator Function
  getLevel: () => {
    const user = get().user;
    if (!user || user.xp === undefined) return 0;
    
    // Logic: Level = (XP / 30) ^ (2/3)
    return Math.floor(Math.pow(user.xp / 30, 2 / 3));
  }
}));