const mongoose = require("mongoose");

const SeriesSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      require : true,
      unique : true
    },
    name : {
      type: String,
      require : true,
    },
    date : {
      type: String,
      require : true,
    }
  },
  { timestamps: true }
);

const userdb = mongoose.connection.useDb('cricketdb');
const PlayerModel = userdb.model("series", SeriesSchema);
module.exports = PlayerModel;
