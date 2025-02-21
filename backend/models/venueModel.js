const mongoose = require("mongoose");
const { randomUUID } = require("crypto");
const venueSchema = new mongoose.Schema(
  {
    
        documentCode : {
          type : String,
          default :  randomUUID().toString('hex')
      }, 
    id: {
      type: Number,
      require : true,
      unique : true
    },
    venueId : {
      type: String,
      require : true
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

//const userdb = mongoose.connection.useDb('cricketdb');
const VenueModel = mongoose.model("venues", venueSchema);
module.exports = VenueModel;
