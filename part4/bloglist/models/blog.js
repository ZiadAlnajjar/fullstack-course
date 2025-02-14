const mongoose = require('mongoose');
const { schemaToJSON } = require('../utils/model_helper');

const blogSchema = new mongoose.Schema({
  title: {
    type    : String,
    required: true,
    trim    : true,
  },
  author: {
    type    : String,
    required: true,
    trim    : true,
  },
  url: {
    type    : String,
    required: true,
    trim    : true,
  },
  likes: {
    type   : Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
  },
  comments: {
    type   : [mongoose.Schema.Types.ObjectId],
    ref    : 'Comment',
    default: [],
  },
});

schemaToJSON(blogSchema);

module.exports = mongoose.model('Blog', blogSchema);
