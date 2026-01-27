const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Registration
exports.register = async (req,res) =>{
    try{
        const {name,email,password,role} = req.body;
        //Check for existing User
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        //Hash the User password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        //Create a new user in database
        const newUser = await User.create({
            name,
            email,
            password:hashedPassword,
            role
        });
        // Generate JWT token
        const token = jwt.sign({
            id:newUser._id,role:newUser.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );
        res.status(201).json({message:"User registered successfully",token});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};
//Login 
exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        //find the user
        const user =  await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email"});
        }
        //Check password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"});
        }
        //Generate JWT token
        const token = jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        );
        res.status(201).json({message:"Login Success",token});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};