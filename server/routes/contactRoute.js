const express = require("express");
const {
  newMessage,
  getAllMessages,
  deleteMessage,
} = require("../controllers/contactController");

const { isAuthenticatedUser, authRole } = require("../middleware/auth");

const router = express.Router();

router.route("/new-message").post(isAuthenticatedUser, newMessage);
router
  .route("/messages")
  .get(isAuthenticatedUser, authRole("admin"), getAllMessages);
router
  .route("/message/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteMessage);

module.exports = router;
