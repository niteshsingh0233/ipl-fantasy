const express = require("express");
const { CreatePlayer } = require("../controllers/playerController.js");

const router = express.Router();

router.post("/create-player", CreatePlayer);

module.exports = router;
