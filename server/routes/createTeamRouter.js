const express = require("express");
const {
  CreateTeamController
} = require("../controllers/createTeamController.js");

const router = express.Router();

router
  .get("/create-teams-v2/:teamType", CreateTeamController);

module.exports = router;
