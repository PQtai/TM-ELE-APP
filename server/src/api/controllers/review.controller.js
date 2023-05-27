import { Review, Chat, User, ReplyReview, Message } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";
import getReviews from "../helpers/getReviewsByUser.js";
import { checkConditionReview } from "../helpers/checkContionReview.js";

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
      if (!chat) {
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

      // Tính điểm đánh giá trung bình của người bị đánh giá
      const user = await User.findById(reviewedUser);
      await user.calculateAverageRating();

      // Cập nhật trường reviewsGiven của chính họ
      await User.findByIdAndUpdate(
        reviewer,
        { $push: { reviewsGiven: reviewed._id } },
        { new: true }
      );

      return res
        .status(200)
        .json(errorFunction(false, 200, "Review successfully", reviewed));
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json(errorFunction(true, 500, "Internal server error"));
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
      const user = await User.findById(removeReview.reviewedUser);
      await user.calculateAverageRating();
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

  getUsersForReview: async (req, res) => {
    try {
      const yourUserId = req.user.id;
      // Lấy danh sách chatIds của các tin nhắn do người dùng gửi
      const chatIds = await Message.distinct("chatId", {
        senderId: yourUserId,
      });

      // Mảng chứa Users đủ điều kiện đánh giá
      const eligibleUsers = [];
      for (const chatId of chatIds) {
        // Tìm thông tin member trong chat
        const chatMembers = await Chat.findOne({
          _id: chatId,
          members: yourUserId,
        });

        if (chatMembers) {
          // Tìm user trong chat khác với current member
          const otherParticipant = chatMembers.members.find(
            (member) => member.toString() !== yourUserId.toString()
          );
          // Lấy userId cần được đánh giá
          const reviewedUserId = otherParticipant.toString();

          // Kiểm tra điều kiện đủ đánh giá hay không
          const isCondition = await checkConditionReview(
            chatId,
            yourUserId,
            reviewedUserId
          );
          if (isCondition) {
            eligibleUsers.push(reviewedUserId);
          }
        }
      }

      // Lấy list users dựa trên eligibleUsers arr
      const users = await User.find({ _id: { $in: eligibleUsers } }).select(
        "_id firstName lastName avatar"
      );

      res.status(200).json(errorFunction(false, 200, "Ok", users));
    } catch (error) {
      console.log(error);
      res.status(500).json(errorFunction(true, 500, "Internal server error"));
    }
  },

  getUsersReviewedByUser: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).populate("reviewsGiven");

      const reviewedUsers = user.reviewsGiven.map(
        (review) => review.reviewedUser
      );

      const users = await User.find({ _id: { $in: reviewedUsers } }).select(
        "_id firstName lastName avatar"
      );

      res.status(200).json(errorFunction(false, 200, "Ok", users));
    } catch (error) {
      console.log(error);
      res.status(500).json(errorFunction(true, 500, "Internal server error"));
    }
  },
};

export default reviewUserController;
