const Review = require("../models/reviewSchema");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// create review --User
exports.createReview = async (req, res) => {
  try {
    const myReview = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "reviews",
      width: 150,
      crop: "scale",
    });
    const { name, comment, location } = req.body;
    const review = await Review.create({
      name,
      comment,
      location,
      image: {
        public_id: myReview.public_id,
        url: myReview.url,
      },
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update review --Admin
exports.updateReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    const newData = {
      name: req.body.name,
      location: req.body.location,
      comment: req.body.comment,
    };

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "review not found",
      });
    }

    if (req.body.image !== "") {
      const imageId = review.image.public_id;

      if (imageId) {
        await cloudinary.v2.uploader.destroy(imageId);
      }

      const newImage = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "reviews",
        width: 150,
        crop: "scale",
      });

      newData.image = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    const updateReview = await Review.findByIdAndUpdate(
      req.params.id,
      newData,
      {
        new: true,
        runValidator: true,
        useFindAndModified: false,
      }
    );

    res.status(200).json({ success: true, updateReview });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get All Reviews
exports.getAllReviews = async (req, res) => {
  try {
    const resultPerPage = 3;
    const reviewsCount = await Review.countDocuments();

    const apiFeature = new ApiFeatures(Review.find(), req.query).pagination(
      resultPerPage
    );

    const reviews = await apiFeature.query;

    res.status(200).json({
      success: true,
      reviews,
      reviewsCount,
      resultPerPage,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get All Reviews (Admin)
exports.getAllAdminReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete Review --Admin
exports.deleteReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "review not found",
      });
    }

    const imageId = review.image.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await review.remove();

    res
      .status(200)
      .json({ success: true, message: "Review delete successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get Project Details
exports.getReviewDetails = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404).json({ message: error.message });
    }

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
