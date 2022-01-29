/* eslint-disable @typescript-eslint/no-var-requires */
const Joi = require("joi");

export default {
  login_validation: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(4).max(100).required(),
  }),

  register_validation: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
    password: Joi.string().min(4).max(100).required(),
  }),
};
