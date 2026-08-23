import JOB from "../models/jobSchema.js"

const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, position,
            companyId } = req.body
        const userId = req.id
        if (!title || !description || !requirements || !salary || !location || !jobType || !
            experienceLevel || !position || !companyId) {
            return res.status(400).json({ message: "all field required", success: false })
        }

        const job = await JOB.create({
            title,
            description,
            requirements: requirements ? requirements.split(",") : [],
            salary: Number(salary),
            location,
            jobType,
            experienceLevel,
            position,
            company: companyId,
            created_by: userId
        })
        return res.status(201).json({ message: "job created successfully", success: true, job })
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false,error:error.message })
    }
}

const getAllJob = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options:"i" } }
            ]
        }
        const jobs = await JOB.find(query).populate("company")
        if (!jobs) {
            return res.status(404).json({ message: "job not found", success: false })
        }
        res.status(200).json({ message: "job data found", success: true, jobs })
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false,error:error.message })
    }
}
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await JOB.findById(jobId).populate({
      path: "application",
      populate: {
        path: "applicant"
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "job data found",
      success: true,
      job,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};
// job created by admin
const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id
        const jobs = await JOB.find({ created_by: adminId }).populate({
            path:"company"
        })
        if (!jobs) {
            return res.status(404).json({ message: "job not found", success: false })
        }
        return res.status(200).json({ message: "job data found", success: true, jobs })
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false,error:error.message })
    }
}

export { postJob, getAllJob, getJobById ,getAdminJob} 