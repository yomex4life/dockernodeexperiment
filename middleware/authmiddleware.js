const protect = (req, res, next) =>
{
    const {user} = req.session;
    if(!user)
    {
        return res.status(404).json({
            status: "fail",
            message: 'unauthorised'
        })
    }

    req.user = user;

    next();
}


module.exports = protect;