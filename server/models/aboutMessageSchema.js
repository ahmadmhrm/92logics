const mongoose = require("mongoose");

const aboutMessageSchema = new mongoose.Schema({
  address: {
    type: String,
    require: [true, "please enter address"],
  },
  message: {
    type: String,
    require: [true, "please enter address"],
  },
  directorName: {
    type: String,
    require: [true, "please enter address"],
  },
});

module.exports = mongoose.model(
  "AboutMessage",
  aboutMessageSchema,
  "aboutMessage"
);
