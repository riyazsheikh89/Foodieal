import UserService from "../services/user-service.js";
import crypto from 'crypto';

import { sendToken } from '../utils/send-token.js';
import { uploadFile, getObjectSignedUrl } from '../config/s3_file_upload-config.js';
import { singleUploader } from '../config/multer-config.js';

// crypto -> generates random string, using it for unique file name
const generateFileName = (bytes = 16) => crypto.randomBytes(bytes).toString('hex');


const userService = new UserService();

export const signup = async (req, res) => {
    try {
        singleUploader(req, res, async() => {
            const imageName = generateFileName();
            const payLoad = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar: {
                    image: imageName
                }
            }
            await uploadFile(req.file.buffer, imageName, req.file.mimetype);
            const user = await userService.signUp(payLoad);
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
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

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