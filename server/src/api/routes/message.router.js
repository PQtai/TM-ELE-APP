import express from 'express';
import messageControllers from '../controllers/message.controller.js';
import messageSchemas from '../helpers/messageValidation.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import validateMiddleware from '../middlewares/validate.middleware.js';
import { formatFileUpload } from '../middlewares/post.middlewares.js';
const router = express.Router();
// router.post(
//   '/create',
//   authMiddleware.verifyToken,
//   validateMiddleware('params', messageSchemas.paramsMessage),
//   validateMiddleware('body', messageSchemas.messageCreate),
//   messageControllers.create
// );

 router.post(
    '/create', 
    formatFileUpload('images', 'multiple'),
    messageControllers.addMessage)
export default router;
