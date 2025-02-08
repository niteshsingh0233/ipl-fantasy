const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema(
  {
    gameId: {
      type: Number,
      require: true,
      unique: true,
    },
    seriesId: {
      type: String,
      require: true,
    },
    teamId: [
      {
        type: Number,
        require: true,
      },
    ],
    ownerId: [
      {
        type: String,
        require: true,
      },
    ],
    matchesId: [
      {
        type: Number,
        require: true,
      },
    ],
    playersId: [
      {
        type: Number,
        require: true,
      },
    ],
    venueId: [
      {
        type: Number,
        require: true,
      },
    ],
    pointsId: [
      {
        type: String,
        require: true,
      },
    ],
    maximumOwners: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const userdb = mongoose.connection.useDb("userdb");
const PlayerModel = userdb.model("games", MatchSchema);
module.exports = PlayerModel;
