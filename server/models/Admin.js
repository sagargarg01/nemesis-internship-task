const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: [true, 'User already exists'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
    },
  },
  {
    timestamps: true,
  }
)

//return jwt
authSchema.methods.getJwtToken = function () {
  //can't use arrow function here
  return jwt.sign({ id: this._id }, 'secretKeY', {
    expiresIn: 300000,
  })
}

module.exports = mongoose.model('Auth', authSchema)
