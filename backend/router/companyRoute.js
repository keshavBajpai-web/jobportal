import express from 'express'
import { registerCompany,getCompany,getCompanyById,updateCompany } from '../controller/companyController.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import { singleUpload } from '../middlewares/multer.js'
import { isRecruiter } from '../middlewares/isRecruiter.js'
const router = express.Router()
 
router.route("/register").post(isAuthenticated,isRecruiter,registerCompany)
router.route("/get").get(isAuthenticated,getCompany)
router.route("/get/:id").get(isAuthenticated,getCompanyById)
router.route("/update/:id").put(isAuthenticated,isRecruiter,singleUpload,updateCompany)
export default router


