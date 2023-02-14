import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversation",
      require: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", MessageSchema);
export { Message, MessageSchema };
