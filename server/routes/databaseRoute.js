const express = require("express");
const {
  newDatabase,
  getDatabase,
  updateDatabase,
  deleteDatabase,
  getDatabaseDetail,
} = require("../controllers/databaseController");

const { isAuthenticatedUser, authRole } = require("../middleware/auth");

const router = express.Router();

router.route("/databases").get(getDatabase);
router
  .route("/admin/database")
  .post(isAuthenticatedUser, authRole("admin"), newDatabase);
router
  .route("/admin/database/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateDatabase);
router
  .route("/admin/database/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteDatabase);

router.route("/database/:id").get(getDatabaseDetail);
module.exports = router;
