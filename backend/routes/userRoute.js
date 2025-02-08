const express = require("express");
const {
  RegisterUser,
  LoginUser,
  DeactivateUser,
} = require("../controllers/userController");
const { RequireSignIn } = require("../middlewares/userMiddleware");

const router = express.Router();

router
  .post("/register-user", RegisterUser)
  .post("/login-user", LoginUser)
  .post("/deactivate", RequireSignIn, DeactivateUser);

module.exports = router;
