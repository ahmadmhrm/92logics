const express = require("express");
const {
  getSkills,
  getSkillDetail,
  deleteSkill,
  updateSkill,
  newSkill,
} = require("../controllers/skillController");

const { isAuthenticatedUser, authRole } = require("../middleware/auth");

const router = express.Router();

router.route("/skills").get(getSkills);
router
  .route("/admin/skill")
  .post(isAuthenticatedUser, authRole("admin"), newSkill);
router
  .route("/admin/skill/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateSkill);
router
  .route("/admin/skill/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteSkill);

router.route("/skill/:id").get(getSkillDetail);
module.exports = router;
