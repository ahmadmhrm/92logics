const Contact = require("../models/contactSchema");

// New Message
exports.newMessage = async (req, res) => {
  try {
    const { lname, fname, email, phone, message } = req.body;

    const contact = await Contact.create({
      lname,
      fname,
      email,
      phone,
      message,
    });

    await contact.save();

    res.status(201).json({
      success: true,
      contact,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get All Messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(201).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete Message
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res
        .status(404)
        .json({ message: `Message does not exist with Id: ${req.params.id}` });
    }

    await message.remove();

    res.status(201).json({
      success: true,
      message: "Message Deleted Successfully.",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
