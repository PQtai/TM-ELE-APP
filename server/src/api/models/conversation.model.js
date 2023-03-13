import mongoose from 'mongoose';
const ConversationSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'post',
    },
    lastMess: { type: String, default: '' },
  },
  { timestamps: true }
);

const Conversation = mongoose.model('conversation', ConversationSchema);
export { Conversation, ConversationSchema };
