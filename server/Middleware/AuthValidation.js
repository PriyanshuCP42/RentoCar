import jwt from "jsonwebtoken";
import UserModel from "../Models/User.js";

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Not authorised" });
    }

    try {
        // Extract token after 'Bearer '
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Not authorised" });
        }

        // decode returns: { id, iat, exp }
        const decoded = jwt.decode(token);

        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "Not authorised" });
        }

        // decoded.id contains the user ID
        req.user = await UserModel.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "Not authorised" });
        }

        next();

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
