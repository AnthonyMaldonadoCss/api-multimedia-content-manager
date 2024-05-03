const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  imagen: Joi.string().required()
});

const updateCategorySchema = Joi.object({
  '_id': Joi.string().required(),
  name: Joi.string().optional(),
  imagen: Joi.string().optional()
})


module.exports = {
  newCategorySchemaValidator: (body) => categorySchema.validate(body),
  updateCategorySchemaValidator: (body) => updateCategorySchema.validate(body)
}