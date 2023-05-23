import express from "express";
import reviewUserController from "../controllers/review.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
  "/add-review",
  authMiddleware.verifyToken,
  reviewUserController.addReviewUser
);

router.get("/user/:userId", reviewUserController.getReviewsByUser);

router.put(
  "/edit/:reviewId",
  authMiddleware.verifyToken,
  reviewUserController.editReview
);

router.delete(
  "/:reviewId",
  authMiddleware.verifyToken,
  reviewUserController.delReview
);

export default router;
