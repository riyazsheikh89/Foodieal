export const sendToken = async (jwt, res) => {
    try {
        // options describe the token's details
        const ops = {
            expires: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(201).cookie("token", jwt, ops).json({
            success: true,
            data: jwt,
            message: 'Successfully sign-in!',
            err: {}
        });
    } catch (error) {
        throw error;
    }
}