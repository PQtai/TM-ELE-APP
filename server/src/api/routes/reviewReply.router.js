import express from "express";
import reviewReplyController from "../controllers/reviewReply.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
  "/replies/:reviewId",
  authMiddleware.verifyToken,
  reviewReplyController.addReviewReply
);

router.delete(
  "replies/:replyId",
  authMiddleware.verifyToken,
  reviewReplyController.deleteReply
);

export default router;
