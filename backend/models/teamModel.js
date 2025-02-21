const mongoose = require("mongoose");
const teamList = require("../constants/enumConstants.js");
const { randomUUID } = require("crypto");

const teamSchema = new mongoose.Schema(
  {
     documentCode : {
          type : String,
          default :  randomUUID().toString('hex')
      }, 
    id: {
      type: Number,
      require: true,
      unique : true
    },
    teamId: {
      type: String,
      require: true,
      unique : true
    },
    teamName: {
      type: String,
      require: true,
    },
    teamSName: {
      type: String,
      enum: teamList,
      require: true,
    },
    imageId: {
      type: Number,
      require: true,
    },
    countryName: {
      type: String,
      require: true,
    },
    belongsTo: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
//const cricketdb = mongoose.connection.useDb('cricketdb');
const TeamModel = mongoose.model("team", teamSchema);
module.exports = TeamModel;
