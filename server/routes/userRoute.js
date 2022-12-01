const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authRole } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/profile").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authRole("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authRole("admin"), getSingleUser);
router
  .route("/admin/user/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateRole);
router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteUser);

module.exports = router;
