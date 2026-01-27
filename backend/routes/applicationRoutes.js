const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const {applyToCompany} = require("../controllers/applicationController");
const router = express.Router();
router.post("/apply",protect,authorizeRoles("student"),applyToCompany);
module.exports = router;