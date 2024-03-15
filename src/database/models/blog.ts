import { Schema, Document, Types,model } from "mongoose";

interface IBlog extends Document {
  title: string;
  imageURL?: string;
  description: string;
  likes?: number;
  comments?: Types.ObjectId[];
  author: Types.ObjectId;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  imageURL: { type: String },
  description: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Blog = model<IBlog>('Blog', BlogSchema);

export { IBlog, Blog };
