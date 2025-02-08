const express = require("express");
const { CreateMatch } = require("../controllers/matchController.js");

const router = express.Router();

router.get("/create-match-from-series/:seriesId", CreateMatch)

module.exports = router;
