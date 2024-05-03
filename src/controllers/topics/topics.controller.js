const Topics = require('../../models/Topics');
const Content = require('../../models/Content');
const { 
  newTopicSchemaValidator,
  updateTopicSchemaValidator
} = require('./topics.validators');


const getTopics = async (req, res) => {

  const topicsList = await Topics.find();

  res.json(topicsList);
}

const addTopic = async (req, res) => {

  const { value, error } = newTopicSchemaValidator(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, rules } = value;

  const topicExists = await Topics.findOne({ name });

  if (topicExists) {
    return res.status(400).json({ message: 'Topic already exists' });
  }

  if (!rules.length) {
    return res.status(400).json({ message: 'Rules are required' });
  }

  const topic = new Topics({
    name,
    rules
  });

  try {
    await topic.save();

    res.json({ message: 'Topic created' });
  }
  catch (error) {
    res.status(400).json({ message: error?.errors[0]?.message || error.message });
  }
}

const updateTopic = async (req, res) => {

  const { value, error } = updateTopicSchemaValidator(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, rules, _id } = value;

  const topicExists = await Topics.findOne({ _id });

  if ( !topicExists ) {
    return res.status(400).json({ message: 'Topic not found' });
  }

  const contentWithTopic = await Content.countDocuments({ topicId: _id });

  if ( contentWithTopic > 0 ) {
    return res.status(400).json({ message: 'Topic cannot be deleted because it has content' });
  }

  if ( !rules.length && !name ) {
    return res.status(400).json({ message: 'Rules or name is required' });
  }

  const bodyTopics = {
    name,
    rules
  }

  try {
    await Topics.findOneAndUpdate({ _id }, bodyTopics);

    res.json({ message: 'Topic updated' });
  }
  catch (error) {
    res.status(400).json({ message: error?.errors[0]?.message || error.message });
  }
}

const deleteTopic = async (req, res) => {

  const { _id } = req.body;

  if ( !_id ) {
    return res.status(400).json({ message: '_id is required' });
  }

  const topicExists = await Topics.findOne({ _id });

  if ( !topicExists ) {
    return res.status(400).json({ message: 'Topic not found' });
  }

  try {
    await Topics.findByIdAndDelete({ _id });

    res.json({ message: 'Topic deleted' });
  }
  catch (error) {
    res.status(400).json({ message: error?.errors[0]?.message || error.message });
  }

}

module.exports = {
  getTopics,
  addTopic,
  updateTopic,
  deleteTopic
}