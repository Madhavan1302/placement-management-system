const Application = require("../models/Application");
const Student = require("../models/Student");
const Company = require("../models/Company");

const applyToCompany = async (req, res) => {
    try {
        const companyId = req.body.companyId;
        const student = await Student.findOne({ user: req.user.id });
        if(!student){
            return res.status(400).json({message:"Student profile not found"});
        }
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(400).json({message:"Company not found"});
        }
        const existingApplication = await Application.findOne({student:student._id,company:companyId});
        if(existingApplication){
            return res.status(400).json({message:"You have already applied to this company"});
        }
        if (student.cgpa < company.minCgpa ||!company.allowedBranches.includes(student.branch)) {
            return res.status(403).json({
                message: "You are not eligible for this company"
            });
        }
        const application = await Application.create({
            student: student._id,
            company: companyId,
            status: "applied"
        });
        res.status(201).json({message:"Application submitted successfully",application});
    }
    catch (error) {
        if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already applied to this company"
      });
    }
        res.status(500).json({message:error.message});
    }
}

module.exports = {applyToCompany};