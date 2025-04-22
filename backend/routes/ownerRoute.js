const express = require("express");
const {
  CreateOwner,
  AddRetainedPlayer,
  PayEntryFee,
  UpdateTeamOwnerCountry,
  AddPlayerInOwnerDetails,
  GetAllOwnersDetails,
  DraftPlayingXI,
  DraftCaptainAndViceCaptainForPlayingXI,
  CreatePlayingXI,
  SwapPlayer,
  SwapCaptain,
  SwapViceCaptain,
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
  .post("/update-team-owner-country", RequireSignIn,  authorizeRoles('Admin'), UpdateTeamOwnerCountry)
  .post("/admin/sold-players/:ownerId", RequireSignIn, authorizeRoles('Admin'), AddPlayerInOwnerDetails)
  // .post("/swaps", OwnerSwaps)
  // .post("/update-point-for-match", UpdatePointsForMatch)
  .get("/admin/getAllOwnerDetails/:gameId", RequireSignIn,  authorizeRoles('Admin'), GetAllOwnersDetails)
  .post("/draft-players-for-playing-11",  RequireSignIn, DraftPlayingXI)
  .post("/draft-candvc-for-playing-11",  RequireSignIn, DraftCaptainAndViceCaptainForPlayingXI)
  .post("/create-playing-11", RequireSignIn, CreatePlayingXI)
  .post("/swap-player", RequireSignIn, SwapPlayer)
  .post("/swap-captain", RequireSignIn, SwapCaptain)
  .post("/swap-vice-captain", RequireSignIn, SwapViceCaptain)
module.exports = router;

// requireSignIn middleware, authorizeRoles middleware
// nodemailer
