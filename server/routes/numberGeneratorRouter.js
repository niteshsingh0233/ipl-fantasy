const express = require("express");
const { NumberGenerator } = require("../controllers/numberGeneratorController.js");

const router = express.Router();

router.post("/random-number-generator", NumberGenerator);

module.exports = router;
