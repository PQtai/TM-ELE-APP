import express from 'express';
import postControllers from '../controllers/post.controller.js';
import postSchemas from '../helpers/postValidation.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { formatFileUpload } from '../middlewares/post.middlewares.js';
import validateMiddleware from '../middlewares/validate.middleware.js';
import validateFormData from '../utils/validateFormData.js';
const router = express.Router();
router.post(
  '/create',
  authMiddleware.verifyToken,
  formatFileUpload('images', 'multiple'),
  validateFormData('body', postSchemas.postCreate),
  postControllers.upload
);
router.delete('/delete', authMiddleware.authIsAdmin, postControllers.delete);

router.patch(
  '/editStatus/:id',
  validateMiddleware('body', postSchemas.postEditStatus),
  authMiddleware.authIsAdminOrIsAuthor,
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
  '/list/role-admin',
  authMiddleware.authIsAdmin,
  validateMiddleware('query', postSchemas.postList),
  postControllers.getPostsRoleAdmin
);
router.get(
  '/post-author',
  authMiddleware.verifyToken,
  validateMiddleware('query', postSchemas.postsAuthor),
  postControllers.getPostsAuthor
);
router.get(
  '/:id',
  validateMiddleware('params', postSchemas.postDetail),
  postControllers.show
);
// router.get('/', postControllers.index);
export default router;
