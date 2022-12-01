const Migration = require("../models/migrationSchema");
const cloudinary = require("cloudinary");

// GET Migration
exports.getMigrations = async (req, res) => {
  try {
    const migrations = await Migration.find();

    res.status(200).json({ success: true, migrations });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// CREATE Migration (ADMIN)
exports.newMigration = async (req, res) => {
  const myServices = await cloudinary.v2.uploader.upload(req.body.icon, {
    folder: "icons",
    width: 150,
    crop: "scale",
  });
  try {
    const { title, message, btn } = req.body;

    const newMigration = await Migration.create({
      title,
      message,
      btn,
      icon: {
        public_id: myServices.public_id,
        url: myServices.url,
      },
    });
    res.status(201).json({ success: true, newMigration });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE Migration (ADMIN)
exports.updateMigration = async (req, res) => {
  try {
    const { id } = req.params;

    let migration = await Migration.findById(req.params.id);

    const newData = {
      title: req.body.title,
      message: req.body.message,
      btn: req.body.btn,
    };

    if (req.body.icon !== "") {
      const iconId = migration.icon.public_id;

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
    const updatedMigration = await Migration.findByIdAndUpdate(id, newData, {
      new: true,
    });
    res.status(200).json({ success: true, updatedMigration });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete Migration --Admin
exports.deleteMigration = async (req, res) => {
  try {
    let migration = await Migration.findById(req.params.id);

    if (!migration) {
      return res.status(404).json({
        message: "Migration not found",
      });
    }
    const iconId = migration.icon.public_id;

    if (iconId) {
      await cloudinary.v2.uploader.destroy(iconId);
    }

    await migration.remove();
    res
      .status(200)
      .json({ success: true, message: "Migration Delete successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET Migration DETAILS
exports.getMigrationDetail = async (req, res) => {
  try {
    const migrationDetail = await Migration.findById(req.params.id);

    res.status(200).json({
      success: true,
      migrationDetail,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
