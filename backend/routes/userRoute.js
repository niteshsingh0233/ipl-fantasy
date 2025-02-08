const express = require("express");
const {
  RegisterUser,
  LoginUser,
  DeactivateUser,
  LogoutUser,
  ActivateUser,
  DeleteUser
} = require("../controllers/userController");
const { RequireSignIn, authorizeRoles } = require("../middlewares/userMiddleware");

const router = express.Router();

router
  .post("/register-user", RegisterUser)
  .post("/login-user", LoginUser)
  .post("/logout-user", RequireSignIn, LogoutUser)
  .post("/deactivate", RequireSignIn, DeactivateUser)
  .post("/activate", RequireSignIn, ActivateUser)
  .post("/delete-user", RequireSignIn, DeleteUser) // logout also in case of deleteUser
  // .post("/password/forgot-password", ForgotPassword)
  // .post("/password/reset/:token", ResetPassword)
  // .get("/me/profile",RequireSignIn, GetUserDetails)
  // .post("/password/update-password", RequireSignIn, UpdatePassword)
  // .post("/me/profile/update-profile", RequireSignIn, UpdateProfileDetails)
  // .post("/admin/users", GetAllUsers);

  // router
  // .route("/admin/users/:id")
  // .get(RequireSignIn, authorizeRoles("admin"), GetSingleUser)
  // .put(RequireSignIn, authorizeRoles("admin"), UpdateUserRole)
  // .delete(RequireSignIn, authorizeRoles("admin"), DeleteUser);
  


module.exports = router;
