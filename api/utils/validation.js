const Joi = require('joi')

export const authSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
  name: Joi.string().required()
})