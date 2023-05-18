import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    reviewedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    reply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviewReply",
    },
  },
  { timestamps: true }
);
/*
reviewer: id của người tạo đánh giá (tham chiếu tới bảng User)
reviewedUser: id của người được/bị đánh giá (tham chiếu tới bảng User)
rating: số sao/điểm người đánh giá cho người được/bị đánh giá (giá trị từ 1 tới 5)
comment: nội dung mà người đánh giá cho người được/bị đánh giá (tối đa 500 kí tự)
*/
const Review = mongoose.model("review", ReviewSchema);
export { Review, ReviewSchema };
