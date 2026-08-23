import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import { getAdminJob, getAllJob, getJobById, postJob } from '../controller/jobController.js'

const router = express.Router()

router.route("/post").post(isAuthenticated,postJob);
router.route("/getAllJobs").get(isAuthenticated,getAllJob);
router.route("/getAdminJobs").get(isAuthenticated,getAdminJob);
router.route("/get/:id").get(isAuthenticated,getJobById);


export default router

