import { Chat, Message } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";

const chatControllers = {
  // Tạo 1 đoạn chat giữa 2 người dùng
  createChat: async (req, res) => {
    try {
      const senderId = req.user.id;
      const receiverId = req.body.receiverId;
      const newChat = new Chat({
        members: [
          senderId,
          receiverId,
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
  getConversations: async (req, res) => {
    try {
      const currentUser = req.user.id;
      console.log(`currentUser ::: ${currentUser}`)
      const chats = await Chat.find({ members: currentUser }) // Lấy ra những hội thoại mà user hiện tại đã từng tham gia
        .populate({
          path: 'members',
          select: '_id firstName lastName avatar',
          match: { _id: { $ne: currentUser } }, // Chỉ lấy ra người người dùng khác user hiện tại
        })
        .sort({ updatedAt: -1 }) // Sắp xếp theo thời gian tạo giảm dần
        .exec();

      const result = []; // Chứa thông tin conversation
      // Duyệt qua từng conversations
      for (let i = 0; i < chats.length; i++) {
        const chat = chats[i];
        // Lấy tin nhắn cuối cùng
        const lastMessage = await Message.findOne({ chatId: chat._id })
          .populate({
            path: 'senderId',
            select: 'firstName lastName avatar',
          })
          .sort({ createdAt: -1 })
          .exec();
        // Nếu có thì push dữ liệu vào mảng result
        if (lastMessage) {
          result.push({
            chatId: chat._id,
            members: chat.members,
            lastMessage: {
              sender: lastMessage.senderId,
              text: lastMessage.text,
              read: lastMessage.read,
              createdAt: lastMessage.createdAt
            }
          });
        }
      }
  
      return res.status(200).json(errorFunction(false, 200, "OK", result));
    } catch (error) {
      console.log(error.message)
      return res.status(500).json(errorFunction(true, 500, "Something went wrong"));
    }
  },
  

  

  // Tìm đoạn chat giữa 2 người dùng (người gửi và người nhận) cụ thể
  findChat: async (req, res) => {
    const firstId = req.user.id;
    const secondId = req.params.secondId;
    try {
      const chat = await Chat.findOne({
        members: { $all: [firstId, secondId] },
      });
      const populatedChats = await Chat.populate(chat, {
        path: "members",
        select: "_id firstName lastName avatar",
      });
      if (chat) {
        return res
          .status(200)
          .json(errorFunction(false, 200, "Found a chat", populatedChats));
      }
      return res.status(404).json(errorFunction(true, 404, "Chat not found"));
    } catch (error) {
      res.status(500).json(errorFunction(true, 500, error.message));
    }
  },
};

export default chatControllers;
