const express = require("express");
const { isAuthenticatedUser, authRole } = require("../middleware/auth");
const {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  getAllAdminProjects,
  getProjectDetails,
  createProjectReview,
} = require("../controllers/projectController.js");

const router = express.Router();

// get All projects
router.route("/projects").get(getAllProjects);

router
  .route("/admin/projects")
  .get(isAuthenticatedUser, authRole("admin"), getAllAdminProjects);
router
  .route("/project/new")
  .post(isAuthenticatedUser, authRole("admin"), createProject);
router
  .route("/project/:id")
  .put(isAuthenticatedUser, authRole("admin"), updateProject);
router
  .route("/project/:id")
  .delete(isAuthenticatedUser, authRole("admin"), deleteProject);

router.route("/project/:id").get(getProjectDetails);

module.exports = router;
