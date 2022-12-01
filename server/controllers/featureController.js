const Feature = require("../models/featureSchema");

// GET feature
exports.getFeature = async (req, res) => {
  try {
    const features = await Feature.find();

    res.status(200).json({ success: true, features });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// CREATE feature (ADMIN)
exports.newFeature = async (req, res) => {
  try {
    const { feature } = req.body;

    const newFeature = await Feature.create({
      feature,
    });
    res.status(201).json({ success: true, newFeature });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE feature (ADMIN)
exports.updateFeature = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFeature = await Feature.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, updatedFeature });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete feature --Admin
exports.deleteFeature = async (req, res) => {
  try {
    let feature = await Feature.findById(req.params.id);

    if (!feature) {
      return res.status(404).json({
        message: "feature not found",
      });
    }

    await feature.remove();
    res
      .status(200)
      .json({ success: true, message: "feature delete successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET feature details
exports.getFeatureDetail = async (req, res) => {
  try {
    const featureDetail = await Feature.findById(req.params.id);

    res.status(200).json({
      success: true,
      featureDetail,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
