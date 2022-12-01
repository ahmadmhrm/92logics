const mongoose = require("mongoose");

const technologySchema = new mongoose.Schema({
  techContent: {
    type: String,
    require: [true, "please enter Technology"],
  },
});

module.exports = mongoose.model("Technology", technologySchema, "technology");
