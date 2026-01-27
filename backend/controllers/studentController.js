const Student = require('../models/Student');

const createOrUpdateProfile = async (req, res) => {
    try{
        const {regNo,branch,cgpa,skills,resumeUrl} = req.body;
        let student = await Student.findOne({user: req.user.id});
        if(student){
            student.regNo = regNo;
            student.branch = branch;
            student.cgpa = cgpa;
            student.skills = skills;
            student.resumeUrl = resumeUrl;
            await student.save();
            return res.status(200).json({message:"Student profile updated successfully",student});
        }
        student = await Student.create({
            user: req.user.id,
            regNo,
            branch,
            cgpa,
            skills,
            resumeUrl
        });
        res.status(201).json({message:"Student profile created successfully",student});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports = {createOrUpdateProfile};