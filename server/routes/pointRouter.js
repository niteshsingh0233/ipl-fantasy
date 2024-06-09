const express = require("express");
const { UpdatePointForMatch } = require("../controllers/pointController.js");

const router = express.Router();

router.post("/update-point-for-match", UpdatePointForMatch);

module.exports = router;
