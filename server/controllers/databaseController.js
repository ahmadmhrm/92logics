const Database = require("../models/databaseSchema");
const cloudinary = require("cloudinary");

// GET DATABASE
exports.getDatabase = async (req, res) => {
  try {
    const databases = await Database.find();

    res.status(200).json({ success: true, databases });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// CREATE DATABASE (ADMIN)
exports.newDatabase = async (req, res) => {
  const myServices = await cloudinary.v2.uploader.upload(req.body.icon, {
    folder: "icons",
    width: 150,
    crop: "scale",
  });
  try {
    const { title, message, btn } = req.body;

    const newDatabase = await Database.create({
      title,
      message,
      btn,
      icon: {
        public_id: myServices.public_id,
        url: myServices.url,
      },
    });
    res.status(201).json({ success: true, newDatabase });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE DATABASE (ADMIN)
exports.updateDatabase = async (req, res) => {
  try {
    const { id } = req.params;

    let database = await Database.findById(req.params.id);

    const newData = {
      title: req.body.title,
      message: req.body.message,
      btn: req.body.btn,
    };

    if (req.body.icon !== "") {
      const iconId = database.icon.public_id;

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
    const updatedDatabase = await Database.findByIdAndUpdate(id, newData, {
      new: true,
    });
    res.status(200).json({ success: true, updatedDatabase });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete DATABASE (ADMIN)
exports.deleteDatabase = async (req, res) => {
  try {
    let database = await Database.findById(req.params.id);

    if (!database) {
      return res.status(404).json({
        message: "database not found",
      });
    }
    const iconId = database.icon.public_id;

    if (iconId) {
      await cloudinary.v2.uploader.destroy(iconId);
    }

    await database.remove();
    res
      .status(200)
      .json({ success: true, message: "Database Delete successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET DATABASE DETAILS
exports.getDatabaseDetail = async (req, res) => {
  try {
    const databaseDetail = await Database.findById(req.params.id);

    res.status(200).json({
      success: true,
      databaseDetail,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
