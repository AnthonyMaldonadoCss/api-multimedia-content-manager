const { Schema, model } = require('mongoose');

const contentSchema = new Schema({
  topicId: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

module.exports = model('Content', contentSchema);