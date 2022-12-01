const mongoose = require("mongoose");

const reasonSchema = new mongoose.Schema({
  reason: {
    type: String,
    require: [true, "please enter Reasone"],
  },
});

module.exports = mongoose.model("Reason", reasonSchema);
