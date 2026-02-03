const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Recruiter or Admin who posted
            required: true
        },
        college: {
            type: String,
            required: true // Job must belong to a college
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        minCgpa: {
            type: Number,
            default: 0
        },
        allowedBranches: {
            type: [String],
            required: true
        },
        package: {
            type: String, // e.g. "12 LPA" or Number if preferred
            required: true
        },
        driveDate: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        skills: {
            type: [String],
            default: []
        },
        isActive: {
            type: Boolean,
            default: true
        },
        approvalStatus: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending' // pending by default, admin can approve
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
