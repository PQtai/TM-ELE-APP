import mongoose from "mongoose";

const ReviewReplySchema = new mongoose.Schema(
  {
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
      required: true,
    },
    replyContent: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

/*
review: id của đánh giá cần phản hồi (tham chiếu tới bảng Review, sử dụng mối quan hệ 1-1)
replyContent: nội dung người được/bị đánh giá phản hồi lại
createdBy: id của người được/bị đánh giá phản hồi lại (tham chiếu tới bảng User)
*/

const ReplyReview = mongoose.model("reviewReply", ReviewReplySchema);
export { ReplyReview, ReviewReplySchema };
