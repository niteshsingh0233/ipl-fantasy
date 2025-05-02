const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const ContestModelSchema = new mongoose.Schema(
  {
    documentCode: {
      type: String,
      default: randomUUID().toString("hex"),
    },
    contestName: {
      type: String,
    },
    matchId: {
      type: String,
      require: true,
    },
    matchDetails: {
      type: "ObjectId",
      ref: "matches",
    },
    contestOwners: [
      {
        type: "ObjectId",
        ref: "contestOwner",
      },
    ],
    users: [
      {
        type: "ObjectId",
        ref: "user",
      },
    ],
    matchPlayedBetween: {
      team1: {
        teamId: {
          type: String,
          require: true,
        },
        teamName: {
          type: String,
          require: true,
        },
        teamShortName: {
          type: String,
          require: true,
        },
      },
      team2: {
        teamId: {
          type: String,
          require: true,
        },
        teamName: {
          type: String,
          require: true,
        },
        teamShortName: {
          type: String,
          require: true,
        },
      },
    },
    maximumContestOwners: {
      type: Number,
      require: true,
    },
    maximumPoints: {
      type: Number,
      require: true,
      default: 100,
    },
    contestEntryFee: {
      type: Number,
      require: true,
    },
    maximumWinnerCount: {
      type: Number,
      require: true,
    },
    teamsAllowed: {
      type: String,
      require: true,
      enum : ["SINGLE_TEAM", "MULTIPLE_TEAM"],
    },
    playersList: [
      {
        playerId: {
          type: String,
          require: true,
        },
        playerName: {
          type: String,
          require: true,
        },
        playingStyle: {
          type: String,
          require: true,
          enum: ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"],
        },
        isInPlayingXI: {
          type: Boolean,
          default: false,
        },
        playerBuyingPoint : {
          type: Number,
          require: true,
          default: 9,
        },
        playerFantasyPoint : {
          type: Number,
          require: true,
          default: 0,
        },
      },
    ],
    gameRules : {
      maxBowlerCountInPlayingXI : {
        type : Number,
        default : 0
      },
      maxBatsmanCountInPlayingXI : {
        type : Number,
        default : 0
      },
      maxAllRounderCountInPlayingXI : {
        type : Number,
        default : 0
      },
      maxWicketKeeperCountInPlayingXI : {
        type : Number,
        default : 0
      },
      minBowlerCountInPlayingXI : {
        type : Number,
        default : 0
      },
      minBatsmanCountInPlayingXI : {
        type : Number,
        default : 0
      },
      minAllRounderCountInPlayingXI : {
        type : Number,
        default : 0
      },
      minWicketKeeperCountInPlayingXI : {
        type : Number,
        default : 0
      }
    },
    contestStatus: {
      type: String,
      require: true,
      enum: ["ACTIVE", "INACTIVE", "CANCELLED"],
      default: "ACTIVE",
    },
    contestType: {
      type: String,
      require: true,
      enum: ["FREE", "PAID"],
      default: "FREE",
    },
    contestStyle : {
      type: String,
      require: true,
      enum: ["CLASSIC", "HEAD_TO_HEAD"],
      default: "CLASSIC",
    },
    contestVisibility : {
      type: String,
      require: true,
      enum: ["PUBLIC", "PRIVATE"],
      default: "PUBLIC",
    },
    contestWinner: [
      {
        contestOwner: {
          type: "ObjectId",
          ref: "contestOwner",
        },
        winningAmount: {
          type: Number,
          require: true,
        },
      },
    ],
    contestWinnerCount: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  { timestamps: true }
);

//const userdb = mongoose.connection.useDb("userdb");
const contestModel = mongoose.model("contest", ContestModelSchema);
module.exports = contestModel;
