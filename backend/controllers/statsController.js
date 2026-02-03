const Student = require("../models/Student");
const Application = require("../models/Application");
const Job = require("../models/Job");
const Company = require("../models/Company");

/**
 * GET GLOBAL PLACEMENT STATUS
 */
const getPlacementStats = async (req, res) => {
    try {
        const userCollege = req.user.college;

        // Base query for students and applications in the same college
        let studentQuery = {};
        let appMatch = { status: "selected" };

        if (userCollege) {
            // Find students belonging to this college
            // Note: Student model links to User, and User has the college field.
            // We need to find students whose associated user belongs to the college.
            const studentsInCollege = await Student.find().populate({
                path: 'user',
                match: { college: userCollege }
            });

            // Filter out those that didn't match the populate criteria
            const collegeStudentIds = studentsInCollege
                .filter(s => s.user)
                .map(s => s._id);

            studentQuery = { _id: { $in: collegeStudentIds } };

            // For Applications, we filter by the job's college or the student's college.
            // Filtering by job.college is more direct for multi-tenancy.
            const jobsInCollege = await Job.find({ college: userCollege }).select("_id");
            const jobIds = jobsInCollege.map(j => j._id);

            appMatch.job = { $in: jobIds };
        }

        const totalStudents = await Student.countDocuments(studentQuery);

        // Count unique students who have at least one 'selected' application
        const placedStudents = await Application.distinct("student", appMatch);
        const placedCount = placedStudents.length;

        const unplacedCount = totalStudents - placedCount;

        // Company-wise stats (Selected students + Drive count)
        const companyStats = await Application.aggregate([
            { $match: appMatch },
            {
                $lookup: {
                    from: "jobs",
                    localField: "job",
                    foreignField: "_id",
                    as: "jobDetails"
                }
            },
            { $unwind: "$jobDetails" },
            {
                $group: {
                    _id: "$jobDetails.company",
                    count: { $sum: 1 } // Selected students count
                }
            },
            {
                $lookup: {
                    from: "companies",
                    localField: "_id",
                    foreignField: "_id",
                    as: "companyInfo"
                }
            },
            { $unwind: "$companyInfo" },
            {
                $lookup: {
                    from: "jobs",
                    let: { companyId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$company", "$$companyId"] },
                                        { $eq: ["$approvalStatus", "approved"] },
                                        { $eq: ["$college", userCollege] }
                                    ]
                                }
                            }
                        },
                        { $count: "driveCount" }
                    ],
                    as: "drives"
                }
            },
            {
                $project: {
                    companyName: "$companyInfo.name",
                    count: 1, // Student count
                    driveCount: { $ifNull: [{ $arrayElemAt: ["$drives.driveCount", 0] }, 0] }
                }
            }
        ]);

        res.json({
            totalStudents,
            placedCount,
            unplacedCount,
            companyStats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPlacementStats };
