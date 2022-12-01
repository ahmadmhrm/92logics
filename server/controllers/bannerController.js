const Banner = require("../models/bannerSchema");
const cloudinary = require("cloudinary");

// GET BANNERS
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();

    res.status(200).json({ success: true, banners });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// CREATE BANNERS (ADMIN)
exports.newBanner = async (req, res) => {
  const myBanner = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "banners",
    width: 150,
    crop: "scale",
  });
  try {
    const { we, create, awesome } = req.body;

    const newBanner = await Banner.create({
      we,
      create,
      awesome,
      image: {
        public_id: myBanner.public_id,
        url: myBanner.url,
      },
    });

    res.status(201).json({ success: true, newBanner });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE BANNERS (ADMIN)
exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;

    let banner = await Banner.findById(req.params.id);

    const newData = {
      we: req.body.we,
      create: req.body.create,
      awesome: req.body.awesome,
    };

    if (req.body.image !== "") {
      const imageId = banner.image.public_id;

      if (imageId) {
        await cloudinary.v2.uploader.destroy(imageId);
      }

      const newImage = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "banners",
        width: 150,
        crop: "scale",
      });

      newData.image = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    const updatedBanner = await Banner.findByIdAndUpdate(id, newData, {
      new: true,
    });
    res.status(200).json({ success: true, updatedBanner });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// delete BANNERS --Admin
exports.deleteBanner = async (req, res) => {
  try {
    let banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        message: "Banner not found",
      });
    }
    const imageId = banner.image.public_id;

    if (imageId) {
      await cloudinary.v2.uploader.destroy(imageId);
    }

    await banner.remove();
    res
      .status(200)
      .json({ success: true, message: "Banner Delete successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET BANNERS DETAILS
exports.getBannerDetail = async (req, res) => {
  try {
    const bannerDetail = await Banner.findById(req.params.id);

    res.status(200).json({
      success: true,
      bannerDetail,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
