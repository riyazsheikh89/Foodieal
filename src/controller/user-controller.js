import UserService from "../services/user-service.js";

import { sendToken } from '../utils/send-token.js'

const userService = new UserService();

export const signup = async (req, res) => {
    try {
        const payLoad = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        const user = await userService.signUp(payLoad);
        // after user creation, send the token inside a cookie
        sendToken(user, res); 
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Sign-up failed!",
            err: error
        });
    }
}


export const login = async (req, res) => {
    try {
        const user = await userService.login({
            email: req.body.email, 
            password: req.body.password
        });
        // send the token inside a cookie
        sendToken(user, res);
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Failed to sign in!",
            err: error
        });
    }
}