const express = require("express");
const {
  CreateMasterDataFromExcel,
} = require("../controllers/uploadController.js");

const router = express.Router();

router.post("/upload-teams-player-excel", CreateMasterDataFromExcel);

module.exports = router;
