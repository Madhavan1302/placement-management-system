const Application = require("../models/Application");
const Student = require("../models/Student");
const Job = require("../models/Job");

/**
 * STUDENT APPLY TO JOB (DRIVE)
 */
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    // Student profile check
    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return res.status(400).json({
        message: "Student profile not found. Please create profile first."
      });
    }

    // Resume mandatory
    if (!student.resumeUrl) {
      return res.status(400).json({
        message: "Upload resume before applying"
      });
    }

    // Job check
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job/Drive not found" });
    }

    // Duplicate check
    const existingApplication = await Application.findOne({
      student: student._id,
      job: jobId
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied to this drive"
      });
    }

    // Eligibility check
    if (
      student.cgpa < job.minCgpa ||
      !job.allowedBranches.includes(student.branch)
    ) {
      return res.status(403).json({
        message: "You are not eligible for this drive (CGPA or Branch criteria not met)"
      });
    }

    // College Check (Multi-Tenancy)
    // Populate student user to check college
    await student.populate("user");
    if (student.user.college !== job.college) {
      return res.status(403).json({
        message: "This drive is restricted to " + job.college + " students only."
      });
    }

    const application = await Application.create({
      student: student._id,
      job: jobId,
      status: "applied"
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * COMPANY/ADMIN: GET APPLICANTS FOR A JOB
 */
const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate({
        path: "student",
        populate: {
          path: "user",
          select: "name email"
        }
      })
      .populate("job");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN/COMPANY: UPDATE APPLICATION STATUS
 */
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const validStatuses = ["shortlisted", "rejected", "selected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Application status updated successfully",
      application
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * STUDENT: GET MY APPLICATIONS
 */
const getMyApplications = async (req, res) => {
  try {
    const studentProfile = await Student.findOne({ user: req.user.id });

    if (!studentProfile) {
      return res.status(400).json({
        message: "Student profile not created"
      });
    }

    const applications = await Application.find({
      student: studentProfile._id
    }).populate({
      path: "job",
      populate: { path: "company" }
    });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyForJob,
  getApplicantsForJob,
  updateApplicationStatus,
  getMyApplications
};
