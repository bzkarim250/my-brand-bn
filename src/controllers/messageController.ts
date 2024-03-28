import { Request, Response } from "express";
import MessageService from "../database/services/messageService";
import response from "../helpers/response";

class MessageController {
  static async contactMe(req: Request, res: Response) {
    try {
      const newMessage = await MessageService.contactMe({...req.body});
      response(res, 201, "Message sent!", newMessage);
    } catch (error) {
      response(res, 500, (error as Error).message || "Internal Server Error");
    }
  }

  static async getAllMessages(req: Request, res: Response) {
    try {
      const messages = await MessageService.getAllMessages();
      response(res, 200, "All messages retrieved!", messages);
    } catch (error) {
      response(res, 500, (error as Error).message || "Internal Server Error");
    }
  }

  static async getMessageById(req: Request, res: Response) {
    try {
      const { messageId } = req.params;
      const message = await MessageService.getMessageById(messageId);
      if (!message) {
        return response(res, 404, "Message not found");
      }
      return response(res, 200, "Message retrieved successfully", message);
    } catch (error) {
      return response(
        res,
        500,
        (error as Error).message || "Internal Server Error"
      );
    }
  }

  static async deleteMessage(req: Request, res: Response) {
    try {
      const { messageId } = req.params;
      const deletedMessage = await MessageService.deleteMessage(messageId);
      if (!deletedMessage) {
        return response(res, 404, "Message not found");
      }
      return response(res, 200, "Message deleted successfully", deletedMessage);
    } catch (error) {
      return response(
        res,
        500,
        (error as Error).message || "Internal Server Error"
      );
    }
  }
}

export default MessageController;
