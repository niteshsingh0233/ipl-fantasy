const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const MatchSchema = new mongoose.Schema(
  {
    documentCode: {
      type: String,
      default: randomUUID().toString("hex"),
    },
    seriesId: {
      type: String,
      require: true,
    },
    seriesDetails: {
      type: "ObjectId",
      ref: "series",
    },
    ownerId: [
      {
        type: "ObjectId",
        ref: "owners",
      },
    ],
    users: [
      {
        type: "ObjectId",
        ref: "user",
      },
    ],
    pointsId: [
      {
        type: "ObjectId",
        ref: "points",
      },
    ],
    maximumOwners: {
      type: Number,
      require: true,
    },
    maximumPoints: {
      type: Number,
      require: true,
    },
    maximumMoneyGame: {
      type: Number,
      require: true,
    },
    unsoldPlayersList: [
      {
        playerId: {
          type: String,
          require: true,
        },
        playerName : {
          type: String,
          require: true,
        },
        playerStyle: {
          type: String,
          require: true,
          enum: ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"],
        },
      },
    ],
    soldPlayerList: [
      {
        playerId: {
          type: String,
          require: true,
        },
        playerName : {
          type: String,
          require: true,
        },
        playerStyle: {
          type: String,
          require: true,
          enum: ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"],
        },
      },
    ],
    playersList: [
      {
        playerId: {
          type: String,
          require: true,
        },
        playerName : {
          type: String,
          require: true,
        },
        soldFor: {
          type: Number,
          require: true,
          default : 0
        },
        soldTo: {
          type: String,
          require: true,
          default : ''
        },
        isSold: {
          type: Boolean,
          require: true,
          default: false,
        },
        playingStyle: {
          type: String,
          require: true,
          enum: ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"],
        },
      },
    ],
    ownerPoints: [
      {
        documentCode : {
          type: String,
          require: true,
        },
        ownerName: {
          type: String,
          require: true,
        },
        ownerTeamName: {
          type: String,
          require: true,
        },
        pointsRemaining: {
          type: Number,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

//const userdb = mongoose.connection.useDb("userdb");
const PlayerModel = mongoose.model("games", MatchSchema);
module.exports = PlayerModel;
