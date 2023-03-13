import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conversation',
      require: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('message', MessageSchema);
export { Message, MessageSchema };
