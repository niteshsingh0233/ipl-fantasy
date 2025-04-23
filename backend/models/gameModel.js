const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const MatchSchema = new mongoose.Schema(
  {
    documentCode: {
      type: String,
      default: randomUUID().toString("hex"),
    },
    gameName: {
      type: String,
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
        playerName: {
          type: String,
          require: true,
        },
        playerStyle: {
          type: String,
          require: true,
          enum: ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"],
        },
        player_id: {
          type: String,
          require: true,
        },
        playerDocumentCode: {
          type: String,
          require: true,
        },
      },
    ],
    soldPlayerList: [
      {
        playerId: {
          type: String,
          require: true,
        },
        playerName: {
          type: String,
          require: true,
        },
        playerStyle: {
          type: String,
          require: true,
          enum: ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"],
        },
        player_id: {
          type: String,
          require: true,
        },
        playerDocumentCode: {
          type: String,
          require: true,
        },
      },
    ],
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
        soldFor: {
          type: Number,
          require: true,
          default: 0,
        },
        soldTo: {
          type: String,
          require: true,
          default: "",
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
        player_id: {
          type: String,
          require: true,
        },
        playerDocumentCode: {
          type: String,
          require: true,
        },
      },
    ],
    ownerPoints: [
      {
        documentCode: {
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
    playerCountryAndLeagueDetails: [
      {
        playerId: {
          type: String,
          require: true,
        },
        playerCountry: {
          type: String,
          require: true,
        },
        playerName: {
          type: String,
          require: true,
        },
      },
    ],
    notForeignTeamList: [
      {
        type: String,
        require: true,
      },
    ],
    fantasyPoint: [
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
            playerType: {
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
        fantasyPointHistory: [
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
                playerType: {
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
      },
    ],
    playerPoints: [
      {
        matchId: {
          type: Number,
        },
        matchNo: {
          type: String,
        },
        playersList: [
          {
            playerName: {
              type: String,
            },
            playerId: {
              type: Number,
            },
            teamName: {
              type: String,
              require: true,
            },
            totalPointForTheMatch: {
              type: Number,
            },
          },
        ],
        playerPointsHistory: [
          {
            matchId: {
              type: Number,
            },
            matchNo: {
              type: String,
            },
            playersList: [
              {
                playerName: {
                  type: String,
                },
                playerId: {
                  type: Number,
                },
                teamName: {
                  type: String,
                  require: true,
                },
                totalPointForTheMatch: {
                  type: Number,
                },
              },
            ],
          },
        ],
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
      maxPlayerSwapCount : {
        type : Number,
        default : 0
      },
      maxCaptainSwapCount : {
        type : Number,
        default : 0
      },
      maxViceCaptainSwapCount : {
        type : Number,
        default : 0
      },
      maxForeignPlayerCountInPlayingXI : {
        type : Number,
        default : 0
      },
      maxIndianPlayerCountInPlayingXI : {
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
      },
      minIndianPlayerCountInPlayingXI : {
        type : Number,
        default : 0
      },
    },
    allowedPlayerTypeForSwap : {
      allowedPlayerTypeForWk : [
        {
          type : String,
          enum : ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"]
        }
      ],
      allowedPlayerTypeForBatsman : [
        {
          type : String,
          enum : ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"]
        }
      ],
      allowedPlayerTypeForBowler : [
        {
          type : String,
          enum : ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"]
        }
      ],
      allowedPlayerTypeForAllRounder : [
        {
          type : String,
          enum : ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"]
        }
      ],
    },
    replacementPlayerList : [
      {
        playerId : {
          type : String,
          require : true
        },
        playerName : {
          type : String,
          require : true
        },
        playerStyle : {
          type : String,
          require : true,
          enum : ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"],
        },
        replacementPlayerId : {
          type : String,
          require : true
        },
        replacementPlayerName : {
          type : String,
          require : true
        },
        replacementPlayerStyle : {
          type : String,
          require : true,
          enum : ["BATSMAN", "BOWLER", "ALLROUNDER", "WICKETKEEPER"],
        },
        replacementReason : {
          type : String,
          require : true
        },
        ownerTeamName : {
          type : String,
          require : true
        },
        ownerName : {
          type : String,
          require : true
        },
      }
    ]
  },
  { timestamps: true }
);

//const userdb = mongoose.connection.useDb("userdb");
const PlayerModel = mongoose.model("games", MatchSchema);
module.exports = PlayerModel;
