import express from "express";
import reviewUserController from "../controllers/review.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
  "/add-review",
  authMiddleware.verifyToken,
  reviewUserController.addReviewUser
);

export default router;
