import express from "express";
import validateMiddleware from "../middlewares/validate.middleware.js";
import chatValidation from "../helpers/chatValidation.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import chatControllers from "../controllers/chat.controller.js";

const router = express.Router();

// Add Chat
router.post(
  "/create",
  authMiddleware.verifyToken,
  validateMiddleware("body", chatValidation),
  chatControllers.createChat
);

// Get user chat
router.get(
  "/users-chat",
  authMiddleware.verifyToken,
  chatControllers.getConversations
);

// Find chat between sender and receiver
router.get(
  "/find-chat/:secondId",
  authMiddleware.verifyToken,
  chatControllers.findChat
);

export default router;
