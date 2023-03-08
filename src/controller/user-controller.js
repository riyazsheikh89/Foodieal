import UserService from "../services/user-service.js";

const userService = new UserService();

export const signup = async (req, res) => {
    try {
        const payLoad = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        const user = await userService.signUp(payLoad);
        return res.status(201).json({
            success: true,
            data: user,
            message: 'Successfully sign-up!',
            err: {}
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


export const signin = async (req, res) => {
    try {
        const jwt = await userService.signIn({
            email: req.body.email, 
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            data: jwt,
            message: 'Successfully sign-in!',
            err: {}
        }); 
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {},
            message: "Failed to sign in!",
            err: error
        });
    }
}