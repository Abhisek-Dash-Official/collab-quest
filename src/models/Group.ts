import mongoose, { Schema, Document } from 'mongoose';

export interface IMember {
  uid: string;
  xp_gained: number;
  group_rank: number;
  fire_streak: number;
  task_completion_count: number;
  first_finishes_count: number;
  last_minute_finishes_count: number;
  total_nudges_sent: number;
  total_nudges_received: number;
}

export interface IGroup extends Document {
  group_name: string;
  created_by: string; // uid
  group_icon_id: string;
  purpose?: string;
  members: IMember[];
  invite_code: string;
  joinRequests: string[]; // uids
  is_private: boolean;
  bannedUsers: string[]; // uids
  total_tasks: number;
  total_nudges_sent: number;
  totalXPAwarded: number;
  created_at: Date;
}

const MemberSchema = new Schema<IMember>({
  uid: { type: String, required: true },
  xp_gained: { type: Number, default: 0 },
  group_rank: { type: Number, default: 0 },
  fire_streak: { type: Number, default: 0 },
  task_completion_count: { type: Number, default: 0 },
  first_finishes_count: { type: Number, default: 0 },
  last_minute_finishes_count: { type: Number, default: 0 },
  total_nudges_sent: { type: Number, default: 0 },
  total_nudges_received: { type: Number, default: 0 }
}, { _id: false });

const GroupSchema = new Schema<IGroup>({
  group_name: { type: String, required: true },
  created_by: { type: String, required: true },
  group_icon_id: { type: String, default: "0" },
  purpose: { type: String },
  members: { type: [MemberSchema], required: true },
  invite_code: { type: String, required: true, unique: true },
  joinRequests: [{ type: String, default: [] }],
  is_private: { type: Boolean, default: false },
  bannedUsers: [{ type: String }],
  total_tasks: { type: Number, default: 0 },
  total_nudges_sent: { type: Number, default: 0 },
  totalXPAwarded: { type: Number, default: 0 }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

export default mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema);