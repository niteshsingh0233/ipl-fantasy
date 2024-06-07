const mongoose = require("mongoose");
const teamList = require("../constants/enumConstants.js");

const playerSchema = new mongoose.Schema(
  {
    playerName: {
      type: String,
      require: true,
    },
    countryName: {
      type: String,
      enum: teamList,
      require: true,
    },
    isBatsman: {
      type: Boolean,
      default: false,
    },
    isBowler: {
      type: Boolean,
      default: false,
    },
    isWicketKeeper: {
      type: Boolean,
      default: false,
    },
    isAllRounder: {
      type: Boolean,
      default: false,
    },
    isCaptain: {
      type: Boolean,
      default: false,
    },
    isViceCaptain: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Players = new mongoose.model("Players", playerSchema);
module.exports = Players;
