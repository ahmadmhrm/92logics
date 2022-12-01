const express = require("express");
const {
  newAboutMessage,
  updateMessage,
  getAboutMessage,
  getContentDetails,
  deleteContent,
} = require("../controllers/aboutMessageController");
const { isAuthenticatedUser, authRole } = require("../middleware/auth");

const router = express.Router();

router.route("/aboutMessage").get(getAboutMessage);
router
  .route("/admin/aboutMessage")
  .post(isAuthenticatedUser, authRole("admin"), newAboutMessage);
router
  .route("/admin/updateMessage/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateMessage);
router
  .route("/admin/deleteMessage/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteContent);

router.route("/content/:id").get(getContentDetails);
module.exports = router;
