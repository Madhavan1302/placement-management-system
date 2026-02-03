const Student = require("../models/Student");
const Company = require("../models/Company");
const Application = require("../models/Application");
const Job = require("../models/Job");

const getAdminStats = async (req, res) => {
  try {
    const userCollege = req.user.college;

    let studentQuery = {};
    let appQuery = {};

    if (userCollege) {
      // Find students belonging to this college
      const studentsInCollege = await Student.find().populate({
        path: 'user',
        match: { college: userCollege }
      });
      const collegeStudentIds = studentsInCollege
        .filter(s => s.user)
        .map(s => s._id);

      studentQuery = { _id: { $in: collegeStudentIds } };

      // Find jobs in this college to filter applications
      const jobsInCollege = await Job.find({ college: userCollege }).select("_id");
      const jobIds = jobsInCollege.map(j => j._id);
      appQuery = { job: { $in: jobIds } };
    }

    const totalStudents = await Student.countDocuments(studentQuery);
    const totalCompanies = await Company.countDocuments(); // Companies are global usually
    const totalApplications = await Application.countDocuments(appQuery);

    const shortlisted = await Application.countDocuments({ ...appQuery, status: "shortlisted" });
    const rejected = await Application.countDocuments({ ...appQuery, status: "rejected" });
    const selected = await Application.countDocuments({ ...appQuery, status: "selected" });

    res.status(200).json({
      totalStudents,
      totalCompanies,
      totalApplications,
      shortlisted,
      rejected,
      selected,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAdminStats };
