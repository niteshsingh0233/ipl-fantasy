const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const LogsSchema = new mongoose.Schema(
  {
    documentCode: {
      type: String,
      default: randomUUID().toString("hex"),
    },
    logEnv: {
      type: String,
      required: true,
      enum: ["DEV", "PROD"],
    },
    method : {
        type: String,
        required: true,
    },
    routeName : {
        type: String,
        required: true,
    },
    urlDetails :{
        baseUrl : {
            type: String,
            required: true,
        },
        url : {
            type: String,
            required: true,
        },
        originalUrl : {
            type: String,
            required: true,
        }
    },
    transactionScopeId: {
      type: String,
      unique : true
    },
    name: {
      type: String,
      required: true,
    },
    logString: [
      {
        type: String,
        required: true,
      },
    ],
    isErrored: {
      type: Boolean,
      default: false,
    },
    logType: {
      type: String,
      required: true,
      enum: ["INFO", "WARN", "ERROR", "DEBUG"],
    },
  },
  { timestamps: true }
);

//const userdb = mongoose.connection.useDb('userdb');
module.exports = mongoose.model("logs", LogsSchema);
