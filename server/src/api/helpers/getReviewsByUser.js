import { Review } from "../models/index.js";

const getReviewsByUser = async (userId) => {
  try {
    const reviews = await Review.find({ reviewedUser: userId })
      .populate({
        path: "reviewer",
        select: "_id firstName lastName avatar",
      })
      .populate({ path: "reply", select: "replyContent" })
      .exec();

    return reviews;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export default getReviewsByUser;
