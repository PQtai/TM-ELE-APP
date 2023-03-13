import express from 'express';
import messageControllers from '../controllers/message.controller.js';
import messageSchemas from '../helpers/messageValidation.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import validateMiddleware from '../middlewares/validate.middleware.js';
const router = express.Router();
router.post(
  '/create',
  authMiddleware.verifyToken,
  validateMiddleware('params', messageSchemas.paramsMessage),
  validateMiddleware('body', messageSchemas.messageCreate),
  messageControllers.create
);
export default router;
