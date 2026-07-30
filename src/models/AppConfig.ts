import mongoose, { Schema, Document } from 'mongoose';

export interface IAppConfig extends Document {
  maintenance_mode: boolean;
  maintenance_msg?: string;
  allow_new_signups: boolean;
  max_users_per_group: number;
  max_groups_per_user: number;
  max_daily_nudge: number;
  max_tasks_per_week: number;
}

const AppConfigSchema = new Schema<IAppConfig>({
  maintenance_mode: { type: Boolean, default: false },
  maintenance_msg: { type: String },
  allow_new_signups: { type: Boolean, default: true },
  max_users_per_group: { type: Number, default: 5 },
  max_groups_per_user: { type: Number, default: 5 },
  max_daily_nudge: { type: Number, default: 10 },
  max_tasks_per_week: { type: Number, default: 100 }
});

export default mongoose.models.AppConfig || mongoose.model<IAppConfig>('AppConfig', AppConfigSchema);