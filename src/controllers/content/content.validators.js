const Joi = require('joi');

const newContentSchema = Joi.object({
  contentValue: Joi.string().required(),
  author: Joi.string().required(),
  type: Joi.string().required(),
  topicId: Joi.string().required(),
  categoryId: Joi.string().optional()
});

const updateContentSchema = Joi.object({
  '_id': Joi.string().required(),
  contentValue: Joi.string().optional(),
  author: Joi.string().optional(),
  type: Joi.string().optional(),
  topicId: Joi.string().optional(),
  categoryId: Joi.string().optional()
})

module.exports = { 
  newContentSchemaValidator: (body) => newContentSchema.validate(body),
  updateContentSchemaValidator: (body) => updateContentSchema.validate(body)
}