<<<<<<< HEAD
import { Chat, Message } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";
import { checkConditionReview } from "../helpers/checkContionReview.js";
=======
import { Chat, Message } from '../models/index.js';
import errorFunction from '../utils/errorFunction.js';
>>>>>>> master

const chatControllers = {
  // Tạo 1 đoạn chat giữa 2 người dùng
  createChat: async (req, res) => {
    try {
      const senderId = req.user.id;
      const receiverId = req.body.receiverId;
      const newChat = new Chat({
        members: [senderId, receiverId],
      });
      const result = await newChat.save();
      res
        .status(200)
        .json(errorFunction(false, 200, 'Created Chat successfully', result));
    } catch (error) {
      res.status(500).json(errorFunction(false, 500, error.message));
    }
  },

  // Xem người gửi (người dùng đang đăng nhập) đã nhắn cho những ai
  getConversations: async (req, res) => {
    try {
      const currentUser = req.user.id;
<<<<<<< HEAD
      // Lấy ra những hội thoại mà user hiện tại đã từng tham gia
      const chats = await Chat.find({ members: currentUser })
=======
      console.log(`currentUser ::: ${currentUser}`);
      const chats = await Chat.find({ members: currentUser }) // Lấy ra những hội thoại mà user hiện tại đã từng tham gia
>>>>>>> master
        .populate({
          path: "members",
          select: "_id firstName lastName avatar",
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
            path: "senderId",
            select: "firstName lastName avatar",
          })
          .sort({ createdAt: -1 })
          .exec();

        if (lastMessage) {
          // Kiểm tra xem có đủ điều kiện cho phép được đánh giá
          const otherUserId = chat.members.find(
            (member) => member._id.toString() !== currentUser
          );
          const isConditionReview = await checkConditionReview(
            chat._id,
            currentUser,
            otherUserId._id
          );
          // Update field isRatingCondition nếu thỏa mãn đk
          if (isConditionReview) {
            await Chat.findByIdAndUpdate(chat._id, { isRatingCondition: true });
            chat.isRatingCondition = true;
          }
          // Push data vào mảng result
          result.push({
            chatId: chat._id,
            members: chat.members,
            lastMessage: {
              sender: lastMessage.senderId,
              text: lastMessage.text,
              read: lastMessage.read,
              createdAt: lastMessage.createdAt,
            },
<<<<<<< HEAD
            isRatingCondition: chat.isRatingCondition,
=======
>>>>>>> master
          });
        }
      }

<<<<<<< HEAD
      return res.status(200).json(errorFunction(false, 200, "OK", result));
=======
      return res.status(200).json(errorFunction(false, 200, 'OK', result));
>>>>>>> master
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
<<<<<<< HEAD
        .json(errorFunction(true, 500, "Something went wrong"));
    }
  },

  // Tìm đoạn chat giữa 2 người dùng (người gửi và người nhận) cụ thể
=======
        .json(errorFunction(true, 500, 'Something went wrong'));
    }
  },

  // Tìm đoạn chat giữa 2 người dùng (người gửi và người nhận) cụ thể và lấy ra lịch sử nhắn tin
>>>>>>> master
  findChat: async (req, res) => {
    const firstId = req.user.id;
    const secondId = req.params.secondId;
    try {
      const chat = await Chat.findOne({
        members: { $all: [firstId, secondId] },
      });
      if (chat) {
        const chatId = chat._id;
        return res.status(200).json(
          errorFunction(false, 200, 'Get messages successfully', {
            chatId,
          })
        );
      }
      return res.status(404).json(errorFunction(true, 404, 'Chat not found'));
    } catch (error) {
      res.status(500).json(errorFunction(true, 500, error.message));
    }
  },
};

export default chatControllers;
