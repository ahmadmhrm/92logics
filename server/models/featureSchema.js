const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  feature: {
    type: String,
    require: [true, "please enter feature"],
  },
});

module.exports = mongoose.model("Feature", featureSchema);
