const express = require("express");
const {
  CreateVenue
} = require("../controllers/venueController.js");

const router = express.Router();

router
  .get("/create-venue/:seriesId", CreateVenue);

module.exports = router;
