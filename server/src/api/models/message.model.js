import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'chat',
      require: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    },
    text: {
      type: String,
    },
    postId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
      }
    ],
    images: [
      {
        url: { type: String },
        contentType: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Message = mongoose.model('message', MessageSchema);
export { Message, MessageSchema};
