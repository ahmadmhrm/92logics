const User = require("../models/userSchema");
const cloudinary = require("cloudinary");

// Register user
exports.registerUser = async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ message: "Email Already Exist" });
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    const token = user.getJWTToken();
    await user.save();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "please Enter Email & Password" });
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email & password" });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid email & password" });
    }

    const token = user.getJWTToken();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    res
      .status(200)
      .json({ success: true, user, message: "login Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// LogOut user
exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get user detail
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update password
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({ message: "password does't match" });
    }

    user.password = req.body.newPassword;

    await user.save();

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update profile
exports.updateProfile = async (req, res) => {
  try {
    const newData = {
      name: req.body.name,
      email: req.body.email,
    };

    const { email } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ message: "Email Already Exist" });
    }

    if (req.body.avatar !== "") {
      const user = await User.findById(req.user.id);

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      newData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newData, {
      new: true,
      runValidators: true,
      useFindAndModidy: false,
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get All users --Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get Single user --Admin
exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: `User does not exist with Id: ${req.params.id}` });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update user Role --Admin
exports.updateRole = async (req, res) => {
  try {
    const newData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newData, {
      new: true,
      runValidators: true,
      useFindAndModidy: false,
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete user --Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: `User does not exist with Id: ${req.params.id}` });
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res
      .status(200)
      .json({ success: true, message: "User Deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
