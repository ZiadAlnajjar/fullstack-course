const mongoose = require('mongoose');
const { schemaToJSON } = require('../utils/model_helper');

const commentSchema = new mongoose.Schema({
  content: {
    type    : String,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Blog',
  },
});

schemaToJSON(commentSchema);

module.exports = mongoose.model('Comment', commentSchema);
