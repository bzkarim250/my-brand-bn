import { IMessage, Message } from "../models/message";

class MessageService {
  static async contactMe(messageData: IMessage): Promise<IMessage> {
    const message = await Message.create(messageData);
    return message;
  }

  static async getAllMessages(): Promise<IMessage[]> {
    const messages = await Message.find();
    return messages;
  }

  static async getMessageById(messageId: string): Promise<IMessage | null> {
    const message = await Message.findById(messageId);
    return message;
  }

  static async deleteMessage(messageId: string): Promise<IMessage | null> {
    const message = await Message.findByIdAndDelete(messageId);
    return message;
  }
}

export default MessageService;
