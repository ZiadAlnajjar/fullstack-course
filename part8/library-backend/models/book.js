const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
  title: {
    type    : String,
    required: true,
    unique : true,
    trim    : true,
    minlength: 2,
  },
  published: {
    type    : Number,
    required: true,
  },
  genres: {
    type    : [{
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    }],
    required: true,
    validate: {
      validator: (arr) => arr.length >= 1,
      message: 'At least 1 tag is required.'
    }
  },
  author: {
    type   : mongoose.Schema.Types.ObjectId,
    ref : 'Author',
    required: true,
  },
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('Book', schema);
