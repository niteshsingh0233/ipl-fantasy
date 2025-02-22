const express = require("express");
const { CreateGame, InviteOwners, JoinGame, UpdateMaximumOwnersCount,GetAllGames,GetAllMyGames,GetSingleGame,UpdateplayerCountryAndLeagueDetails } = require("../controllers/gameController.js");
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");

const router = express.Router();

router.get("/create-game/:seriesId",RequireSignIn, CreateGame)
.post("/updateMaximumOwners/:gameId/:ownersCount/:maximumPoints/:maximumMoneyGame", RequireSignIn, UpdateMaximumOwnersCount)
.get("/invite-owners/:gameId", RequireSignIn,InviteOwners)
.get("/join-game/:gameId/:ownerId",RequireSignIn, JoinGame)
.post("/admin/UpdateplayerCountryAndLeagueDetails/:gameId", RequireSignIn,  authorizeRoles('Admin'), UpdateplayerCountryAndLeagueDetails)
.get("/admin/getAllGames",RequireSignIn,  authorizeRoles('Admin'), GetAllGames)
.get("/me/getAllMyGames", RequireSignIn, GetAllMyGames)
.get("/me/getSingleGame/:gameId", RequireSignIn, GetSingleGame)


module.exports = router;
