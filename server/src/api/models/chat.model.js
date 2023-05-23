import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    // isRatingCondition: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

/*
  members: chứa 2 id của user trong phòng chat
  isRatingCondition: có đủ điều kiện để được đánh giá hay không
*/

const Chat = mongoose.model("chat", ChatSchema);

export { Chat, ChatSchema };
