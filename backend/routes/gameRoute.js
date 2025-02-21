const express = require("express");
const { CreateGame, InviteOwners, JoinGame } = require("../controllers/gameController.js");
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");

const router = express.Router();

router.get("/create-game/:seriesId",RequireSignIn, CreateGame)
.get("/invite-owners/:gameId", RequireSignIn,InviteOwners)
.get("/join-game/:gameId",RequireSignIn, JoinGame)

module.exports = router;
