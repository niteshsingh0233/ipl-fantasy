const express = require("express");
const { GetMatchScore } = require("../controllers/matchScoreController.js");

const router = express.Router();

router.post("/get-match-score", GetMatchScore);

module.exports = router;
