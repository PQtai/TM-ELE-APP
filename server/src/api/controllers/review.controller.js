import { Review, Chat, User, ReplyReview } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";
import getReviews from "../helpers/getReviewsByUser.js";

const reviewUserController = {
  addReviewUser: async (req, res) => {
    try {
      const reviewer = req.user.id;
      const { reviewedUser, rating, comment } = req.body;
      if (!reviewedUser || !rating || !comment)
        return res.status(400).json(errorFunction(true, 400, "Missing input"));
      const chat = await Chat.findOne({
        members: { $all: [reviewer, reviewedUser] },
      });
      if (!chat || !chat.isRatingCondition) {
        return res
          .status(400)
          .json(
            errorFunction(
              true,
              400,
              "You are not allowed to add review for this user"
            )
          );
      }
      const reviewed = new Review({
        reviewer,
        reviewedUser,
        rating,
        comment,
      });
      await reviewed.save();

      // Tính điểm đánh giá trung bình
      const user = await User.findById(reviewedUser);
      await user.calculateAverageRating();

      // Cập nhật lại điều kiện đánh giá
      // await Chat.findByIdAndUpdate(
      //   chat.id,
      //   { isRatingCondition: false },
      //   { new: true }
      // );

      return res
        .status(200)
        .json(errorFunction(false, 200, "Review successfully", reviewed));
    } catch (err) {
      console.log(err);
      return res.status(400).json(errorFunction(true, 400, err.message));
    }
  },

  // Get the reviews that the user received
  getReviewsByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const reviews = await getReviews(userId);

      return res
        .status(200)
        .json(
          errorFunction(
            false,
            200,
            "Get reviews by user is successfully",
            reviews
          )
        );
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(errorFunction(true, 500, "Internal server error"));
    }
  },

  // Edit reviewed
  editReview: async (req, res) => {
    try {
      const reviewer = req.user.id;
      const reviewId = req.params.reviewId;
      const review = await Review.findOne({ _id: reviewId, reviewer });
      if (!review) {
        return res
          .status(404)
          .json(errorFunction(true, 404, "Review not found"));
      }
      if (review.reply) {
        return res
          .status(400)
          .json(
            errorFunction(
              true,
              400,
              "Review has been replied, cannot be edited"
            )
          );
      }
      const { rating, comment } = req.body;
      review.rating = rating;
      review.comment = comment;
      await review.save();

      // Tính lại điểm đánh giá trung bình
      const user = await User.findById(review.reviewedUser.toString());
      await user.calculateAverageRating();
      return res
        .status(200)
        .json(errorFunction(false, 200, "Review updated successfully", review));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(errorFunction(true, 500, "Internal server error"));
    }
  },
  delReview: async (req, res) => {
    try {
      const reviewer = req.user.id;
      const reviewId = req.params.reviewId;
      const removeReview = await Review.findOneAndRemove({
        _id: reviewId,
        reviewer,
      });
      if (!removeReview) {
        return res
          .status(404)
          .json(errorFunction(true, 404, "Delete Review Failed"));
      }
      await User.findById(removeReview.reviewedUser).calculateAverageRating();
      await ReplyReview.findByIdAndDelete(removeReview.reply.toString());

      res
        .status(200)
        .json(errorFunction(false, 200, "Delete Review Successfully"));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(errorFunction(false, 500, "Something Went Wrong"));
    }
  },
};

export default reviewUserController;
