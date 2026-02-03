const express = require("express");
const { createOrUpdateProfile, getProfile } = require("../controllers/studentController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const upload = require("../middleware/cloudinaryUpload");

const router = express.Router();

router.post(
  "/profile",
  protect,
  authorizeRoles("student"),
  upload.single("profilePhoto"),
  createOrUpdateProfile
);

router.get("/profile", protect, authorizeRoles("student"), getProfile);

router.get("/", protect, authorizeRoles("admin", "recruiter"), require("../controllers/studentController").getAllStudents);

module.exports = router;
