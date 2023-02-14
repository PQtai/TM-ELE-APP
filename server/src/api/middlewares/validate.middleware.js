import Joi from "joi";

const validateMiddleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req[property], schema);

    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      res.status(422).json(errorFunction(true, 422, `${message}`));
    }
  };
};

export default validateMiddleware;
