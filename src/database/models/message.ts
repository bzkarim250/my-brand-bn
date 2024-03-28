import mongoose, { Schema, Document } from "mongoose";

interface IMessage extends Document {
  email: string;
  message: string;
}

const MessageSchema: Schema = new Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Message = mongoose.model<IMessage>("Message", MessageSchema);

export { Message, IMessage };
