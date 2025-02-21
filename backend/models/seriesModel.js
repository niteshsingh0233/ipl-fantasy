const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const SeriesSchema = new mongoose.Schema(
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
    seriesId: {
      type: String,
      require: true,
      unique: true,
    },
    games: [{
      type: "ObjectId",
      ref: "games",
    }],
    name: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    teams: [
      {
        type: "ObjectId",
        ref: "team",
        require: true,
      },
    ],
    venues: [
      {
        type: "ObjectId",
        ref: "venues",
        require: true,
      },
    ],
    matches: [
      {
        type: "ObjectId",
        ref: "matches",
        require: true,
      },
    ],
    squads: [
      {
        squadId: {
          type: Number,
          require: true,
        },
        squadType: {
          type: String,
          require: true,
        },
        imageId: {
          type: Number,
          require: true,
        },
        teamId: {
          type: Number,
          require: true,
        },
      },
    ],
    squadPlayers: [
      {
        squadId: {
          type: Number,
          require: true,
        },
        players: [
          {
            type: "ObjectId",
            ref: "players",
            require: true,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
// const userdb = mongoose.connection.useDb('cricketdb');
const PlayerModel = mongoose.model("series", SeriesSchema);
module.exports = PlayerModel;
