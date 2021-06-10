const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const candidateSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter your username'],
    unique: [true, 'User already exists'],
    maxLength: [30, 'Your name cannot exceed 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: [true, 'User already exists'],
  },
  mobile: {
    type: String,
    required: [true, 'Please enter your address'],
  },
  address: {
    type: String,
    required: [true, 'Please enter your address'],
  },
})

module.exports = mongoose.model('User', candidateSchema)
