import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
      require: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    text: {
      type: String,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
    images: [
      {
        url: { type: String },
        contentType: { type: String },
      },
    ],
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/*
chatId: id phòng chat
senderId: id người gửi
text: nội dung tin nhắn
postId: id bài đăng mà người gửi muốn trao đổi với người bán
images: chứa hình ảnh đã gửi
read: tình trạng đã xem tin nhắn hay chưa (đừng thêm)
 */

const Message = mongoose.model("message", MessageSchema);
export { Message, MessageSchema };
