const mongoose = require("mongoose");
const teamList = require("../constants/enumConstants.js");

const ownerSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      require: true,
    },
    ownerTeamName: {
      type: String,
      require: true,
    },
    teamName: {
      type: String,
      enum: teamList,
      require: true,
    },
    playersList: {
      type: String,
      require: true,
    },
    totalPlayerCount: {
      type: Number,
      require: true,
    },
    totalBatsmanCount: {
      type: Number,
      require: true,
    },
    totalBowlerCount: {
      type: Number,
      require: true,
    },
    totalAllRounderCount: {
      type: Number,
      require: true,
    },
    totalWicketKeeperCount: {
      type: Number,
      require: true,
    },
    playingXIList: {
      type: String,
      require: true,
    },
    playingXICount: {
      type: Number,
      require: true,
    },
    playingXIBatsmanCount: {
      type: Number,
      require: true,
    },
    playingXIBowlerCount: {
      type: Number,
      require: true,
    },
    playingXIAllRounderCount: {
      type: Number,
      require: true,
    },
    playingXIWicketKeeperCount: {
      type: Number,
      require: true,
    },
    captainSwapCount: {
      type: Number,
      min: [0, "Minimum 0 captain swap can be done."],
      max: [2, "Maximum 2 captain swap can be done."],
      require: true,
    },
    playerSwapCount: {
      type: Number,
      min: [0, "Minimum 0 players swap can be done."],
      max: [20, "Maximum 2 players swap can be done."],
      require: true,
    },
    captainSwaps: {
      type: String,
      require: true,
    },
    playerSwaps: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Owners = new mongoose.model("Owners", ownerSchema);
module.exports = Owners;
