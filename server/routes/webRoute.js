const express = require("express");
const {
  getWebs,
  newWeb,
  updateWeb,
  deleteWeb,
  getWebDetail,
} = require("../controllers/webController");

const { isAuthenticatedUser, authRole } = require("../middleware/auth");

const router = express.Router();

router.route("/webs").get(getWebs);
router.route("/admin/web").post(isAuthenticatedUser, authRole("admin"), newWeb);
router
  .route("/admin/web/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateWeb);
router
  .route("/admin/web/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteWeb);

router.route("/web/:id").get(getWebDetail);
module.exports = router;
