const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
  fname: {
    type: String,
    require: [true, "Please enter your fname"],
  },

  lname: {
    type: String,
    require: [true, "Please enter your lname"],
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    uniqe: true,
    validat: [validator.isEmail, "Please enter a valid email"],
  },

  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number"],
  },

  message: {
    type: String,
    required: [true, "Please enter your message"],
  },
});

module.exports = mongoose.model("Contact", contactSchema);
