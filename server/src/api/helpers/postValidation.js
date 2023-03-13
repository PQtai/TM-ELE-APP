import Joi from 'joi';

const postSchemas = {
  postCreate: Joi.object().keys({
    title: Joi.string().min(2).max(50).required(),
    address: Joi.string().required(),
    images: Joi.array().items(Joi.string().min(2)).required(),
    otherInfo: Joi.number(),
    status: {
      code: Joi.number().valid(0, 1, 2, 9).default(2),
    },
    acreage: Joi.number().positive().precision(2),
    price: Joi.number().positive(),
    deposit: Joi.number().positive(),
    description: Joi.string().min(10).max(1500).required(),
    userId: Joi.string().required(),
  }),
  postEditStatus: Joi.object().keys({
    code: Joi.number().valid(0, 1, 2, 9).default(2),
    postId: Joi.string().required(),
    mess: Joi.string().when('code', {
      is: Joi.valid(0),
      then: Joi.string().required(),
      otherwise: Joi.forbidden(),
    }),
  }),
  postList: Joi.object().keys({
    page: Joi.number().min(1).required(),
    pageSize: Joi.number().max(20).required(),
  }),
  postDetail: Joi.object({
    id: Joi.string().min(1).required(),
  }),
};

export default postSchemas;
