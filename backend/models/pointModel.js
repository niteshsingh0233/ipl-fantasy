const mongoose = require("mongoose");
const teamList = require("../constants/enumConstants.js");

const pointSchema = new mongoose.Schema(
  [
    {
      matchNumber: {
        type: Number,
        require: true,
      },
      playersPoint: [
        {
          teamName: {
            type: String,
            require: true,
          },
          playerName: {
            type: String,
            require: true,
          },
          totalPoints: {
            type: Number,
            require: true,
          },
        },
      ],
      ownersPointForMatch: [
        {
          ownerName: {
            type: String,
            require: true,
          },
          teamName: {
            type: String,
            enum: teamList,
            require: true,
          },
          previousMatchPoint: {
            type: Number,
            require: true,
          },
          currentMatchPoint: {
            type: Number,
            require: true,
          },
          totalPointForOwner: {
            type: Number,
            require: true,
          },
        },
      ],
    },
  ],
  { timestamps: true }
);
//const userdb = mongoose.connection.useDb('userdb');
const Points = mongoose.model("points", pointSchema);
module.exports = Points;
