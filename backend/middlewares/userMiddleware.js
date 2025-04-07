const jwt = require('jsonwebtoken')

exports.RequireSignIn = async (req, res, next) =>{
    try {
        //console.log('token ' ,req.cookies.token)
        //console.log(req.headers.authorization)
        //console.log('authorization ' ,req.headers.authorization)
        const decode = await jwt.verify(req.cookies.token || req.headers.authorization , "434343434")
        //console.log(decode)
        req.user = decode
        console.log(req.user)
        next()
}
    catch (error) {
        res.status(401).json({
            message : "Authorization required.",
            success : false,
            error : error.message
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

const LogsSchema = require("../models/logsModel.js");

exports.Log = async (req,res, next) => {
  try {
    console.log(req.cookies.token)
    //console.log(req.headers.authorization)
    console.log(req.headers.authorization)

    let logs = await LogsSchema.create({
          logEnv: "DEV",
          method : req.method,
          routeName : req.baseUrl.split('/')[req.baseUrl.split('/').length - 1],
          urlDetails : {
            baseUrl : req.baseUrl,
            url : req.url,
            originalUrl : req.originalUrl
          },
          logString: [],
          transactionScopeId: req.headers["transaction-scope-id"],
          name: req.user.userName,
          logType: "INFO",
    });
    
    req.logs = {
      transactionScopeId: req.headers["transaction-scope-id"],
      logString: [],
    }

    
    next()
}
catch (error) {
    res.status(401).json({
        message : "Logs transaction id required.",
        success : false
    })
}
}