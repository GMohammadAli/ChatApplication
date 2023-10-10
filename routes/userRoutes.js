const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const { isAuthenticated } = require("../middlewares/isAuthenticated")


router.route('/login')
    .post(userController.loginUser)

router.route('/register')
    .post(userController.registerUser)

router.route('/get')
    .get(isAuthenticated , userController.getUsers)

router.route('/logout')
    .post(userController.logoutUser)

module.exports = router
