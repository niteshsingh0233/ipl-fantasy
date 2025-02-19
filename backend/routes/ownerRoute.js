const express = require("express");
const { CreateOwner } = require("../controllers/ownerController.js");

const router = express.Router();

router.post("/create-owner", CreateOwner)
// .post("/add-retained-player", AddRetainedPlayer)
// .post("/pay-entry-fee", PayEntryFee)

module.exports = router;
