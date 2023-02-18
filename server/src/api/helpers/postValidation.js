import Joi from 'joi';

const postSchemas = {
  postCreate: Joi.object().keys({
    title: Joi.string().min(2).max(50).required(),
    address: Joi.string().required(),
    images: [Joi.string().min(2)],
    otherInfo: Joi.number(),
    status: {
      code: Joi.number().valid(0, 1, 2).default(2),
      mess: Joi.string().default('Đợi duyệt'),
    },
    acreage: Joi.number().positive().precision(2),
    price: Joi.number().positive(),
    deposit: Joi.number().positive(),
    description: Joi.string().min(10).max(1500).required(),
    evaluate: Joi.number().positive().precision(2),
    // user: Joi.string().required(),
  }),
  postList: Joi.object().keys({
    page: Joi.number().required(),
    pageSize: Joi.number().required(),
  }),
  postDetail: Joi.object({
    id: Joi.string().min(1).required(),
  }),
};

export default postSchemas;
