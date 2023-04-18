import { Conversation } from '../models/index.js';
import errorFunction from '../utils/errorFunction.js';

const messageControllers = {
  create: async (req, res, next) => {
    try {
      const { conversationId } = req.params;
      const conversation = await Conversation.findById({ _id: conversationId });
      if (!conversation) {
        return res
          .status(404)
          .json(errorFunction(false, 404, 'Conversation is not found'));
      }
      const { senderId, message } = req.body;
      if (
        conversation.senderId === senderId ||
        conversation.receiverId === senderId
      ) {
        const newMessage = await Message.create({
          conversationId: conversation._id,
          senderId,
          message,
        });
        newMessage.save().then((data) => {
          return res
            .status(201)
            .json(
              errorFunction(false, 201, 'Create message is succesfully', data)
            );
        });
      } else {
        return res
          .status(403)
          .json(
            errorFunction(
              false,
              403,
              'You do not have permission to join this conversation'
            )
          );
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
export default messageControllers;
