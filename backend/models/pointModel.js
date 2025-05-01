const mongoose = require("mongoose");
const teamList = require("../constants/enumConstants.js");
const { randomUUID } = require("crypto");
const pointSchema = new mongoose.Schema(
  {
    documentCode: {
      type: String,
      default: randomUUID().toString("hex"),
    },
    matchId: {
      type: Number,
      require: true,
    },
    matchNo: {
      type: String,
      require: true,
    },
    teamId: {
      team1: {
        type: Number,
        require: true,
      },
      team2: {
        type: Number,
        require: true,
      },
    },
    venueId: {
      type: String,
      require: true,
    },
    playersPoints: [
      {
        playerId: {
          type: Number,
          require: true,
        },
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
        playingType: {
          type: String,
          require: true,
        },
      },
    ],
    ownersPointForMatch: [
      {
        matchId: {
          type: Number,
        },
        matchNo: {
          type: String,
        },
        teamOwner: {
          type: String,
        },
        teamName: {
          type: String,
        },
        iplTeamName: {
          type: String,
        },
        previousMatchPoint: {
          type: Number,
        },
        currentMatchPoint: {
          type: Number,
        },
        previousTotalPoint: {
          type: Number,
        },
        overallPoint: {
          type: Number,
        },
        currentPlayingXI: [
          {
            playerName: {
              type: String,
            },
            playingType: {
              type: String,
            },
            playerId: {
              type: Number,
            },
            totalPointForTheMatch: {
              type: Number,
            },
          },
        ],
        captain: {
          type: String,
        },
        viceCaptain: {
          type: String,
        },
      },
    ],
    isPointCalculated: {
      type: Boolean,
      default: false,
    },
    isMatchCompleted: {
      type: Boolean,
      default: false,
    },
    gameId: {
      type: String,
      require: true,
    },
    seriesId: {
      type: String,
      require: true,
    },
    seriesDetails : {
      type: String,
      require: true,
    }
  },

  { timestamps: true }
);
//const userdb = mongoose.connection.useDb('userdb');
const Points = mongoose.model("points", pointSchema);
module.exports = Points;
