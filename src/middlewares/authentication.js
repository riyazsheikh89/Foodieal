import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authenticate = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorised token access!'
            });
        }
        const decodedData = jwt.verify(token, process.env.JWT_KEY);

        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        next(error);
    } 
}