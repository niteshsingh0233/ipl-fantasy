const express = require("express");
const {
  CreateCDS
} = require("../controllers/cdsController.js");
const { RequireSignIn, authorizeRoles, Log } = require("../middlewares/userMiddleware");
const router = express.Router();

router
  .post("/create-cds", RequireSignIn,authorizeRoles('Admin'), Log, CreateCDS);

module.exports = router;
