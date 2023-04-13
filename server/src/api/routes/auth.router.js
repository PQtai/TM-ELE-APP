import express from 'express';
import authControllers from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import userValidation from '../helpers/userValidation.js';
import validateMiddleware from '../middlewares/validate.middleware.js';
import '../middlewares/passport.js';
import { formatFileUpload } from '../middlewares/post.middlewares.js';
const router = express.Router();

// Route register user
router.post(
  '/register',
  authMiddleware.checkRole,
  validateMiddleware('body', userValidation),
  authControllers.registerAccount
);

// Verify email
router.get('/verify-email/:token', authControllers.verifyEmail);

// Resend verification email
router.post('/resend-email', authControllers.resendVerificationEmail);

// Route register for Admin
router.post(
  '/admin-register',
  authMiddleware.authIsAdmin,
  validateMiddleware('body', userValidation),
  authControllers.registerAccount
);

// Route Login
router.post(
  '/login',
  validateMiddleware('body', userValidation),
  authControllers.login
);

// Route Refresh
router.post('/refresh', authControllers.requestRefreshToken);

// Route logout
router.post('/logout', authMiddleware.verifyToken, authControllers.logout);



export default router;
