import { Chat, Message } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";
import uploads from "../utils/cloudinary.js";
import fs from "fs";

const messageController = {
  // Gửi tin nhắn
  addMessage: async (req, res, next) => {
    try {
      const { chatId, text, postId, receiverId } = req.body;
      const senderId = req.user.id;
      // Tìm xem đã có đoạn chat trước đó chưa
      let chat = await Chat.findOne({ _id: chatId });
      // Nếu chưa thì tạo truyền 2 id để tạo chat
      if (!chat) {
        chat = await Chat.create({ members: [senderId, receiverId] });
      }
      // Nếu có thì thêm bình thường
      if (req.files && req.files.length > 0) {
        try {
          const listImg = [];

          for (const file of req.files) {
            const { path, mimetype } = file;
            const newPath = await uploads(path, "Messages");
            const imageUrl = newPath.url;
            fs.unlinkSync(path);
            listImg.push({
              url: imageUrl,
              contentType: mimetype,
            });
          }

          const newMessage = await Message.create({
            chatId: chat._id, // Sử dụng chatId mới hoặc chatId đã có trước đó
            senderId,
            text,
            postId,
            images: listImg,
          });

          return res
            .status(201)
            .json(
              errorFunction(
                false,
                201,
                "Create message successfully",
                newMessage
              )
            );
        } catch (error) {
          return res.status(500).json(errorFunction(false, 500, error.message));
        }
      } else {
        if (!chatId || !senderId || !text) {
          return res
            .status(400)
            .json(errorFunction(false, 400, "Missing required fields"));
        }

        const newMessage = await Message.create({
          chatId: chat._id,
          senderId,
          text,
          postId,
        });

        return res
          .status(201)
          .json(
            errorFunction(false, 201, "Create message successfully", newMessage)
          );
      }
    } catch (error) {
      return res.status(500).json(errorFunction(true, 500, error.message));
    }
  },

  // Lấy thông tin các tin nhắn trong một cuộc trò chuyện
  getMessage: async (req, res) => {
    try {
      const { chatId } = req.params;
      if (!chatId) {
        return res.status(400).json(errorFunction(true, 400, "Invalid chatId"));
      }
      const currentUser = req.user.id;
      const pageNumber = parseInt(req.query.pageNumber) || 1;
      const pageSize = parseInt(req.query.pageSize) || 20;
      const skip = (pageNumber - 1) * pageSize;

      const messages = await Message.find({ chatId, currentUser })
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(skip);

      if (!messages) {
        return res
          .status(404)
          .json(errorFunction(true, 204, "Message not found"));
      }

      const countMessages = await Message.countDocuments({
        chatId,
        currentUser,
      });
      const totalPages = Math.ceil(countMessages / pageSize);
      return res.status(200).json(
        errorFunction(false, 200, "Get messages successfully", {
          pageNumber,
          totalPages,
          countMessages,
          messages,
        })
      );
    } catch (error) {
      return res.status(500).json(errorFunction(true, 500, error.message));
    }
  },
};
export default messageController;
