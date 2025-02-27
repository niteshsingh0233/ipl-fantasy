const express = require("express");
const { CreateLogs } = require("../controllers/logsController.js");
const {
  RequireSignIn,
  authorizeRoles,
} = require("../middlewares/userMiddleware");
const router = express.Router();

router.post("/create-logs", RequireSignIn, authorizeRoles("Admin"), CreateLogs);

module.exports = router;
