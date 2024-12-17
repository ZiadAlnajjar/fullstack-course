const mongoose = require('mongoose');
const { schemaToJSON } = require('../utils/helpers');
const validatePhoneNumber = require('../validators/validatePhoneNumber');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
  .connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch((e) => console.log('Error connecting to MongoDB:', e.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: validatePhoneNumber,
  },
});

schemaToJSON(personSchema);

module.exports = mongoose.model('Person', personSchema);
