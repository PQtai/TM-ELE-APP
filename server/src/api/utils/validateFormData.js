import errorFunction from '../utils/errorFunction.js';

const validateFormData = (property, schema) => {
  return (req, res, next) => {
    req.body = JSON.parse(req.body.datas);
    const { error } = schema.validate({
      images: [...req.files],
      datas: { ...req[property] },
    });

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

export default validateFormData;
