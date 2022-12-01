const Reason = require("../models/reasonSchema");

// GET TECH CONTENT
exports.getReason = async (req, res) => {
  try {
    const reasons = await Reason.find();

    res.status(200).json({ success: true, reasons });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// CREATE TECH CONTENT (ADMIN)
exports.newReason = async (req, res) => {
  try {
    const { reason } = req.body;

    const newReason = await Reason.create({
      reason,
    });
    res.status(201).json({ success: true, newReason });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE TECH CONTENT (ADMIN)
exports.updateReason = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedReason = await Reason.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, updatedReason });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete project --Admin
exports.deleteReason = async (req, res) => {
  try {
    let reason = await Reason.findById(req.params.id);

    if (!reason) {
      return res.status(404).json({
        message: "reason not found",
      });
    }

    await reason.remove();
    res
      .status(200)
      .json({ success: true, message: "Reason delete successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET CONTENT DETAILS
exports.getReasonDetail = async (req, res) => {
  try {
    const reasonDetail = await Reason.findById(req.params.id);

    res.status(200).json({
      success: true,
      reasonDetail,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
