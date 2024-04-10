import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

// Create JWT token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        // Find user by email
        const user = await userModel.findOne({email});

        // Check if user exists
        if (!user) {
            return res.json({success: false, message: "User does not exist"});
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        // Check if password is valid
        if (!isMatch) {
            return res.json({success: false, message: "Invalid credentials"});
        }

        // Generate JWT token
        const token = createToken(user._id);
        res.json({success: true, token});
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

// Register user
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        // Check if user already exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success: false, message: "User already exists"});
        }

        // Validate email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"});
        }
        if (password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password (minimum 8 characters)"});
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({name, email, password: hashedPassword});
        const user = await newUser.save();

        // Generate JWT token
        const token = createToken(user._id);
        res.json({success: true, token});
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export { loginUser, registerUser };
