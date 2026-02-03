const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "recruiter", "student"],
      default: "student",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      // Only for Recruiter role
    },
    college: {
      type: String, // College name/ID
      required: function () { return this.role === 'student' || this.role === 'admin'; }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
