import Application from "../models/applicationSchema.js"
import Job from "../models/jobSchema.js"

const jobApply = async (req, res) => {
    try {
        const userId = req.id
        // console.log(userId);
        
        const jobId = req.params.id
        if (!jobId) {
            return res.status(400).json({ success: false, message: "jobId not found" })
        }
        // check if the user has already applied
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (existingApplication) {
            return res.status(400).json({ success: false, message: "user already exist" })
        }
        // check if the job exist 
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({ success: false, message: "job not found" })
        }
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })
        job.application.push(newApplication._id)
        await job.save()
        await newApplication.populate(["job","applicant"]) 
        return res.status(201).json({ success: true, message: "job applied successfully", newApplication })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}

const getAppliedJob = async (req, res) => {
    try {
        const userId = req.id
        
        // console.log("user",userId);
        
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } }
            }
        })
        if (application.length === 0) {
            return res.status(200).json({ success: false, message: "application not found" })
        }
        return res.status(200).json({ success: true, message: "successfully", application })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error",error:error.message })
    }
}

const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path: "application",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        })
        if (!job) {
            return res.status(404).json({ success: false, message: "job not found" })
        }

        return res.status(200).json({ success: true, message: "Applicants found", job })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" })
    }
}

const updateStatus = async (req, res) => {
    try {
        const {status} = req.body
        const applicationId = req.params.id
        if (!status) {
            return res.status(400).json({success:false,message:"status is required"})
        }
        // find the application by applicant id
        const application = await Application.findOne({_id:applicationId})
        if (!application) {
            return res.status(400).json({success:false,message:"application not found"})
        }
        application.status=status.toLowerCase()
        await application.save()
        return res.status(200).json({success:true,message:"upated successfully"})
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" })
    }
}

export {jobApply,getApplicants,getAppliedJob,updateStatus}