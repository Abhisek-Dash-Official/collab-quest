import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  uid: string;
  email: string;
  type: 'bug' | 'feature_request' | 'other';
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  created_at: Date;
  updated_at: Date;
}

const FeedbackSchema = new Schema<IFeedback>({
  uid: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, enum: ['bug', 'feature_request', 'other'], required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['open', 'in_progress', 'resolved'], default: 'open' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);