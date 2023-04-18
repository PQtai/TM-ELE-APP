import Joi from 'joi';

const chatId = Joi.string().required().label('Chat ID');

const senderId = Joi.string().required().label('Sender ID');

const text = Joi.string().label('Text');

const postId = Joi.array().items(Joi.string().label('Post ID'));

const images = Joi.array().items(
  Joi.object({
    url: Joi.string().label('Image URL'),
    contentType: Joi.string().label('Content type'),
  })
);

const messageValidation = Joi.object({
  chatId, senderId, text, postId, images
});

export default messageValidation;
