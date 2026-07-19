import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  uid: string;
  avatar_id: string; 
  username: string;
  xp: number;
}

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
  getAvatarUrl: () => string | null;
  getLevel: () => number;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    
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
    }),
    {
      name: 'collab-quest-test', 
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);