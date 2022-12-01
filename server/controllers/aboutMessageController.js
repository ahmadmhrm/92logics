const AboutMessage = require("../models/aboutMessageSchema");

// get About Message
exports.getAboutMessage = async (req, res) => {
  try {
    const aboutMessages = await AboutMessage.find();

    res.status(200).json({ success: true, aboutMessages });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create About Message
exports.newAboutMessage = async (req, res) => {
  try {
    const { address, message, directorName } = req.body;

    const aboutMessage = await AboutMessage.create({
      address,
      message,
      directorName,
    });
    res.status(201).json({ success: true, aboutMessage });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update project --Admin
exports.updateMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const newMessage = await AboutMessage.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, newMessage });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete content --Admin
exports.deleteContent = async (req, res) => {
  try {
    let dContent = await AboutMessage.findById(req.params.id);

    if (!dContent) {
      return res.status(404).json({
        message: "Content not found",
      });
    }

    await dContent.remove();
    res
      .status(200)
      .json({ success: true, message: "Content delete successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get content Details
exports.getContentDetails = async (req, res) => {
  try {
    const content = await AboutMessage.findById(req.params.id);

    res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
