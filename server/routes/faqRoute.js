const express = require("express");
const {
  getFaqDetail,
  deleteFaq,
  updateFaq,
  newFaq,
  getFaqs,
} = require("../controllers/faqController");

const { isAuthenticatedUser, authRole } = require("../middleware/auth");

const router = express.Router();

router.route("/faqs").get(getFaqs);
router.route("/admin/faq").post(isAuthenticatedUser, authRole("admin"), newFaq);
router
  .route("/admin/faq/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateFaq);
router
  .route("/admin/faq/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteFaq);

router.route("/faq/:id").get(getFaqDetail);
module.exports = router;
