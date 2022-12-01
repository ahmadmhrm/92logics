const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please enter your name"],
    maxLength: [30, "Name can't exceed 30 characters"],
    minLength: [4, "Please enter more 4 character"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    uniqe: true,
    validat: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "password should be greater than 8 character"],
  },
  select: false,
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

// compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
