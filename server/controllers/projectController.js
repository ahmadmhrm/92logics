const Project = require("../models/projectSchema");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// create project --Admin
exports.createProject = async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  try {
    const { name, link, projectUrl, category } = req.body;

    const project = await Project.create({
      name,
      link,
      projectUrl,
      category,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.url,
      },
    });

    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update project --Admin
exports.updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    const newData = {
      name: req.body.name,
      link: req.body.link,
      projectUrl: req.body.projectUrl,
      category: req.body.category,
    };

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "project not found",
      });
    }

    if (req.body.image !== "") {
      const imageId = project.image.public_id;

      if (imageId) {
        await cloudinary.v2.uploader.destroy(imageId);
      }

      const newImage = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "projects",
        width: 150,
        crop: "scale",
      });

      newData.image = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    const updateProject = await Project.findByIdAndUpdate(
      req.params.id,
      newData,
      {
        new: true,
        runValidator: true,
        useFindAndModified: false,
      }
    );

    res.status(200).json({ success: true, updateProject });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get All projects
exports.getAllProjects = async (req, res) => {
  try {
    const resultPerPage = 3;
    const projectsCount = await Project.countDocuments();

    const apiFeature = new ApiFeatures(Project.find(), req.query)
      .filter()
      .pagination(resultPerPage);

    const projects = await apiFeature.query;

    res.status(200).json({
      success: true,
      projects,
      projectsCount,
      resultPerPage,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get All projects (Admin)
exports.getAllAdminProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete Project --Admin
exports.deleteProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "project not found",
      });
    }

    const imageId = project.image.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await project.remove();

    res
      .status(200)
      .json({ success: true, message: "Project delete successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Project Details
exports.getProjectDetails = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404).json({ message: error.message });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
