import mongoose, { Schema, Document, Types } from 'mongoose';

interface IComment extends Document {
  content: string;
  user: Types.ObjectId;
  blog: Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true }
});

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
