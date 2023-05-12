import { Review, Chat, User } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";

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
      const reviews = await Review.find({ reviewedUser });
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      console.log("totalRating :::", totalRating);
      const averageRating = (totalRating / reviews.length).toFixed(1);
      console.log(`averageRating ::: ${averageRating}`);

      // Cập nhật trường averageRating của người được đánh giá
      await User.findByIdAndUpdate(reviewedUser, { averageRating });

      // Cập nhật lại điều kiện đánh giá
      await Chat.findByIdAndUpdate(
        chat.id,
        { isRatingCondition: false },
        { new: true }
      );

      return res
        .status(200)
        .json(errorFunction(false, 200, "Review successfully", reviewed));
    } catch (err) {
      console.log(err);
      return res.status(400).json(errorFunction(true, 400, err.message));
    }
  },
};
const addReviewUser = async (req, res) => {
  const chatId = req.body.chatId;
  const userId = req.body.userId;
  const check = await checkMessageCount(chatId, userId);
  if (check) {
    console.log(check);
    return res.send("true");
  }
  const { reviewer, reviewedUser, rating, comment } = req.body;

  try {
    const review = new Review({ reviewer, reviewedUser, rating, comment });
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
  return res.send("false");
};

export default reviewUserController;
