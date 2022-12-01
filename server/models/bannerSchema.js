const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
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
  we: {
    type: String,
    require: true,
  },

  create: {
    type: String,
    required: true,
  },
  awesome: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Banner", bannerSchema);
