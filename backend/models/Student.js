const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    regNo: {
      type: String,
      required: true,
      unique: true
    },
    branch: {
      type: String,
      required: true
    },
    cgpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    skills: [String],
    resumeUrl: {
      type: String
    },
    placed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
