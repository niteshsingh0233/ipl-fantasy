const express = require("express");
const {
  CreateTeam
} = require("../controllers/teamController.js");

const router = express.Router();

router
  .get("/create-teams-v2/:teamType", CreateTeam);

module.exports = router;
