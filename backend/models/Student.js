const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    regNo: String,
    branch: String,
    cgpa: Number,
    skills: [String],
    batch: {
      type: String, // e.g. "2025"
      required: true
    },
    resumeUrl: String,

    // 👇 OPTIONAL PROFILE PHOTO
    profilePhoto: {
      type: String, // store image URL
      default: "",  // empty means no photo uploaded
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
