const mongoose = require('mongoose');
const { schemaToJSON } = require('../utils/model_helper');

const userSchema = new mongoose.Schema({
  name: {
    type    : String,
    required: true,
    trim    : true,
  },
  username: {
    type     : String,
    required : true,
    unique   : true,
    trim     : true,
    minLength: 3,
  },
  password: {
    type     : String,
    required : true,
    minLength: 3,
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Blog',
  }],
});

schemaToJSON(userSchema, ((returnedObj) => delete returnedObj.password));

module.exports = mongoose.model('User', userSchema);
