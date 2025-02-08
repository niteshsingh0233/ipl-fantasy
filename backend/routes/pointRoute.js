const express = require("express");
const { UpdatePointForMatch, CalculatePlayerPoints } = require("../controllers/pointController.js");

const router = express.Router();

router.post("/update-point-for-match", UpdatePointForMatch)
.post("/calculate-player-points", CalculatePlayerPoints)

module.exports = router;
