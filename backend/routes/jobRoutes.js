const express = require("express");
const router = express.Router();
const { createJob, getJobs, getJobsByCompany, deleteJob } = require("../controllers/jobController");
const { protect, adminOnly, recruiterOnly } = require("../middleware/authMiddleware");

// Public (or Student protected) - Get All Jobs
router.get("/", protect, getJobs);

// Create Job - Admin or Recruiter
// Note: You might want a specific middleware to check if Recruiter belongs to the company, 
// but for now, we'll allow any Recruiter/Admin to post if they have the ID.
router.post("/", protect, createJob);

// Get Jobs for a specific company
router.get("/company/:companyId", protect, getJobsByCompany);

// Admin: Toggle Job Status (Approve/Reject)
router.post("/:id/status", protect, require("../middleware/authMiddleware").authorizeRoles("admin"), require("../controllers/jobController").toggleJobStatus);

// Delete Job
router.delete("/:id", protect, deleteJob);

module.exports = router;
