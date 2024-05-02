const { Schema, model } = require('mongoose');

const categoriesSchema = new Schema({
  name: { 
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
}, { timestamps: true });

module.exports = model('Category', categoriesSchema)