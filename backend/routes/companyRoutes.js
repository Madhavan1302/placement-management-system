const express = require("express");
const {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
  getCompanyNames
} = require("../controllers/companyController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

/* PUBLIC */
router.get("/list", getCompanyNames);

/* STUDENT + ADMIN */
router.get("/", protect, getCompanies);

/* ADMIN ONLY */
router.post("/", protect, authorizeRoles("admin"), createCompany);
router.put("/:id", protect, authorizeRoles("admin"), updateCompany);
router.delete("/:id", protect, authorizeRoles("admin"), deleteCompany);

module.exports = router;
