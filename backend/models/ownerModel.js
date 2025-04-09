const mongoose = require("mongoose");
const teamList = require("../constants/enumConstants.js");
const { randomUUID } = require("crypto");

const ownerSchema = new mongoose.Schema(
  {
    documentCode: {
      type: String,
      default: randomUUID().toString("hex"),
    },
    ownerId: {
      type: "ObjectId",
      ref: "user",
      require: true,
    },
    games: {
      type: "ObjectId",
      ref: "games",
    },

    series: {
      type: "ObjectId",
      ref: "series",
    },
    seriesId: {
      type: String,
    },
    ownerTeamName: {
      type: String,
      require: true,
    },
    teamName: {
      type: String,
      enum: teamList,
    },
    teamId: {
      type: "ObjectId",
      ref: "team",
      require: true,
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
        playerCountry: {
          type: String,
          require: true,
        },
        playerType: {
          type: String,
          enum: ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"],
          require: true,
        },
        isInPlayingXI: {
          type: Boolean,
          require: true,
        },
        isForeigner: {
          type: Boolean,
          default: false,
        },
        boughtFor : {
          type : Number,
          default : false
        }
      },
    ],
    totalPlayerCount: {
      type: Number,
      require: true,
      default: 0,
    },
    totalBatsmanCount: {
      type: Number,
      require: true,
      default: 0,
    },
    totalBowlerCount: {
      type: Number,
      require: true,
      default: 0,
    },
    totalAllRounderCount: {
      type: Number,
      require: true,
      default: 0,
    },
    totalWicketKeeperCount: {
      type: Number,
      require: true,
      default: 0,
    },
    totalIndianPlayerCount: {
      type: Number,
      require: true,
      default: 0,
    },
    totalForeignPlayerCount: {
      type: Number,
      require: true,
      default: 0,
    },
    playingXIPlayerId: [{ type: "ObjectId", ref: "players" }],
    playingXIList: [
      {
        playerId: {
          type: "ObjectId",
          ref: "players",
          require: true,
        },
        playerName: {
          type: String,
          require: true,
        },
        playerCountry: {
          type: String,
          require: true,
        },
        playerType: {
          type: String,
          enum: ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"],
          require: true,
        },
        isForeigner: {
          type: Boolean,
          value: false,
        },
      },
    ],
    playingXICount: {
      type: Number,
      require: true,
      max: [11, "Maximum 11 players should be there"],
      default: 0,
    },
    playingXIBatsmanCount: {
      type: Number,
      require: true,
      default: 0,
    },
    playingXIBowlerCount: {
      type: Number,
      require: true,
      default: 0,
    },
    playingXIAllRounderCount: {
      type: Number,
      require: true,
      default: 0,
    },
    playingXIWicketKeeperCount: {
      type: Number,
      require: true,
      default: 0,
    },
    playingXIIndianPlayerCount: {
      type: Number,
      require: true,
      default: 0,
    },
    playingXIForeignPlayerCount: {
      type: Number,
      require: true,
      default: 0,
    },
    captainSwapCount: {
      type: Number,
      min: [0, "Minimum 0 captain swap can be done."],
      max: [5, "Maximum 5 captain swap can be done."],
      require: true,
      default: 0,
    },
    viceCaptainSwapCount: {
      type: Number,
      min: [0, "Minimum 0 viceCaptain swap can be done."],
      max: [5, "Maximum 5 viceCaptain swap can be done."],
      require: true,
      default: 0,
    },
    playerSwapCount: {
      type: Number,
      min: [0, "Minimum 0 players swap can be done."],
      max: [20, "Maximum 20 players swap can be done."],
      require: true,
      default: 0,
    },
    captainSwaps: [
      {
        swapType: {
          type: String,
          enum: ["CAPTAINSWAP"],
          require: true,
          default: "CAPTAINSWAP",
        },
        swapNumber: {
          type: Number,
          require: true,
        },
        in: {
          type: String,
          require: true,
        },
        out: {
          type: String,
          require: true,
        },
        captainIn: {
          type: "ObjectId",
          ref: "players",
        },
        captainOut: {
          type: "ObjectId",
          ref: "players",
        },
      },
    ],
    viceCaptainSwaps: [
      {
        swapType: {
          type: String,
          enum: ["VICECAPTAINSWAP"],
          require: true,
          default: "VICECAPTAINSWAP",
        },
        swapNumber: {
          type: Number,
          require: true,
        },
        in: {
          type: String,
          require: true,
        },
        out: {
          type: String,
          require: true,
        },
        viceCaptainIn: {
          type: "ObjectId",
          ref: "players",
        },
        viceCaptainOut: {
          type: "ObjectId",
          ref: "players",
        },
      },
    ],
    playerSwaps: [
      {
        swapType: {
          type: String,
          enum: [
            "BOWLERSWAP",
            "BATSMANSWAP",
            "ALLROUNDERSWAP",
            "WICKETKEEPERSWAP",
          ],
          require: true,
        },
        swapNumber: {
          type: Number,
          require: true,
        },
        in: {
          type: String,
          require: true,
        },
        out: {
          type: String,
          require: true,
        },
        playerIn: {
          type: "ObjectId",
          ref: "players",
        },
        playerOut: {
          type: "ObjectId",
          ref: "players",
        },
      },
    ],
    captain: {
      type: String,
      require: true,
    },
    viceCaptain: {
      type: String,
      require: true,
    },
    retainedPlayer: [
      {
        playerId: {
          type: String,
          require: true,
        },
        playerName : {
          type: String,
          require: true,
        },
        playerDocumentCode: {
          type: String,
          require: true,
        },
        playingStyle : {
          type: String,
          require: true,
          enum: ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"],
        }
      },
    ],
    matchScoreList: [
      {
        matchNo: {
          type: "ObjectId",
          ref: "matches",
        },
        playedBetween: [
          {
            type: "ObjectId",
            ref: "team",
          },
        ],
        team1: {
          type: String,
          enum: teamList,
          require: true,
        },
        team2: {
          type: String,
          enum: teamList,
          require: true,
        },
        matchScore: {
          type: Number,
          require: true,
        },
      },
    ],
    entryFeePaid: {
      type: Boolean,
      value: false,
      default: false,
    },
    totalEntryAmount: {
      type: Number,
    },
    totalEntryAmountPaid: {
      type: Number,
      default: 0,
    },
    maximumPoints: {
      type: Number,
    },
    pointsLeft: {
      type: Number,
      default : 0
    },
    totalFantasyPoint : {
      type: Number,
      default : 0
    },
    fantasyPointDetails : [
      {
        pointType : {
          type: String,
          enum : ["POINTOVERSPENT", "WRONGSWAP", "WRONGCAPTAINSWAP", "WRONGCAPTAINSWAP", "WHATSAPPMSGDELETED", "MATCHPOINT", "BONUSPOINT"]
        },
        point : {
          type: Number,
          default : 0
        },
        totalFantasyPoint : {
          type: Number,
          default : 0
        },
        matchNumber : {
          type: String,
          default : ''
        }
      }
    ],
    pointsSpent : [
      {
        spentType : {
          type: String,
          enum : ["TEAM", "RETAINEDPLAYER", "AUCTIONPLAYER"]
        },
        spentAmount : {
          type: Number,
          default : 0
        },
        pointsLeft : {
          type: Number,
          default : 0
        },
        spentDetail :{
          type: String,
        }
      }
    ]
  },
  { timestamps: true }
);

//const userdb = mongoose.connection.useDb('userdb');
const Owners = mongoose.model("owners", ownerSchema);
module.exports = Owners;
