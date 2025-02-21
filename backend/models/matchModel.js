const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const MatchSchema = new mongoose.Schema(
  {
    documentCode: {
      type: String,
      default: randomUUID().toString("hex"),
    },
    id: {
      type: Number,
      require: true,
      unique: true,
    },
    matchId: {
      type: String,
      require: true,
      unique: true,
    },
    seriesId: {
      type: Number,
      require: true,
    },
    date: {
      type: Date,
    },
    seriesName: {
      type: String,
      require: true,
    },
    matchDesc: {
      type: String,
      require: true,
    },
    matchFormat: {
      type: String,
      require: true,
    },
    startDate: {
      type: String,
      require: true,
    },
    endDate: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    team1: {
      teamId : {
        type: Number,
        require: true,
      },
      teamName : {
        type: String,
        require: true,
      },
      teamSName : {
        type: String,
        require: true,
      },
      imageId : {
        type: Number,
        require: true,
      }
    },
    teamIds: [{
      type: Number,
      require: true,
    }],
    team2: {
      teamId : {
        type: Number,
        require: true,
      },
      teamName : {
        type: String,
        require: true,
      },
      teamSName : {
        type: String,
        require: true,
      },
      imageId : {
        type: Number,
        require: true,
      }
    },
    team2Id: {
      type: Number,
      require: true,
    },
    venueInfo: {
      id : {
        type: Number,
        require: true,
      },
      ground : {
        type: String,
        require: true,
      },
      city : {
        type: String,
        require: true,
      },
      timezone : {
        type: String,
        require: true,
      }
    },
    venueInfoId: {
      type: Number,
      require: true,
    },
    currBatTeamId: {
      type: Number,
      require: true,
      default : 0
    },
    matchScore: {
      team1Score: {
        inngs1: {
          inningsId: {
            type: Number,
            default : 0
          },
          runs: {
            type: Number,
            default : 0
          },
          wickets: {
            type: Number,
            default : 0
          },
          overs: {
            type: Number,
            default : 0
          },
        },
      },
      team2Score: {
        inngs1: {
          inningsId: {
            type: Number,
            default : 0
          },
          runs: {
            type: Number,
            default : 0
          },

          wickets: {
            type: Number,
            default : 0
          },
          overs: {
            type: Number,
            default : 0
          },
        },
      },
    },
  },
  { timestamps: true }
);

//const userdb = mongoose.connection.useDb('cricketdb');
const PlayerModel = mongoose.model("matches", MatchSchema);
module.exports = PlayerModel;
