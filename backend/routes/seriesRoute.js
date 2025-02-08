const express = require("express");
const { CreateSeries } = require("../controllers/seriesController.js");

const router = express.Router();

router.get("/create-series/:seriesType", CreateSeries)

module.exports = router;
