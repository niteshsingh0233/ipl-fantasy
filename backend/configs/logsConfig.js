const axios = require("axios");
const logsSchema = require("../models/logsModel.js");

async function AddLogs(log, req) {
  const updatedLog = await logsSchema.findOneAndUpdate(
    { transactionScopeId: req.logs.transactionScopeId },
    { $push: { logString: log } }
  );

  console.log(updatedLog);
}

module.exports = AddLogs;
