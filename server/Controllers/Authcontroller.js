// import UserModel from "../Models/User.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import Car from "../Models/Car.js";

// const generateToken = (userId) => {
//     return jwt.sign({ id: userId }, process.env.JWT_SECRET);
// };

// // ------------------- SIGNUP --------------------
// export const signup = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         const existingUser = await UserModel.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({ message: "User already exists." });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = await UserModel.create({
//             name,
//             email,
//             password: hashedPassword
//         });

//         const token = generateToken(newUser._id.toString());

//         return res.status(201).json({
//             message: "SignUp Successfully",
//             token,
//         });

//     } catch (err) {
//         console.log(err.message);
//         return res.status(500).json({ message: err.message });
//     }
// };

// // ------------------- LOGIN --------------------
// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             return res.status(403).json({ message: "User not found" });
//         }

//         const isPasswordEqual = await bcrypt.compare(password, user.password);
//         if (!isPasswordEqual) {
//             return res.status(403).json({ message: "Invalid Credentials" });
//         }

//         const token = generateToken(user._id.toString());  // FIXED

//         return res.status(200).json({
//             message: "Login Success",
//             token,
//         });

//     } catch (err) {
//         console.log(err.message);
//         return res.status(500).json({ message: err.message });
//     }
// };

// // Get user data using JWT
// export const getUserData = async (req, res) => {
//     try {
//         const { user } = req;
//         return res.status(200).json({ user });
//     } catch (err) {
//         console.log(err.message);
//         return res.status(500).json({ message: err.message });
//     }
// };

// // get all cars fo frontend


// export const getCars = async (req, res) => {
//     try {
//         const cars = await Car.find({ isAvaliable: true });
//         return res.status(200).json({ success: true, cars });
//     } catch (err) {
//         console.log(err.message);
//         return res.status(500).json({ success: false, message: err.message });
//     }
// };



import UserModel from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../Models/Car.js";

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

// ------------------- SIGNUP --------------------
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            // FIX: Prevent 409 due to React double-call or duplicate signup
            const token = generateToken(existingUser._id.toString());
            return res.status(200).json({
                success: true,
                message: "User already exists. Logged in automatically.",
                token,
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate token
        const token = generateToken(newUser._id.toString());

        // FIX: Always send success for frontend
        return res.status(201).json({
            success: true,
            message: "SignUp Successfully",
            token,
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
};

// ------------------- LOGIN --------------------
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }

        // Check password
        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            return res.status(403).json({ message: "Invalid Credentials" });
        }

        // Generate token
        const token = generateToken(user._id.toString());

        // FIX: Add success to response
        return res.status(200).json({
            success: true,
            message: "Login Success",
            token,
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
};

// Get user data
export const getUserData = async (req, res) => {
    try {
        const { user } = req;
        return res.status(200).json({ user });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
};

// Get all cars for frontend
export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({ isAvaliable: true });

        return res.status(200).json({
            success: true,
            cars
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
