import jwt from "jsonwebtoken";
import User from "../models/user.js";
import {JWT_KEY} from '../config/env-variables.js';

export const authenticate = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorised token access!'
            });
        }
        const decodedData = jwt.verify(token, JWT_KEY);
        //attach the user to the 'res' object for using the user details inside next() middleware
        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        next(error);
    } 
}