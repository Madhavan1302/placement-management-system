const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Registration
exports.register = async (req, res) => {
    try {
        const { name, email, password, role, companyId, company, college } = req.body;

        //Check for existing User
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        let userCompany = null;
        let userCollege = college;

        if (role === 'recruiter') {
            const finalCompanyId = companyId || company;
            if (!finalCompanyId) return res.status(400).json({ message: "Company ID required" });
            userCompany = finalCompanyId;
            userCollege = null; // Recruiter logic handled per job usually
        } else {
            if (!college) return res.status(400).json({ message: "College Name required" });
        }

        //Hash the User password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //Create a new user in database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            company: userCompany,
            college: userCollege
        });
        // Generate JWT token
        const token = jwt.sign({
            id: newUser._id, role: newUser.role
        },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.status(201).json({ message: "User registered successfully", token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//Login 
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }
        //Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        //Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        if (user.role === 'recruiter') {
            await user.populate('company', 'name');
        }
        res.status(200).json({
            message: "Login Success",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                company: user.company,
                college: user.college
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};