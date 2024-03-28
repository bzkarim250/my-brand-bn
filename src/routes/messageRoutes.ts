import express from "express";
import MessageController from "../controllers/messageController";
import { isAdmin } from "../middlewares/auth";

const messageRoute = express.Router();

messageRoute.post("/contact-me", MessageController.contactMe);
messageRoute.get("/all",isAdmin, MessageController.getAllMessages);
messageRoute.delete("/delete/:messageId", isAdmin, MessageController.deleteMessage);
messageRoute.get("/single/:messageId",isAdmin, MessageController.getMessageById);

export default messageRoute;
