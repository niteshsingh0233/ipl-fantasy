const express = require("express");
const { UpdatePointForMatch, CalculatePlayerPoints, CalculatePlayerPointsV2 } = require("../controllers/pointController.js");
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");
const router = express.Router();

router.post("/update-point-for-match",RequireSignIn, UpdatePointForMatch)
.post("/calculate-player-points",RequireSignIn, CalculatePlayerPoints)
.post("/calculate-player-points-v2", RequireSignIn, CalculatePlayerPointsV2)

module.exports = router;
