import express from 'express';
import userControllers from '../controllers/user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import userValidation from '../helpers/userValidation.js'
const router = express.Router();


// add user
router.post('/register', userValidation,
    userControllers.register
)

// //route user/id
// router.get('/:id', authMiddleware.verifyToken ,userControllers.show);
// //route user all
// router.get('/', authMiddleware.authIsAdmin ,userControllers.index);
export default router;