import { Message } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";
import uploads from "../utils/cloudinary.js";
import fs from "fs";

const messageController = {
  addMessage: async (req, res, next) => {
    try {
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
            ...req.body,
            images: listImg,
          });
          return res
            .status(201)
            .json(
              errorFunction(
                true,
                201,
                "Create message successfully",
                newMessage
              )
            );
        } catch (error) {
          return res.status(500).json(errorFunction(false, 500, error.message));
        }
      } else {
        const { chatId, senderId, message } = req.body;

        if (!chatId || !senderId || !message) {
          return res
            .status(400)
            .json(errorFunction(false, 400, "Missing required fields"));
        }

        const newMessage = await Message.create({
          chatId,
          senderId,
          message,
        });

        return res
          .status(201)
          .json(
            errorFunction(true, 201, "Create message successfully", newMessage)
          );
      }
    } catch (error) {
      return res.status(500).json(errorFunction(false, 500, error.message));
    }
  },

  // Lấy thông tin các tin nhắn trong một cuộc trò chuyện
  getMessage: async (req, res) => {
    try {
      const { chatId } = req.params;
      if (!chatId) {
        return res.status(400).json(errorFunction(false, 400, 'Invalid chatId'));
      }
      const senderId = req.user.id;
      const messages = await Message.find({ chatId, senderId });
      if (!messages) {
        return res
            .status(404)
            .json(errorFunction(false, 404, 'Message not found'))
      }      

      return res
        .status(200)
        .json(errorFunction(true, 200, "Get messages successfully", messages));
    } catch (error) {
      return res.status(500).json(errorFunction(false, 500, error.message));
    }
  },
};
export default messageController;
