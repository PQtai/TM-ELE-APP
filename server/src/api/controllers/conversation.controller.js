import { Conversation, Chat, Post, User } from '../models/index.js';
import errorFunction from '../utils/errorFunction.js';

const conversationControllers = {
  create: async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await Post.findById({ _id: postId });
      if (!post) {
        return res
          .status(404)
          .json(errorFunction(false, 404, 'Post is not found'));
      }

      const { senderId, receiverId, message } = req.body;
      const newConversation = await Conversation.create({
        senderId,
        receiverId,
        postId,
        lastMess: message,
      });
      const conversation = await newConversation.save();
      User.updateMany(
        { _id: { $in: [senderId, receiverId] } },
        { $push: { conversation: conversation._id } }
      );
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
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  show: async (req, res, next) => {
    try {
      const { postId, senderId } = req.query;
      const conversation = await Conversation.findOne({
        postId,
        senderId,
      });
      if (!conversation) {
        return res
          .status(404)
          .json(errorFunction(true, 404, 'Post is not found'));
      }
      return res
        .status(404)
        .json(
          errorFunction(
            false,
            200,
            'Find Conversation is succesfully',
            conversation
          )
        );
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
export default conversationControllers;
