import mongoose, { Schema, Document } from 'mongoose';

export interface ISubtask {
  sub_id: string;
  title: string;
  short_desc?: string;
  order?: number;
}

export interface ICompletion {
  uid: string;
  completed_at: Date;
  order: number;
  xp_earned: number;
  respect_likes: string[]; // Array of uids
}

export interface INudgedUser {
  uid: string;
  nudge_count: number;
  nudged_at: Date;
}

export interface ITask extends Document {
  group_id: mongoose.Types.ObjectId;
  title: string;
  desc?: string;
  weightage: number;
  status: 'active' | 'completed';
  start_time?: Date;
  deadline?: Date;
  task_type: 'ALL' | 'ANY' | 'ASSIGNED';
  assigned_users: string[]; // Array of uids
  subtasks: ISubtask[];
  completions: ICompletion[];
  nudged_users: INudgedUser[];
  created_at: Date;
  updated_at: Date;
}

const SubtaskSchema = new Schema<ISubtask>({
  sub_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  short_desc: { type: String },
  order: { type: Number }
}, { _id: false });

const CompletionSchema = new Schema<ICompletion>({
  uid: { type: String, required: true },
  completed_at: { type: Date, default: Date.now },
  order: { type: Number },
  xp_earned: { type: Number },
  respect_likes: [{ type: String }]
}, { _id: false });

const NudgedUserSchema = new Schema<INudgedUser>({
  uid: { type: String, required: true },
  nudge_count: { type: Number, default: 1 },
  nudged_at: { type: Date, default: Date.now }
}, { _id: false });

const TaskSchema = new Schema<ITask>({
  group_id: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  title: { type: String, required: true },
  desc: { type: String },
  weightage: { type: Number },
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
  start_time: { type: Date },
  deadline: { type: Date },
  task_type: { type: String, enum: ['ALL', 'ANY', 'ASSIGNED'] },
  assigned_users: [{ type: String }],
  subtasks: { type: [SubtaskSchema], default: null },
  completions: { type: [CompletionSchema], default: [] },
  nudged_users: { type: [NudgedUserSchema], default: [] }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);