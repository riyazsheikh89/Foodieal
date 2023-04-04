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