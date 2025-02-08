const jwt = require('jsonwebtoken')

exports.RequireSignIn = async (req, res, next) =>{
    try {
        console.log(req.headers.authorization)
        const decode = await jwt.verify(req.headers.authorization , "434343434")
        req.user = decode
        console.log(req.user)
        next()
}
    catch (error) {
        res.status(401).json({
            message : "Authorization required.",
            success : false
        })
    }
}