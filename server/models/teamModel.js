const mongoose = require("mongoose");
const teamList = require("../constants/enumConstants.js");

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      enum: teamList,
      require: true,
    },
    teamSize: {
      type: Number,
      cast: "{VALUE} is not a number",
      min: [15, "Minimum 15 Players should be there in a team."],
      require: true,
    },
  },
  { timestamps: true }
);

const Teams = new mongoose.model("Teams", teamSchema);
module.exports = Teams;
