const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {applyToCompany,getApplicantsByCompany,updateApplicationStatus} = require("../controllers/applicationController");
const router = express.Router();
router.post("/apply",protect,authorizeRoles("student"),applyToCompany);
router.get("/company/:companyId",protect,authorizeRoles("admin","recruiter"),getApplicantsByCompany);
router.put("/:applicationId/status",protect,authorizeRoles("admin","recruiter"),updateApplicationStatus);
module.exports = router;