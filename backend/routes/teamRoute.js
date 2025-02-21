const express = require("express");
const {
  CreateTeam
} = require("../controllers/teamController.js");
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");
const router = express.Router();

router
  .get("/create-teams-v2/:teamType",RequireSignIn, CreateTeam);

module.exports = router;
