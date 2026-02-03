const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const { getAdminStats } = require("../controllers/adminController");

const router = express.Router();

router.get("/stats", protect, authorizeRoles("admin"), getAdminStats);

module.exports = router;
