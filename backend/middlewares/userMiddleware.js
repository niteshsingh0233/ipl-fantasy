const jwt = require('jsonwebtoken')

exports.RequireSignIn = async (req, res, next) =>{
    try {
      console.log(req.cookies.token)
        //console.log(req.headers.authorization)
        const decode = await jwt.verify(req.cookies.token , "434343434")
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

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.roles)) {
        console.log(roles, req.user)
        return next(
          res.status(403).json({
            message : `Role ${req.user.role} is not allowes to access this resource`
          })
        );
      }
      next();
    };
};