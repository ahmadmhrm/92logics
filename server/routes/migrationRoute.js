const express = require("express");
const {
  getMigrationDetail,
  deleteMigration,
  updateMigration,
  newMigration,
  getMigrations,
} = require("../controllers/migrationController");

const { isAuthenticatedUser, authRole } = require("../middleware/auth");

const router = express.Router();

router.route("/migrations").get(getMigrations);
router
  .route("/admin/migration")
  .post(isAuthenticatedUser, authRole("admin"), newMigration);
router
  .route("/admin/migration/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateMigration);
router
  .route("/admin/migration/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteMigration);

router.route("/migration/:id").get(getMigrationDetail);
module.exports = router;
