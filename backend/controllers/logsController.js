const express = require("express");
const LogsSchema = require("../models/logsModel.js");

exports.CreateLogs = async (req, res) => {
  try {
    console.log("hi");
    let logString = [];
    logString.push("hi");
    console.log( req.method, req.url, req.baseUrl, )
    logString.push(req.originalUrl);

    logString.push(req.user);
    logString.push(JSON.stringify(req.headers))
    console.log(logString)
    console.log(req.headers["transaction-scope-id"])
    let logs = await LogsSchema.create({
      logEnv: "DEV",
      method : req.method,
      routeName : req.baseUrl.split('/')[req.baseUrl.split('/').length - 1],
      urlDetails : {
        baseUrl : req.baseUrl,
        url : req.url,
        originalUrl : req.originalUrl
      },
      logString: logString,
      transactionScopeId: req.headers["transaction-scope-id"],
      name: req.user.userName,
      logType: "INFO",
    });

    res.status(200).json({
      message: "CreateLogs successful.",
      isSuccess: true,
      logs
    });
  } catch (error) {
    res.status(500).json({
      message: "CreateLogs Failed.",
      error,
    });
  }
};
