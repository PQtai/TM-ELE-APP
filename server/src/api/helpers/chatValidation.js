import Joi from 'joi';

const senderId = Joi.string().label('Sender ID');

const receiverId = Joi.string().required().label('Receiver ID');


const chatValidation = Joi.object({
    senderId, receiverId
});

export default chatValidation;
