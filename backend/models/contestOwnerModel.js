const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const ContestOwnerModelSchema = new mongoose.Schema(
  {
    documentCode: {
      type: String,
      default: randomUUID().toString("hex"),
    },
    userId: {
      type: "ObjectId",
      ref: "user",
      require: true,
    },
    contestId: {
      type: "ObjectId",
      ref: "contest",
    },
    matchId: {
      type: "ObjectId",
      ref: "matches",
    },
    contest: {
      type: String,
      require: true,
    },
    match: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
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
    contestTeams: [
      {
        ownerTeamName: {
          type: String,
          require: true,
        },
        playingXI: [
          {
            playerId: {
              type: String,
              require: true,
            },
            playerName: {
              type: String,
              require: true,
            },
            playerRole: {
              type: String,
              require: true,
            },
            playerTeamId: {
              type: String,
              require: true,
            },
            isCaptain: {
              type: Boolean,
              default: false,
            },
            isViceCaptain: {
              type: Boolean,
              default: false,
            },
            playerBuyingPoint: {
              type: Number,
              require: true,
              default: 9,
            },
            playerFantasyPoint: {
              type: Number,
              require: true,
              default: 0,
            },
          },
        ],
        playingXICount: {
          type: Number,
          require: true,
          default: 0,
        },
        playingXITeamCount: {
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
            playerCount: {
              type: Number,
              require: true,
              default: 0,
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
            playerCount: {
              type: Number,
              require: true,
              default: 0,
            },
          },
        },
        captain: {
          captainId: {
            type: String,
            require: true,
          },
          captainName: {
            type: String,
            require: true,
          },
        },
        viceCaptain: {
          viceCaptainId: {
            type: String,
            require: true,
          },
          viceCaptainName: {
            type: String,
            require: true,
          },
        },
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
          require: true,
          default: 100,
        },
        pointsLeft: {
          type: Number,
          default: 0,
        },
        totalFantasyPoint: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

//const userdb = mongoose.connection.useDb("userdb");
const contestOwnerModel = mongoose.model(
  "contestOwner",
  ContestOwnerModelSchema
);
module.exports = contestOwnerModel;
