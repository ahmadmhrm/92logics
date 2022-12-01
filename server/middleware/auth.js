const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Please login to access ths resoure" });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
};

exports.authRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({ message: "User can't access this resoure" })
      );
    }
    next();
  };
};
