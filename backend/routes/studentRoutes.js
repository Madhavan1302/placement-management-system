const express = require("express");
const {createOrUpdateProfile} = require("../controllers/studentController");
const {protect,authorizeRoles} = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/profile",protect,authorizeRoles("student"),createOrUpdateProfile);

module.exports = router;