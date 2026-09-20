import User from "../models/userSchema.js"

export const isStudent = async (req, res, next) => {
  try {
    const userId = req.id

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    if (user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Access denied! Students only"
      })
    }

    next()

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    })
  }
}