export const sendToken = async (user, res) => {
    try {
        const jwt = user.generateJWT();
        // options describe about the token
        const ops = {
            expires: new Date(Date.now() + process.env.TOKEN_EXPIRY * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(201).cookie("token", jwt, ops).json({
            success: true,
            token: jwt,
            user,
            err: {}
        });
    } catch (error) {
        throw error;
    }
}