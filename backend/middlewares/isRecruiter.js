import User from "../models/userSchema.js"

export const isRecruiter = async (req,res,next) => {
    try {
        const userId = req.id
        const user = await User.findById(userId)
        if (!user) {
           return res.status(400).json({success:false,message:"user not found"})
        }
        if (user.role !== "recruiter") {
            return res.status(400).json({success:false,message:"access denied! Recruiters only"})
        }
        next()
    } catch (error) {
        res.status(500).json({success:false,message:"Server error"})
    }
}


