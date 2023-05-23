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
  deleteReply: async (req, res) => {
    try {
      const replyId = req.params.replyId;
      const userReply = req.user.id;
      const delReply = await ReplyReview.findOneAndDelete({
        _id: replyId,
        createdBy: userReply,
      });
      delReply
        ? res
            .status(200)
            .json(errorFunction(false, 200, "Delete reply successfully"))
        : res.status(404).json(errorFunction(true, 404, "Delete reply failed"));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(errorFunction(true, 500, "Internal Server Error"));
    }
  },
};

export default reviewReplyController;
