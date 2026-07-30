import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  recipient_id: string; // uid
  sender_id?: string; // uid
  task_id?: mongoose.Types.ObjectId;
  type: 'nudge' | 'deadline';
  is_read: boolean;
  created_at: Date;
}

const NotificationSchema = new Schema<INotification>({
  recipient_id: { type: String, required: true },
  sender_id: { type: String, default: null },
  task_id: { type: Schema.Types.ObjectId, ref: 'Task', default: null },
  type: { type: String, enum: ['nudge', 'deadline'], required: true },
  is_read: { type: Boolean, default: false }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

export default mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);