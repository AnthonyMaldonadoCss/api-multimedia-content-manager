const Content = require('../../models/Content');
const { 
  newContentSchemaValidator,
  updateContentSchemaValidator
} = require('./content.validators');

const { validContent } = require('../../controllers/content/content.helpers');

const addContent = async (req, res) => {

  const { value, error } = newContentSchemaValidator(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { contentValue, author, type, topicId, categoryId } = value;

  const contentExists = await Content.findOne({ content: contentValue }); 

  if (contentExists) {
    return res.status(400).json({ message: 'Content already exists' });
  }

  const topicExists = await Topics.findOne({ _id: topicId }, { rules: 1 });

  if ( !topicExists ) {
    return res.status(400).json({ message: 'Topic not found' });
  }

  const isValidContent = await validContent(contentValue, topicExists.rules);

  if (!isValidContent) {
    return res.status(400).json({ message: 'Content is not valid' });
  }

  const bodyContent = {
    contentValue,
    author,
    type,
    topicId,
  }

  if (categoryId) bodyContent.categoryId = categoryId

  const content = new Content(bodyContent);

  try {
    await content.save();

    res.json({ message: 'Content created' });
  }
  catch (error) {
    res.status(400).json({ message: error?.errors[0]?.message || error.message });
  }

}

const getContent = async (req, res) => {

  const contentList = await Content.find();

  res.json(contentList);
}

const updateContent = async (req, res) => {

  const { value, error } = updateContentSchemaValidator(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { _id, contentValue, author, type, topicId, categoryId } = value;

  const contentExists = await Content.findOne({ _id });

  if ( !contentExists ) {
    return res.status(400).json({ message: 'Content not found' });
  }

  const bodyContent = {
    contentValue,
    author,
    type,
    topicId,
  }

  if (categoryId) bodyContent.categoryId = categoryId

  try {
    await Content.findOneAndUpdate({ _id }, bodyContent);
  }
  catch (error) {
    res.status(400).json({ message: error?.errors[0]?.message || error.message });
  }
}

const deleteContent = async (req, res) => {

  const { _id } = req.body;

  if ( !_id ) {
    return res.status(400).json({ message: '_id is required' });
  }

  const contentExists = await Content.findOne({ _id });

  if ( !contentExists ) {
    return res.status(400).json({ message: 'Content not found' });
  }

  try {
    await Content.findByIdAndDelete({ _id });
  }
  catch (error) {
    res.status(400).json({ message: error?.errors[0]?.message || error.message });
  }
}

module.exports = {
  addContent,
  getContent,
  updateContent,
  deleteContent
}