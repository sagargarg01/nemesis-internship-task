const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
const { isAuthenticatedUser } = require('../utils/authMiddleware')

router.get('/getall', isAuthenticatedUser, userController.getAllUsers)
router.delete('/deleteuser', isAuthenticatedUser, userController.deleteUser)
router.post('/create', isAuthenticatedUser, userController.create)

module.exports = router
