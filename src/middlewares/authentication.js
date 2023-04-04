import passport from "passport";

export const authenticate = (req, res, next) => {
    try {
        passport.authenticate('jwt', (err, user) => {
            if (err)
                next(err);
            
            if (!user) {
                return res.status(401).json({
                    message: 'Unauthorised token access!'
                })
            }
            req.user = user;
            next();
        }) (req, res, next);
    } catch (error) {
        console.log(error);
    }
}