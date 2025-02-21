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
          type: "ObjectId",
          ref: "player",
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
          value: false,
        },
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
    playingXIPlayerId: [{ type: "ObjectId", ref: "player" }],
    playingXIList: [
      {
        playerId: {
          type: "ObjectId",
          ref: "player",
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
      max: [2, "Maximum 2 captain swap can be done."],
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
          ref: "player",
        },
        captainOut: {
          type: "ObjectId",
          ref: "player",
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
          ref: "player",
        },
        playerOut: {
          type: "ObjectId",
          ref: "player",
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
    retainedPlayer: [{ type: "ObjectId", ref: "player" }],
    matchScoreList: [
      {
        matchNo: {
          type: "ObjectId",
          ref: "match",
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
    },
    totalEntryAmount: {
      type: Number,
    },
    totalEntryAmountPaid: {
      type: Number,
    },
  },
  { timestamps: true }
);

//const userdb = mongoose.connection.useDb('userdb');
const Owners = mongoose.model("owners", ownerSchema);
module.exports = Owners;
