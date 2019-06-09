const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  writer: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255
  },
  contentType: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255
  },
  category: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255
  },
  wordCount: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  docPath: {
    type: String,
    required: true
  }
});

// itemSchema.virtual('coverImagePath').get(function () {
//   if (this.coverImage != null && this.coverImageType != null) {
//     return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
//   }
// })

const Item = mongoose.model('Items', itemSchema);

function validateItem(item) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    writer: Joi.string()
      .min(3)
      .max(50)
      .required(),
    contentType: Joi.string()
      .min(3)
      .max(50)
      .required(),
    category: Joi.string()
      .min(3)
      .max(50)
      .required(),
    wordCount: Joi.string().required()
  };

  return Joi.validate(item, schema);
}

exports.Item = Item;
exports.validateItem = validateItem;
