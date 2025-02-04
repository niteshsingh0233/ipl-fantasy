const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require : true,
      unique : true
    },
    playerId : {
      type: Number,
      require : true
    },
    playerName: {
      type: String,
      require: true,
    },
    playerRole: {
      type: String,
      require: true,
    },
    playerBattingStyle : {
      type: String,
    },
    playerBowlingStyle : {
      type: String,
    },
    playerRoleType: {
      type: String,
      require : true
    },
    isWicketKeeper: {
      type: Boolean,
      default: false,
    },
    isAllRounder: {
      type: Boolean,
      default: false,
    },
    isBatsman: {
      type: Boolean,
      default: false,
    },
    isBowler: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const PlayerModel = new mongoose.model("players_model", playerSchema);
module.exports = PlayerModel;
