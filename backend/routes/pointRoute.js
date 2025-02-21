const express = require("express");
const { UpdatePointForMatch, CalculatePlayerPoints } = require("../controllers/pointController.js");
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");
const router = express.Router();

router.post("/update-point-for-match",RequireSignIn, UpdatePointForMatch)
.post("/calculate-player-points",RequireSignIn, CalculatePlayerPoints)

module.exports = router;
