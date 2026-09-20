import express from 'express'
import { jobApply, getApplicants, getAppliedJob, updateStatus } from '../controller/applicationController.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import { isStudent } from '../middlewares/isStudent.js'
import { isRecruiter } from '../middlewares/isRecruiter.js'
const router = express.Router()
router.route("/apply/:id").post( isAuthenticated, isStudent,jobApply)
router.route("/getAppliedJob").get(isAuthenticated,getAppliedJob)
router.route("/getApplicant/:id").get(getApplicants)
router.route("/update/:id").put(isAuthenticated,isRecruiter,updateStatus)
 
export default router
