const express = require("express");
const {
  GetMatchScore,
  CalculatePlayerPoints,
} = require("../controllers/matchScoreController.js");

const router = express.Router();

router
  .post("/get-match-score", GetMatchScore)
  .post("/calculate-player-points", CalculatePlayerPoints);

module.exports = router;
