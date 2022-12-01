const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  name: {
    type: String,
    require: [true, "please enter name"],
  },
  location: {
    type: String,
    require: [true, "please enter location"],
  },
  comment: {
    type: String,
    require: [true, "please enter comment"],
  },
});

module.exports = mongoose.model("Review", reviewSchema);
