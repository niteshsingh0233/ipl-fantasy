const express = require("express");
const { CreateOwner, AddRetainedPlayer, PayEntryFee } = require("../controllers/ownerController.js");
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");
const router = express.Router();

router.post("/create-owner", RequireSignIn,CreateOwner)
.post("/add-retained-player/:ownerId",RequireSignIn, AddRetainedPlayer)
.post("/pay-entry-fee/:ownerId",RequireSignIn, PayEntryFee)
// .post("/update-team-owner-country", UpdateTeamOwnerCountry)
// .post("/add-players", AddPlayerInOwnerDetails)
// .post("/swaps", OwnerSwaps)
// .post("/update-point-for-match", UpdatePointsForMatch)

module.exports = router;

// requireSignIn middleware, authorizeRoles middleware
// nodemailer