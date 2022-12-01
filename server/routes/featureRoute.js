const express = require("express");
const {
  getFeatureDetail,
  deleteFeature,
  updateFeature,
  newFeature,
  getFeature,
} = require("../controllers/featureController");

const { isAuthenticatedUser, authRole } = require("../middleware/auth");

const router = express.Router();

router.route("/features").get(getFeature);
router
  .route("/admin/feature")
  .post(isAuthenticatedUser, authRole("admin"), newFeature);
router
  .route("/admin/feature/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateFeature);
router
  .route("/admin/feature/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteFeature);

router.route("/feature/:id").get(getFeatureDetail);
module.exports = router;
