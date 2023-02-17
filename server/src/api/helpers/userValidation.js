// const { required } = require("joi")
import Joi from "joi"
import errorFunction from "../utils/errorFunction.js";
// const { encryptionPassword } = require("../utils/encryption")

const patternPassword = /^[a-zA-Z0-9]{3,30}$/
const patternPhoneNumber = /[0]{1}[0-9]{9}/

const validation = Joi.object({
    firstName: Joi.string().min(2).max(100).optional(),
    lastName: Joi.string().min(2).max(100).optional(),
    password: Joi.string().pattern(new RegExp(patternPassword)).required(),
    phone: Joi.string().length(10)
    .pattern(new RegExp(patternPhoneNumber)).required(),
    isAdmin: Joi.string().required(),
    avatar: Joi.string().allow(""),
})

const userValidation = async (req, res, next) => {
    const { error } = validation.validate(req.body)
    if(error) {
        res.status(406)
        return res.json(
            errorFunction(true, `Error in User Data: ${error.message}`),
        )
    } else {
        next()
    }
}

export default userValidation;
