import express from 'express';
import postControllers from '../controllers/post.controller.js';
import postSchemas from '../helpers/postValidation.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { formatFileUpload } from '../middlewares/post.middlewares.js';
import validateMiddleware from '../middlewares/validate.middleware.js';
const router = express.Router();
router.post(
  '/create',
  authMiddleware.verifyToken,
  formatFileUpload('images', 'multiple'),
  validateMiddleware('body', postSchemas.postCreate),
  postControllers.upload
);
router.delete('/delete', authMiddleware.authIsAdmin, postControllers.delete);

router.patch(
  '/editStatus/:id',
  validateMiddleware('body', postSchemas.postEditStatus),
  authMiddleware.authIsAdmin,
  postControllers.updatePostStatus
);
router.patch(
  '/edit/:id',
  authMiddleware.authIsAdmin,
  postControllers.updatePost
);

router.get(
  '/list',
  validateMiddleware('query', postSchemas.postList),
  postControllers.index
);
router.get(
  '/:id',
  validateMiddleware('params', postSchemas.postDetail),
  postControllers.show
);
// router.get('/', postControllers.index);
export default router;
