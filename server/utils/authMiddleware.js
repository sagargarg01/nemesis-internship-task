const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

// Checks if user is authenticated or not
exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({
      message: 'session ended',
      success: false,
    })
  }

  const decoded = jwt.verify(token, 'secretKeY')
  const user = await Admin.findById(decoded.id)

  req.user = user

  next()
}
