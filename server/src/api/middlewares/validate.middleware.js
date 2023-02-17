import Joi from 'joi';
import errorFunction from '../utils/errorFunction.js';

const validateMiddleware = (property, schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    const valid = error == null;
    console.log(valid);
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      return res.status(422).json(errorFunction(true, 422, `${message}`));
    }
  };
};

export default validateMiddleware;
