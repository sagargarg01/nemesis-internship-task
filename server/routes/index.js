const express = require('express')
const {
  Login,
  profileDetails,
  signOut,
} = require('../controller/userController')
const { isAuthenticatedUser } = require('../utils/authMiddleware')
const router = express.Router()

console.log('router loaded')

router.get('/userdetails', isAuthenticatedUser, profileDetails)
router.post('/login', Login)
router.get('/signout', signOut)
router.use('/users', require('./users'))

module.exports = router
