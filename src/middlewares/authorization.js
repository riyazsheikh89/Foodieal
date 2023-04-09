// Check wheather a user is authorised or not, to access a resource or performe a perticular task
// check wheather a user is admin or not

export const authorization = (req, res, next) => {
    if (req.user.role != 'admin') {
        return res.status(401).json({
            success: false,
            message: `Role: ${req.user.role}, has no permission to perform the task!`,
        })
    }
    next();
}