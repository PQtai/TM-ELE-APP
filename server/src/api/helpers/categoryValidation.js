import Joi from "joi";

const categoryValidation = Joi.object({
    title: Joi.string().min(5).required(),
})

export default categoryValidation;