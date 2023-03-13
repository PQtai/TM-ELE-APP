import Joi from 'joi';

const conversationSchemas = {
  createConversation: Joi.object().keys({
    senderId: Joi.string().required(),
    receiverId: Joi.string().required(),
    message: Joi.string().min(1).required(),
  }),
  paramsConversation: Joi.object().keys({
    postId: Joi.string().required(),
  }),
  conversationGetInfo: Joi.object().keys({
    postId: Joi.string().required(),
    senderId: Joi.string().required(),
  }),
};

export default conversationSchemas;
