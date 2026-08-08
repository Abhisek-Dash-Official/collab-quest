import { create } from 'zustand';

export interface GroupMember {
  uid: string;
  username?: string;
  avatar_id?: string;
  level: number;
  xp_gained: number;
  group_rank: number;
  fire_streak: number;
  task_completion_count: number;
  first_finishes_count: number;
  last_finishes_count: number;
  total_nudges_sent: number;
  total_nudges_received: number;
}

export interface GroupDetails {
  _id?: string;
  group_name: string;
  created_by: string;
  group_icon_id: string;
  purpose?: string;
  invite_code: string;
  created_at: string | Date;
  total_tasks: number;
  members: GroupMember[];
}

export interface UserGroupSummary {
  _id: string;
  group_name: string;
  created_by: string;
  group_icon_id: string;
  is_private: boolean;
}

interface GroupState {
  currentGroup: GroupDetails | null;
  userGroups: UserGroupSummary[];
  
  setCurrentGroup: (group: GroupDetails | null) => void;
  setUserGroups: (groups: UserGroupSummary[]) => void;
  updateCurrentGroup: (data: Partial<GroupDetails>) => void;
  clearStore: () => void;
}
export const useGroupStore = create<GroupState>((set) => ({
  currentGroup: null,
  userGroups: [],

  setCurrentGroup: (group) => set({ currentGroup: group }),
  
  setUserGroups: (groups) => set({ userGroups: groups }),
  
  updateCurrentGroup: (data) => set((state) => ({
    currentGroup: state.currentGroup ? { ...state.currentGroup, ...data } : null
  })),
  
  clearStore: () => set({ currentGroup: null, userGroups: [] })
}));