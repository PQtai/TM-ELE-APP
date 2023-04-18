import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    members: [
      {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
          },
          receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
          },
      }
    ]
  },
  { timestamps: true }
);

  

const Chat = mongoose.model("chat", ChatSchema);
export { Chat, ChatSchema };
