import express from 'express';
import userControllers from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import userValidation from '../helpers/userValidation.js';
import validateMiddleware from '../middlewares/validate.middleware.js';
import passport from 'passport';
import '../middlewares/passport.js';
const router = express.Router();

// Route add user
router.post(
  '/register',
  authMiddleware.checkRole,
  validateMiddleware('body', userValidation),
  userControllers.registerAccount
);

// verify email
router.get('/verify-email/:token', userControllers.verifyEmail);

// Route register for Admin
router.post(
  '/admin-register',
  authMiddleware.authIsAdmin,
  validateMiddleware('body', userValidation),
  userControllers.registerAccount
);

// Route Login
router.post(
  '/login',
  validateMiddleware('body', userValidation),
  userControllers.login
);

// Route Refresh
router.post('/refresh', userControllers.requestRefreshToken);

// Route get user/id
router.get(
  '/get-user/:id',
  authMiddleware.verifyToken,
  userControllers.getUserById
);

// Route user all
router.get('/get-all', authMiddleware.authIsAdmin, userControllers.getAllUsers);
router.get('/get-allllll', userControllers.getAllUsers) 

// Route lock user
router.patch('/:id/lock', authMiddleware.authIsAdmin, userControllers.lockUser);

// Route edit user
router.patch(
  '/edit/:id',
  authMiddleware.authIsAdminOrIsAuthor,
  userControllers.editUser
);

// Route change password
router.post(
  '/change-password',
  authMiddleware.authIsAdminOrIsAuthor,
  userControllers.changePassword
);

// Route forgot password
router.post(
  '/forgot-password',
  authMiddleware.authIsAdminOrIsAuthor,
  userControllers.forgotPassword
);

// Route logout
router.post('/logout', authMiddleware.verifyToken, userControllers.logout);

router.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  userControllers.getAllUsers
);

export default router;
