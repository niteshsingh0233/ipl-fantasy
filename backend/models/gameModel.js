const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const MatchSchema = new mongoose.Schema(
  {
    documentCode: {
      type: String,
      default: randomUUID().toString("hex"),
    },
    seriesId: {
      type: String,
      require: true,
    },
    seriesDetails: {
      type: "ObjectId",
      ref: "series",
    },
    teamId: [
      {
        type: Number,
        require: true,
      },
    ],
    ownerId: [
      {
        type: "ObjectId",
        ref: "owners",
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

//const userdb = mongoose.connection.useDb("userdb");
const PlayerModel = mongoose.model("games", MatchSchema);
module.exports = PlayerModel;
