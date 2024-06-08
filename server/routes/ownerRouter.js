const express = require("express");
const { CreateOwner } = require("../controllers/ownerController.js");

const router = express.Router();

router.post("/create-owner", CreateOwner);

module.exports = router;
