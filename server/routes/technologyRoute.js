const express = require("express");
const {
  getTechContent,
  newTechContent,
  getTechContentDetail,
  updateTechContent,
  deleteTechContent,
} = require("../controllers/technologyControlle");

const { isAuthenticatedUser, authRole } = require("../middleware/auth");

const router = express.Router();

router.route("/techContent").get(getTechContent);
router
  .route("/admin/techContent")
  .post(isAuthenticatedUser, authRole("admin"), newTechContent);
router
  .route("/admin/techContent/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateTechContent);
router
  .route("/admin/techContent/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteTechContent);

router.route("/techContent/:id").get(getTechContentDetail);
module.exports = router;
