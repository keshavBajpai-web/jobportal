import express from 'express'
import { jobApply, getApplicants, getAppliedJob, updateStatus } from '../controller/applicationController.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
const router = express.Router()
router.route("/apply/:id").post( isAuthenticated,jobApply)
router.route("/getAppliedJob").get(isAuthenticated,getAppliedJob)
router.route("/getApplicant/:id").get(getApplicants)
router.route("/update/:id").put(isAuthenticated,updateStatus)
 
export default router
