const express = require("express");
const {
  getBanners,
  newBanner,
  updateBanner,
  deleteBanner,
  getBannerDetail,
} = require("../controllers/bannerController");

const { isAuthenticatedUser, authRole } = require("../middleware/auth");

const router = express.Router();

router.route("/banners").get(getBanners);
router
  .route("/admin/banner")
  .post(isAuthenticatedUser, authRole("admin"), newBanner);
router
  .route("/admin/banner/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateBanner);
router
  .route("/admin/banner/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteBanner);

router.route("/banner/:id").get(getBannerDetail);
module.exports = router;
