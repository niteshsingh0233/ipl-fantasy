const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require : true,
      unique : true
    }
  },
  { timestamps: true }
);

const userdb = mongoose.connection.useDb('cricketdb');
const PlayerModel = userdb.model("matches", MatchSchema);
module.exports = PlayerModel;
