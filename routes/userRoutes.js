import express from "express"
import {loginUser, registerUser, getUsers, logoutUser} from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();


router.route('/login')
    .post(loginUser)

router.route('/register')
    .post(registerUser)

router.route('/get')
    .get(isAuthenticated , getUsers)

router.route('/logout')
    .post(logoutUser)

export default router
