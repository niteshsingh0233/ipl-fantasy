const express = require("express");
const {
  GetMatchScore,
  CalculatePlayerPoints,
  GetSeriesPointsTable,
  GetMatchesList,
  GetMatchScoreV2
} = require("../controllers/matchScoreController.js");

const router = express.Router();

router
  .post("/get-match-score", GetMatchScore)
  .post("/calculate-player-points", CalculatePlayerPoints)
  .post("/points-table", GetSeriesPointsTable)
  .get("/matches-list/:listType", GetMatchesList)
  .get('/get-match-score/:matchId',GetMatchScoreV2)

module.exports = router;
