const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

const connect = () => {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
    })
}

module.exports = { connect };
