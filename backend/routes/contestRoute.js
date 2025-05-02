const express = require("express");
const { CreateContest } = require("../controllers/contestController.js");
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");

const router = express.Router();

router.post("/create-contest/:matchId", RequireSignIn, CreateContest)


module.exports = router;
