import Joi from 'joi';

const messageSchemas = {
  messageCreate: Joi.object().keys({
    senderId: Joi.string().required(),
    message: Joi.string().min(1).required(),
  }),
  paramsMessage: Joi.object().keys({
    conversationId: Joi.string().required(),
  }),
};

export default messageSchemas;
