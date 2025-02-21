const express = require("express");
const {
  CreateVenue
} = require("../controllers/venueController.js");
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");
const router = express.Router();

router
  .get("/create-venue/:seriesId", RequireSignIn, CreateVenue);

module.exports = router;
