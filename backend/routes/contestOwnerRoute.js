const express = require("express");
const { CreateContestOwner,CreateTeamAndJoinContestOwnerAndContest } = require("../controllers/contestOwnerController.js");
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");

const router = express.Router();

router.post("/CrateContestOwner/:contestId", RequireSignIn, CreateContestOwner)
.post("/CreateTeam/:contestId/:contestOwnerId", CreateTeamAndJoinContestOwnerAndContest)

module.exports = router;
