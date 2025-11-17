// Signup logic

const UserModel = require("../Models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await UserModel.findOne({
            email
        })
        if (user) {
            return res.status(409).json({ message: 'User already exists.' })
        }
        // For updating details of user after hasing the password then it will save in our database.
        const userModel = new UserModel({ name, email, password })
        userModel.password = await bcrypt.hash(password, 10)
        await userModel.save()

        return res.status(201).json({ message: "SignUp Successfully" })
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const login = async (req, res) => {
    try {
        const {email, password } = req.body
        const user = await UserModel.findOne({
            email
        })
        if (!user) {
            return res.status(403).json({ message: 'Auth failed email or password is wrong' })
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual) {
            return res.status(403).json({ message: 'Auth failed email or password is wrong' })
        }
        // creation of JWT token 
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        return res.status(200).json({
            message: "Login Success",
            jwtToken,
            email,
            name: user.name
        })
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    signup,
    login
}