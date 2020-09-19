import Joi from '@hapi/joi';

//Register Validation
export const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).email().allow(null, ''),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

//Login Validation
export const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// module.exports.registerValidation = registerValidation;
// module.exports.loginValidation = loginValidation;
