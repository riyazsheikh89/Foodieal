export const sendToken = async (user, res, message) => {
    try {
        const jwt = user.generateJWT();
        // options describe about the token
        const ops = {
            expires: new Date(Date.now() + process.env.TOKEN_EXPIRY * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        const {_id, name, email, role, avatar} = user;
        res.status(201).cookie("token", jwt, ops).json({
            success: true,
            message: message,
            token: jwt,
            user: {_id, name, email, role, avatar},
            err: {}
        });
    } catch (error) {
        throw error;
    }
}