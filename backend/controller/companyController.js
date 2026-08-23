import cloudinary from "../config/cloudinary.js"
import getDataUri from "../config/dataUri.js"
import Company from "../models/companyScheme.js"

const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body
        if (!companyName) {
            return res.status(400).json({ message: "company name is required", success: false })
        }
        let company = await Company.findOne({ name: companyName })
        if (company) {
            return res.status(400).json({ message: "company already exist" })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        })
        return res.status(201).json({
            message: "company registered successfully",
            company, success: true
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false })
    }
}


const getCompany = async (req, res) => {
    try {
        const userId = req.id
        let companies = await Company.find({ userId })
        if (!companies) {
            return res.status(404).json({
                message: "companies not exist with this id",
                success: false
            })
        }
        res.status(200).json({ message: "company founded", success: true, companies })
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false, error: error.message })
    }
}

const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)
        if (!company) {
            return res.status(404).json({ message: "Company not found", success: false })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", success: false })
    }
}


const updateCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;

        let updateData = {
            name: companyName,
            description,
            website,
            location
        };

        // Agar file upload hui hai tabhi Cloudinary par bhejo
        if (req.file) {
            const fileUri = getDataUri(req.file);

            const cloudResponse = await cloudinary.uploader.upload(
                fileUri.content
            );

            updateData.logo = cloudResponse.secure_url;
        }

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated",
            success: true,
            company
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        });
    }
};

export { registerCompany, getCompany, getCompanyById, updateCompany }