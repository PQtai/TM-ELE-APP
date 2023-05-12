import { Message, Review } from "../models/index.js";

// Function kiểm tra điều kiện số tin nhắn của 2 người dùng
const checkMessageCount = async (chatId, yourUserId) => {
  const yourMessageCount = await Message.countDocuments({
    chatId,
    senderId: yourUserId,
  });
  const otherMessageCount = await Message.countDocuments({
    chatId: chatId,
    senderId: { $ne: yourUserId },
  });
  if (yourMessageCount >= 2 && otherMessageCount >= 2) {
    return true;
  } else {
    return false;
  }
};

// Function kiểm tra reviewerId đã đánh giá reviewedUserId chưa
const checkIfReviewedBefore = async (reviewerId, reviewedUserId) => {
  const review = await Review.findOne({ reviewerId, reviewedUserId });
  if (review) {
    return true;
  } else {
    return false;
  }
};

const checkConditionReview = async (chatId, yourUserId, reviewedUserId) => {
  const yourMessageCount = await Message.countDocuments({
    chatId,
    senderId: yourUserId,
  });
  const otherMessageCount = await Message.countDocuments({
    chatId: chatId,
    senderId: { $ne: yourUserId },
  });
  const reviewedBefore = await Review.findOne({
    reviewerId: yourUserId,
    reviewedUserId,
  });

  if (yourMessageCount >= 2 && otherMessageCount >= 2 && !reviewedBefore) {
    return true;
  } else {
    return false;
  }
};

export { checkMessageCount, checkIfReviewedBefore, checkConditionReview };
