import express from 'express';
import categoryController from '../controllers/category.controller.js';
import validateMiddleware from '../middlewares/validate.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import categoryValidation from '../helpers/categoryValidation.js';
const router = express.Router();

router.post(
  '/create',
  authMiddleware.authIsAdmin,
  validateMiddleware('body', categoryValidation),
  categoryController.addCategory
);

router.get('/all', categoryController.getCategories);
router.get(
  '/:id',
  authMiddleware.authIsAdmin,
  categoryController.getCategoryById
);
router.patch(
  '/:id',
  authMiddleware.authIsAdmin,
  categoryController.updateCategoryById
);
router.delete(
  '/:id',
  authMiddleware.authIsAdmin,
  categoryController.deleteCategoryById
);

export default router;
