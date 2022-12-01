const mongoose = require("mongoose");

const migrationSchema = new mongoose.Schema({
  icon: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  title: {
    type: String,
    require: [true, "Please Enter Title"],
  },

  message: {
    type: String,
    require: [true, "Please Enter Message"],
  },
  btn: {
    type: String,
    require: [true, "Please Enter Btn Text"],
  },
});

module.exports = mongoose.model("Migration", migrationSchema);
