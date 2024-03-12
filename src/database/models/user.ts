import mongoose, { Schema, Document, Types } from 'mongoose';

interface IUser extends Document {
  username: string;
  fullname:string,
  email: string;
  blogs: Types.ObjectId[];
  comments: Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  fullname:{type:String,required:true},
  email: { type: String, required: true },
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
