import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  uid: string;
  username: string;
  avatar_id: string;
  email: string;
  hashed_password: string;
  joined_groups: mongoose.Types.ObjectId[];
  friends: string[];
  xp: number;
  respect_likes: number;
  role: 'admin' | 'user';
  last_active_at?: Date;
  daily_nudge_count: number;
  last_nudge_date?: Date;
  push_subscription?: any; // Web Push Object
  created_at: Date;
}

const UserSchema = new Schema<IUser>({
  uid: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  avatar_id: { type: String, default: "0" },
  email: { type: String, required: true, unique: true },
  hashed_password: { type: String, required: true },
  joined_groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  friends: [{ type: String }], // Array of uids
  xp: { type: Number, default: 0 },
  respect_likes: { type: Number, default: 0 },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  last_active_at: { type: Date },
  daily_nudge_count: { type: Number, default: 0 },
  last_nudge_date: { type: Date },
  push_subscription: { type: Schema.Types.Mixed, default: null }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);