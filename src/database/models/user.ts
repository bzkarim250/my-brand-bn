import { Schema, Document, Types, model } from "mongoose";

interface IUser extends Document {
  password: undefined;
  username: string;
  fullname: string;
  email: string;
  role: string;
  likedBlogs: Types.ObjectId[];
  blogs: Types.ObjectId[];
  comments: Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  likedBlogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const User = model<IUser>("User", UserSchema);

export { User, IUser };
