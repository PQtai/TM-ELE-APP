import express from 'express';
import conversationControllers from '../controllers/conversation.controller.js';
import conversationSchemas from '../helpers/conversationValidation.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import validateMiddleware from '../middlewares/validate.middleware.js';
const router = express.Router();
router.get(
  '/query',
  authMiddleware.verifyToken,
  validateMiddleware('query', conversationSchemas.conversationGetInfo),
  conversationControllers.show
);
router.post(
  '/create',
  authMiddleware.verifyToken,
  validateMiddleware('params', conversationSchemas.paramsConversation),
  validateMiddleware('body', conversationSchemas.createConversation),
  conversationControllers.create
);
export default router;
