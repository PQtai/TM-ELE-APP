import express from 'express';
import postControllers from '../controllers/post.controller.js';
import postSchemas from '../helpers/postValidation.js';
import { formatFileUpload } from '../middlewares/post.middlewares.js';
import validateMiddleware from '../middlewares/validate.middleware.js';
const router = express.Router();
router.post(
  '/create',
  validateMiddleware('body', postSchemas),
  formatFileUpload('postImgs', 'multiple'),
  postControllers.upload
);
router.get('/', (req, res, next) => {
  res.status(200).json({
    code: 1,
    mess: 'hello may con vo',
  });
});
export default router;
