const Joi = require('joi')

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const registerSchema = Joi.object({
  username: Joi.string().required().min(3).max(20),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6).max(20),
  role: Joi.string().required()
})

module.exports = {
  loginSchemaValidator: (body) => loginSchema.validate(body),
  registerSchemaValidator: (body) => registerSchema.validate(body)
}