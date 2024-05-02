const { Schema, model } = require('mongoose');

const topicsSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  rules: { type: Object, required: true },
}, { timestamps: true });

module.exports = model('Topics', topicsSchema)