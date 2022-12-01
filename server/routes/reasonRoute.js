const express = require("express");
const {
  newReason,
  getReason,
  updateReason,
  getReasonDetail,
  deleteReason,
} = require("../controllers/reasonController");

const { isAuthenticatedUser, authRole } = require("../middleware/auth");

const router = express.Router();

router.route("/reasons").get(getReason);
router
  .route("/admin/reason")
  .post(isAuthenticatedUser, authRole("admin"), newReason);
router
  .route("/admin/reason/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateReason);
router
  .route("/admin/reason/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteReason);

router.route("/reason/:id").get(getReasonDetail);
module.exports = router;
