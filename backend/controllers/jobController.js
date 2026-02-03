const Job = require("../models/Job");
const Company = require("../models/Company");

/**
 * POST A JOB (ADMIN / RECRUITER)
 */
const createJob = async (req, res) => {
    try {
        const {
            title,
            description,
            minCgpa,
            allowedBranches,
            package,
            driveDate,
            location,
            skills,
            college // Recruiter must send this
        } = req.body;

        let companyId = req.body.companyId;
        let jobCollege = college;

        if (req.user.role === 'recruiter') {
            if (req.user.company) {
                companyId = req.user.company;
            }
            // Recruiter must specify target college in body
            if (!jobCollege) {
                return res.status(400).json({ message: "Target College Name is required for Recruiter posting" });
            }
        }
        else if (req.user.role === 'admin') {
            // Admin posts for THEIR college
            jobCollege = req.user.college;
        }

        // Verify company exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        // Default status: Approved if Admin posts, Pending if Recruiter posts
        const approvalStatus = req.user.role === 'admin' ? 'approved' : 'pending';

        const job = await Job.create({
            company: companyId,
            postedBy: req.user.id,
            title,
            description,
            minCgpa,
            allowedBranches,
            package,
            driveDate,
            location,
            skills,
            approvalStatus,
            college: jobCollege
        });

        res.status(201).json({
            message: "Job posted successfully" + (approvalStatus === 'pending' ? " and sent for Admin approval." : "."),
            job
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET ALL JOBS
 * - Students see only 'approved' jobs for THEIR college
 * - Admin sees all (pending/approved) for THEIR college
 * - Recruiter sees all they posted?
 */
const getJobs = async (req, res) => {
    try {
        let query = {};

        console.log(`[getJobs] User: ${req.user.email} (${req.user.role}), College: ${req.user.college}`);

        if (req.user.role === 'student') {
            query.approvalStatus = 'approved';
            // Ensure we filter by college. If req.user.college is missing, match nothing.
            query.college = req.user.college || "NO_COLLEGE_ASSIGNED";
        }
        else if (req.user.role === 'admin') {
            query.college = req.user.college || "NO_COLLEGE_ASSIGNED";
        }
        else if (req.user.role === 'recruiter') {
            query.postedBy = req.user.id;
        }

        console.log("[getJobs] Query:", query);

        const jobs = await Job.find(query).populate("company", "name website location approvalStatus");
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET JOBS BY COMPANY (RECRUITER / ADMIN)
 */
const getJobsByCompany = async (req, res) => {
    try {
        const jobs = await Job.find({ company: req.params.companyId }).populate("company");
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * ADMIN: TOGGLE JOB STATUS (APPROVE/REJECT)
 */
const toggleJobStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'approved' or 'rejected' or 'pending'

        const job = await Job.findById(id);
        if (!job) return res.status(404).json({ message: "Job not found" });

        job.approvalStatus = status;
        await job.save();

        res.json({ message: `Job status updated to ${status}`, job });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * DELETE JOB
 */
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createJob,
    getJobs,
    getJobsByCompany,
    deleteJob,
    toggleJobStatus // New Export
};
