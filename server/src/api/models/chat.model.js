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
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", ChatSchema);

export {Chat, ChatSchema};
