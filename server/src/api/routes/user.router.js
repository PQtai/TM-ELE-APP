import express from 'express';
import userControllers from '../controllers/user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import userValidation from '../helpers/userValidation.js'
import validateMiddleware from '../middlewares/validate.middleware.js';
const router = express.Router();


// add user
router.post('/register', validateMiddleware('body', userValidation), userControllers.registerAccount);

// Route Login 
router.post('/login', validateMiddleware('body', userValidation), userControllers.login);

// Route Refresh
router.post('/refresh', userControllers.requestRefreshToken);

// Route get user/id
router.get('/get-user/:id', authMiddleware.verifyToken , userControllers.getUserById);

// Route user all
router.get('/get-all', authMiddleware.authIsAdmin, userControllers.getAllUsers);

// Route lock user
router.patch('/:id/lock', authMiddleware.authIsAdmin, userControllers.lockUser);

// Route edit user
router.patch('/edit/:id', authMiddleware.authIsAdmin, userControllers.editUser);

// Route change password
router.post('/change-password', authMiddleware.authIsAdmin, userControllers.changePassword);

// Route forgot password
router.post('/forgot-password', authMiddleware.authIsAdmin, userControllers.forgotPassword);

// Route logout
router.post('/logout', authMiddleware.verifyToken, userControllers.logout);

export default router;