const express = require("express");
const {
  CreatePlayer,
  GetTrendingPlayerListController,
  GetPlayerCareerController,
  GetPlayerNewsController,
  GetPlayerBowlingDetailsController,
  GetPlayerBattingDetailsController,
  GetPlayerInfoDetailsController,
  GetPlayerSearchController
} = require("../controllers/playerController.js");

const router = express.Router();

router
  .post("/create-player", CreatePlayer)
  .get("/get-trending-player-list", GetTrendingPlayerListController)
  .get("/get-player-career-details/:playerId", GetPlayerCareerController)
  .get("/get-player-news/:playerId", GetPlayerNewsController)
  .get("/get-player-bowling-details/:playerId", GetPlayerBowlingDetailsController)
  .get("/get-player-batting-details/:playerId", GetPlayerBattingDetailsController)
  .get("/get-player-info-details/:playerId", GetPlayerInfoDetailsController)
  .get("/get-player-search", GetPlayerSearchController);

module.exports = router;
