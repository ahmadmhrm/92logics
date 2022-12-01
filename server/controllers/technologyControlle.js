const Technology = require("../models/technologySchema");

// GET TECH CONTENT
exports.getTechContent = async (req, res) => {
  try {
    const technology = await Technology.find();

    res.status(200).json({ success: true, technology });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// CREATE TECH CONTENT (ADMIN)
exports.newTechContent = async (req, res) => {
  try {
    const { techContent } = req.body;

    const technologyContent = await Technology.create({
      techContent,
    });
    res.status(201).json({ success: true, technologyContent });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE TECH CONTENT (ADMIN)
exports.updateTechContent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContent = await Technology.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, updatedContent });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// DELETE TECH CONTENT (ADMIN)
exports.deleteTechContent = async (req, res) => {
  try {
    const techContent = await Technology.findById(req.params.id);

    if (!techContent) {
      res.status(404).json({ message: "Content Not Found" });
    }

    await techContent.remove();

    res
      .status(200)
      .json({ success: true, message: "Content Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET CONTENT DETAILS
exports.getTechContentDetail = async (req, res) => {
  try {
    const contentDetail = await Technology.findById(req.params.id);

    res.status(200).json({
      success: true,
      contentDetail,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
