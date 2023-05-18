import { Review, ReplyReview } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";

const reviewReplyController = {
  addReviewReply: async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
      const replyContent = req.body.replyContent;
      const review = await Review.findById(reviewId);
      if (!review) {
        return res
          .status(404)
          .json(errorFunction(true, 404, "This review was not found"));
      }

      const reply = new ReplyReview({
        review: review._id,
        replyContent,
        createdBy: req.user.id,
      });

      await reply.save();

      // Update relationship 1-1
      review.reply = reply._id;
      await review.save();

      return res
        .status(201)
        .json(errorFunction(false, 201, "Reply successfully", reply));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(errorFunction(true, 500, "Internal server error"));
    }
  },
};

export default reviewReplyController;
