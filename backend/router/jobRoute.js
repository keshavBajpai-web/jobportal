import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import { getAdminJob, getAllJob, getJobById, postJob } from '../controller/jobController.js'
import { isRecruiter } from '../middlewares/isRecruiter.js';

const router = express.Router()

router.route("/post").post(isAuthenticate,isRecruiter,postJob);
router.route("/getAllJobs").get(getAllJob);
router.route("/getAdminJobs").get(isAuthenticated,getAdminJob);
router.route("/get/:id").get(getJobById);


export default router

