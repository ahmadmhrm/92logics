const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Enter Skill Name"],
  },

  percent: {
    type: Number,
    require: [true, "Please Enter Skill Percent"],
  },
});

module.exports = mongoose.model("Skill", skillSchema);
