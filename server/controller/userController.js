const sendTokenUser = require('../utils/jwtTokenUser')
const User = require('../models/User')
const Admin = require('../models/Admin')

module.exports.Login = async function (req, res) {
  try {
    const { email, password } = req.body
    const incomingUser = await Admin.findOne({ email: email })

    if (incomingUser) {
      if (password === incomingUser.password) {
        console.log(incomingUser)
        await sendTokenUser(incomingUser, 200, res)
      } else {
        return res.status(404).json({
          message: 'Incorrect Email/Password',
          success: false,
        })
      }
    } else {
      return res.status(404).json({
        message: 'Incorrect Email/Password',
        success: false,
      })
    }
  } catch (error) {
    console.log('error', error)
    return res.status(400).json({
      message: 'Internal Server Error',
      success: false,
    })
  }
}

module.exports.signOut = async (req, res) => {
  try {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })

    return res.status(200).json({
      message: 'signout success',
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Internal Server Error',
      success: false,
    })
  }
}

module.exports.getAllUsers = async (req, res) => {
  try {
    const Users = await User.find({})

    return res.status(200).json({
      success: true,
      data: Users,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Internal Server Error',
      success: false,
    })
  }
}

module.exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.query.id)
    const remUsers = await User.find({})

    return res.status(200).json({
      success: true,
      data: remUsers,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Internal Server Error',
      success: false,
    })
  }
}

module.exports.profileDetails = async (req, res) => {
  const adminDetails = await Admin.findById(req.user._id)

  if (!adminDetails) {
    return res.status(404).json({
      message: 'No user found',
      success: false,
    })
  } else {
    return res.status(200).json({
      success: true,
      data: adminDetails,
    })
  }
}

module.exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body)

    return res.status(200).json({
      message: 'User added successfully',
      success: true,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Internal Server Error',
      success: false,
    })
  }
}
