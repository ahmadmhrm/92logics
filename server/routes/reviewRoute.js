const express = require("express");
const {
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getAllAdminReviews,
  getReviewDetails,
} = require("../controllers/reviewController");
const { isAuthenticatedUser, authRole } = require("../middleware/auth");

const router = express.Router();

router.route("/review").post(isAuthenticatedUser, createReview);
router.route("/reviews").get(getAllReviews);
router.route("/admin/reviews").get(getAllAdminReviews);

router
  .route("/admin/review/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateReview);
router
  .route("/admin/review/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteReview);
router
  .route("/admin/review/:id")
  .get(isAuthenticatedUser, authRole("admin"), getReviewDetails);

module.exports = router;
