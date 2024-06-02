const express = require("express");
const { CreateTeam } = require("../controllers/teamController.js");

const router = express.Router();

router.post("/create-teams", CreateTeam);

module.exports = router;
