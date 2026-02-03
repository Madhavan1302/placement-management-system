const Company = require("../models/Company");

/**
 * CREATE COMPANY (ADMIN)
 */
const createCompany = async (req, res) => {
  try {
    const company = await Company.create({
      name: req.body.name,
      website: req.body.website,
      location: req.body.location,
      description: req.body.description
    });

    res.status(201).json({
      message: "Company created successfully",
      company
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL COMPANIES (ADMIN + STUDENT)
 */
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE COMPANY (ADMIN)
 */
const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        website: req.body.website,
        location: req.body.location,
        description: req.body.description
      },
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({
      message: "Company updated successfully",
      company
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE COMPANY (ADMIN)
 */
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET COMPANY NAMES (PUBLIC FOR REGISTRATION)
 */
const getCompanyNames = async (req, res) => {
  try {
    const companies = await Company.find().select("name");
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
  getCompanyNames
};
