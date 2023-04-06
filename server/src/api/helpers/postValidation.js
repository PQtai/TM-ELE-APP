import Joi from 'joi';

const postSchemas = {
  postCreate: Joi.object().keys({
    images: Joi.any()
      .meta({ swaggerType: 'file' })
      .optional()
      .description('Image File')
      .required(),
    datas: Joi.object().keys({
      typeCategory: Joi.string().required(),
      typePost: Joi.number().required(),
      title: Joi.string().min(2).max(50).required(),
      address: {
        province: Joi.string().required(),
        district: Joi.string().required(),
        wards: Joi.string().required(),
        addressDetails: Joi.string().required(),
      },
      otherInfo: Joi.number(),
      status: {
        code: Joi.number().valid(0, 1, 2, 9).default(2),
      },
      acreage: Joi.string()
        .pattern(/^\d{1,10}(,\d{1,3})?$/)
        .required(),
      price: Joi.number().positive().required(),
      deposit: Joi.number().positive(),
      description: Joi.string().min(10).max(1500).required(),
    }),
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
    page: Joi.number().min(1),
    pageSize: Joi.number().max(20),
    code: Joi.number().valid(0, 1, 2, 9),
  }),
  postDetail: Joi.object({
    id: Joi.string().min(1).required(),
  }),
  postsAuthor: Joi.object().keys({
    code: Joi.number().valid(0, 1, 2, 9).required(),
    userId: Joi.string().required(),
  }),
};

export default postSchemas;
