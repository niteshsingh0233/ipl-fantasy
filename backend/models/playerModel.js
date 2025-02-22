const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const playerSchema = new mongoose.Schema(
  {
    documentCode : {
      type : String,
      default :  randomUUID().toString('hex')
  }, 
    id: {
      type: String,
      require : true,
      unique : true
    },
    playerId : {
      type: String,
      require : true,
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
      default : ''
    },
    playerBowlingStyle : {
      type: String,
      default : ''
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
    },
    imageId : {
      type : Number,
      default : false
    }
  },
  { timestamps: true }
);

//const userdb = mongoose.connection.useDb('cricketdb');
const PlayerModel = mongoose.model("players", playerSchema);
module.exports = PlayerModel;
