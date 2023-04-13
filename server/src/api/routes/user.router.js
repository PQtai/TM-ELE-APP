import express from "express";
import userControllers from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import userValidation from "../helpers/userValidation.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import "../middlewares/passport.js";
import { formatFileUpload } from "../middlewares/post.middlewares.js";
const router = express.Router();
import passport from 'passport';

// Route get user/id
router.get(
  "/get-user/:id",
  userControllers.getUserById
);

// Route user all
router.get("/get-all", authMiddleware.authIsAdmin, userControllers.getAllUsers);

// Route lock user
router.patch("/:id/lock", authMiddleware.authIsAdmin, userControllers.lockUser);

// Route edit user
router.patch(
    "/edit/:id",
    formatFileUpload("avatar", "single"),
    authMiddleware.authIsAdminOrIsAuthor,
    userControllers.editUser
  );


// Route change password
router.post(
  "/change-password/:id",
  authMiddleware.authIsAdminOrIsAuthor,
  userControllers.changePassword
);

// Route forgot password
router.post(
  "/forgot-password",
  userControllers.forgotPassword
);

router.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  userControllers.getAllUsers
);

export default router;
