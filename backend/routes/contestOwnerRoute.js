const express = require("express");
const { CreateContestOwner } = require("../controllers/contestOwnerController.js");
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");

const router = express.Router();

router.post("/CrateContestOwner/:contestId", RequireSignIn, CreateContestOwner)


module.exports = router;
