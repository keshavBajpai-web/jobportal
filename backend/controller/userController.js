import User from "../models/userSchema.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import cloudinary from "../config/cloudinary.js"
import getDataUri from "../config/dataUri.js"

const userSignup = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body
    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({ message: "all field required", success: false })
    }

    const file = req.file
    const fileUri = getDataUri(file)

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

    const userExist = await User.findOne({ email })
    if (userExist) {
      return res.status(400).json({ message: "user already exist", success: false })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url
      }
    })
    return res.status(201).json({ message: "Account created successfully", success: true, user })
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false, error: error.message })
  }
}

const userLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body
    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: "all field required", success: false })
    }
    const userExist = await User.findOne({ email })
    if (!userExist) {
      return res.status(400).json({ message: "user not exist", success: false })
    }
    const isMatch = await bcrypt.compare(password, userExist.password)
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials", success: false })
    }
    if (role !== userExist.role) {
      return res.status(400).json({ success: false, message: "account does not exist with this current role" })
    }
    const token = jwt.sign(
      { userId: userExist._id },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    )
    const user = {
      _id: userExist._id,
      fullName: userExist.fullName,
      email: userExist.email,
      phoneNumber: userExist.phoneNumber,
      role: userExist.role,
      profile: userExist.profile
    }
    res.status(200).cookie("token", token,
      { maxAge: 5 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).
      json({ message: "login successfully", success: true, user })
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.find()
    res.status(200).json({ success: true, message: "user found", user })
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false })
  }
}


const logout = async (req, res) => {
  try {
    await res.status(200).cookie("token", "", { maxAge: 0 }).json({ success: true, message: "logout successfully" })
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false })
  }
}


const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, role, bio, skills } = req.body
    const file = req.file
    // console.log(file);

    // cloudinary
    let cloudResponse = null;

    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw",
        type: "upload",
        folder: "resumes"
      });

    }
    const userId = req.id
    let user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "user does not exist", success: false })
    }

    const skillArray = skills ? skills.split(",") : []

    if (fullName) user.fullName = fullName
    if (email) user.email = email
    if (phoneNumber) user.phoneNumber = phoneNumber
    if (role) user.role = role
    if (bio) user.profile.bio = bio
    if (skills) user.profile.skills = skillArray

    // resume 
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url //save the cloudinary url
      user.profile.resumeOriginalName = file.originalname
    }
    // console.log("cloud", cloudResponse);


    await user.save()

    const updateUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).json({ message: "user updated successfully", success: true, updateUser })

  } catch (error) {
    res.status(500).json({ message: "Server error", success: false, error: error.message })
  }
}

const updateById = async (req, res) => {
  try {
    const { id } = req.params
    const { fullName, email, phoneNumber, role, bio, skills } = req.body;

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: "id not found" })
    }
    const skillArray = skills ? skills.split(",") : []

    if (fullName) user.fullName = fullName
    if (email) user.email = email
    if (phoneNumber) user.phoneNumber = phoneNumber
    if (role) user.role = role
    if (bio) user.profile.bio = bio
    if (skills) user.profile.skills = skillArray
    await user.save()
    const updated = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      bio: user.profile.bio,
      skills: user.profile.skills,
    }
    return res.status(200).json({ message: "updated", updated })
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error", success: false, error: error.message })
  }
}


export { userSignup, userLogin, logout, updateProfile, getUser, updateById }


