const express = require("express");
const { CreateMatch } = require("../controllers/matchController.js");
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");
const router = express.Router();

router.get("/create-match-from-series/:seriesId", RequireSignIn,CreateMatch)

module.exports = router;
