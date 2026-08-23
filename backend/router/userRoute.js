import express from 'express'
import { getUser, logout, updateById, updateProfile, userLogin, userSignup } from '../controller/userController.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import { singleUpload } from '../middlewares/multer.js'
const router = express.Router()


router.route("/").get(getUser)
router.route("/register").post( singleUpload ,userSignup)
router.route("/login").post(userLogin)
router.route("/logout").get(logout)
router.route("/update/:id").put(updateById)
router.route("/profile/update").put( isAuthenticated , singleUpload ,updateProfile)

export default router