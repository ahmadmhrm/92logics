const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
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
    require: [true, "please enter project name"],
  },

  link: {
    type: String,
    require: [true, "please enter project link"],
  },

  category: {
    type: String,
    required: [true, "Please Enter project Category"],
  },

  projectUrl: {
    type: String,
    required: [true, "Please Enter project Url"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
