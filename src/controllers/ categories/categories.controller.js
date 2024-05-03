const categories = require('../../models/Categories');
const Topics = require('../../models/Topics');
const { 
  newCategorySchemaValidator,
  updateCategorySchemaValidator
} = require('./categories.validators');

const addCategories = async (req, res) => {
  
  const { value, error } = newCategorySchemaValidator(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, imagen } = value;

  const categoryExists = await categories.findOne({ name });

  if (categoryExists) {
    return res.status(400).json({ message: 'Category already exists' });
  }

  const bodyCategories = {
    name,
    imagen
  }

  const category = new categories(bodyCategories);

  try {
    await category.save();
  }
  catch (error) {
    res.status(400).json({ message: error?.errors[0]?.message || error.message });
  }

  res.json({ message: 'Category saved' });

}


const updateCategories = async (req, res) => {

  const { value, error } = updateCategorySchemaValidator(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, _id, imagen } = value;

  const categoryExists = await categories.findOne({ _id });

  if ( !categoryExists ) {
    return res.status(400).json({ message: 'Category not found' });
  }

  const bodyCategories = {
    name,
  }

  if ( imagen ) bodyCategories.imagen = imagen;

  try {
    await categories.findByIdAndUpdate({ _id }, bodyCategories)
  }
  catch (error) {
    res.status(400).json({ message: error?.errors[0]?.message || error.message });
  }
  finally {
    mongoose.connection.close();
  }

  res.json({ message: 'Category updated' });
}

const deleteCategories = async (req, res) => {

  const { idCategory } = req.body;

  if ( !idCategory ) {
    return res.status(400).json({ message: 'id is required' });
  }

  const categoryExists = await categories.findOne({ _id: idCategory });

  if ( !categoryExists ) {
    return res.status(400).json({ message: 'Category not found' });
  }

  try {
    await categories.findOneAndDelete({ name: idCategory });
  }
  catch (error) {
    res.status(400).json({ message: error?.errors[0]?.message || error.message });
  }
  finally {
    mongoose.connection.close();
  }

  res.json({ message: 'Category deleted' });
}

const getCategories = async (req, res) => {

  const categoriesList = await categories.find();

  res.json(categoriesList);
}

module.exports = {
  addCategories,
  updateCategories,
  deleteCategories,
  getCategories
}