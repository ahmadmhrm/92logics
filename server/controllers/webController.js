const Web = require("../models/webSchema");
const cloudinary = require("cloudinary");

// GET WEB
exports.getWebs = async (req, res) => {
  try {
    const webs = await Web.find();

    res.status(200).json({ success: true, webs });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// CREATE WEB (ADMIN)
exports.newWeb = async (req, res) => {
  const myServices = await cloudinary.v2.uploader.upload(req.body.icon, {
    folder: "icons",
    width: 150,
    crop: "scale",
  });
  try {
    const { title, message, btn } = req.body;

    const newWeb = await Web.create({
      title,
      message,
      btn,
      icon: {
        public_id: myServices.public_id,
        url: myServices.url,
      },
    });
    res.status(201).json({ success: true, newWeb });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE WEB (ADMIN)
exports.updateWeb = async (req, res) => {
  try {
    const { id } = req.params;

    let web = await Web.findById(req.params.id);

    const newData = {
      title: req.body.title,
      message: req.body.message,
      btn: req.body.btn,
    };

    if (req.body.icon !== "") {
      const iconId = web.icon.public_id;

      if (iconId) {
        await cloudinary.v2.uploader.destroy(iconId);
      }

      const newIcon = await cloudinary.v2.uploader.upload(req.body.icon, {
        folder: "icons",
        width: 150,
        crop: "scale",
      });

      newData.icon = {
        public_id: newIcon.public_id,
        url: newIcon.secure_url,
      };
    }
    const updatedWeb = await Web.findByIdAndUpdate(id, newData, {
      new: true,
    });
    res.status(200).json({ success: true, updatedWeb });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete WEB --Admin
exports.deleteWeb = async (req, res) => {
  try {
    let web = await Web.findById(req.params.id);

    if (!web) {
      return res.status(404).json({
        message: "Service not found",
      });
    }
    const iconId = web.icon.public_id;

    if (iconId) {
      await cloudinary.v2.uploader.destroy(iconId);
    }

    await web.remove();
    res
      .status(200)
      .json({ success: true, message: "Service Delete successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET WEB DETAILS
exports.getWebDetail = async (req, res) => {
  try {
    const webDetail = await Web.findById(req.params.id);

    res.status(200).json({
      success: true,
      webDetail,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
