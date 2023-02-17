import express from 'express';
import postControllers from '../controllers/post.controller.js';
import postSchemas from '../helpers/postValidation.js';
import { formatFileUpload } from '../middlewares/post.middlewares.js';
import validateMiddleware from '../middlewares/validate.middleware.js';
const router = express.Router();
router.post(
  '/create',
  formatFileUpload('image', 'multiple'),
  validateMiddleware('body', postSchemas.postCreate),
  postControllers.upload
);
router.get(
  '/:id',
  validateMiddleware('params', postSchemas.postDetail),
  postControllers.show
);
router.get('/', postControllers.index);
export default router;
