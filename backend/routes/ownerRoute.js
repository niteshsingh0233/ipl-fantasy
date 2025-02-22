const express = require("express");
const {
  CreateOwner,
  AddRetainedPlayer,
  PayEntryFee,
  UpdateTeamOwnerCountry,
  AddPlayerInOwnerDetails,
  GetAllOwnersDetails,
} = require("../controllers/ownerController.js");
const {
  RequireSignIn,
  authorizeRoles,
} = require("../middlewares/userMiddleware");
const router = express.Router();

router
  .post("/create-owner", RequireSignIn, CreateOwner)
  .post("/add-retained-player/:ownerId", RequireSignIn, AddRetainedPlayer)
  .post("/pay-entry-fee/:ownerId/:entryAmountPaid", RequireSignIn, PayEntryFee)
  // .post("/delete-owner", DeleteOwner)
  .post("/update-team-owner-country", UpdateTeamOwnerCountry)
  .post("/add-players", AddPlayerInOwnerDetails)
  // .post("/swaps", OwnerSwaps)
  // .post("/update-point-for-match", UpdatePointsForMatch)
  .get("/admin/getAllOwnerDetails/:gameId", GetAllOwnersDetails);

module.exports = router;

// requireSignIn middleware, authorizeRoles middleware
// nodemailer
