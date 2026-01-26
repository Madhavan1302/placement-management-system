const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    minCgpa: {
      type: Number,
      required: true
    },
    allowedBranches: {
      type: [String],
      required: true
    },
    package: {
      type: Number,
      required: true
    },
    driveDate: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
