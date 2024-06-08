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
          enum: [BATSMAN, BOWLER, ALLROUNDER, WICKETKEEPER],
          require: true,
        },
        isInPlayingXI: {
          type: Boolean,
          require: true,
        },
      },
    ],
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
    playingXIList: [
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
          enum: [BATSMAN, BOWLER, ALLROUNDER, WICKETKEEPER],
          require: true,
        },
      },
    ],
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
      max: [20, "Maximum 20 players swap can be done."],
      require: true,
    },
    captainSwaps: [
      {
        swapType: {
          type: String,
          enum: [CAPTAINSWAP],
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
      },
    ],
    playerSwaps: [
      {
        swapType: {
          type: String,
          enum: [BOWLERSWAP, BATSMANSWAP, ALLROUNDERSWAP, WICKETKEEPERSWAP],
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
    matchScoreList: [
      {
        matchNo: {
          type: Number,
          require: true,
          unique: true,
        },
        playedBetween: [
          {
            type: String,
            require: true,
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
  },
  { timestamps: true }
);

const Owners = new mongoose.model("Owners", ownerSchema);
module.exports = Owners;
