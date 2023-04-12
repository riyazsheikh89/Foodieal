import UserService from "../services/user-service.js";
import UserRepository from '../repository/user-repository.js'

import { sendToken } from '../utils/send-token.js';
import { singleUploader } from "../config/multer-config.js";
import { sendMail } from "../config/email-config.js";

const userRepo = new UserRepository();
const userService = new UserService();

export const signup = async (req, res) => {
    try {
        singleUploader(req, res, async(err) => {
            if (err) {
                return res.status(500).json({error: err});
            }
            const {name, email, password} = req.body;
            const user = await userService.signUp({name, email, password});
            
            if (req.file) { // check wheather req contains any image or not
                user.avatar.url = req.file.location;
                user.avatar.key = req.file.key;
                user.save();
            }

            // after user creation, send the token inside a cookie
            sendToken(user, res);
        });
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


export const logout = async (req, res) => {
    // clear the token from the cookie 
    res.clearCookie('token', { path: '/' })

    res.status(200).json({
        success: true,
        message: "Successfully logged out!"
    });
}


export const getUser = async (req, res) => {
    try {
        const user = await userService.getById(req.user.id);
        if (!user) {
            throw ("Oops! User not found");
        }
        const {_id, name, email, role} = user;
        
        const imageUrl = await getObjectSignedUrl(user.avatar.image);
        return res.status(200).json({
            success: true,
            message: "Successful fetched the user",
            user: {_id, name, email, role},
            avatarUrl: imageUrl,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong at fetching the user",
            err: error
        });
    }
}


// Forgot Password and get reset token
export const forgotPassword = async (req, res) => {
    try {
       const passResetToken = await userService.generateResetLink({email: req.body.email});
       // generate the url and attack the reset token to it as req.params
       const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/users/reset-password/${passResetToken}`;
       const message = `Your password reset token is : \n\n${resetPasswordURL} \n\nIf you have not made this requested, please ignore it.`;

       // send a reset link to the user, for resetting the password
       await sendMail({
         email: req.body.email,
         subject: "Foodieal Password Reset Link",
         body: message,
       });
       return res.status(201).json({
        success: true,
        message: "Successfully sent the reset url to the user",
        err: {}
    });
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Something went wrong at controller while sending the reset URL",
            err: error
        });
    }
}


// Reset-password using the reset password link
export const resetPassword = async (req, res) => {
    try {
        if (req.body.password != req.body.confirmPassword) {
            return res.status(404).send({message: 'Please match your passwords'});
        }
        const payLoad = {
            passwordResetToken: req.params.token,
            resetTokenExpiry: { $gt: Date.now()}
        }
        const user = await userService.updatePassword(payLoad, req.body.password);
        sendToken(user, res);
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Failed to reset the password",
            err: error
        });
    }
}