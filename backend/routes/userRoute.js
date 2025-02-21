const express = require("express");
const {
  RegisterUser,
  LoginUser,
  DeactivateUser,
  LogoutUser,
  ActivateUser,
  DeleteUser,
  GetAllUsers,
  UpdateUserAsAdmin,
  GetSingleUser,
  DeleteUserAsAdmin,
  GetUserDetails
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
  .get("/me/profile",RequireSignIn, GetUserDetails)
  // .post("/password/update-password", RequireSignIn, UpdatePassword)
  // .post("/me/profile/update-profile", RequireSignIn, UpdateProfileDetails)
 

  router
  .get('/admin/getAllUsers', RequireSignIn, authorizeRoles("Admin"),GetAllUsers)
  .post('/admin/updateUserAsAdmin/:userId',RequireSignIn, authorizeRoles("Admin"), UpdateUserAsAdmin)
  .get('/admin/GetSingleUser/:userId',RequireSignIn, authorizeRoles("Admin"), GetSingleUser)
  .post('/admin/DeleteUser/:userId',RequireSignIn, authorizeRoles("Admin"), DeleteUserAsAdmin);
  


module.exports = router;
