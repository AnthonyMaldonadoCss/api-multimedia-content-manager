const Joi = require('joi');

const addTopicSchema = Joi.object({
  'name': Joi.string().required().min(3).max(20),
  'rules': Joi.array().required(),
})

const updateTopicSchema = Joi.object({
  'name': Joi.string().optional().min(3).max(20),
  'rules': Joi.array().optional(),
  '_id': Joi.string().required().messages({
    'any.required': 'id is required',
  })
})

module.exports = { 
  newTopicSchemaValidator: (topic) => {
    return addTopicSchema.validate(topic);
  },
  updateTopicSchemaValidator: (topic) => {
    return updateTopicSchema.validate(topic);
  }
}