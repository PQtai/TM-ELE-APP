import { Chat } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";

const chatControllers = {
  // Tạo 1 đoạn chat giữa 2 người dùng
  createChat: async (req, res) => {
    try {
      const senderId = req.user.id;
      const receiverId = req.body.receiverId;
      const newChat = new Chat({
        members: [
          {
            senderId,
            receiverId,
          },
        ],
      });
      const result = await newChat.save();
      res
        .status(200)
        .json(errorFunction(false, 200, "Created Chat successfully", result));
    } catch (error) {
      res.status(500).json(errorFunction(false, 500, error.message));
    }
  },

  // Xem người gửi (người dùng đang đăng nhập) đã nhắn cho những ai
  userChats: async (req, res) => {
    try {
      const userId = req.user.id;
      const chats = await Chat.find({
        "members.senderId": userId,
      })
        .populate("members.senderId", "firstName lastName avatar")
        .populate("members.receiverId", "firstName lastName avatar")
        .exec();
      res.status(200).json(errorFunction(false, 200, "Had found", chats));
    } catch (error) {
      res.status(500).json(errorFunction(true, 500, error.message));
    }
  },

  // Tìm đoạn chat giữa 2 người dùng (người gửi và người nhận) cụ thể
  findChat: async (req, res) => {
    const firstId = req.params.firstId;
    const secondId = req.params.secondId;
    try {
      const chats = await Chat.find({
        $or: [
          { "members.senderId": firstId, "members.receiverId": secondId },
          { "members.senderId": secondId, "members.receiverId": firstId },
        ],
      });
      const populatedChats = await Chat.populate(chats, {
        path: "members.senderId members.receiverId",
        select: "firstName lastName avatar",
      });
      if (chats.length > 0) {
        return res
          .status(200)
          .json(errorFunction(false, 200, "Found a chat", populatedChats));
      }
      return res.status(404).json(errorFunction(false, 404, "Chat not found"));
    } catch (error) {
      res.status(500).json(errorFunction(true, 500, error.message));
    }
  },
};

export default chatControllers;
