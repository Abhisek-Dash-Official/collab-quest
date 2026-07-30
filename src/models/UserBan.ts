import mongoose, { Schema, Document } from 'mongoose';

export interface IUserBan extends Document {
  uid: string;
  ban_reason?: string;
  banned_by?: string;
  banned_at: Date;
}

const UserBanSchema = new Schema<IUserBan>({
  uid: { type: String, required: true, unique: true },
  ban_reason: { type: String },
  banned_by: { type: String },
  banned_at: { type: Date, default: Date.now }
});

export default mongoose.models.UserBan || mongoose.model<IUserBan>('UserBan', UserBanSchema);