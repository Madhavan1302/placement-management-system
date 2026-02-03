const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { applyForJob, getApplicantsForJob, updateApplicationStatus, getMyApplications } = require("../controllers/applicationController");
const router = express.Router();

router.post("/apply", protect, authorizeRoles("student"), applyForJob);
router.get("/job/:jobId", protect, authorizeRoles("admin", "recruiter"), getApplicantsForJob);
router.put("/:applicationId/status", protect, authorizeRoles("admin", "recruiter"), updateApplicationStatus);
router.get("/my", protect, authorizeRoles("student"), getMyApplications);

module.exports = router;