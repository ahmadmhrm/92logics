const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Please Enter Title"],
  },

  message: {
    type: String,
    require: [true, "Please Enter Message"],
  },
});

module.exports = mongoose.model("Faq", faqSchema);
