const express = require("express");
const { CreateGame, InviteOwners, JoinGame } = require("../controllers/gameController.js");

const router = express.Router();

router.get("/create-game/:seriesId", CreateGame)
.get("/invite-owners/:gameId", InviteOwners)
.get("/join-game/:gameId", JoinGame)

module.exports = router;
