const Student = require("../models/Student");
const User = require("../models/User");

/**
 * CREATE OR UPDATE STUDENT PROFILE
 * Profile photo is uploaded to Cloudinary
 */
const createOrUpdateProfile = async (req, res) => {
  try {
    const { regNo, branch, cgpa, skills, resumeUrl } = req.body;

    let student = await Student.findOne({ user: req.user.id });

    const uploadedPhoto = req.file ? req.file.path : null;

    if (student) {
      student.regNo = regNo;
      student.branch = branch;
      student.batch = req.body.batch; // Added batch
      student.cgpa = cgpa;
      student.skills = skills ? skills.split(",") : [];
      student.resumeUrl = resumeUrl;

      if (uploadedPhoto) {
        student.profilePhoto = uploadedPhoto;
      }

      await student.save();

      // 🔥 populate user name before sending
      await student.populate("user", "name email");

      return res.status(200).json(student);
    }

    student = await Student.create({
      user: req.user.id,
      regNo,
      branch,
      batch: req.body.batch, // Added batch
      cgpa,
      skills: skills ? skills.split(",") : [],
      resumeUrl,
      profilePhoto: uploadedPhoto || "",
    });

    await student.populate("user", "name email");

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET STUDENT PROFILE
 */
const getProfile = async (req, res) => {
  const student = await Student.findOne({ user: req.user.id })
    .populate("user", "name email"); // ✅ THIS IS THE KEY

  if (!student) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.json(student);
};


/**
 * ADMIN: GET ALL STUDENTS (WITH FILTERS)
 */
const getAllStudents = async (req, res) => {
  try {
    const { branch, batch } = req.query;
    const userCollege = req.user.college;

    // We need to find students whose associated user belongs to the same college
    // Since we populate 'user', we can use the 'match' option or filter after fetching.
    // However, for pagination/query, it's better to find matching user IDs first.

    let userQuery = {};
    if (userCollege) {
      userQuery.college = userCollege;
    }

    const usersInCollege = await User.find(userQuery).select("_id");
    const userIds = usersInCollege.map(u => u._id);

    const query = { user: { $in: userIds } };

    if (branch) query.branch = branch;
    if (batch) query.batch = batch;

    const students = await Student.find(query).populate("user", "name email college");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createOrUpdateProfile, getProfile, getAllStudents };
