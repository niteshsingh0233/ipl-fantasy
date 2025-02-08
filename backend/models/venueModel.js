const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      require : true,
      unique : true
    },
    ground : {
      type: String,
      require : true
    },
    city: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    }
  },
  { timestamps: true }
);

const userdb = mongoose.connection.useDb('cricketdb');
const VenueModel = userdb.model("venues", venueSchema);
module.exports = VenueModel;
